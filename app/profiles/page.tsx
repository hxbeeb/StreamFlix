"use client";
import userCurrentUser from "@/hooks/useCurrentUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const Profiles = () => {




    const { data: user, error, isLoading } = userCurrentUser();
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push('/auth');
        }
    }, [session, status]);

    if (status === "loading" || isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error('Error fetching user:', error);
        return <p>Error loading user data</p>;
    }

    if (!user) {
        return <p>No user data available</p>;
    }
    return (
        <div className="flex items-center h-full justify-center">
    <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
            <div onClick={() => router.push("/")}>
                <div className="group flex-row w-44 mx-auto">
                    <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                        <img src="/images/profile.png" alt={`${user?.name}'s profile`} className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                        {user?.name}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    );
}

export default Profiles;