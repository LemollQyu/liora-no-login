"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home"); // redirect langsung ke /home
  }, [router]);

  return null; // tidak tampilkan apa pun selama redirect
}
