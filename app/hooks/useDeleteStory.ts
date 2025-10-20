"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function useDeleteStory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteStory = async (storyId: string) => {
    const supabase = createClient();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: deleteError } = await supabase
        .from("stories")
        .delete()
        .eq("id", storyId);

      if (deleteError) throw deleteError;

      setSuccess(true);
    } catch (err: unknown) {
      console.error("Gagal menghapus story:", err);
      if (err instanceof Error) setError(err.message);
      else setError("Terjadi kesalahan saat menghapus story.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteStory, loading, error, success };
}
