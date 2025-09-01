'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Define TypeScript interfaces
interface NewsSource {
  id: string;
  name: string;
  url: string;
  icon: string;
  priority: number;
  description: string;
  category: string[];
  language: string[];
  country: string[];
  total_article: number;
  last_fetch: string;
}

interface SourcesResponse {
  status: string;
  totalResults: number;
  results: NewsSource[];
}

export default function News() {
    const [sources, setSources] = useState<NewsSource[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const API_KEY = "pub_fbcb75a3da6848d58fdb070786cde6c4"

    useEffect(() => {
        fetchSources();
    }, []);

    const fetchSources = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const url = `https://newsdata.io/api/1/sources?apikey=${API_KEY}&country=in&language=en`;
            
            const res = await fetch(url);
            const data: SourcesResponse = await res.json();
            
            if (data.status === 'success') {
                setSources(data.results);
                setError(null);
            } else {
                throw new Error('Failed to fetch news sources');
            }
        } catch (error) {
            console.error('Error fetching sources:', error);
            setError('Failed to load news sources. Please try again later.');
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
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Date unavailable';
        }
    };

    const truncateText = (text: string, maxLength: number): string => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const getCategoryColor = (category: string[]): string => {
        const colors: { [key: string]: string } = {
            'politics': 'bg-blue-100 text-blue-800',
            'business': 'bg-green-100 text-green-800',
            'technology': 'bg-purple-100 text-purple-800',
            'sports': 'bg-orange-100 text-orange-800',
            'entertainment': 'bg-pink-100 text-pink-800',
            'health': 'bg-red-100 text-red-800',
            'science': 'bg-indigo-100 text-indigo-800',
            'top': 'bg-yellow-100 text-yellow-800',
            'world': 'bg-cyan-100 text-cyan-800',
            'default': 'bg-gray-100 text-gray-800'
        };
        
        const mainCategory = category[0]?.toLowerCase() || 'general';
        return colors[mainCategory] || colors.default;
    };

    const handleSourceClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const formatArticleCount = (count: number): string => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}k`;
        }
        return count.toString();
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
        <section className="w-full h-full md:p-10 p-5 rounded-lg shadow-md overflow-y-scroll scrollbar">
            <h1 className="text-xl mb-6 text-gray-700 capitalize font-bold">
                Indian News Sources
            </h1>
            <div className="max-w-7xl mx-auto">

                {/* Loading state */}
                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-8 h-8 rounded-full animate-spin flex flex-col items-center border-2 border-l-0 border-[#32524D]">
                        </div>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="text-center py-12">
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg inline-block">
                            <p className="text-red-700">{error}</p>
                            <button 
                                onClick={() => fetchSources()}
                                className="mt-4 px-4 py-2 bg-[#1c3f3a] text-white rounded hover:bg-[#32524D] transition"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && !error && sources.length === 0 && (
                    <div className="text-center py-12 bg-[#eae6d7] rounded-xl p-8 shadow-sm">
                        <div className="inline-block bg-[#dad5be] p-4 rounded-full mb-4">
                            <svg className="w-8 h-8 text-[#1c3f3a] opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v-.5A1.5 1.5 0 0115 6v1z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-[#1c3f3a] mb-2">No News Sources Available</h3>
                        <p className="text-[#32524D] max-w-md mx-auto">
                            There are currently no news sources to display. Please check back later for updates.
                        </p>
                    </div>
                )}

                {/* Sources grid */}
                {!isLoading && !error && sources.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {sources.map((source: NewsSource, index: number) => (
                            <motion.div
                                key={source.id}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                                onClick={() => handleSourceClick(source.url)}
                                className="border-l-4 border border-[#32524D] p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 
                                    transform hover:-translate-y-1 flex flex-col h-full bg-white cursor-pointer group"
                            >
                                {/* Source logo and header */}
                                <div className="flex items-start mb-4">
                                    {source.icon && (
                                        <div className="flex-shrink-0 mr-4">
                                            <img 
                                                src={source.icon} 
                                                alt={`${source.name} logo`}
                                                className="w-12 h-12 object-cover rounded-lg border-2 border-gray-200 group-hover:border-[#fc7651] transition-colors"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/api/placeholder/48/48';
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="flex-grow">
                                        <h3 className="text-lg sm:text-xl font-bold text-[#1c3f3a] mb-2 group-hover:text-[#fc7651] transition-colors">
                                            {source.name}
                                        </h3>
                                        {/* Categories */}
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {source.category.slice(0, 3).map((cat, idx) => (
                                                <span 
                                                    key={idx}
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor([cat])}`}
                                                >
                                                    {cat}
                                                </span>
                                            ))}
                                            {source.category.length > 3 && (
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                    +{source.category.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Description */}
                                <p className="text-[#32524D] text-sm sm:text-base leading-relaxed break-words flex-grow mb-4">
                                    {truncateText(source.description, 120)}
                                </p>
                                
                                {/* Stats and info */}
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div className="text-center">
                                            <p className="text-lg font-bold text-[#1c3f3a]">
                                                {formatArticleCount(source.total_article)}
                                            </p>
                                            <p className="text-xs text-[#32524D]">Articles</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-bold text-[#1c3f3a]">
                                                #{source.priority.toString().slice(0, 3)}k
                                            </p>
                                            <p className="text-xs text-[#32524D]">Priority</p>
                                        </div>
                                    </div>
                                    
                                    {/* Last update and language */}
                                    <div className="flex justify-between items-center text-xs text-[#32524D]">
                                        <div className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                            <span>{getFormattedDate(source.last_fetch)}</span>
                                        </div>
                                        <span className="capitalize">{source.language[0]}</span>
                                    </div>
                                    
                                    {/* Visit button */}
                                    <div className="mt-3 flex justify-center">
                                        <div className="flex items-center text-[#fc7651] font-medium group-hover:text-[#1c3f3a] transition-colors text-sm">
                                            Visit Source 
                                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Refresh button */}
                {!isLoading && !error && sources.length > 0 && (
                    <div className="mt-8 sm:mt-12 flex justify-center">
                        <button 
                            onClick={() => fetchSources()}
                            className="px-6 py-3 rounded-lg bg-[#1c3f3a] text-white hover:bg-[#32524D] text-sm transition-colors flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh Sources
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}