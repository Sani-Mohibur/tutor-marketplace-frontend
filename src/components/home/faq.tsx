"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqData = [
    { q: "What is online tutoring?", a: "Online tutoring is a virtual tutoring service that allows students to connect with expert tutors from anywhere in the world. SkillBridge is an online tutoring platform that offers a wide range of subjects and study materials to help students achieve their academic goals." },
    { q: "How does online tutoring work?", a: "SkillBridge allows students to search for tutors based on subject, language, price, and availability, and then book sessions directly with the tutor of their choice. The platform uses advanced technology for video chat and digital whiteboard tools." },
    { q: "How much does online tutoring cost?", a: "Setting up your student account is free. The cost of online tutoring varies depending on the tutor and the subject being taught. SkillBridge's online tutoring services are competitively priced, and students can compare rates and book sessions that fit their budget." },
    { q: "What subjects are available for online tutoring?", a: "SkillBridge offers online tutoring in a wide range of subjects, including math, science, languages, test prep, and more. Students can search for tutors based on subject and language to find the best fit for their needs." },
    { q: "How quickly can I expect a response from my online tutor?", a: "Our online tutors typically respond within a few hours, but response time may vary depending on their availability and timezone. To ensure a fast reply, we recommend sending messages to at least 3-5 tutors at a time and checking the timezone of the tutor you're messaging." },
    { q: "How do I schedule an online tutoring session?", a: "To schedule an online tutoring session with a SkillBridge tutor, simply search for a tutor in the subject area you need help with, and then click on the tutor's profile to view their details. You can then message the tutor and once you find a time that works for you, you can book the session and pay for it online." },
    { q: "Can you help me find a tutor?", a: "Absolutely! Just fill out our Request a Tutor form and our customer success team will help match you with an online tutor that meets your budget and learning style." },
    { q: "What if I need to cancel an online tutoring session?", a: "If you need to cancel an online tutoring session, you can do so up to 24 hours before the scheduled session time. If you cancel within 24 hours of the scheduled session time, you may be charged for the session." },
    { q: "How do I pay for an online tutoring session on SkillBridge?", a: "Students can conveniently pay for online tutoring lessons using credit cards or gift cards. Payments are held 24 hours before a session occurs and are processed 48 hours after the conclusion of a scheduled session." },
    { q: "Can I get a refund if I am not satisfied with my online tutoring session?", a: "Yes, SkillBridge offers a satisfaction guarantee for online tutoring sessions. If you are not satisfied with your session, you can request a refund within 24 hours of the session." },
    { q: "Is online tutoring available 24/7?", a: "Yes, online tutoring on SkillBridge is available 24/7, but tutor availability may vary depending on the time zone and location of the tutor." },
    { q: "What are the system requirements for learning with SkillBridge?", a: "You'll need an up-to-date Google Chrome or Firefox browser, a computer with a webcam, headphones with a microphone, and a good broadband connection. Currently, our digital classroom does not work on mobile devices or tablets." }
];

export default function FAQ() {
    const [openIndices, setOpenIndices] = useState<number[]>([]);

    const toggleIndex = (index: number) => {
        setOpenIndices((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <section className="select-none w-full py-20 bg-background border-y border-border/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center md:text-left mb-12">
                    <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-3 text-sm font-medium text-muted-foreground max-w-xl leading-relaxed mx-auto md:mx-0">
                        Everything you need to know about the product and billing. Can't find the answer you're looking for? Please chat to our friendly team.
                    </p>
                </div>

                {/* Layout starts from left, no card background */}
                <div className="flex flex-col">
                    {faqData.map((item, index) => (
                        <div key={index} className="border-b border-border">
                            <button
                                onClick={() => toggleIndex(index)}
                                className="w-full flex justify-between items-center py-6 text-left hover:text-primary transition-colors"
                            >
                                <span className="font-bold text-foreground text-lg">{item.q}</span>
                                {openIndices.includes(index) ? (
                                    <Minus className="cursor-pointer w-5 h-5 text-primary flex-shrink-0 ml-4" />
                                ) : (
                                    <Plus className="cursor-pointer w-5 h-5 text-primary flex-shrink-0 ml-4" />
                                )}
                            </button>

                            {openIndices.includes(index) && (
                                <div className="pb-6 text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="relative mt-16 overflow-hidden rounded-2xl border border-border bg-emerald-50 dark:bg-slate-950 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4">
                    {/* Diagonal Line Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.05]"
                        style={{
                            backgroundImage: "repeating-linear-gradient(45deg, #10b981 0, #10b981 1px, transparent 0, transparent 50px)",
                            backgroundSize: "70px 70px"
                        }}
                    />
                    <div
                        className="absolute inset-0 opacity-0 dark:opacity-[0.05]"
                        style={{
                            backgroundImage: "repeating-linear-gradient(45deg, #3b82f6 0, #3b82f6 1px, transparent 0, transparent 50px)",
                            backgroundSize: "70px 70px"
                        }}
                    />

                    <h3 className="relative z-10 text-xl sm:text-2xl font-black tracking-tight text-emerald-950 dark:text-white">
                        Still have a question?
                    </h3>
                    <p className="relative z-10 text-md font-medium text-slate-800 dark:text-slate-400 max-w-md leading-relaxed">
                        Can't find the answer you're looking for? Please contact our friendly team and we'll get back to you shortly.
                    </p>
                    <Link
                        href="/contact"
                        className="px-10 py-3 text-lg font-bold tracking-[0.07em] text-slate-900 dark:text-white border border-slate-900/20 dark:border-white/20 hover:border-emerald-600 dark:hover:border-blue-400 transition-all duration-500 hover:scale-[1.02] active:scale-95 cursor-pointer backdrop-blur-sm"
                    >
                        Contact Us
                        <span className="group-hover:translate-x-1 transition-transform duration-300"> →</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}