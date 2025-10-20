"use client";

import Image from "next/image";

interface PublishProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: () => void; // 🔥 tambahkan prop ini
  loading?: boolean;
}

export default function PublishStory({
  isOpen,
  onClose,
  onPublish,
  loading,
}: PublishProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-start justify-center z-50">
      <div className="w-[343px] border-2 pt-4 h-[122px] bg-white rounded-[18px] mt-10 relative">
        <div className="w-full flex px-4 items-center justify-between relative">
          <p className="font-figtree text-[14px] font-bold">
            Apakah anda ingin mempublikasikan <br /> Tulisan ini?
          </p>

          <button
            onClick={onClose}
            className="absolute right-4 top-0 w-[28px] h-[28px] flex items-center justify-center"
          >
            <Image
              className="w-full h-full object-cover"
              src="/icon/close.png"
              height={100}
              width={100}
              alt="Close"
            />
          </button>
        </div>

        <button
          onClick={onPublish} // 🔥 panggil fungsi publish
          disabled={loading}
          className="absolute bottom-4 left-4 font-figtree text-[12px] w-[90px] h-[25px] rounded-[30px] bg-grass flex justify-center items-center text-white"
        >
          {loading ? "Loading..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
