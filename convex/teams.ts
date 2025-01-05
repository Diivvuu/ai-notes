import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const generateCode = () => {
  const randomPart = Array.from(
    { length: 6 },
    () => "0123456789abcdefghijklmnopqrstuvxyz"[Math.floor(Math.random() * 36)]
  ).join("");

  const timestampPart = Date.now().toString(36);

  return `${randomPart}-${timestampPart}`;
};

export const regenerateJoinCode = mutation({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User is not authorized");

    const member = await ctx.db
      .query("members")
      .withIndex("by_team_id_user_id", (q) =>
        q.eq("teamId", args.teamId).eq("userId", userId)
      )
      .unique();

    //user is admin?
    if (!member || member.role !== "admin") {
      throw new Error("User is not authorized");
    }

    const newJoinCode = generateCode();

    //added in team info
    await ctx.db.patch(args.teamId, {
      joinCode: newJoinCode,
    });

    return newJoinCode;
  },
});

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

export const update = mutation({
  args: {
    id: v.id("teams"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const member = await ctx.db
      .query("members")
      .withIndex("by_team_id_user_id", (q) =>
        q.eq("teamId", args.id).eq("userId", userId)
      )
      .unique();
    if (!member || member.role !== "admin") {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, {
      name: args.name,
    });

    return args.id;
  },
});

export const remove = mutation({
  args: {
    id: v.id("teams"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const member = await ctx.db
      .query("members")
      .withIndex("by_team_id_user_id", (q) =>
        q.eq("teamId", args.id).eq("userId", userId)
      )
      .unique();
    if (!member || member.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const [members, files] = await Promise.all([
      ctx.db
        .query("members")
        .withIndex("by_team_id", (q) => q.eq("teamId", args.id))
        .collect(),
      ctx.db
        .query("files")
        .withIndex("by_team_id", (q) => q.eq("teamId", args.id))
        .collect(),
    ]);

    for (const member of members) {
      await ctx.db.delete(member._id);
    }
    for (const file of files) {
      await ctx.db.delete(file._id);
    }
    await ctx.db.delete(args.id);

    return args.id;
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
