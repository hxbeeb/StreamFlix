import React, { useEffect, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';  // Import from 'next/navigation' for App Router

interface PlayButtonProps {
    movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
    const router = useRouter();

    return (
        <button
            className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition"
            onClick={() => router.push(`/watch/${movieId}`)}  // Attach the onClick here
        >
            <BsFillPlayFill className="mr-1"size={25} />
            Play
        </button>
    );
};

export default PlayButton;
