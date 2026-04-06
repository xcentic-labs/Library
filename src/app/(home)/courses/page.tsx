"use client";

import { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  createdAt: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/course", { cache: "no-store" });

        if (!res.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load courses right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="w-full min-h-screen pt-[12vh] pb-10 px-4 md:px-10 bg-[#f7f6f1]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1c3f3a] mb-3">Courses</h1>
        <p className="text-[#32524D] mb-8">Explore all available courses.</p>

        {loading && (
          <div className="w-full py-12 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#32524D] border-l-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
            {error}
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="bg-white border border-[#d8d4c2] rounded-lg p-6 text-[#32524D]">
            No courses found.
          </div>
        )}

        {!loading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <article
                key={course.id}
                className="bg-white rounded-2xl border border-[#d8d4c2] shadow-sm p-5 flex flex-col"
              >
                {Array.isArray(course.images) && course.images.length > 0 && (
                  <img
                    src={course.images[0]}
                    alt={course.title}
                    className="w-full h-44 object-cover rounded-xl mb-4"
                  />
                )}
                <h2 className="text-xl font-bold text-[#1c3f3a] mb-2">{course.title}</h2>
                <p className="text-[#32524D] mb-4 flex-grow">{course.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#1c3f3a] font-semibold">Rs. {course.price}</span>
                  <span className="text-xs text-[#32524D]">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
