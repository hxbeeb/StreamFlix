"use client";
import NavBar from "./components/NavBar";
import useCurrentUser from "@/hooks/useCurrentUser"; // Fixed typo
import { useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Billboard from "./components/Billboard";
import MovieList from "./components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "./components/infoModel";
import useInfoModal from "@/hooks/useInfoModel";

export default function Home() {
    const { data: user, error, isLoading } = useCurrentUser();
    const { data: session, status } = useSession();
    const router = useRouter();
    const { data: movies=[] } = useMovieList();
    const { data: favorites=[] } = useFavorites();
    const { isOpen, closeModal } = useInfoModal();
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
           <InfoModal visible={isOpen} onClose={closeModal} />
           <NavBar/>
           <Billboard/>
           <div className="pb-40">
            <MovieList title="Trending Now" data={movies} />
            <MovieList title="My List" data={favorites} />
           </div>
        </>
    );
}
