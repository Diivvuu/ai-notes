import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetTeams = () => {
  const data = useQuery(api.teams.get);
  const isLoading = data === undefined;

  return { data, isLoading };
};
