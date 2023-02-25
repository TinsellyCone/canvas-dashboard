import useSWR from 'swr'
import { useRouter } from 'next/router';
import useToken from 'components/lib/useToken';
import { LoadingOverlay, Button } from '@mantine/core';
import TextEditor from 'components/submissions/richText'
import { useState } from 'react';
import { updateNotification, showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

export default function Assignment({ content_id }) {
  const { token } = useToken()
  const router = useRouter()
  const [ textContent, setTextContent ] = useState("<p></p>")
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    "/canvas/courses/" +
      router.query.className +
      "/assignments/" +
      content_id + "?access_token=" + token,
    fetcher
  );
  const [ submitting, setSubmitting ] = useState(false)

  if (!isLoading) return (
    <div style={{ marginLeft: 24, marginRight: 24, marginBottom: 24 }}>
      <div dangerouslySetInnerHTML={{ __html: data.description }} />
      {checkSubmissionType(data, "online_text_entry") ? (
        <>
          <TextEditor setContent={setTextContent} content={textContent} />
          <Button
            disabled={submitting || (textContent == "<p></p>")}
            mt={"sm"}
            fullWidth
            variant="light"
            onClick={submitText}
          >
            Submit
          </Button>
        </>
      ) : null}
    </div>
  );
  else {
    return (
      <LoadingOverlay visible />
    )
  }
  async function submitText() {
    console.log("Submitting: " + textContent)
    setSubmitting(true)
    showNotification({
      id: "submitting",
      loading: true,
      title: "Submission in progress...",
      message: "This may take a few seconds",
      autoClose: false,
      disallowClose: true,
    });
    const response = await fetch("/canvas/courses/" + router.query.className + "/assignments/" + content_id + "/submissions?access_token=" + token, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        submission: {
          body: textContent,
          submission_type: "online_text_entry"
        }
      }),
    });
    updateNotification({
      id: "submitting",
      color: "teal",
      title: "Submission completed",
      message: "Your submission was successfully submitted!",
      icon: <IconCheck size={16} />,
      autoClose: 2000,
    });
    setSubmitting(false)
    setTextContent("<p></p>")
  }
  function checkSubmissionType(data, type) {
    let currentReturn = false;
    if (data.submission_types != null) data.submission_types.map((currentType) => {
      if (currentType == type) currentReturn = true
    })
    return(currentReturn)
  }
}