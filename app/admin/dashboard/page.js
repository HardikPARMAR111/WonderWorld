import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default async function Dashboard(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/admin");
    }
    return(
        <>
        <Sidebar/>
        <main className="min-h-screen text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto my-12">
                <h1 className="text-3xl font-bold mt-6 mb-4">Welcome to Admin Panel</h1>
                <p>welcome, {session.user.name}</p>
                <div className="text-center text-white mt-4">
                    <h1 className="text-4xl font-bold">Latest Posts</h1>
                </div>
            </div>
        </main>
        </>
    )
}