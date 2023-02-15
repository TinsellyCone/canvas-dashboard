import {
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function useName() {
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    const fetchName = async () => {
      try {
        setLoading(true);
        if (!user) return;
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();

        if (error) setError(error);
        if (data) {
          setName(data.full_name);
          setError(null);
        }
        setLoading(false);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchName();
  }, [session]);

  return { name, loading, error };
}
