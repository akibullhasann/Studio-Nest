import StudioCard from '@/components/Studios/StudioCard';
import StudioExplorar from '@/components/Studios/StudioExplorar';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/src/lib/category';
import { } from '@base-ui/react';
import React from 'react';
import { FiRotateCcw, FiSearch, FiSliders } from "react-icons/fi";



const items = [
    { label: "Sort", value: null },
    { label: "Low", value: "low" },
    { label: "High", value: "high" },
    { label: "Rating", value: "rating" },
    { label: "Newest", value: "newest" },

]


const AllStudiosPage = async () => {

    const res = await fetch('http://localhost:5000/studio-details');
    const studios = await res.json();

    console.log(studios);




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

                   <StudioExplorar studios={studios}></StudioExplorar>

                </div>






               

            </main >
        
    );
};

export default AllStudiosPage;