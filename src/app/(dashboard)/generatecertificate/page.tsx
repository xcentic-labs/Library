'use client';

import { useRef, useState, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineDownload } from 'react-icons/ai';
import { toast } from 'react-toastify';

export default function GenerateCertificate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    courseName: '',
    hours: '',
    minutes: '',
    centerName: '',
  });
  const [selectedTemplate] = useState('template1');
  const [loading, setLoading] = useState(false);
  const [templateImage, setTemplateImage] = useState<HTMLImageElement | null>(null);

  // Load the template image
  useEffect(() => {
    const img = new Image();
    img.src = '/certificatetemp1.png';
    img.onload = () => {
      setTemplateImage(img);
    };
  }, []);

  // Draw certificate whenever form data or image changes
  useEffect(() => {
    if (templateImage && canvasRef.current) {
      drawCertificate();
    }
  }, [templateImage, formData]);

  const drawCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !templateImage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match image
    canvas.width = templateImage.width;
    canvas.height = templateImage.height;

    // Draw the template image
    ctx.drawImage(templateImage, 0, 0);

    // Set text properties
    ctx.fillStyle = '#2B3F7C'; // Blue color matching template
    ctx.textAlign = 'center';

    // Draw Student Name
    if (formData.name) {
      ctx.font = 'bold 140px serif';
      ctx.fillText(formData.name, canvas.width / 2, canvas.height * 0.50);
    }

    // Draw Course Name
    if (formData.courseName) {
      ctx.font = '50px serif';
      ctx.fillText(formData.courseName, canvas.width / 2, canvas.height * 0.68);
    }

    // Draw Duration
    if (formData.hours && formData.minutes) {
      ctx.font = '40px serif';
      const duration = `${formData.hours} hours ${formData.minutes} minutes`;
      ctx.fillText(duration, canvas.width / 2, canvas.height * 0.72);
    }

    // Draw Center Name
    if (formData.centerName) {
      ctx.font = '35px serif';
      ctx.fillText(formData.centerName, canvas.width / 2, canvas.height * 0.85);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Validation for hours (2-3 digits)
    if (name === 'hours') {
      if (!/^\d{0,3}$/.test(value)) return;
    }

    // Validation for minutes (2 digits, max 60)
    if (name === 'minutes') {
      if (!/^\d{0,2}$/.test(value)) return;
      if (value && parseInt(value) > 60) {
        toast.error('Minutes cannot exceed 60');
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateCertificate = async () => {
    if (!formData.name) {
      toast.error('Please enter student name');
      return;
    }
    if (!formData.courseName) {
      toast.error('Please enter course name');
      return;
    }
    if (!formData.hours || !formData.minutes) {
      toast.error('Please enter duration (hours and minutes)');
      return;
    }
    if (!formData.centerName) {
      toast.error('Please enter center name');
      return;
    }
    toast.success('Certificate generated successfully');
  };

  const handleDownloadCertificate = async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      toast.error('Certificate not found');
      return;
    }

    setLoading(true);
    try {
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error('Failed to generate image');
          setLoading(false);
          return;
        }

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `certificate-${formData.name.replace(/\s+/g, '_')}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        toast.success('Certificate downloaded successfully');
        setLoading(false);
      }, 'image/png');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download certificate');
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-full md:p-10 p-5 rounded-lg shadow-md overflow-y-scroll scrollbar">
      <h1 className="text-xl mb-6 text-gray-700 capitalize font-bold">
        Dashboard / Generate Certificate
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="w-full h-fit bg-white p-4 rounded-lg">
            <h2 className="text-xl mb-4 font-semibold text-[#32524D] capitalize flex items-center gap-2">
              <AiOutlinePlus className="text-[#32524D]" /> Certificate Details
            </h2>

            <form className="space-y-4">
              {/* Template Selection */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-600">
                  Select Template
                </label>
                <select
                  value={selectedTemplate}
                  disabled
                  className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                >
                  <option value="template1">Template 1 (Professional)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Only 1 template available</p>
              </div>

              {/* Name Input */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-600">
                  Student Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter student name"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
                />
              </div>

              {/* Course Name Input */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-600">
                  Course Name *
                </label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  placeholder="Enter course name"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
                />
              </div>

              {/* Hours Input */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-600">
                  Duration - Hours (2-3 digits) *
                </label>
                <input
                  type="text"
                  name="hours"
                  value={formData.hours}
                  onChange={handleInputChange}
                  placeholder="e.g., 16"
                  maxLength={3}
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
                />
              </div>

              {/* Minutes Input */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-600">
                  Duration - Minutes (2 digits, max 60) *
                </label>
                <input
                  type="text"
                  name="minutes"
                  value={formData.minutes}
                  onChange={handleInputChange}
                  placeholder="e.g., 23"
                  maxLength={2}
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
                />
              </div>

              {/* Center Name Input */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-600">
                  Center Name *
                </label>
                <textarea
                  name="centerName"
                  value={formData.centerName}
                  onChange={handleInputChange}
                  placeholder="Enter center/organization name"
                  rows={2}
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleGenerateCertificate}
                  className="flex-1 px-4 py-2 bg-[#32524D] text-white rounded-lg font-medium hover:bg-[#1f3633] transition"
                >
                  Generate
                </button>
                <button
                  type="button"
                  onClick={handleDownloadCertificate}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  <AiOutlineDownload /> {loading ? 'Downloading...' : 'Download'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Certificate Preview Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg mb-4 font-semibold text-[#32524D]">
              Certificate Preview
            </h2>
            <div className="flex justify-center overflow-auto bg-gray-100 p-4 rounded-lg">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto border border-gray-300 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}