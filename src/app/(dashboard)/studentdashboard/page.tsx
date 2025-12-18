"use client"
import getUserDetails from "./Controller/getuserdetails"
import { useState, useEffect } from "react"

export default function StudentDashBoard() {
  const { data, isloading, formatDate, calculateMonthsBetween, updateUserDetails } = getUserDetails();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ motherName: "", fatherName: "", AadharNumber: "" });
  const [userFile, setUserFile] = useState<File | null>(null);
  const [aadharFile, setAadharFile] = useState<File | null>(null);
  const [userPreview, setUserPreview] = useState<string | null>(null);
  const [aadharPreview, setAadharPreview] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);
  const [aadharError, setAadharError] = useState<string | null>(null);

  // initialize form when data loads
  useEffect(() => {
    if (data) {
      setForm({
        motherName: data.motherName || "",
        fatherName: data.fatherName || "",
        AadharNumber: data.AadharNumber || "",
      });
      if ((data as any)?.userPhoto) setUserPreview((data as any).userPhoto);
      if ((data as any)?.aadharPhoto) setAadharPreview((data as any).aadharPhoto);
    }
  }, [data]);

  // client-side photo validation: allowed types and max size (2MB)
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, which: 'user' | 'aadhar') => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      if (which === 'user') { setUserFile(null); setUserPreview(null); setUserError(null); }
      else { setAadharFile(null); setAadharPreview(null); setAadharError(null); }
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      const msg = 'Only PNG, JPG, JPEG, WEBP images are allowed.';
      if (which === 'user') { setUserError(msg); setUserFile(null); }
      else { setAadharError(msg); setAadharFile(null); }
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      const msg = 'Image too large — max 2MB.';
      if (which === 'user') { setUserError(msg); setUserFile(null); }
      else { setAadharError(msg); setAadharFile(null); }
      return;
    }

    // clear error and set file and preview
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (which === 'user') { setUserPreview(result); setUserFile(file); setUserError(null); }
      else { setAadharPreview(result); setAadharFile(file); setAadharError(null); }
    };
    reader.readAsDataURL(file);
  }

  if (isloading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      </div>
    );
  }

  return (
    <section className="w-full h-full overflow-y-scroll scrollbar bg-gray-50">

      <div className="max-w-7xl mx-auto p-6">
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
              <h3 className="text-sm font-medium text-gray-500">Active Seats</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">{data?.seat?.length || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <h3 className="text-sm font-medium text-gray-500">Lockers</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {data?.seat?.filter(seat => seat.isLocker).length || 0}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
              <h3 className="text-sm font-medium text-gray-500">User ID</h3>
              <p className="text-2xl font-semibold text-gray-800 mt-2">{`PC2025${data?.id}`}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500">
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">Active</p>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photos row - spans both cols on md */}
                <div className="md:col-span-2 flex items-start gap-6 mb-4">

                  {(userPreview || (data as any)?.userPhoto) ? (
                    <div className="w-36 h-36 bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-200">
                      <img src={userPreview || (data as any).userPhoto} alt="user" className="w-36 h-36 object-cover rounded-lg" />
                    </div>
                  ) : (
                    ""
                  )}


                  {(aadharPreview || (data as any)?.aadharPhoto) ? (
                    <div className="w-36 h-36 bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-200">
                      <img src={aadharPreview || (data as any).aadharPhoto} alt="aadhar" className="w-36 h-36 object-cover rounded-lg" />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A6.967 6.967 0 0112 16c2.39 0 4.563.94 6.179 2.464" />
                  </svg>
                  <p className="text-gray-900 font-medium text-lg">{data?.name || "Not provided"}</p>
                </div>
              </div>

              {/* User ID */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">User ID</label>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <p className="text-gray-900 font-mono bg-gray-50 px-3 py-1 rounded-lg">{data?.id}</p>
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-900">{data?.email}</p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="text-gray-900 font-medium">+91 {data?.phoneNumber}</p>
                </div>
              </div>

              {/* More Details Section */}
              <div className="md:col-span-2 mt-4 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Additional Details
                  </h3>

                  {/* Update Button - Only shown if fields are missing */}
                  {(data?.motherName == null || data?.fatherName == null || data?.AadharNumber == null) && (
                    <button
                      onClick={() => {
                        setEditing(true);
                        setForm({
                          motherName: data?.motherName || "",
                          fatherName: data?.fatherName || "",
                          AadharNumber: data?.AadharNumber || ""
                        });
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Update Details
                    </button>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Mother's Name</label>
                    <p className={`font-medium ${data?.motherName ? "text-gray-900" : "text-gray-400 italic"}`}>
                      {data?.motherName ?? "Not provided"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Father's Name</label>
                    <p className={`font-medium ${data?.fatherName ? "text-gray-900" : "text-gray-400 italic"}`}>
                      {data?.fatherName ?? "Not provided"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Aadhar Number</label>
                    <p className={`font-mono ${data?.AadharNumber ? "text-gray-900" : "text-gray-400 italic"}`}>
                      {data?.AadharNumber ?? "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Edit Form */}
                {editing && (
                  <div className="mt-6 border border-teal-100 rounded-xl bg-gradient-to-br from-teal-50 to-white p-6 shadow-lg animate-fadeIn">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Update Additional Details
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mother's Name</label>
                        <input
                          value={form.motherName}
                          onChange={(e) => setForm({ ...form, motherName: e.target.value })}
                          placeholder="Enter mother's name"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Father's Name</label>
                        <input
                          value={form.fatherName}
                          onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                          placeholder="Enter father's name"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number</label>
                        <input
                          value={form.AadharNumber}
                          onChange={(e) => setForm({ ...form, AadharNumber: e.target.value })}
                          placeholder="XXXX-XXXX-XXXX"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <label className="block">
                        <span className="text-sm font-medium text-gray-700">Upload User Photo</span>
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'user')} className="mt-2" />
                        {userError && <p className="text-sm text-red-600 mt-1">{userError}</p>}
                        {userPreview ? (
                          <img src={userPreview} alt="user preview" className="mt-2 w-32 h-32 object-cover rounded" />
                        ) : (data as any)?.userPhoto ? (
                          <img src={(data as any).userPhoto} alt="user" className="mt-2 w-32 h-32 object-cover rounded" />
                        ) : null}
                      </label>

                      <label className="block">
                        <span className="text-sm font-medium text-gray-700">Upload Aadhar Photo</span>
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'aadhar')} className="mt-2" />
                        {aadharError && <p className="text-sm text-red-600 mt-1">{aadharError}</p>}
                        {aadharPreview ? (
                          <img src={aadharPreview} alt="aadhar preview" className="mt-2 w-32 h-32 object-cover rounded" />
                        ) : (data as any)?.aadharPhoto ? (
                          <img src={(data as any).aadharPhoto} alt="aadhar" className="mt-2 w-32 h-32 object-cover rounded" />
                        ) : null}
                      </label>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setEditing(false)}
                        className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={async () => {
                          // helper to convert file to base64 data URL
                          const fileToBase64 = (file: File | null) => new Promise<string | null>((resolve) => {
                            if (!file) return resolve(null);
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result as string);
                            reader.onerror = () => resolve(null);
                            reader.readAsDataURL(file);
                          });

                          const userPhotoBase64 = await fileToBase64(userFile);
                          const aadharPhotoBase64 = await fileToBase64(aadharFile);

                          await updateUserDetails({
                            motherName: form.motherName || null,
                            fatherName: form.fatherName || null,
                            AadharNumber: form.AadharNumber || null,
                            userPhoto: userPhotoBase64,
                            aadharPhoto: aadharPhotoBase64
                          });
                          setEditing(false);
                        }}
                        disabled={!!userError || !!aadharError}
                        className={`px-5 py-2.5 ${userError || aadharError ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'} text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>



          {/* Recent Seats Preview */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Recent Seats</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Layout
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seat No.
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slot
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expires On
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.seat?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        No seat records found
                      </td>
                    </tr>
                  ) : (
                    data?.seat?.slice(0, 3).map((seat, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {seat.layout?.layoutName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                            {seat.seatNumber}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {seat.slot}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                            {calculateMonthsBetween(seat.bookingStartDate, seat.bookingEndDate)} Months
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {formatDate(seat.bookingEndDate)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      </div>
    </section >
  );
}