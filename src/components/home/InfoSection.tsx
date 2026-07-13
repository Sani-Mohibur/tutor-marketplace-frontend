"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const logos = [
    { src: "/logos/texas.svg", alt: "Texas" },
    { src: "/logos/chicago.svg", alt: "Chicago" },
    { src: "/logos/michigan.svg", alt: "Michigan" },
    { src: "/logos/emory.svg", alt: "Emory" },
    { src: "/logos/northwestern.svg", alt: "Northwestern" },
    { src: "/logos/pennstate.svg", alt: "Penn State" },
];

export default function InfoSection() {
    return (
        <section className="w-full py-20 px-4">
            <div className="max-w-7xl mx-auto min-h-[220px] flex items-center justify-center transition-all duration-500">

                <div className="w-full text-center animate-in fade-in duration-500">

                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                        Tutors from Top Universities
                    </h2>

                    <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                        Experienced tutors with strong academic backgrounds
                        from leading universities around the world.
                    </p>

                    <div className="mt-12 flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                        {logos.map((logo) => (
                            <div
                                key={logo.alt}
                                className="transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={140}
                                    height={48}
                                    className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}