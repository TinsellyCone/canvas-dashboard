import { useSession, useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function useAvatar() {
  const [avatarURL, setAvatarURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        setLoading(true);
        if (!user) return
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single()

        if (error) setError(error)
        if (data) {
          setAvatarURL(data.avatar_url)
          setError(null)
        }
        setLoading(false)
      }
      catch(err) {
        alert(err.message)
      }
    }
    fetchAvatar()
  }, [session])

  return { avatarURL, loading, error };
}