import { UserRole } from "@prisma/client"
import { useSession } from "next-auth/react"
import DashboardLayout from "~/components/layouts/dashboard-layout"
import { OwnerDashboard } from "~/components/pages/owner-dashboard"

export default function Dashboard() {
    return (
        <DashboardLayout>
            <RoleBasedDashboard />
        </DashboardLayout>
    )
}

function RoleBasedDashboard() {
    const { data: sessionData, status } = useSession()
    if (status === "loading")
        return <div>loading dashboard...</div>

    if (sessionData?.user?.role === UserRole.OWNER)
        return <OwnerDashboard />

    return <div>standard dashboard</div>
}