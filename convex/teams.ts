import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeams = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("ownerId"), args.id)) // Use ownerId to match the user's ID
      .collect();

    return result;
  },
});

export const CreateTeam = mutation({
  args: {
    teamName: v.string(),
    ownerId: v.id("users"), // Changed to match your schema
  },
  handler: async (ctx, args) => {
    const team = {
      name: args.teamName,
      ownerId: args.ownerId,
      joinCode: generateJoinCode(), // Assume you have a function to generate join codes
      createdAt: Date.now(), // Use Date.now() for timestamps
      updatedAt: Date.now(),
    };

    const result = await ctx.db.insert("teams", team);
    return result;
  },
});

// Helper function to generate a join code (you can customize this)
const generateJoinCode = () => {
  return Math.random().toString(36).substring(2, 8); // Simple random string generator
};
