'use client';
import React, { useState } from 'react';
import filmStudio from "@/public/assests/film-studio.jpg";
import photoStudio from "@/public/assests/photogrphy-studio.jpg"
import podcast from "../../public/assests/podcast.jpg"
import Image from 'next/image';
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";




const slides = [
    {
        image: filmStudio,
        badge: "CINEMATIC SOUNDSTAGES",
        title: "Shoot Your Next Scene on Sets Built for",
        highlight: "Blockbuster Stories",
        desc: "Pre-rigged cyclorama stages, pro lighting grids, and 6K cinema cameras ready the moment you walk in.",
        btn1: "Book a Film Stage →",
        btn2: "View Equipment",
    },
    {
        image: photoStudio,
        badge: "PRO PHOTOGRAPHY STUDIOS",
        title: "Capture Every Frame in Studios Designed for",
        highlight: "Flawless Shoots",
        desc: "Seamless backdrops, strobe setups, and natural-light rooms for fashion, product, and portrait work.",
        btn1: "Reserve a Shoot Space →",
        btn2: "See Backdrops",
    },
    {
        image: podcast,
        badge: "4K PODCAST LOUNGES",
        title: "Record Conversations in Rooms Made for",
        highlight: "Bold Storytellers",
        desc: "Multi-cam 4K setups, broadcast-grade mics, and soundproof lounges so every episode sounds as good as it looks.",
        btn1: "Book a Podcast Room →",
        btn2: "Hear the Quality",
    },
];

const HeroSection = () => {


    const [current, setCurrent] = useState<number>(0);

    const next = () => {
        setCurrent((pre) => (pre + 1) % slides.length);
    }
    const prev = () => {
        setCurrent((pre) => (pre - 1 + slides.length) % slides.length)
    }

    return (

        <section className='relative h-[520px] w-full overflow-hidden bg-black sm:h-[560px] md:h-[600px] lg:h-[680px]'>
            {slides.map((slide, index) => (
                <div key={index}
                    className={`absolute inset-0 duration-700 transition-opacity ${index === current ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                >
                    <Image src={slide.image} alt={slide.badge} className='h-full w-full object-cover'></Image>
                    <div className='bg-black/70 absolute inset-0'></div>


                    {/* text */}

                    <div className='absolute inset-0 flex flex-col justify-center sm:px-12 md:px-20 lg:px-24 w-[90%] mx-auto'>

                        <span className='mb-3 bg-white/10 w-fit border border-white/20 px-3 py-1 font-semibold  text-amber-400 text-[10px] sm:text-xs'>{slide.badge}</span>

                        <h1 className="max-w-xl text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">{slide.title} <span className="text-amber-400">{slide.highlight}</span></h1>

                        <p className="mt-3 max-w-lg text-sm text-gray-300 sm:mt-4 sm:text-base">{slide.desc}</p>


                        <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row">
                            <button className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber-400 sm:text-base">
                                {slide.btn1}
                            </button>
                            <button className="rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 sm:text-base">
                                {slide.btn2}
                            </button>
                        </div>

                    </div>

                </div>
            ))}

            <button onClick={prev}
                className='absolute  text-white top-1/2 left-2 -translate-y-1/2 bg-white/40 px-3 py-2 rounded-full hover:bg-black md:left-4'
            >
                <GrFormPrevious />
            </button>



            <button onClick={next}
                className='absolute  text-white top-1/2 right-2 -translate-y-1/2 bg-white/40 px-3 py-2 rounded-full hover:bg-black md:right-4'
            >
                <MdOutlineNavigateNext />
            </button>


            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-amber-500" : "w-1.5 bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;