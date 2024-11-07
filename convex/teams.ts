import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const generateCode = () => {
  const code = Array.from(
    { length: 6 },
    () => "0123456789abcdefghijklmnopqrstuvxyz"[Math.floor(Math.random() * 36)]
  ).join("");

  return code;
};

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User is not authorized");

    const joinCode = generateCode();

    const teamId = await ctx.db.insert("teams", {
      name: args.name,
      userId,
      joinCode,
    });

    //user who created the team is the admin
    await ctx.db.insert("members", {
      userId,
      teamId,
      role: "admin",
    });
    
    return teamId;
  },
});

export const getById = query({
  args: {
    id: v.id("teams"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User is not authorized");

    const member = await ctx.db
      .query("members")
      .withIndex("by_team_id_user_id", (q) =>
        q.eq("teamId", args.id).eq("userId", userId)
      )
      .unique();

    if (!member) return null;

    return await ctx.db.get(args.id);
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) return [];
    const members = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    const teamIds = members.map((member) => member.teamId);
    const teams = [];
    for (const teamId of teamIds) {
      const team = await ctx.db.get(teamId);
      if (team) teams.push(team);
    }
    return teams;
  },
});
