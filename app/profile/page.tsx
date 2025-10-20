// profile/page.tsx
import ProfileClient from "./ProfileClient";
import { createClient } from "@/utils/supabase/server";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ feed?: string | null }>;
}) {
  const params = await searchParams;
  const feed = params.feed ?? null;

  // Ambil data user dari Supabase
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
  }

  // Ambil data profile tambahan jika ada di table profiles
  let profileData = null;
  if (user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profileError && profile) {
      profileData = profile;
    }
  }

  return <ProfileClient feed={feed} profile={profileData} />;
}
