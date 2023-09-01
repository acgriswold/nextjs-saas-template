import { useSession } from "next-auth/react";

import { throwIfNotTeacher } from "~/lib/role-asserts";

export default function Dashboard() {
  const { data: sessionData, status } = useSession();
  

  if (status === "loading")
    return <div>loading user</div>

  throwIfNotTeacher(sessionData)
  return (
    <h1>
      This is a teacher only page
    </h1>
  );
}