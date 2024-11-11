import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetFilesProps {
  id: Id<"teams">;
}

export const useGetFiles = ({ id }: UseGetFilesProps) => {
  const data = useQuery(api.files.get, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
