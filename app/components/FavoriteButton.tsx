import axios from 'axios';
import React, { useCallback, useMemo, useState } from 'react';
import useFavorites from '@/hooks/useFavorites';
import useCurrentUser from '@/hooks/useCurrentUser';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        try {
            setLoading(true); // Set loading to true while request is in progress
            setError(null); // Clear previous error if any

            let response;

            if (isFavorite) {
                response = await axios.delete('/api/favorite', { data: { movieId } });
            } else {
                console.log(movieId);
                response = await axios.post('/api/favorite', { movieId });
            }

            const updatedFavoriteIds = response?.data?.favoriteIds;

            mutate({
                ...currentUser,
                favoriteIds: updatedFavoriteIds,
            });
            mutateFavorites();
        } catch (err) {
            console.error("Error updating favorites:", err);
          // Set error message
        } finally {
            setLoading(false); // End loading state
        }
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <div
                onClick={!loading ? toggleFavorites : undefined}
                className={`cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <Icon className="text-white" size={30} />
            </div>
        </div>
    );
};

export default FavoriteButton;
