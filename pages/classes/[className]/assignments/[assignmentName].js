import Layout from "components/Layout";
import { Button, Title } from "@mantine/core";
import Head from "next/head";

export async function getServerSideProps(context) {
  const data = await fetch(
    "https://knoxschools.instructure.com/api/v1/courses/" +
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
        ></div>
    </Layout>
  );
}
