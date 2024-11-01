import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface useCurrentTeamsProps {
  id: Id<"users">;
}

export const useCurrentTeams = ({ id }: useCurrentTeamsProps) => {
  const data = useQuery(api.teams.getTeams, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
