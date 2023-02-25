import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Typography from "@tiptap/extension-typography"

import { Button, MantineNumberSize, Text } from "@mantine/core";
import { useState } from "react";
import { openConfirmModal } from "@mantine/modals";
import { updateNotification, showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { NextRouter } from "next/router";

export default function TextEditor({
  content_id,
  token,
  router,
}: {
  content_id: string
  token: string | null
  router: NextRouter
}) {
  const [textContent, setTextContent] = useState('<p></p>')
  const [submitting, setSubmitting] = useState(false)
  const editor = useEditor({
    onUpdate: ({ editor }) => setTextContent(editor.getHTML()),
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Typography,
    ],
    // @ts-ignore
    textContent,
  })

  return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>
      <Button
        disabled={submitting || textContent == '<p></p>'}
        mt={'sm'}
        fullWidth
        variant='light'
        radius={process.env.NEXT_PUBLIC_RADIUS as MantineNumberSize}
        onClick={() =>
          openConfirmModal({
            title: 'Confirm submission',
            children: (
              <Text size='sm'>
                Are you absolutely sure you want to submit this?
              </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onCancel: () => console.log('Submission Canceled'),
            onConfirm: () => submitText(),
          })
        }
      >
        Submit Assignment
      </Button>
    </>
  )
  async function submitText() {
    console.log('Submitting: ' + textContent)
    setSubmitting(true)
    showNotification({
      id: 'submitting',
      loading: true,
      title: 'Submission in progress...',
      message: 'This may take a few seconds',
      autoClose: false,
      disallowClose: true,
    })
    const response = await fetch(
      '/canvas/courses/' +
        router.query.className +
        '/assignments/' +
        content_id +
        '/submissions?access_token=' +
        token,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          submission: {
            body: textContent,
            submission_type: 'online_text_entry',
          },
        }),
      }
    )
    updateNotification({
      id: 'submitting',
      color: 'teal',
      title: 'Submission completed',
      message: 'Your submission was successfully submitted!',
      icon: <IconCheck size={16} />,
      autoClose: 5000,
    })
    setSubmitting(false)
    setTextContent('<p></p>')
  }
}
