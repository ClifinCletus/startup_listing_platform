
import { auth } from "@/auth";
import { StartupCardSkeleton } from "@/components/StartupCard";
import UserStartups from "@/components/UserStartups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const Page = async ({params}:{params: Promise<{id:string}>}) => {
    const id = (await params).id

     //parallel fetching
    const [session,user] = await Promise.all([
     await auth(),
     client.fetch(AUTHOR_BY_ID_QUERY,{id}) //get author by their id, not github's id
    ])
    
    if(!user) return notFound()

    return (
        <>
        <section className="profile_container">
            <div className="profile_card">
                <div className="profile_title">
                    <h3 className="text-24-black uppercase text-center line-clamp-1"> {/* line-clamp-1 the heading hence not goes into multiple lines */}
                        {user.name}
                    </h3>
                </div>
                <Image src={user.image} alt={user.name} width={220} height={220} className="profile_image"/>

                <p className="text-30-extrabold mt-7 text-center">
                    @{user?.username}
                </p>
                <p className="mt-1 text-center test-14-normal">
                    {user?.bio}
                </p>

               
            </div>
             <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
                    <p className="text-30-bold">
                        {/*if you are author, shows your startups, else all startups */}
                        {session?.id === id ? "Your":"All"} Startups
                    </p>

                    {/*here is doing ppr, here this is dynamic */}
                    <ul className="card_grid-sm">
                        <Suspense fallback={<StartupCardSkeleton/>}>
                             <UserStartups id={id}/>
                        </Suspense>   
                    </ul>
                </div>
        </section>
        </>
    )
}

export default Page