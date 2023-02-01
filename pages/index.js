import Layout from "components/Layout";
import Head from "next/head";
import ClassCard from "components/ClassCard";
import { Menu } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export async function getServerSideProps() {
  const data = await fetch(
    "https://" + process.env.BASE_DOMAIN + "/api/v1/courses.json?access_token=" +
      process.env.API_KEY +
      "&enrollment_state=active&per_page=15&include[]=course_image"
  ).then((response) => response.json());

  return {
    props: { classes: data },
  };
}

export default function classDetails({ classes }) {
  console.log(
    "https://knoxschools.instructure.com/api/v1/courses/?access_token=" +
      process.env.API_KEY +
      "&enrollment_state=active&per_page=15&include[]=current_grading_period_scores"
  );

  const layoutOptions = (
    <>
      <Menu.Label>Dashboard View</Menu.Label>
      <Menu.Item icon={<IconCheck size={14} />}>Card View</Menu.Item>
      <Menu.Item>List View</Menu.Item>
      <Menu.Item>Recent Activity</Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<IconCheck size={14} />}>Color Overlay</Menu.Item>
      <Menu.Divider />
    </>
  );

  return (
    <Layout options={layoutOptions} title="Dashboard">
      <Head>
        <title>Classes - Canvas</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexShrink: "none",
          flexWrap: "wrap",
          gap: 15,
        }}
      >
        {classes.map((currentClass) => {
          return (
            <ClassCard
              className={currentClass.name}
              grade={95}
              imagePath={currentClass.image_download_url}
              id={currentClass.id}
            />
          );
        })}
      </div>
    </Layout>
  );
}
