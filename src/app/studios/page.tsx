import StudioCard from '@/components/Studios/StudioCard';
import React from 'react';



const AllStudiosPage = async () => {

    const res = await fetch('http://localhost:5000/studio-details');
    const studios = await res.json();

    console.log(studios);

    return (
        <div>
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

                    {studios.length > 0 ? (
                        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {studios.map((studio) => (
                                <StudioCard key={studio._id} studio={studio} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-16 rounded-2xl border border-dashed border-white/20 py-20 text-center">
                            <p className="text-xl font-semibold text-white">No studios found</p>
                            <p className="mt-2 text-gray-400">
                                Please check back later or make sure your API is running.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AllStudiosPage;