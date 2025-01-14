import React from "react";
import UserTasks from "./TaskList";
import UserProjects from "./UserProjects";

const DashboardPage = (user) => {
  return (
    <div className="dashboard">
      <UserTasks user={user} />
      <UserProjects user={user} />
    </div>
  );
};

export default DashboardPage;
