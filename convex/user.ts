import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export const getUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      console.log("Fetching user with email:", args.email); // Log email
      const result = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .first();

      if (!result) {
        console.log("user not found");
        return null;
      }

      return result;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
    }
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()), // Make image optional
    plan: v.union(v.literal("free"), v.literal("paid")), // Add plan field
  },
  handler: async (ctx, args) => {
    try {
      // Query to check for existing user
      const existingUser = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .first(); // Use .first() to retrieve the first match

      // If user already exists, log and return null
      if (existingUser) {
        console.log("User already exists:", existingUser); // Log existing user
        return null; // Return null for existing user case
      }

      // Create new user object
      const newUser = {
        ...args,
        createdAt: Date.now(), // Use Date.now() for timestamps
        updatedAt: Date.now(),
      };

      // Insert new user into the database
      const insertedUser = await ctx.db.insert("users", newUser);
      console.log("Inserted user:", insertedUser); // Log inserted user
      return insertedUser as Id<"users">;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  },
});
