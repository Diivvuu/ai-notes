import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  teams: defineTable({
    name: v.string(),
    userId: v.id("users"),
    joinCode: v.string(),
  }),
  members: defineTable({
    userId: v.id("users"),
    teamId: v.id("teams"),
    role: v.union(v.literal("admin"), v.literal("member")),
  })
    .index("by_user_id", ["userId"])
    .index("by_team_id", ["teamId"])
    .index("by_team_id_user_id", ["teamId", "userId"]),
  files: defineTable({
    name: v.string(),
    teamId: v.id("teams"),
    whiteboard: v.string(),
    document: v.string(),
    joinCode : v.string(),
  }).index("by_team_id", ["teamId"]),
});

export default schema;
