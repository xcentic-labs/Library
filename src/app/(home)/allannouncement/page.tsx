'use client';

import { useEffect, useState } from 'react';
import { FaBullhorn, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Define TypeScript interfaces
interface Announcement {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function Announcement() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/announcement');
            const data = await res.json();
            setAnnouncements(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching announcements:', error);
            setError('Failed to load announcements. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const getFormattedDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            return 'Date unavailable';
        }
    };

    // Define animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    return (
        <section className="mt-10 w-full px-4 sm:px-6 md:px-8 lg:px-16 py-12 bg-gradient-to-b from-white to-[#eae6d7] min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header section */}
                <div className="mb-8 md:mb-12 text-center sm:text-left">
                    <div className="inline-block bg-[#dad5be] p-2 rounded-lg mb-3">
                        <FaBullhorn className="text-[#fc7651]" size={28} />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c3f3a] mb-3">
                        Community Announcements
                    </h1>
                    <p className="text-[#32524D] max-w-2xl">
                        Stay updated with the latest news, events, and important information from our community.
                    </p>
                </div>

                {/* Loading state */}
                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-[#dad5be] mb-3"></div>
                            <div className="h-4 w-32 bg-[#dad5be] rounded"></div>
                        </div>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="text-center py-12">
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg inline-block">
                            <p className="text-red-700">{error}</p>
                            <button 
                                onClick={fetchAnnouncements}
                                className="mt-4 px-4 py-2 bg-[#1c3f3a] text-white rounded hover:bg-[#32524D] transition"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && !error && announcements.length === 0 && (
                    <div className="text-center py-12 bg-[#eae6d7] rounded-xl p-8 shadow-sm">
                        <div className="inline-block bg-[#dad5be] p-4 rounded-full mb-4">
                            <FaBullhorn className="text-[#1c3f3a] opacity-50" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-[#1c3f3a] mb-2">No Announcements Yet</h3>
                        <p className="text-[#32524D] max-w-md mx-auto">
                            There are currently no announcements to display. Please check back later for updates.
                        </p>
                    </div>
                )}

                {/* Announcements grid */}
                {!isLoading && !error && announcements.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {announcements.map((announcement: Announcement, index: number) => (
                            <motion.div
                                key={announcement.id}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                                className="bg-[#eae6d7] border-l-4 border-[#32524D] p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                                    transform hover:-translate-y-1 flex flex-col h-full"
                            >
                                {/* Card header */}
                                <div className="flex justify-end items-start mb-3">
                                    <div className="flex items-center text-[#32524D] text-xs sm:text-sm">
                                        <FaCalendarAlt size={12} className="mr-1" />
                                        <span>{getFormattedDate(announcement.createdAt)}</span>
                                    </div>
                                </div>
                                
                                {/* Card content */}
                                <h3 className="text-lg sm:text-xl font-bold text-[#1c3f3a] mb-2 sm:mb-3 break-words">
                                    {announcement.title}
                                </h3>
                                <p className="text-[#32524D] text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap flex-grow mb-4">
                                    {announcement.description}
                                </p>
                                
                                {/* Card footer */}
                                {/* <div className="mt-auto">
                                    <button className="flex items-center text-[#fc7651] font-medium hover:text-[#1c3f3a] transition-colors">
                                        Read more <FaChevronRight size={12} className="ml-1" />
                                    </button>
                                </div> */}
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Pagination - for future implementation */}
                {!isLoading && !error && announcements.length > 6 && (
                    <div className="mt-8 sm:mt-12 flex justify-center">
                        <nav className="inline-flex rounded-md shadow-sm">
                            <button className="px-2 sm:px-3 py-1 sm:py-2 rounded-l-md border border-r-0 border-[#dad5be] bg-white text-[#1c3f3a] hover:bg-[#eae6d7] text-sm">
                                Previous
                            </button>
                            <button className="px-2 sm:px-3 py-1 sm:py-2 border border-[#dad5be] bg-[#1c3f3a] text-white text-sm">
                                1
                            </button>
                            <button className="px-2 sm:px-3 py-1 sm:py-2 border border-[#dad5be] bg-white text-[#1c3f3a] hover:bg-[#eae6d7] text-sm">
                                2
                            </button>
                            <button className="px-2 sm:px-3 py-1 sm:py-2 rounded-r-md border border-l-0 border-[#dad5be] bg-white text-[#1c3f3a] hover:bg-[#eae6d7] text-sm">
                                Next
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </section>
    );
}