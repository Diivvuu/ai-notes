"use client";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

const Dashboard = () => {
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
