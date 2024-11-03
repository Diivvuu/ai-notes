import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

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
