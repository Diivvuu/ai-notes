import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

export const useTeamId = () => {
  const params = useParams();
  return params.teamId as Id<"teams">;
};
