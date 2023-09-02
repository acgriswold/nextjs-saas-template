import { UserRole } from "@prisma/client";
import type { NextComponentTypeWithAuth } from "next/app";

export const Dashboard: NextComponentTypeWithAuth = () => {
  return (
    <>
      <h1>
        This is a owner only page
      </h1>
    </>
  );
}

Dashboard.auth = {
  match: [UserRole.OWNER],
  loading: <div>Loading owner Page...</div>,
  unauthorized_redirect: {
    callbackUrl: "/dashboard/owner-only-page",
    message: "Login to an owner account to view this page."
  }
}

export default Dashboard;