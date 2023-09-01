import { useSession } from "next-auth/react";

import { throwIfNotOwner } from "~/lib/role-asserts";

export default function Dashboard() {
  const { data: sessionData, status } = useSession();

  if (status === "loading")
    return <div>loading user</div>
  
  throwIfNotOwner(sessionData)

  return (
    <h1>
      This is a owner only page
    </h1>
  );
}