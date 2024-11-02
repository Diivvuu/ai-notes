import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

interface useCurrentUserProps {
  email: string;
}

export const useCurrentUser = ({ email }: useCurrentUserProps) => {
  const data = useQuery(api.user.getUser, { email: email });
  const isLoading = data === undefined;

  return { data, isLoading };
};
