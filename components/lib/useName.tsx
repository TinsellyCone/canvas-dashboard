import {
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useName(): {name: string[] | undefined, loading: boolean, error: PostgrestError | undefined} {
  const [name, setName] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | undefined>(undefined);

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
          setError(undefined);
        }
        setLoading(false);
      } catch (err: any) {
        alert(err.message);
      }
    };
    fetchName();
  }, [session]);

  return { name, loading, error };
}
