"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  createdAt: string;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imagesText, setImagesText] = useState("");

  const submitLabel = useMemo(() => (editingId ? "Update Course" : "Add Course"), [editingId]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const normalizeImages = (value: string): string[] =>
    value
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setPrice("");
    setImagesText("");
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/course", { cache: "no-store" });
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsedPrice = Number(price);
    if (!title || !description || Number.isNaN(parsedPrice) || parsedPrice < 0) {
      toast.error("Title, description and valid price are required");
      return;
    }

    const payload = {
      title,
      description,
      price: parsedPrice,
      images: normalizeImages(imagesText),
    };

    try {
      setSaving(true);
      const endpoint = editingId ? `/api/course/${editingId}` : "/api/course";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error || "Unable to save course");
        return;
      }

      toast.success(editingId ? "Course updated" : "Course added");
      resetForm();
      fetchCourses();
    } catch (error) {
      console.error(error);
      toast.error("Unable to save course");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setTitle(course.title);
    setDescription(course.description);
    setPrice(String(course.price));
    setImagesText((course.images || []).join("\n"));
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/course/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error || "Unable to delete course");
        return;
      }

      toast.success("Course deleted");
      if (editingId === id) {
        resetForm();
      }
      fetchCourses();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete course");
    }
  };

  return (
    <section className="w-full h-full md:p-10 p-5 rounded-lg shadow-md overflow-y-scroll scrollbar">
      <h1 className="text-xl mb-6 text-gray-700 capitalize font-bold">Dashboard / Courses</h1>

      <div className="w-full h-fit bg-white p-4 rounded-lg mb-10">
        <h2 className="text-xl mb-4 font-semibold text-[#32524D] capitalize flex items-center gap-2">
          <AiOutlinePlus className="text-[#32524D]" /> {submitLabel}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-2 text-sm font-medium text-gray-600">
              Course Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
              placeholder="e.g., Full Stack Development"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="mb-2 text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
              placeholder="e.g., 1499"
              required
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 h-28 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
              placeholder="Short course description"
              required
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="images" className="mb-2 text-sm font-medium text-gray-600">
              Image URLs (comma or new line separated)
            </label>
            <textarea
              id="images"
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
              className="p-3 h-24 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
              placeholder="https://example.com/course-1.jpg"
            />
          </div>

          <div className="col-span-full flex items-center justify-end gap-2">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 mt-2 text-[#32524D] bg-white border border-[#32524D] rounded-lg shadow-sm hover:bg-slate-50"
              >
                Cancel Edit
              </button>
            )}
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 mt-2 text-white bg-[#32524D] rounded-lg shadow-md hover:bg-[#2a423e]"
            >
              <AiOutlinePlus />
              {saving ? "Saving..." : submitLabel}
            </button>
          </div>
        </form>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-600">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">No courses found.</div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="bg-white shadow-md rounded-lg p-5 relative border border-gray-100">
              {Array.isArray(course.images) && course.images.length > 0 && (
                <img
                  src={course.images[0]}
                  alt={course.title}
                  className="w-full h-36 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="text-lg font-semibold text-[#32524D] break-words">{course.title}</h3>
              <p className="mt-2 text-gray-600 whitespace-pre-wrap break-words line-clamp-3">{course.description}</p>
              <p className="mt-2 font-semibold text-[#1c3f3a]">Rs. {course.price}</p>

              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <AiOutlineEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
