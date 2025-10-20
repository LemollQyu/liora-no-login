"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export interface StoryDetail {
  id: string;
  title: string;
  about: string;
  story: string;
  story_image_url: string;
  created_at: string;
  name: string;
}

export function useStoryDetail(id: string) {
  const [story, setStory] = useState<StoryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchStory = async () => {
      const supabase = createClient();
      setLoading(true);
      setError(null);

      try {
        // Ambil story langsung dari tabel tanpa relasi
        const { data, error } = await supabase
          .from("stories")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) setStory(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Fetch story detail error:", err);
          setError(err.message);
        } else {
          console.error("Fetch story detail error:", err);
          setError("Gagal memuat story.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  return { story, loading, error };
}
