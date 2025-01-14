import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const { getUser } = getKindeServerSession();
const user = getUser();

export const userId = user?.id;
