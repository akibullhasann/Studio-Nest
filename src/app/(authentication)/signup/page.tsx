"use client"

import { useState } from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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

type PasswordError = { message: string }

function validatePassword(password: string): PasswordError[] {
    const errors: PasswordError[] = []

    if (!/[A-Z]/.test(password)) {
        errors.push({ message: "Must have an uppercase letter" })
    }
    if (!/[a-z]/.test(password)) {
        errors.push({ message: "Must have a lowercase letter" })
    }
    if (password.length < 8) {
        errors.push({ message: "Length must be at least 8 characters" })
    }

    return errors
}

export default function SignupPage() {
    const [password, setPassword] = useState("")
    const [passwordErrors, setPasswordErrors] = useState<PasswordError[]>([])
    const route = useRouter();


    const handleEmailSignUp = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();

        if (validatePassword(password).length > 0) {
            setPasswordErrors(validatePassword(password))
            return 
        }

        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as { name: string; email: string; password: string; photoUrl?: string };
        console.log(user)

        const { data, error } = await authClient.signUp.email({
            ...user
        })
        if(data){
            route.push('/')
        }
        if(error){
            console.log(error)
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
                                onSubmit={handleEmailSignUp}
                                noValidate
                            >
                                <FieldGroup>
                                    <Field>
                                        <Button variant="outline" type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            Register with Github
                                        </Button>
                                    </Field>
                                    <FieldSeparator>Or continue with</FieldSeparator>
                                    <Field>
                                        <FieldLabel htmlFor="name">Name</FieldLabel>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            name="name"
                                            required
                                        />
                                    </Field>
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
                                        <FieldLabel htmlFor="image">Photo URL</FieldLabel>
                                        <Input
                                            id="image"
                                            type="url"
                                            name="image"
                                            placeholder="https://example.com/avatar.jpg"
                                        />
                                    </Field>
                                    <Field data-invalid={passwordErrors.length > 0}>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            aria-invalid={passwordErrors.length > 0}
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                                setPasswordErrors(validatePassword(e.target.value))
                                            }}
                                        />
                                        <FieldError errors={passwordErrors} />
                                    </Field>
                                    <Field>
                                        <Button type="submit">Register</Button>
                                        <FieldDescription className="text-center">
                                            Already have an account?{" "}
                                            <Link href="/login">Login</Link>
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
