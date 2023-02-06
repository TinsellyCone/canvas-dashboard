import { Accordion, Table, Anchor } from "@mantine/core";
import Layout from "components/Layout";
import Head from "next/head";
import Link from "next/link";

export async function getServerSideProps(context) {
  let moduleData = await fetch(
    "https://" +
      process.env.BASE_DOMAIN +
      "/api/v1/courses/" +
      context.query.className +
      "/modules.json?access_token=" +
      process.env.API_KEY +
      "&per_page=40"
  ).then((response) => response.json());

  let moduleLists = [];
  for (let i = 0; i < moduleData.length; i++) {
    moduleLists[i] = await fetch(
      "https://" +
        process.env.BASE_DOMAIN +
        "/api/v1/courses/" +
        context.query.className +
        "/modules/" +
        moduleData[i].id +
        "/items.json?access_token=" +
        process.env.API_KEY +
        "&per_page=40"
    ).then((response) => response.json());
  }

  return {
    props: {
      queryString: context.query,
      modules: moduleData,
      assignments: moduleLists,
    },
  };
}

export default function classDetails({ queryString, modules, assignments }) {
  return (
    <Layout title={"Modules"}>
      <Head>
        <title>Classes - Canvas</title>
      </Head>
      <main>
        <Accordion
          variant="separated"
          radius="md"
          chevronPosition="left"
          //   defaultValue={["future-assignments"]}
        >
          {modules.map((currentModule) => {
            return (
              <Accordion.Item value={currentModule.name}>
                <Accordion.Control>{currentModule.name}</Accordion.Control>
                <Accordion.Panel>
                  <Table verticalSpacing={"sm"}>
                    <tbody>
                      {assignments.map((currentAssignments) => {
                        if (
                          currentAssignments[1].module_id == currentModule.id
                        ) {
                          return currentAssignments.map((currentAssignment) => {
                            return (
                              <tr key={currentAssignment.title}>
                                <td>
                                  <Anchor
                                    component={Link}
                                    href={
                                      "/classes/" +
                                      queryString.className +
                                      "/assignments/" +
                                      currentAssignment.id
                                    }
                                  >
                                    {currentAssignment.title}
                                  </Anchor>
                                </td>
                              </tr>
                            );
                          });
                        }
                      })}
                    </tbody>
                  </Table>
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </main>
    </Layout>
  );
}
