'use client';

import { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';

export default function AddAnnouncement() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await fetch('/api/announcement');
            const data = await res.json();
            setAnnouncements(data);
        } catch (error) {
            console.error('Failed to fetch announcements:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/announcement', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });

            if (res.ok) {
                setTitle('');
                setDescription('');
                fetchAnnouncements();
            }
        } catch (error) {
            console.error('Error adding announcement:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/announcement/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) fetchAnnouncements();
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    return (
        <section className="w-full h-full md:p-10 p-5 rounded-lg shadow-md overflow-y-scroll scrollbar">
            <h1 className="text-xl mb-6 text-gray-700 capitalize font-bold">
                Dashboard / Announcement
            </h1>

            {/* Form */}
            <div className="w-full h-fit bg-white p-4 rounded-lg mb-10">
                <h2 className="text-xl mb-4 font-semibold text-[#32524D] capitalize flex items-center gap-2">
                    <AiOutlinePlus className="text-[#32524D]" /> Add Announcement
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="title" className="mb-2 text-sm font-medium text-gray-600">
                            Announcement Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
                            placeholder="e.g., Holiday Notice"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-600">
                            Announcement Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-3 h-28 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
                            placeholder="e.g., College will remain closed on..."
                            required
                        />
                    </div>

                    <div className="col-span-full flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2 mt-4 text-white bg-[#32524D] rounded-lg shadow-md hover:bg-[#2a423e] focus:outline-none focus:ring-2 focus:ring-[#32524D] focus:ring-offset-2"
                        >
                            <AiOutlinePlus />
                            {loading ? 'Adding...' : 'Add Announcement'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Announcement Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {announcements.map((a: any) => (
                    <div
                    key={a.id}
                    className="bg-white shadow-md rounded-lg p-5 relative"
                  >
                    <h3 className="text-lg font-semibold text-[#32524D] break-words">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-gray-600 whitespace-pre-wrap break-words">
                      {a.description}
                    </p>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="absolute top-3 right-3 text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                  
                ))}
            </div>
        </section>
    );
}
