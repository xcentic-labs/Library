'use client';

import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';

export default function AddUpdates() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleBoxClick = () => {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please select an image');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);

      const response = await fetch('/api/updates', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create update');
      }

      toast.success('Update created successfully');
      setFile(null);
      setFileName('');
      setTitle('');

      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create update';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-full md:p-10 p-5 rounded-lg shadow-md overflow-y-scroll scrollbar">
      <h1 className="text-xl mb-6 text-gray-700 capitalize font-bold">
        Dashboard / Add Update
      </h1>

      {/* Form */}
      <div className="w-full h-fit bg-white p-4 rounded-lg mb-10">
        <h2 className="text-xl mb-4 font-semibold text-[#32524D] capitalize flex items-center gap-2">
          <AiOutlinePlus className="text-[#32524D]" /> Add Update
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="flex flex-col mb-4">
            <label htmlFor="title" className="mb-2 text-sm font-medium text-gray-600">
              Title (Optional)
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
              placeholder="e.g., Library Announcement"
            />
          </div>

          {/* File Input */}
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-sm font-medium text-gray-600">
              Upload Image *
            </label>
            <div
              onClick={handleBoxClick}
              className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#32524D] transition cursor-pointer flex items-center justify-center bg-gray-50 hover:bg-gray-100"
            >
              <div className="text-center">
                <p className="text-gray-600 font-medium">
                  {fileName || 'Click anywhere on box to choose file'}
                </p>
              </div>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 justify-end">
            <button
              type="submit"
              disabled={loading || !file}
              className="px-6 py-2 bg-[#32524D] text-white rounded-lg font-medium hover:bg-[#1f3633] disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Uploading...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
