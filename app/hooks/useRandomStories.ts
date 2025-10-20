"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export interface Story {
  id: string;
  title: string;
  about: string;
  story: string;
  story_image_url: string;
  created_at: string;
  name: string;
}

export function useRandomStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      const supabase = createClient();
      setLoading(true);
      setError(null);

      try {
        // Ambil semua data langsung dari tabel stories
        const { data, error } = await supabase
          .from("stories")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Acak urutan stories secara random
        const shuffled = (data || []).sort(() => Math.random() - 0.5);

        setStories(shuffled);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Fetch random stories error:", err.message);
          setError(err.message || "Gagal memuat data acak.");
        } else {
          console.error("Fetch random stories error:", err);
          setError("Gagal memuat data acak.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return { stories, loading, error };
}
