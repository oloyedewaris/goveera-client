import React from "react";
import { Layout, List } from "antd";

function AboutApp() {
  const data = [
    {
      title: "Forum/Annuncements",
      desc:
        "You can create a topic or an announcement, like, unlike and add comment on a topic, and also delete topics",
    },
    {
      title: "Project",
      desc:
        "You can create a project proposal, support or oppose a projects, give feedbacks on projects and delete your projects. You can also edit project stage and tasks as you work on them",
    },
    {
      title: "Polls",
      desc:
        "You can create a poll, vote on a poll and also delete your polls",
    },
  ];

  return (
    <div className="about">
      <Layout style={{ margin: "10px" }}>
        <Layout.Header>
          <h1 style={{ color: "grey" }}>Goveera</h1>
        </Layout.Header>
        <Layout.Content className="layout_content">
          <h2>Introduction</h2>
          <p>
            It's no doubt that Greater use of information and
            communications technology and e-government can
            increase governmental transparency. This, in turn,
            may invite citizen participation, foster e-governance,
            and facilitate e-democracy. In the real world, we ask
            ourselves a proverbial question, "Why can't government
            be like business?," many public managers are challenged
            by the need to perform a balancing act between the
            pursuit of greater openness and private-sector
            efficiency. We conclude that there is a need to
            develop theories, models, and facilities to assist
            managers/CEOs in addressing this balancing challenge.
          </p>
          <p>
            Accountability, transparency, participation, and
            inclusion are vital embodiments that facilitates
            development of an organization.
            Many developing country governments have rhetorically
            embraced the value of accountability, transparency,
            participation, and inclusion and joined international
            initiatives aimed at furthering these principles.
            However, the political will to translate such commitments
            into substantive political reform is often lacking.
          </p>
        </Layout.Content>
        <Layout.Content className="layout_content">
          <h2>Impacts on business</h2>
          <p>
            Goveera is socially able to maintain transparency in services
            of governmental bodies and private sectors to the workers and
            people which helps in eradicating corruption. It will also
            develop efficiency in the delivery of services and reduce time
            usage. It will make the distribution of services among people
            fast and develop an effective interaction within an organization.
          </p>
          <p>
            Goveera leads to a transformation in work processes and service
            delivery, lowers transaction cost with improvement in transparency
            and accountability. Goveera can help reduce corruption and improve
            accountability since its making budgets and progress stage
            of projects carried out.
          </p>
        </Layout.Content>
        <Layout.Content className="layout_content">
          <h3>Activities that can be done on this application</h3>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.title} description={item.desc} />
              </List.Item>
            )}
          />
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default AboutApp;
