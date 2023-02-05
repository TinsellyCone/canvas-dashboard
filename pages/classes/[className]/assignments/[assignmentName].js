import Layout from "components/Layout";
import { ActionIcon, Button, Collapse } from "@mantine/core";
import Link from "next/link";
import styles from './assignmentPage.module.css'
import { IconExternalLink } from "@tabler/icons-react";
import TextEditor from "components/submissions/TextEditor";
import FileUpload from 'components/submissions/FileUpload.tsx';
import { useState } from "react";

export async function getServerSideProps(context) {
  const data = await fetch(
    "https://" +
      process.env.BASE_DOMAIN +
      "/api/v1/courses/" +
      context.query.className +
      "/assignments/" +
      context.query.assignmentName +
      ".json?access_token=" +
      process.env.API_KEY
  ).then((response) => response.json());

  return {
    props: { queryString: context.query, assignment: data },
  };
}

export default function classDetails({ queryString, assignment }) {
  const [showTextEditor, setTextEditor] = useState(false);
  const [showFileUpload, setFileUpload] = useState(false);
  const [showURL, setURL] = useState(false);
  
  console.log(queryString);
  console.log(
    "https://knoxschools.instructure.com/api/v1/courses/" +
      queryString.className +
      "/assignments/" +
      queryString.assignmentName +
      ".json?access_token=" +
      process.env.API_KEY
  );

  return (
    <Layout title={assignment.name}>
      <div
        dangerouslySetInnerHTML={{ __html: assignment.description }}
        className={styles.assignment}
      ></div>
      {assignment.submission_types.map((submissionType) => {
        if (submissionType == "online_text_entry") {
          return (
            <Button
              onClick={() => {
                setTextEditor(!showTextEditor);
                setFileUpload(false);
                setURL(false);
              }}
              m='xs'
              ml={0}
            >
              Text
            </Button>
          );
        } else if (submissionType == "online_upload") {
          return (
            <Button
              onClick={() => {
                setFileUpload(!showFileUpload);
                setTextEditor(false);
                setURL(false);
              }}
              m="xs"
            >
              Upload
            </Button>
          );
        } else if (submissionType == "online_url") {
          return (
            <Button
              onClick={() => {
                setURL(!showURL);
                setTextEditor(false);
                setFileUpload(false);
              }}
              m="xs"
            >
              URL
            </Button>
          );
        }
      })}
      <Button
        leftIcon={<IconExternalLink size={12} />}
        component="a"
        href={
          "https://" +
          process.env.BASE_DOMAIN +
          "/courses/" +
          queryString.className +
          "/assignments/" +
          assignment.id
        }
        m="xs"
      >
        Open in Canvas
      </Button>
      <Collapse in={showTextEditor}>
        <TextEditor />
      </Collapse>
      <Collapse in={showFileUpload}>
        <FileUpload />
      </Collapse>
      <Collapse in={showURL}>
        <TextEditor />
      </Collapse>
    </Layout>
  );
}
