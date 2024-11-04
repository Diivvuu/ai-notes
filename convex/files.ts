import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
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

    if (!member || member.role !== "admin")
      throw new Error("User is not authorized");

    const fileId = await ctx.db.insert("files", {
      name: args.name,
      teamId: args.teamId,
      whiteboard: "",
      document: "",
    });
    return fileId;
  },
});

export const get = query({
  args: {
    id: v.id("teams"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const member = await ctx.db
      .query("members")
      .withIndex("by_team_id_user_id", (q) =>
        q.eq("teamId", args.id).eq("userId", userId)
      )
      .unique();

    if (!member) return [];

    const files = await ctx.db
      .query("files")
      .withIndex("by_team_id", (q) => q.eq("teamId", args.id))
      .collect();

    return files;
  },
});
