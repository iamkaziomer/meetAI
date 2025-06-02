'use client'
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const HomeView = () => {
    const [pending, setPending] = useState(false);
    const router = useRouter();
    
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()


    const signOut = ()=>{
        setPending(true);
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in"); // redirect to login page
                    setPending(false);
                },
                onError: (error) => {
                    console.error("Sign out error:", error);
                    setPending(false);
                },
            },
        });
    }
    if (session) {
        return (
            <div>
                <h1>Logged in as {session.user.name}</h1>
                <Button disabled={!!pending} onClick={()=>{signOut()}}>Signout</Button>
            </div>
        )
    }
}
