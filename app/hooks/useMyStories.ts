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
  profiles: {
    id: string;
    full_name: string;
    avatar_url: string;
    email: string;
  } | null;
}

export function useStories(feed?: string) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchStories = async () => {
    const supabase = createClient();
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("stories")
        .select("*, profiles(id, full_name, avatar_url, email)")
        .order("created_at", { ascending: false });

      if (feed === "writeyou") {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          query = query.eq("user_id", user.id);
        } else {
          setStories([]);
          return;
        }
      }

      const { data, error } = await query;
      if (error) throw error;

      setStories(data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Fetch stories error:", err);
        setError(err.message);
      } else {
        console.error("Fetch stories error:", err);
        setError("Gagal memuat data.");
      }
    } finally {
      setLoading(false); // <- wajib
    }
  };

  fetchStories();
}, [feed]);


  return { stories, loading, error };
}
