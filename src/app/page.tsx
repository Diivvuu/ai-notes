"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  //add click on the link below if site doesn't redirect you to the dashboard in under 5 seconds
  return <div className="">Redirecting....</div>;
}
