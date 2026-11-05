export const instant = false;

import StudioExplorar from '@/components/Studios/StudioExplorar';
import { connection } from "next/server";
import { getStudioCollection } from '@/src/lib/mongo';

const AllStudiosPage = async () => {

    await connection();
    const collection = await getStudioCollection();
    const studios = await collection.find({}).toArray();

    return (

            <main className="min-h-screen bg-black px-6 py-16 md:px-12 lg:px-20">
                <div className="mx-auto max-w-7xl">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-amber-400">
                        EXPLORE STUDIOS
                    </span>
                    <h1 className="mt-4 text-3xl font-extrabold text-white md:text-5xl">
                        Find Your Perfect <span className="text-amber-400">Creative Space</span>
                    </h1>
                    <p className="mt-3 max-w-2xl text-gray-400">
                        Photo, film, podcast, music, dance and art studios, ready to book by the hour.
                    </p>

                    {/* sorting start from here for details page */}

                   <StudioExplorar studios={studios as never}></StudioExplorar>

                </div>

            </main >

    );
};

export default AllStudiosPage;
