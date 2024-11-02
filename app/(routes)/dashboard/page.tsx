"use client";
import { useCreateUser } from "@/app/hooks/use-create-user";
import { useCurrentTeams } from "@/app/hooks/use-current-teams";
import { useCreateTeamModal } from "@/app/store/use-create-team";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Team } from "@/app/types";

const Dashboard = () => {
  const convex = useConvex();
  const [open, setOpen] = useCreateTeamModal();
  const [newUserId, setNewUserId] = useState<Id<"users"> | null>(null);
  const [teams, setTeams] = useState<Team[] | null>(null);
  const { user }: any = useKindeBrowserClient();
  const { mutate, isPending } = useCreateUser();

  const getTeams = async () => {
    if (newUserId) {
      const result = await convex.query(api.teams.getTeams, {
        id: newUserId,
      });
      setTeams(result);
      if (!result?.length) {
        setOpen(true);
      }
      return result;
    }
  };
  //creating a new user or checking existing user
  useEffect(() => {
    if (user) {
      mutate(
        {
          name: user.given_name,
          email: user.email,
          image: user.picture,
          plan: "free",
        },
        {
          onSuccess(data) {
            setNewUserId(data);
            getTeams();
          },
          onError(error) {
            toast.error(
              "Failed to create new user please login again to save your progress"
            );
          },
        }
      );
    }
  }, [user]);
  // checking if user has any team
  useEffect(() => {
    getTeams();
    console.log(teams);
  }, [open, setOpen, teams, setTeams]);
  // const checkUser = async () => {
  //   if (user?.email) {
  //     try {
  //       const result = await convex.query(api.user.getUser, {
  //         email: user.email,
  //       });
  //       if (!result) {
  //         createUser({
  //           name: user.given_name,
  //           email: user.email,
  //           image: user.picture,
  //           plan: "free",
  //         }).then((resp) => console.log(resp));
  //       }
  //     } catch (error) {
  //       console.error("Error checking user:", error);
  //     }
  //   } else {
  //     console.error("User email is not defined");
  //   }
  // };

  return (
    <>
      {isPending && <Loader className="animate-spin size-4" />}
      <div>
        <div>hi i am dashboard</div>
        <div></div>
        <div>
          <LogoutLink>
            <Button>Logout</Button>
          </LogoutLink>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
