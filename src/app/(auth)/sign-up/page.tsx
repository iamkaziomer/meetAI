import { Card } from "@/components/ui/card"
import { SignUpView } from "@/modules/auth/ui/views/sign-up-view"
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async  ()=>{
    console.log("signup");
    const session = await auth.api.getSession({
            headers : await headers() // some endpoint might require headers
        })
    if(session){
            redirect("/")
        }
    return(
        <div>
            
            <SignUpView/>
        </div>
    )

}

export default Page