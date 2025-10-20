"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRandomStories } from "../hooks/useRandomStories";
import { truncateText } from "../lib/format-text";
import { useDeleteStory } from "../hooks/useDeleteStory";

export default function HomeClient() {
  const { stories: randomStories, loading: loadingRandom } = useRandomStories();
  const [active, setActive] = useState<string>("w-[53px] h-[1px]");

  const { deleteStory, loading: deleting, success } = useDeleteStory();

  useEffect(() => {
    setActive("left-0 w-[53px] h-[1px]");
  }, []);

  // Ketika story berhasil dihapus, bisa refresh otomatis
  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

  useEffect(() => {
    setActive("left-0 w-[53px] h-[1px]");
  }, []);

  return (
    <>
      <div className="sticky w-full top-[0px] border-b z-30 py-4 bg-graysmooth">
        <div className="w-full flex gap-5 items-center relative">
          <Link href="/home" className="font-figtree text-[15px]">
            For you
          </Link>
          <div
            className={`${active} -bottom-4 bg-black absolute duration-500 transition-all`}
          ></div>
        </div>
      </div>

      <section className="mt-5 flex flex-col gap-3 pb-10">
        {loadingRandom ? (
          <p className="text-center text-sm text-gray-500">Loading...</p>
        ) : randomStories.length > 0 ? (
          randomStories.map((card) => (
            <div key={card.id} className="flex flex-col mt-4">
              <div className="flex gap-2 items-center">
                <h1 className="font-figtree text-[12px]">
                  {card.name || "Anonim"}
                </h1>
              </div>

              <Link
                href={`/story/${card?.id}`}
                className="w-full flex justify-between mt-1"
              >
                <div className="w-[219px]">
                  <h1 className="font-figtree font-bold text-[19px] leading-[21px]">
                    {card.title}
                  </h1>
                  <p className="font-figtree font-light mt-1 text-[12px] leading-4">
                    {truncateText(card.story)}
                  </p>
                </div>
                <div className="justify-center flex">
                  <div className="w-[80px] h-[53px] mt-2">
                    <Image
                      src={card.story_image_url}
                      height={100}
                      width={100}
                      className="w-full h-full object-cover"
                      alt="content"
                    />
                  </div>
                </div>
              </Link>

              <div className="flex justify-end items-center mt-4 gap-3">
                <button
                  onClick={() => deleteStory(card.id)}
                  disabled={deleting}
                  className="w-[24px] h-[24px] bg-transparent"
                >
                  <Image
                    src="/icon/remove.png"
                    height={200}
                    width={200}
                    className="w-full h-full object-contain"
                    alt="hapus"
                  />
                </button>
                {/* <div className="w-[18px] h-[18px]">
                  <Image
                    src="/icon/warning.png"
                    height={100}
                    width={100}
                    className="w-full h-full object-cover"
                    alt="warning"
                  />
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-500">
            Belum ada story yang bisa ditampilkan.
          </p>
        )}
      </section>
    </>
  );
}
