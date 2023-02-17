import {
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function useProfile(id) {
  const [data, setData] = useState(null);
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
        if (id == null) id = user.id;
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", id)
          .single();
        if (error) setError(error);
        if (data) {
          setData(data);
          setError(null);
        }
        setLoading(false);
      } catch (err) {
        alert(err);
      }
    };
    fetchName();
  }, [session]);

  return { db: data, loading, error };
}
