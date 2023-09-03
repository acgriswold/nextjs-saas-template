import { api } from "~/lib/api";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { FormProvider, useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader } from "../ui/card";

export function ProjectForm() {
    const utils = api.useContext();
    const createProject = api.project.createProject.useMutation({
        onSuccess(_) {
            utils.project.getProject.invalidate()
        }
    });

    const formSchema = z.object({
        projectName: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        createProject.mutate({ name: values.projectName })
    }


    return (
        <Card className="m-8 p-2">
            <CardHeader>No project setup yet.</CardHeader>

            <CardContent>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="projectName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your local female owned gym" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Setup your account's project and start inviting people to join!
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Setup project</Button>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    )
}