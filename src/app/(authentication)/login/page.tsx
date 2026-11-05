"use client"

import { useState } from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"
import { toast } from "react-toastify";


import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"



export default function SignupPage() {

    const route = useRouter();
    const handleGoogleSignIn = async () => {
            const resData = await authClient.signIn.social({
                provider: "google",
            })
        }


    const handleEmailLogIn = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as { name: string; email: string; password: string; photoUrl?: string };
        console.log(user)

        const { data, error } = await authClient.signIn.email({
            ...user
        })
         if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
    }

    if (data) {
        toast.success("Log in successful");
        route.push("/");
    }


    }



    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Create an account</CardTitle>
                            <CardDescription>
                                Register yourself to book your first studio session
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleEmailLogIn}
                                noValidate
                            >
                                <FieldGroup>
                                    <Field>
                                        <Button 
                                        onClick={handleGoogleSignIn}
                                        variant="outline" type="button">
                                            <FcGoogle className="text-xl" />
                                            Log In with Google
                                        </Button>
                                    </Field>
                                    <FieldSeparator>Or continue with</FieldSeparator>

                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"

                                        />
                                    </Field>

                                    <Field>
                                        <Button type="submit">Log In</Button>
                                        <FieldDescription className="text-center">
                                            don't have any account{" "}
                                            <Link href="/signup">SignUp</Link>
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                    <FieldDescription className="px-6 text-center">
                        By clicking continue, you agree to our{" "}
                        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                    </FieldDescription>
                </div>
            </div>
        </div>
    )
}
