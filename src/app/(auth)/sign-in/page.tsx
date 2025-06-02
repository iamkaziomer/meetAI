import { Card } from "@/components/ui/card"
import { SignInView } from "@/modules/auth/ui/views/sign-in-view"
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
const Page = async ()=>{
    
    const session = await auth.api.getSession({
        headers : await headers() // some endpoint might require headers
    })

    if(session){
        redirect("/")
    }
return(
    <div>
        
        <SignInView/>
    </div>
)
}

export default Page