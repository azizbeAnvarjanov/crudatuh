import React from "react";
import ProjectCreate from "../compnoents/ProjectCreate";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const ProjectCreatePage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div>
      <ProjectCreate user={user} />
    </div>
  );
};

export default ProjectCreatePage;
