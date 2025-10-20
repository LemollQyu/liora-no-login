// NavigasiWrapper.tsx (versi tanpa login & profile)
"use client";

import Image from "next/image";
import NavigasiMenu from "./NavigasiMenu";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigasiWrapper() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // close sidebar
  const onCloseMenu = () => setMenuOpen(false);

  // tampilkan hanya jika bukan halaman "/" atau "/write"
  if (pathname === "/" || pathname === "/write") return null;

  return (
    <>
      {/* Sidebar Navigasi */}
      <NavigasiMenu isOpen={menuOpen} onClose={onCloseMenu} />

      {/* Navbar utama */}
      <div className="bg-graysmooth border-b border-black w-full flex justify-between px-3 py-4 items-center">
        <div className="flex items-center gap-2">
          <Link href={"/home"}>
            <Image
              src={"/logo/Liora-big.png"}
              height={40}
              width={90}
              alt="Liora"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Tombol ke halaman tulis */}
          <Link href={"/write"} className="w-[28px] h-[28px]">
            <Image
              src={"/icon/write-black.png"}
              height={100}
              width={100}
              alt="write"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
