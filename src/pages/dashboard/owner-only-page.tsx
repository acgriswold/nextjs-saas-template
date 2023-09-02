import { UserRole } from "@prisma/client";

export default function Dashboard() {
  return (
    <h1>
      This is a owner only page
    </h1>
  );
}

Dashboard.auth = {
  role: UserRole.OWNER,
  loading: <div>Loading owner Page...</div>,
  unauthorized_redirect: {
    callbackUrl: "/",
    message: "You do not have permissions to view this page. Login to an owner account"
  }
}