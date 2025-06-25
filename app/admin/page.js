
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminLogin from "./login/page";

export default async function AdminPanel(){
    const session = await getServerSession(authOptions);
    return(
        <AdminLogin/>
    )
    
}