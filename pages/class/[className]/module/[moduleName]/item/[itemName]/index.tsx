import Titlebar from "components/titlebar";
import Assignment from "components/items/assignment";
import Page from "components/items/page";
import { useRouter } from "next/router";
import LogIn from "components/logIn";
import { useSession } from "@supabase/auth-helpers-react";
import useToken from "components/lib/useToken";
import useSWR from "swr";
import { LoadingOverlay } from "@mantine/core";

export default function Index({ setColorScheme }) {
  const router = useRouter();
  const { token } = useToken();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "/canvas/courses/" +
      router.query.className +
      "/modules/" + router.query.moduleName + "/items/" +
      router.query.itemName +
      "?access_token=" +
      token,
    fetcher
  );


  const session = useSession();
  if (!session) {
    return <LogIn />;
  }

  if (isLoading) {
    return <LoadingOverlay visible />
  }

  if (data.type == 'Assignment') {
    return (
      <>
        <Titlebar
          title={data.title}
          setColorTheme={setColorScheme}
          backURL={'/class/' + router.query.className}
        />
        <Assignment content_id={data.content_id} />
      </>
    );
  }
  else if (data.type == 'Page') {
    return (
      <>
        <Titlebar
          title={data.title}
          setColorTheme={setColorScheme}
          backURL={"/class/" + router.query.className}
        />
        <Page page_url={data.page_url} />
      </>
    );
  }
}
