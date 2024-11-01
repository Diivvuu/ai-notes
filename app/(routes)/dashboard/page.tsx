"use client";
import { useCreateUser } from "@/app/hooks/create-user";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const convex = useConvex();
  const [newUserId, setNewUserId] = useState<Id<"users"> | null>(null);
  const { user }: any = useKindeBrowserClient();
  const { mutate, isPending } = useCreateUser();
  // const getUser = useQuery(api.user.getUser, { email: user?.email });
  const createUser = useMutation(api.user.createUser);
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
          },
          onError(error) {
            toast.error(
              "Failed to create new user please login again to save your progress"
            );
          },
        }
      );
      // createUser({
      //   name: user.given_name,
      //   email: user.email,
      //   image: user.picture,
      //   plan: "free",
      // }).then((resp) => console.log(resp));
    }
    console.log(user);
  }, [user]);

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
    <div>
      <div>hi i am dashboard</div>
      <div>
        <LogoutLink>
          <Button>Logout</Button>
        </LogoutLink>
      </div>
    </div>
  );
};

export default Dashboard;
