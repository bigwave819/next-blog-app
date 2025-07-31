'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { signIn } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

//schema validation
const loginSchema = z.object({
    email: z.string().email("Enter the valid email address"),
    password: z.string().min(6, "the password must be at least 6 characters")
})

type LoginFormvalues = z.infer<typeof loginSchema>

function LoginForm() {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    //initialize the form 
    const form = useForm<LoginFormvalues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (values: LoginFormvalues) => {
        setIsLoading(true)

        try {
            const { error } = await signIn.email({
                email: values.email,
                password: values.password,
                rememberMe: true
            })
            if (error) {
                toast("login failed")
                return;
            }
            toast("Login Success");
            router.push("/")
        } catch (error) {
            console.log(error);            
        } finally {
            setIsLoading(false)
        }
    }
    return ( 
        <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                control={form.control}
                name='email'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder='Enter your email' {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                ></FormField>
                <FormField
                control={form.control}
                name='password'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type='password' placeholder='Enter your Password' {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                ></FormField>
                <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                    { isLoading ? "Loading ..." : "Sign In" }
                </Button>
            </form>
        </Form>
     );
}

export default LoginForm;

//onSubmit={form.handleSubmit(onsubmit)}