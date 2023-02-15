import {
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function useTheme() {
  const [dark_theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        setLoading(true);
        if (!user) return;
        const { data, error } = await supabase
          .from("profiles")
          .select("dark_theme")
          .eq("id", user.id)
          .single();

        if (error) setError(error);
        if (data) {
          setTheme(data.dark_theme);
          setError(null);
        }
        setLoading(false);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchTheme();
  }, [session]);

  return { dark_theme, loading, error };
}
