'use client';

import { useRef, useState, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineDownload } from 'react-icons/ai';
import { toast } from 'react-toastify';
import {
  CertificateController,
  TEMPLATES,
  TemplateId,
} from './CertificateController';

export default function GenerateCertificate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    courseName: '',
    hours: '',
    minutes: '',
    centerName: '',
  });
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('template1');
  const [loading, setLoading] = useState(false);
  const [templateImage, setTemplateImage] = useState<HTMLImageElement | null>(null);

  const templateFields = TEMPLATES[selectedTemplate].fields;
  const showField = (field: keyof typeof formData) => templateFields.includes(field);

  // Load the template image whenever the selected template changes
  useEffect(() => {
    setTemplateImage(null);
    const img = new Image();
    img.src = TEMPLATES[selectedTemplate].src;
    img.onload = () => {
      setTemplateImage(img);
    };
  }, [selectedTemplate]);

  // Draw certificate whenever form data or image changes
  useEffect(() => {
    if (templateImage && canvasRef.current) {
      drawCertificate();
    }
  }, [templateImage, formData, selectedTemplate]);

  // Shrink the font until the text fits inside maxWidth
  const fitFont = (
    ctx: CanvasRenderingContext2D,
    text: string,
    fontSize: number,
    maxWidth: number,
    weight = 'bold',
    family = 'serif'
  ) => {
    let size = fontSize;
    ctx.font = `${weight} ${size}px ${family}`;
    while (ctx.measureText(text).width > maxWidth && size > 10) {
      size -= 2;
      ctx.font = `${weight} ${size}px ${family}`;
    }
  };

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

    ctx.textAlign = 'center';

    if (selectedTemplate === 'template2') {
      // Template 2 prints only the student name, on the ruled line under
      // "THIS CERTIFICATE IS PRESENTED TO" (measured from the artwork).
      if (formData.name) {
        ctx.fillStyle = '#1C3557'; // Navy matching the template
        fitFont(ctx, formData.name, canvas.height * 0.058, canvas.width * 0.55);
        ctx.fillText(formData.name, canvas.width / 2, canvas.height * 0.455);
      }
      return;
    }

    // Template 1
    ctx.fillStyle = '#2B3F7C'; // Blue color matching template

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
      const duration = CertificateController.formatDuration(
        formData.hours,
        formData.minutes
      );
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
    const { valid, errors } = CertificateController.validateData(
      formData,
      selectedTemplate
    );
    if (!valid) {
      toast.error(errors[0]);
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
        link.download = CertificateController.generateFilename(formData.name);
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
                  onChange={(e) => setSelectedTemplate(e.target.value as TemplateId)}
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
                >
                  {Object.values(TEMPLATES).map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.label}
                    </option>
                  ))}
                </select>
                {selectedTemplate === 'template2' && (
                  <p className="text-xs text-gray-500 mt-1">
                    This template only prints the student name
                  </p>
                )}
              </div>

              {/* Name Input */}
              {showField('name') && (
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
              )}

              {/* Course Name Input */}
              {showField('courseName') && (
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
              )}

              {/* Hours Input */}
              {showField('hours') && (
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
              )}

              {/* Minutes Input */}
              {showField('minutes') && (
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
              )}

              {/* Center Name Input */}
              {showField('centerName') && (
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
              )}

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
