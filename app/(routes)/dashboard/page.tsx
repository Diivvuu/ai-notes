"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import { useEffect } from "react";

const Dashboard = () => {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  // const getUser = useQuery(api.user.getUser, { email: user?.email });
  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    if (user) {
      checkUser();
    }
    console.log(user);
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      }).then((resp) => console.log(resp));
    }
  };
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
