import { authClient } from "@/lib/auth-client";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {redirect} from "next/navigation";
const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers() // some endpoint might require headers
})
  if(!session){
    redirect("/sign-in")
  }
  return ( 
    <HomeView/>
   );
}
 
export default Page;