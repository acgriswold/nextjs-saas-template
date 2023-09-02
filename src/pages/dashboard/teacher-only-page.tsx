import { UserRole } from "@prisma/client";
import type { NextComponentTypeWithAuth } from "next/app";

export const Dashboard: NextComponentTypeWithAuth = () => {
  return (
    <h1>
      This is a teacher only page
    </h1>
  );
}

Dashboard.auth = {
  match: [UserRole.TEACHER],
  loading: <div>Loading teacher page...</div>,
  unauthorized_redirect: {
    callbackUrl: "/dashboard/teacher-only-page",
    message: "Login to a teacher account to view this page."
  }
}

export default Dashboard;