import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import useCurrentUser from "@/hooks/useCurrentUser";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
    if (req.method !== 'GET') {
        return res.status(405).end();
    } try {
        const { data:currentUser } = await useCurrentUser();

        const favoriteIds = currentUser?.favoriteIds || [];

        

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: favoriteIds || [],
                }
            }
        });

        return res.status(200).json(favoriteMovies);
    } catch (error) {
        console.log('Error:', error);
        return res.status(400).end();
    }
} 

