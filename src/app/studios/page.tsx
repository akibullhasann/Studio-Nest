import StudioCard from '@/components/Studios/StudioCard';
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

                    {/* sorting start from here for details page */}

                    <div className='bg-white '>
                        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-purple-100 bg-white p-2 shadow-sm">

                            {/* Search Bar */}
                            <div className="flex w-full flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 pl-1 transition-all focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100">

                                <FiSearch className="ml-3 text-xl text-gray-400" />

                                <Input
                                    type="search" placeholder="Search studios..." className="py-4 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-gray-400"
                                />

                                <Button
                                    className="py-4 px-2 rounded-lg bg-purple-600
                        text-white shadow-sm
                       transition-all hover:bg-purple-700"
                                >
                                    <FiSearch className="mr-2 text-lg" />
                                    Search
                                </Button>
                            </div>

                            {/* Category Filter */}
                            <div className="w-full sm:w-56">

                                <Select items={items}>
                                    <SelectTrigger
                                        className="h-[58px] w-full rounded-xl border border-purple-100 bg-purple-50/50 px-4 text-gray-700 shadow-nonehover:border-purple-300 focus:ring-2 focus:ring-purple-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FiSliders className="text-xl text-purple-600" />

                                            <SelectValue placeholder="All Categories" />
                                        </div>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Filter by Category</SelectLabel>

                                            {items.map((item) => (
                                                <SelectItem
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                            </div>

                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-x-10 gap-y-4 items-center w-full mt-2 mb-1 px-3'>
                            <div className="flex min-w-0 flex-wrap items-center gap-2">

                                <span className="flex items-center gap-2 text-sm text-gray-500 mr-2">
                                    <FiSliders />
                                    Category:
                                </span>

                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        variant="outline"
                                        className="rounded-full border-gray-200
                               hover:bg-orange-50 hover:text-orange-600
                               hover:border-orange-300"
                                    >
                                        {category}
                                    </Button>
                                ))}

                            </div>

                            {/* Price Filter */}
                            <div className="flex flex-nowrap items-center justify-end gap-2">

                                <span className="text-sm text-gray-500">
                                    Rate:
                                </span>

                                <Input
                                    type="number"
                                    placeholder="Min $"
                                    className="w-20 h-10"
                                />

                                <span className="text-gray-400">-</span>

                                <Input
                                    type="number"
                                    placeholder="Max $"
                                    className="w-20 h-10"
                                />

                                <Button className="bg-orange-500 hover:bg-orange-600">
                                    Apply
                                </Button>

                                <Button variant="ghost" size="icon">
                                    <FiRotateCcw className="text-gray-500" />
                                </Button>

                            </div>
                        </div>

                    </div>

                </div>






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

            </main >
        </div >
    );
};

export default AllStudiosPage;