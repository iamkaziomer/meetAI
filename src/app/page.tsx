'use client'
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {


  const { 
    data: session, 
    isPending, //loading state
    error, //error object
    refetch //refetch the session
} = authClient.useSession() 


  const onSubmit=()=>{
    authClient.signUp.email({
      email,
      name,
      password
    },
    {
      onError:()=>{
        window.alert("something went wrong")
      },
      onSuccess:()=>{
        window.alert("success")
      }
    }
    )
  }
  const onLogin=()=>{
    authClient.signIn.email({
      email,
      password
    },
    {
      onError:()=>{
        window.alert("something went wrong")
      },
      onSuccess:()=>{
        window.alert("success")
      }
    }
    )
  }
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


if(session){
  return(
    <div>
      <h1>Logged in as {session.user.name}</h1>
      <Button onClick={()=>authClient.signOut()}>Signout</Button>
    </div>
  )
}
  return (
    <div>

  <div className='flex flex-col gap-y-5 p-4'>
    <Input placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
    <Input placeholder="email"value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <Input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

    <Button onClick={()=>onSubmit()}>Create user</Button>
    <p >login existing account</p>
  </div>
  <div className='flex flex-col gap-y-3 p-4'>
    <Input placeholder="email"value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <Input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

    <Button onClick={()=>onLogin()}>Login user</Button>
  </div>
    </div>
    
  );
}
