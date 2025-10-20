"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface PublishResult {
  success: boolean;
  message: string;
}

export function usePublishStory() {
  const [loading, setLoading] = useState(false);

  const publishStory = async ({
    name,
    title,
    about,
    story,
    file,
  }: {
    name: string;
    title: string;
    about: string;
    story: string;
    file: File;
  }): Promise<PublishResult> => {
    const supabase = createClient();
    setLoading(true);

    try {
      if (!name) throw new Error("Nama tidak boleh kosong");
      if (!file) throw new Error("Gambar belum dipilih");

      // 1️⃣ Upload gambar ke storage
      const filePath = `stories/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("stories")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2️⃣ Ambil public URL gambar
      const { data: publicUrlData } = supabase.storage
        .from("stories")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      // 3️⃣ Insert data ke tabel stories
      const { error: insertError } = await supabase.from("stories").insert([
        {
          name,
          title,
          about,
          story,
          story_image_url: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      return { success: true, message: "Story berhasil dipublish!" };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Publish error:", err.message);
        return { success: false, message: err.message };
      } else {
        console.error("Publish error:", err);
        return { success: false, message: "Gagal publish story." };
      }
    } finally {
      setLoading(false);
    }
  };

  return { publishStory, loading };
}
