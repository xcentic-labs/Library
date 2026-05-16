'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Update {
  id: number;
  title: string | null;
  imagePath: string;
  createdAt: string;
}

export default function Updates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const response = await fetch('/api/updates');
      const data = await response.json();
      if (data.success && data.data) {
        setUpdates(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch updates:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || updates.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % updates.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [autoPlay, updates.length]);

  const nextSlide = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % updates.length);
  };

  const prevSlide = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + updates.length) % updates.length);
  };

  const goToSlide = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="w-full py-20 bg-gray-100">
        <div className="flex justify-center items-center">
          <div className="animate-pulse text-gray-500">Loading updates...</div>
        </div>
      </div>
    );
  }

  if (!updates || updates.length === 0) {
    return (
      <div className="w-full py-20 bg-gray-100">
        <div className="flex justify-center items-center">
          <p className="text-gray-500">No updates available</p>
        </div>
      </div>
    );
  }

  const currentUpdate = updates[currentIndex];

  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Latest Updates
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Stay informed with our latest news and announcements
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative group">
          {/* Main Slide */}
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg bg-gray-900 ">
            <div className="relative w-full aspect-video sm:aspect-video md:aspect-[16/9]">
              <Image
                src={currentUpdate.imagePath}
                alt={currentUpdate.title || 'Update'}
                fill
                className="object-cover w-full h-full"
                priority
              />
              
              {/* Overlay with Title */}
              {currentUpdate.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 sm:p-6 w-full">
                    <h3 className="text-white text-lg sm:text-2xl font-bold">
                      {currentUpdate.title}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-10 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-2 z-10 bg-white/80 hover:bg-white text-gray-900 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Previous slide"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-10 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-2 z-10 bg-white/80 hover:bg-white text-gray-900 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Next slide"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
