"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuthActions } from "@convex-dev/auth/react";

export function AppSidebarFooter() {
  const [open, setOpen] = React.useState(false);
  const { signOut } = useAuthActions();

  const { data: user, isLoading: userLoading } = useCurrentUser();

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-full w-full px-5 justify-start"
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <Avatar>
                  <AvatarImage src={user?.image} />
                  <AvatarFallback />
                </Avatar>
              </div>
              <div className="text-base font-light">{user?.name}</div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-2" side="right" align="start">
          <label onClick={signOut} className="cursor-pointer">
            Logout
          </label>
        </PopoverContent>
      </Popover>
    </div>
  );
}
