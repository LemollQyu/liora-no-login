// Profile.tsx - UPDATE UNTUK TERIMA PROFILE
import Image from "next/image";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

interface ProfileBoxProps {
  user: User | null;
  profile?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  } | null;
}

export default function ProfileBox({ user, profile }: ProfileBoxProps) {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // PRIORITAS DATA DARI PROFILE (SERVER), FALLBACK KE USER (CLIENT)
  const userData = {
    name:
      profile?.full_name ||
      user?.user_metadata?.name ||
      user?.user_metadata?.full_name ||
      "User",
    email: profile?.email || user?.email || "No email",
    avatar:
      profile?.avatar_url ||
      user?.user_metadata?.avatar_url ||
      "/photo/demo-profile.jpg",
  };

  return (
    <>
      <div className="absolute top-20 z-50 right-3 w-[209px] h-[256px] border rounded-[30px] shadow-sm bg-white">
        {/* Profile Section */}
        <div className="flex items-center gap-4 p-3 font-figtree border-b border-black">
          <div className="overflow-hidden bg-gray-300 flex items-center justify-center rounded-full w-[52px] h-[52px]">
            {user ? (
              <>
                <Image
                  src={userData.avatar}
                  className="w-full object-cover h-full"
                  height={100}
                  width={100}
                  alt="profile"
                />
              </>
            ) : (
              <>
                <p>U</p>
              </>
            )}
          </div>
          <div>
            <h1 className="text-[14px]">{userData.name}</h1>
            <Link className="text-[10px]" href={"/profile"}>
              View profile
            </Link>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col p-4 gap-4 mt-2">
          <Link href={"/write"} className="flex gap-4 items-center">
            <div className="w-[24px] h-[24px]">
              <Image
                src={"/icon/write-black.png"}
                className="w-full object-cover h-full"
                height={100}
                width={100}
                alt="write"
              />
            </div>
            <p className="font-figtree text-[12px]">Write</p>
          </Link>
          <div className="flex gap-4 items-center">
            <div className="w-[24px] h-[24px]">
              <Image
                src={"/icon/help.png"}
                className="w-full object-cover h-full"
                height={100}
                width={100}
                alt="help"
              />
            </div>
            <p className="font-figtree text-[12px]">Help</p>
          </div>
        </div>

        {/* Logout Section */}
        <div className="font-figtree flex flex-col gap-1 px-4 pb-4 pt-2">
          {user ? (
            <div className="flex flex-col items-start">
              <button
                onClick={handleLogout}
                className="text-[14px] text-left hover:text-red-600 transition-colors"
              >
                Sign out
              </button>
              <p className="text-[10px] text-gray-600">{userData.email}</p>
            </div>
          ) : (
            <Link
              href={"/"}
              className="text-[14px] text-left hover:text-blue-600 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
