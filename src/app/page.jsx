
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import checkUserInDatabase from './checkUserInDatabase'
import DashboardPage from "./compnoents/mainpage"

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();


  checkUserInDatabase(user);

  return (
    <div>
      <div>
        <DashboardPage user={user} />
      </div>
    </div>
  );
}
