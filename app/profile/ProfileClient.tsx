"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useStories } from "../hooks/useMyStories";
import { truncateText } from "../lib/format-text";

interface UserMetadata {
  full_name?: string;
  avatar_url?: string;
  [key: string]: unknown;
}

interface User {
  id: string;
  email: string;
  user_metadata?: UserMetadata;
}

interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
}

interface ProfileClientProps {
  feed?: string | null;
  user?: User;
  profile?: Profile;
}

export default function ProfileClient({
  feed,
  user,
  profile,
}: ProfileClientProps) {
  const [active, setActive] = useState("w-[53px] h-[1px]");

  useEffect(() => {
    if (feed === "about") {
      setActive("left-[83px] w-[46px] h-[1px]");
    } else {
      setActive("left-0 w-[68px] h-[1px]");
    }
  }, [feed]);

  // Ambil story milik user yang login
  const { stories: myStories, loading: loadingMine } = useStories("writeyou");

  const userData = profile || user?.user_metadata || {};
  const userName =
    userData.full_name || (user?.email ? user.email.split("@")[0] : "User");
  const userAvatar =
    userData.avatar_url ||
    user?.user_metadata?.avatar_url ||
    "/photo/demo-profile.jpg";

  console.log(profile);

  return (
    <div className="px-3 pt-10 bg-graysmooth">
      {/* Profile Section */}
      <div className="flex items-center gap-5">
        {userAvatar ? (
          <>
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <Image
                src={userAvatar}
                height={100}
                width={100}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-[70px] h-[70px] rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              U
            </div>
          </>
        )}
        <h1 className="font-figtree text-[20px]">{userName}</h1>
      </div>

      {/* Tabs */}
      <div className="sticky w-full top-[0px] border-b z-30 py-4 mt-4 bg-graysmooth">
        <div className="w-full flex gap-5 items-center relative">
          <Link href="/profile" className="font-figtree text-[15px]">
            Write you
          </Link>
          <Link href="/profile?feed=about" className="font-figtree text-[15px]">
            About
          </Link>
          <div
            className={`${active} -bottom-4 bg-black absolute duration-500 transition-all`}
          />
        </div>
      </div>

      {/* Stories Section */}
      {feed !== "about" ? (
        <>
          {loadingMine ? (
            <p className="text-center text-sm text-gray-500">Loading...</p>
          ) : myStories.length > 0 ? (
            myStories.map((story) => (
              <Link
                href={`/story/${story?.id}`}
                key={story.id}
                className="flex flex-col mt-4 py-3"
              >
                <div className="flex gap-2 items-center">
                  <div className="w-[20px] h-[20px] rounded-full overflow-hidden">
                    <Image
                      src={story.profiles?.avatar_url || userAvatar}
                      height={100}
                      width={100}
                      className="w-full h-full object-cover"
                      alt="profile"
                    />
                  </div>
                  <h1 className="font-figtree text-[12px]">
                    {story.profiles?.full_name || userName}
                  </h1>
                </div>

                <div className="w-full flex justify-between mt-1">
                  <div className="w-[219px]">
                    <h1 className="font-figtree font-bold text-[19px] leading-[21px]">
                      {story.title}
                    </h1>
                    <p className="font-figtree font-light mt-1 text-[12px] leading-4">
                      {truncateText(story.story)}
                    </p>
                  </div>
                  <div className="justify-center flex">
                    <div className="w-[80px] h-[53px] mt-2">
                      <Image
                        src={story.story_image_url}
                        height={100}
                        width={100}
                        className="w-full h-full object-cover"
                        alt="content"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">
              Belum ada story.
            </p>
          )}
        </>
      ) : (
        <section className="py-5">
          <p className="font-figtree text-[12px]">
            Psychological research is clear: when people procrastinate,
            there&apos;s usually a good reason.
          </p>
          {user?.email && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="font-figtree text-[12px] font-semibold">
                User Info:
              </p>
              <p className="font-figtree text-[11px] mt-1">
                Email: {user.email}
              </p>
              {userData.full_name && (
                <p className="font-figtree text-[11px]">
                  Full Name: {userData.full_name}
                </p>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
