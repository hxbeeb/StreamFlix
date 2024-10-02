import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Handle POST request to add favorite
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;

      // Check if movie exists
      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      // Update user with new favorite movie ID
      const updatedUser = await prismadb.user.update({
        where: { email: currentUser.email || '' },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(updatedUser);
    }

    // Handle DELETE request to remove favorite
    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req);  // Use serverAuth instead of useCurrentUser()
      const { movieId } = req.body;

      // Check if movie exists
      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
     

      // Remove movieId from the user's favoriteIds
      const updatedFavoriteIds = without(currentUser.favoriteIds || [], movieId);

      const updatedUser = await prismadb.user.update({
        where: { email: currentUser.email || '' },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser);
    }

    // If method is not POST or DELETE, return 405 Method Not Allowed
    return res.status(405).end();
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}
