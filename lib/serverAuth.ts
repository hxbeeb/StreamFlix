import { NextApiRequest } from 'next';
import prismadb from '@/lib/prismadb';
import { getSession } from 'next-auth/react'; // Import getToken

export default async function serverAuth(req: NextApiRequest) {
    const session = await getSession({ req });

    if (!session || !session.user) {
        throw new Error('Not authenticated');
    }

    const currentUser = await prismadb.user.findUnique({
        where: { email: session?.user?.email || '' },
        select: {
            email: true,
            name: true,
            favoriteIds: true,
        },
    });

    if (!currentUser) {
        throw new Error('User not found');
    }

    return { currentUser };
}
