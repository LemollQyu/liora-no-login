"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useStoryDetail } from "@/app/hooks/useDetailStory";
// import { useDeleteStory } from "@/app/hooks/useDeleteStory";

export default function StoryDetailClient() {
  const params = useParams();
  const id = params.id;

  const { story, loading, error } = useStoryDetail(
    typeof id === "string" ? id : ""
  );

  if (!id || Array.isArray(id)) return <p>Story tidak ditemukan.</p>;
  if (loading)
    return (
      <div className="flex w-full items-center justify-center h-[70px] font-figtree">
        Loading...
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!story) return <p>Story tidak ditemukan.</p>;

  return (
    <div className="px-4 py-6 bg-graysmooth">
      <h1 className="font-figtree font-bold text-[32px] leading-10 mb-2">
        {story.title}
      </h1>
      <p className="text-sm text-gray-500 mb-4">{story.about}</p>

      <div className="flex gap-2 items-center mb-4 border-b pb-3">
        {/* <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <Image
            src={"/photo/demo-profile.jpg"}
            height={100}
            width={100}
            className="w-full h-full object-cover"
            alt="profile"
          />
        </div> */}
        <p className="text-sm">{story.name || "Anonim"}</p>
        <p className="text-xs text-gray-400 ml-auto">
          {new Date(story.created_at).toLocaleDateString()}
        </p>
      </div>

      {story.story_image_url && (
        <div className="mb-4">
          <Image
            src={story.story_image_url}
            height={300}
            width={400}
            className="w-full h-auto object-cover rounded-md"
            alt="story"
          />
        </div>
      )}

      <p className="font-figtree text-sm leading-6 whitespace-pre-line">
        {story.story}
      </p>

      <p className="mt-6 text-sm font-semibold">
        Written By {story.name || "Anonim"}
      </p>
    </div>
  );
}
