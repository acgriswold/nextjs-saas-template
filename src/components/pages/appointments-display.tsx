import { type PropsWithChildren, type ReactElement, useState } from "react";

import type { Appointment } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { api } from "~/lib/api";

type AppointmentsDisplayPropsInternal = {
    projectId: string,
    renderAppointment: (appointment: Appointment) => ReactElement<AppointmentDisplayProps>
}
export type AppointmentsDisplayProps = PropsWithChildren<AppointmentsDisplayPropsInternal>

export function AppointmentsDisplay({ children, projectId, renderAppointment }: AppointmentsDisplayProps) {
    const utils = api.useContext()

    const createAppointment = api.appointment.createAppointment.useMutation({
        async onSuccess(_) {
            await utils.appointment.getAppointmentsByProject.invalidate({ projectId: projectId })
        }
    })

    return (
        <div className="flex flex-col gap-2">
            {children}
            <ShowAppointments projectId={projectId} renderAppointment={renderAppointment} />

            <Button onClick={() => createAppointment.mutate({
                projectId: projectId,
                startDate: new Date(Date.now() + 100000),
                endDate: new Date(Date.now() + 100005)
            }
            )}>
                Create new appointment
            </Button>
        </div>
    )
}

function ShowAppointments({ projectId, renderAppointment }: AppointmentsDisplayPropsInternal) {
    const [startDate] = useState(new Date(2023, 8, 3))
    const [endDate] = useState(new Date(2023, 8, 5))

    const { data: appointmentData, status } = api.appointment.getAppointmentsByProject.useQuery({
        projectId: projectId,
        startDate: startDate,
        endDate: endDate
    }, { refetchOnMount: false })

    if (status === "loading")
        return <div>loading appointments...</div>

    if (!appointmentData || appointmentData?.length === 0)
        return <div>no appointments...</div>

    return <div className="flex flex-row gap-3">
        {
            appointmentData.map((a) => {
                return renderAppointment(a)
            })
        }
    </div>
}

export type AppointmentDisplayProps = {
    appointment: Appointment
}
export function AppointmentDisplay({ appointment }: AppointmentDisplayProps) {
    const utils = api.useContext()

    const deleteAppointment = api.appointment.deleteAppointments.useMutation({
        async onSuccess(_) {
            await utils.appointment.getAppointmentsByProject.invalidate({ projectId: appointment.projectId })
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>{appointment.id}</CardTitle>
                <CardDescription>
                    <div className="flex gap-2">
                        <span>{appointment.start.toISOString()}</span>
                        <span>-</span>
                        <span>{appointment.end.toISOString()}</span>
                    </div>
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div>Attendants...</div>
                {
                    appointment.attendantIds.map((id) => {
                        return (
                            <div key={id}>{id}</div>
                        )
                    })
                }
            </CardContent>


            <CardFooter className="flex flex-grow">
                <Button onClick={() => deleteAppointment.mutate({
                    appointmentIds: [appointment.id]
                })}>
                    Delete?
                </Button>
            </CardFooter>
        </Card>
    )
}