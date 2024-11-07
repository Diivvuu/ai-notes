import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

export const useFileId = () => {
  const params = useParams();
  return params.fileId as Id<"files">;
};
