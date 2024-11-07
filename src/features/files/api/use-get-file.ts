import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetFileProps {
  id: Id<"files">;
}
export const useGetFile = ({ id }: UseGetFileProps) => {
  const data = useQuery(api.files.getById, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
