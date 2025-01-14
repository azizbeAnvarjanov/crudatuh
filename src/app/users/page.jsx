import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// pages/users.js
import GetAllUsers from "../compnoents/getAllUsers";
import { redirect } from "next/navigation";

const Users = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  return (
    <div>
      <GetAllUsers />
    </div>
  );
};

export default Users;
