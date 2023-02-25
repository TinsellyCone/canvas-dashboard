import { useSession, useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useToken(): { token: string | null, loading: boolean, error: any } {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | undefined>(undefined);

  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        if (!user) return
        const { data, error } = await supabase
          .from("profiles")
          .select("token")
          .eq("id", user.id)
          .single()

        if (error) setError(error)
        if (data) {
          setToken(data.token)
          setError(undefined)
        }
        setLoading(false)
      }
      catch(err: any) {
        alert(err.message)
      }
    }
    fetchToken()
  }, [session])

  return { token, loading, error };
}