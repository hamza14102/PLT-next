/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// Kanban application components
import Card from "/pagesComponents/applications/kanban/components/Card";

// Images
import officeDark from "/assets/images/Arch Mirror with Chamfered profile.jpg";
import meeting from "/assets/images/Brass & Glass Box Medium.PNG";
import homeDecore from "/assets/images/Envelope Holder.jpg";
import team1 from "/assets/images/team-1.jpg";
import team2 from "/assets/images/team-2.jpg";
import team3 from "/assets/images/team-3.jpg";
import team4 from "/assets/images/team-4.jpg";
import team5 from "/assets/images/team-5.jpg";

const boards = {
  columns: [
    {
      id: uuidv4(),
      title: "Backlog",
      cards: [
        {
          id: uuidv4(),
          template: "Change me to change title",
        },
        {
          id: uuidv4(),
          template: "Drag me to 'In progress' section",
        },
        {
          id: uuidv4(),
          template: (
            <Card
              image={officeDark}
              badge={{ color: "dark", label: "pending" }}
              content="Arch Mirror with Chamfered profile - 24 x 36"
              attachedFiles={3}
              members={[team1, team2, team3]}
            />
          ),
        },
      ],
    },
    {
      id: uuidv4(),
      title: "In progress",
      cards: [
        {
          id: uuidv4(),
          template: (
            <Card
              badge={{ color: "error", label: "errors" }}
              content="Fix wood sourcing delay"
              attachedFiles={9}
              members={[team2, team3]}
            />
          ),
        },
        {
          id: uuidv4(),
          template: (
            <Card
              badge={{ color: "info", label: "updates" }}
              content="Production meeting for Issue #979"
              attachedFiles={3}
              members={[team5, team4]}
            />
          ),
        },
        {
          id: uuidv4(),
          template: (
            <Card
              image={meeting}
              badge={{ color: "info", label: "updates" }}
              content="Brass and Glass Box Medium"
              attachedFiles={3}
              members={[team1, team2, team3]}
            />
          ),
        },
      ],
    },
    {
      id: uuidv4(),
      title: "In review",
      cards: [
        {
          id: uuidv4(),
          template: (
            <Card
              badge={{ color: "warning", label: "in testing" }}
              content="Responsive Changes"
              attachedFiles={11}
              members={[team3, team2]}
            />
          ),
        },
        {
          id: uuidv4(),
          template: (
            <Card
              badge={{ color: "success", label: "in review" }}
              content="Change images dimension"
              progress={80}
              members={[team3]}
            />
          ),
        },
        {
          id: uuidv4(),
          template: (
            <Card
              badge={{ color: "info", label: "in review" }}
              content="Update links"
              progress={60}
              attachedFiles={6}
              members={[team5, team1]}
            />
          ),
        },
      ],
    },
    {
      id: uuidv4(),
      title: "Done",
      cards: [
        {
          id: uuidv4(),
          template: (
            <Card
              image={homeDecore}
              badge={{ color: "success", label: "done" }}
              content="Envelope Holder"
              attachedFiles={8}
              members={[team5, team1, team4]}
            />
          ),
        },
        {
          id: uuidv4(),
          template: (
            <Card
              badge={{ color: "success", label: "done" }}
              content="Schedule winter campaign"
              attachedFiles={2}
              members={[team1, team4]}
            />
          ),
        },
      ],
    },
  ],
};

export default boards;
