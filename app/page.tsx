"use client";
import { Header } from "@/app/_components/Header";
import { Hero } from "@/app/_components/Hero";
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
