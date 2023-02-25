import useSWR from 'swr'
import { useRouter } from 'next/router';
import useToken from 'components/lib/useToken';
import { LoadingOverlay, Button, Text } from '@mantine/core';
import TextEditor from 'components/submissions/richText'
import { FileUpload } from 'components/submissions/fileUpload';
import { useState } from 'react';

export default function Assignment({ content_id }: {content_id: string}) {
  const { token } = useToken()
  const router = useRouter()
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    "/canvas/courses/" +
      router.query.className +
      "/assignments/" +
      content_id + "?access_token=" + token,
    fetcher
  );

  if (!isLoading) return (
    <div style={{ marginLeft: 24, marginRight: 24, marginBottom: 24 }}>
      <div dangerouslySetInnerHTML={{ __html: data.description }} />
      {checkSubmissionType(data, 'online_text_entry') ? (
        <TextEditor content_id={content_id} token={token} router={router} />
      ) : null}
      {checkSubmissionType(data, 'online_upload') ? (
        <FileUpload content_id={content_id} token={token} router={router} />
      ) : null}
    </div>
  )
  else {
    return (
      <LoadingOverlay visible />
    )
  }
  function checkSubmissionType(data: {submission_types: string[]}, type: string) {
    let currentReturn = false;
    if (data.submission_types != null) data.submission_types.map((currentType: string) => {
      if (currentType == type) currentReturn = true
    })
    return(currentReturn)
  }
}