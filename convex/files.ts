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

    const joinCode = generateCode();

    const fileId = await ctx.db.insert("files", {
      name: args.name,
      teamId: args.teamId,
      whiteboard: "",
      document: "",
      joinCode,
    });
    return fileId;
  },
});

export const updateWhiteboard = mutation({
  args: {
    id: v.id("files"),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const file = await ctx.db.get(args.id);
    if (!file) throw new Error("File not found");

    const member = await ctx.db
      .query("members")
      .withIndex("by_team_id_user_id", (q) =>
        q.eq("teamId", file.teamId).eq("userId", userId)
      )
      .unique();

    if (!member || member.role !== "admin")
      throw new Error("User is not authorized");

    const result = await ctx.db.patch(args.id, { whiteboard: args.whiteboard });
    return result;
  },
});

export const updateDocument = mutation({
  args: {
    id: v.id("files"),
    document: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const file = await ctx.db.get(args.id);
    if (!file) throw new Error("File not found");

    const member = await ctx.db
      .query("members")
      .withIndex("by_team_id_user_id", (q) =>
        q.eq("teamId", file.teamId).eq("userId", userId)
      )
      .unique();

    if (!member || member.role !== "admin")
      throw new Error("User is not authorized");

    const result = await ctx.db.patch(args.id, { document: args.document });
    return result;
  },
});

export const getById = query({
  args: {
    id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const file = await ctx.db.get(args.id);
    if (!file) return null;

    const member = await ctx.db
      .query("members")
      .withIndex("by_team_id_user_id", (q) =>
        q.eq("teamId", file.teamId).eq("userId", userId)
      )
      .unique();
    if (!member) return null;

    return file;
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
