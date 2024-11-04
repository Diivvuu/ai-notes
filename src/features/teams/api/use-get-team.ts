import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetTeamProps {
  id: Id<"teams">;
}

export const useGetTeam = ({ id }: UseGetTeamProps) => {
  const data = useQuery(api.teams.getById, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
