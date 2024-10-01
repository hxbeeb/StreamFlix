// lib/serverAuth.ts
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  if (!session) {
    throw new Error("Not authenticated");
  }

  // Assuming `session.user` contains user details
  const currentUser = { 
    email: session.user?.email || "",
    name: session.user?.name || ""
   };
  return { currentUser };
};

export default serverAuth;
