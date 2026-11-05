"use client"

import { useState } from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {FcGoogle} from "react-icons/fc"

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

    const handleGoogleSignIn = async () =>{
        const resData = await authClient.signIn.social({
            provider: "google",
        })
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
                                        <Button 
                                        onClick={handleGoogleSignIn}
                                        variant="outline" type="button">
                                            <FcGoogle className="text-xl" />
                                            Register with Google
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
