"use client";
import { Header } from "@/components/self/Header";
import { Hero } from "@/components/self/Hero";
import { useEffect, useState } from "react";

export default function Home() {
  const [clientRendered, setClientRendered] = useState(false);

  useEffect(() => {
    setClientRendered(true);
  }, []);
  return (
    <div className="">
      {clientRendered && <Header />}
      <Hero />
    </div>
  );
}
