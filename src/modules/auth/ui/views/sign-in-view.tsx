"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
const formsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const router = useRouter()
  const [error, setError] = useState<String | null>(null)
  const [pending, setPending] = useState(false)
  const form = useForm<z.infer<typeof formsSchema>>({
    resolver: zodResolver(formsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formsSchema>) => {
    setError(null)
    setPending(true)
    authClient.signIn.email({
      email: data.email,
      password: data.password
    },
      {
        onSuccess: () => {
          router.push('/')
          setPending(false)
        },
        onError: (error) => {
          setError(error.error.message)
          setPending(false)
        }
      }
    )
  }
    const onSocial = (provider: "github" | "google") => {
      setError(null);
      setPending(true);
  
      authClient.signIn.social(
        {
          provider : provider,
          callbackURL: "/"
        },
        {
          onSuccess: () => {
            setPending(false);
          },
          onError: (error) => {
            setError(error.error.message);
            setPending(false);
          },
        }
      );
    };



  console.log("signin view");
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0 ">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="flex flex-col items-left  gap-y-4 p-7 md:p-10">
            <div className="grid gap-6">
              <div>
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-muted-black font-normal">
                  sign-in to your account
                </p>
              </div>
              <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {!!error &&
                      <div className="flex flex-col gap-2">
                        <Alert className="bg-destructive/10">
                          <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                          <AlertTitle>{error}</AlertTitle>
                        </Alert>
                      </div>}
                    <Button disabled={pending} className='w-full' type="submit">Sign-in</Button>
                    <div className="flex items-center flex-col justify-center">

                      <p className="">or continue with</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button disabled={pending}
                        onClick={() => {
                          onSocial("google");
                        }} variant="outline" type="button" className="w-full">
                          <FaGoogle />
                        Google
                      </Button>
                      <Button disabled={pending} onClick={() => {
                       onSocial("github");
                      }} variant="outline" type="button" className="w-full">
                        <FaGithub/>
                        Github
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Don&apos;t have an account ?{" "}
                      <Link href='/sign-up' className='underline underlife-offset-4'>Sign up</Link>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center bg-radial from-green-600 to-green-800 gap-y-4 ">
            <img
              className="w-[92px] h-[92px] text-white"
              src="/logo.svg"
              alt=""
            />
            <p className="text-3xl font-semibold text-white">Meet.ai</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
