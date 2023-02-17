import OnBoarding from "@/components/onboarding"
import LogIn from "@/components/logIn";
import { useSession } from "@supabase/auth-helpers-react";

export default function Index() {
  const session = useSession()
  if (!session) {
    return <LogIn />;
  }
  return (
    <>
      <OnBoarding />
    </>
  )
}