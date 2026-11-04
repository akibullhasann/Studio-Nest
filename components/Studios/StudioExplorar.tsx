"use client";
import { useState } from "react";
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

    { label: "Low", value: "low" },
    { label: "High", value: "high" },
    { label: "Rating", value: "rating" },
    { label: "Newest", value: "newest" },

]


const StudioExplorar = ({ studios }) => {

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("newest");

    const [minInput, setMinInput] = useState("");
    const [maxInput, setMaxInput] = useState("");

    const [range, setRange] = useState({ min: "", max: "" });

    let result = studios.filter((s) => {
        const matchSearch = `${s.title} ${s.address} ${s.category}`.toLowerCase().includes(search.toLowerCase());

        const matchCategory = category === "All" || s.category === category;

        const matchMin = range.min === "" || s.hourlyRate >= Number(range.min);

        const matchMax = range.max === "" || s.hourlyRate <= Number(range.max);

        return matchSearch && matchCategory && matchMin && matchMax;
    })

    result = [...result];

    if (sort === 'low') result.sort((a, b) => a.hourlyRate - b.hourlyRate);
    if (sort === "high") result.sort((a, b) => b.hourlyRate - a.hourlyRate);
    if (sort === "rating") result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (sort === "newest") result.reverse();

    const reset = () => {
        setSearch("");
        setCategory("All");
        setSort("newest");
        setMinInput("");
        setMaxInput("");
        setRange({ min: "", max: "" });
    };

    return (
        <div>
            <div className='bg-white '>
                <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-purple-100 bg-white p-2 shadow-sm">

                    {/* Search Bar */}
                    <div className="flex w-full flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 pl-1 transition-all focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100">

                        <FiSearch className="ml-3 text-xl text-gray-400" />

                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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

                        <Select items={items}
                            value={sort} onValueChange={(v) => setSort(v ?? "newest")}>
                            <SelectTrigger
                                className="h-[58px] w-full rounded-xl border border-purple-100 bg-purple-50/50 px-4 text-gray-700 shadow-none hover:border-purple-300 focus:ring-2 focus:ring-purple-100"
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

                        {["All", ...categories].map((c) => (
                            <Button
                                key={c}
                                variant="outline"
                                onClick={() => setCategory(c)}
                                className={`rounded-full ${category === c
                                    ? "border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
                                    : "border-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
                                    }`}
                            >
                                {c}
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
                            value={minInput}
                            onChange={(e) => setMinInput(e.target.value)}
                            placeholder="Min $"
                            className="w-20 h-10"
                        />

                        <span className="text-gray-400">-</span>

                        <Input
                             type="number"
                             value={maxInput}
                             onChange={(e) => setMaxInput(e.target.value)}
                             placeholder="Max $"
                             className="w-20 h-10"
                        />

                        <Button 
                        onClick={() => setRange({ min: minInput, max: maxInput })}
                        className="bg-orange-500 hover:bg-orange-600">
                            Apply
                        </Button>

                        <Button variant="ghost" size="icon" onClick={reset}>
                            <FiRotateCcw className="text-gray-500" />
                        </Button>

                    </div>
                </div>

            </div>



            {result.length > 0 ? (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {result.map((studio) => (
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
    )
}

export default StudioExplorar;