import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  // Users Table: Stores basic user info along with the plan type (free/paid).
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()), // Optional field if image is not mandatory
    plan: v.union(v.literal("free"), v.literal("paid")), // Plan type
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  // Teams Table: Each team has a unique owner (admin).
  teams: defineTable({
    name: v.string(),
    ownerId: v.id("users"), // The main admin of the team
    joinCode: v.string(), // Code to invite/join the team
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_owner_id", ["ownerId"]), // Index for efficient owner lookup

  // Members Table: Links users to teams, with roles (admin/member).
  members: defineTable({
    userId: v.id("users"),
    teamId: v.id("teams"),
    role: v.union(v.literal("admin"), v.literal("member")),
    joinedAt: v.number(),
  })
    .index("by_user_id", ["userId"])
    .index("by_team_id", ["teamId"])
    .index("by_team_id_user_id", ["teamId", "userId"]),

  // Files Table: Stores file information for each team, restricted by plan.
  files: defineTable({
    teamId: v.id("teams"), // The team the file belongs to
    userId: v.id("users"), // The user who uploaded the file
    fileName: v.string(), // File name
    fileSize: v.number(), // File size in bytes
    fileType: v.string(), // MIME type (e.g., "image/png")
    storagePath: v.string(), // Path or URL for file storage
    uploadedAt: v.number(),
  })
    .index("by_team_id", ["teamId"]) // Index to fetch files by team
    .index("by_user_id", ["userId"]), // Index to fetch files by user
});

export default schema;
