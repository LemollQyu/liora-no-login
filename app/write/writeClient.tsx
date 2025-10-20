"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PublishStory from "../components/PublishStory";
import { usePublishStory } from "../hooks/usePublishStory"; // Hook publish story

export default function WriteClient() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState(""); // 🔥 Tambah input nama
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [story, setStory] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [warning, setWarning] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { publishStory, loading } = usePublishStory();

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleButtonClick = () => {
    if (!preview) fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      setWarning("Ukuran gambar tidak boleh lebih dari 10MB.");
      event.target.value = "";
      return;
    }

    setWarning("");
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    setIsFormValid(
      name.trim() !== "" &&
        title.trim() !== "" &&
        about.trim() !== "" &&
        story.trim() !== "" &&
        !!preview
    );
  }, [name, title, about, story, preview]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handlePublish = async () => {
    if (!file) return;
    const result = await publishStory({
      name, // kirim nama manual
      title,
      about,
      story,
      file,
    });

    alert(result.message);
    if (result.success) {
      setMenuOpen(false);
      setName("");
      setTitle("");
      setAbout("");
      setStory("");
      setPreview(null);
      setFile(null);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="h-[57px] w-full px-4 border-b justify-between border-black flex gap-1 items-center">
        <Link href={"/home"} className="flex gap-1 items-center">
          <h1 className="font-jomhuria font-bold text-[64px] tracking-wide ordinal">
            Liora
          </h1>
          <p className="font-figtree inline-block mb-4 text-[12px] align-top">
            Draft story
          </p>
        </Link>

        <div className="flex gap-5 items-center">
          <button
            disabled={!isFormValid}
            onClick={() => setMenuOpen(true)}
            className={`w-[67px] h-[25px] rounded-[30px] font-figtree text-[12px] flex items-center justify-center transition-colors ${
              isFormValid
                ? "bg-grass text-white"
                : "bg-gray-300 text-white cursor-not-allowed"
            }`}
          >
            Publish
          </button>
        </div>
      </div>

      {/* Popup Publish */}
      <PublishStory
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onPublish={handlePublish}
        loading={loading}
      />

      {/* Form Story */}
      <div className="px-4 mt-10">
        {/* Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="bg-transparent border-b border-gray-300 outline-none placeholder-gray-500 text-black text-[14px] font-figtree w-full mb-4"
        />

        {/* Title */}
        <textarea
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            autoGrow(e);
          }}
          placeholder="Title"
          className="bg-transparent border-none outline-none placeholder-black text-black text-[40px] font-jomhuria w-full resize-none overflow-hidden leading-none"
          rows={1}
        />

        {/* About */}
        <textarea
          value={about}
          onChange={(e) => {
            setAbout(e.target.value);
            autoGrow(e);
          }}
          placeholder="About story"
          className="bg-transparent border-none outline-none placeholder-black text-black text-[24px] font-jomhuria w-full resize-none overflow-hidden leading-none mt-2"
          rows={1}
        />

        {/* Gambar */}
        <div className="relative">
          <button
            type="button"
            onClick={handleButtonClick}
            className="w-full h-[256px] mt-2 border flex items-center justify-center bg-white hover:bg-gray-50 transition relative overflow-hidden"
          >
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-[111px] h-[99px]">
                <Image
                  src="/icon/add-photo.png"
                  width={100}
                  height={100}
                  alt="Add Image"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </button>

          {preview && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute bottom-2 right-2 bg-white/80 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center w-6 h-6 transition"
            >
              <p className="text-[12px]">X</p>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="font-figtree text-[9px] text-red-500 text-center mt-1">
            {warning}
          </p>
        </div>

        {/* Story */}
        <div className="mt-4">
          <textarea
            value={story}
            onChange={(e) => {
              setStory(e.target.value);
              autoGrow(e);
            }}
            placeholder="Tell your story..."
            className="w-full bg-transparent border-none outline-none text-[12px] placeholder-gray-500 text-black font-figtree resize-none overflow-hidden leading-tight"
            rows={1}
          />
        </div>
      </div>
    </>
  );
}
