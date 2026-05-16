'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface Update {
  id: number;
  title: string | null;
  imagePath: string;
  createdAt: string;
}

export default function UpdatesManagement() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

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
      toast.error('Failed to load updates');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this update?')) {
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch(`/api/updates?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete update');
      }

      toast.success('Update deleted successfully');
      setUpdates(updates.filter((u) => u.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete update';
      toast.error(message);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading updates...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Updates</h1>
            <p className="text-gray-600 mt-2">View and manage all updates</p>
          </div>
          <Link
            href="/addupdates"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Add New Update
          </Link>
        </div>

        {/* Updates Grid */}
        {updates.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">No updates found</p>
            <Link
              href="/addupdates"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Create the first update →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updates.map((update) => (
              <div
                key={update.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-200">
                  <Image
                    src={update.imagePath}
                    alt={update.title || 'Update'}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {update.title && (
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {update.title}
                    </h3>
                  )}

                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(update.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>

                  {/* Actions */}
                  <button
                    onClick={() => handleDelete(update.id)}
                    disabled={deleting === update.id}
                    className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    {deleting === update.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {updates.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Total Updates</p>
                <p className="text-3xl font-bold text-gray-900">{updates.length}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Latest Update</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(updates[0].createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
