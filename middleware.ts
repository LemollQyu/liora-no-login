import { NextResponse } from "next/server";

// Middleware dimatikan total
export function middleware() {
  return NextResponse.next();
}

// Tidak cocok dengan route mana pun
export const config = {
  matcher: [],
};
