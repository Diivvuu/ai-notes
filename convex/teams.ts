import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeams = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    if (args.id === null || undefined) {
      return null;
    }
    const result = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("ownerId"), args.id)) // Use ownerId to match the user's ID
      .collect();

    return result;
  },
});

export const createTeam = mutation({
  args: {
    teamName: v.string(),
    ownerId: v.id("users"),
    currentMemberCount: v.number(),
    currentFileCount: v.number(),
    maxMembers: v.union(v.literal(5), v.literal(10)),
    maxFiles: v.union(v.literal(5), v.literal(10)),
  },
  handler: async (ctx, args) => {
    const team = {
      name: args.teamName,
      ownerId: args.ownerId,
      joinCode: generateJoinCode(), // Assume you have a function to generate join codes
      currentMemberCount: args.currentMemberCount,
      currentFileCount: args.currentFileCount,
      maxMembers: args.maxMembers,
      maxFiles: args.maxFiles,
    };

    const result = await ctx.db.insert("teams", team);
    return result;
  },
});

const generateJoinCode = () => {
  return Math.random().toString(36).substring(2, 8);
};
