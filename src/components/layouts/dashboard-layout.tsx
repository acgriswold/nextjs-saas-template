import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
      <>
        <h1>Dashboard</h1>
        {/* Dashboard Routes */}
        <main>{children}</main>
      </>
    )
  }
  