import { UserRole } from "@prisma/client";

export default function Dashboard() {
  return (
    <h1>
      This is a teacher only page
    </h1>
  );
}

Dashboard.auth = {
  role: UserRole.TEACHER,
  loading: <div>Loading teacher page...</div>,
  unauthorized_redirect: {
    callbackUrl: "/",
    message: "You do not have permissions to view this page. Login to a teacher account."
  }
}