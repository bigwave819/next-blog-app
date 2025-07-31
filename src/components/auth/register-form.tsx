'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
//validation schema

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

const registerSchema = z.object({
    name: z.string().min(3, "name must be atleast 3 characters"),
    email: z.string().email("please enter the valid email address"),
    password: z.string().min(6, "the password must be atleast 6 characters"),
    confirmPassword: z.string().min(6, "the password must be atleast 6 characters")
}).refine(data => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ['confirmPassword']
})

type RegisterFormValues = z.infer<typeof registerSchema>

interface  RegisterFormProps{
    onSuccess? : ()=>void
}


function RegisterForm({ onSuccess } : RegisterFormProps) {

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (values: RegisterFormValues) => {
        setIsLoading(true)

        try {
            const { error } = await signUp.email({
                name: values.name,
                email: values.email,
                password: values.password
            })

            if (error) {
                toast("failed to create the account. try Again!")
                return;
            }
            toast("account created successfully go and then sign in")
            
            if (onSuccess) {
                onSuccess()
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="confirm Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
                <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                    {isLoading ? "Loading ..." : "Create Account"}
                </Button>
            </form>
        </Form>
    );
}

export default RegisterForm;