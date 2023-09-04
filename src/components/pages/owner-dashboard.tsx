import { UserRole } from "@prisma/client"
import type { NextComponentTypeWithAuth } from "next/app"

import { api } from "~/lib/api"
import { ProjectForm } from "../forms/project-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { AppointmentDisplay, AppointmentsDisplay } from "./appointments-display";

export const OwnerDashboard: NextComponentTypeWithAuth = () => {

    return (
        <>
            <h2>owner dashboard</h2>
            <ProjectDisplay />
        </>
    )
}

function ProjectDisplay() {
    const project = api.project.getProject.useQuery();

    if (project.isLoading)
        return <div>loading project...</div>

    if (!project.data)
        return <ProjectForm />

    const { name, id } = project.data
    return (
        <Card className="m-8 p-4">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>

            <CardContent>
                <AppointmentsDisplay projectId={id} renderAppointment={(a) => <AppointmentDisplay appointment={a} />} >
                    List of appointments...
                </AppointmentsDisplay>
            </CardContent>

            <CardFooter>{id}</CardFooter>
        </Card>
    )
}

OwnerDashboard.auth = {
    match: [UserRole.OWNER],
}
