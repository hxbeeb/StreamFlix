"use client";
import NavBar from "./components/NavBar";
import useCurrentUser from "@/hooks/useCurrentUser"; // Fixed typo
import { useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Billboard from "./components/Billboard";

export default function Home() {
    const { data: user, error, isLoading } = useCurrentUser(); 
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push('/auth');
        }
    }, [session, status, router]); 

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
        <>
           <NavBar/>
           <Billboard/>
        </>
    );
}
