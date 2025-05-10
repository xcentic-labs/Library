"use client"
import { MdEmail } from "react-icons/md";
import img from '@/assets/lib2.jpg'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const redirect = useRouter();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1 = Get OTP, 2 = Enter OTP

    const handleGetOtp = async () => {
        if (!email) return toast.error("Email is required");
        try {
            setLoading(true);
            const res = await axios.post("/api/otp", { email });
            const sessionId = res.data.sessionId;
            setSessionId(sessionId);
            toast.success(res.data.message || "OTP sent");
            setStep(2); // Move to next step
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!otp || !newPassword) return toast.error("All fields are required");
        try {
            setLoading(true);
            const res = await axios.post("/api/verifyotp", {
                email,
                otp,
                sessionId,
                newPassword
            });
            toast.success(res.data.message || "Password reset successful");
            // optionally: reset all fields and go to login
            redirect.push('/login')
            setEmail(""); setOtp(""); setNewPassword(""); setSessionId("");
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Invalid OTP or session");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='w-[100vw] h-[100vh] flex justify-between items-center gap-4 md:gap-10 lg:overflow-hidden lg:flex-row flex-col'>
            <div className='flex lg:w-[50%] lg:h-full h-[50%] object-cover justify-between lg:items-center lg:flex-row bg-slate-400'>
                <Image src={img} alt="library" className="object-cover" />
            </div>

            <div className='lg:w-[50%] w-full h-full flex justify-center items-center p-5'>
                <div className='w-full max-w-[500px] h-fit p-5'>
                    <h1 className="text-3xl font-bold font-ubuntu mb-4">Forgot Password</h1>

                    {/* Step 1: Email Input */}
                    {step === 1 && (
                        <>
                            <label className="mb-2 mx-1 font-medium block">Email Address</label>
                            <div className='flex justify-between gap-3 items-center border border-gray-500 rounded-2xl px-3 mb-4'>
                                <div className="flex items-center gap-3 w-full">
                                    <MdEmail size={22} />
                                    <input
                                        type="email"
                                        className='h-12 outline-none rounded-2xl w-full'
                                        placeholder='Enter Email Address'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleGetOtp}
                                disabled={loading}
                                className={`w-full text-white ${loading ? 'bg-gray-400' : 'bg-greenleast hover:bg-white hover:text-greenleast'} border-2 border-greenleast rounded-2xl py-3 font-bold duration-300 text-lg tracking-[2px] mb-4`}
                            >
                                {loading ? 'Sending...' : 'Get OTP'}
                            </button>
                        </>
                    )}

                    {/* Step 2: OTP + New Password */}
                    {step === 2 && (
                        <>
                            <label className="mb-2 mx-1 font-medium block">Enter OTP</label>
                            <input
                                type="text"
                                className='w-full border border-gray-400 rounded-2xl px-4 py-2 mb-4 outline-none'
                                placeholder='Enter OTP'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />

                            <label className="mb-2 mx-1 font-medium block">New Password</label>
                            <input
                                type="password"
                                className='w-full border border-gray-400 rounded-2xl px-4 py-2 mb-4 outline-none'
                                placeholder='Enter New Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />

                            <button
                                onClick={handleResetPassword}
                                disabled={loading}
                                className={`w-full text-white ${loading ? 'bg-gray-400' : 'bg-greenleast hover:bg-white hover:text-greenleast'} border-2 border-greenleast rounded-2xl py-3 font-bold duration-300 text-lg tracking-[2px] mb-4`}
                            >
                                {loading ? 'Updating...' : 'Reset Password'}
                            </button>
                        </>
                    )}

                    <p className="mb-6 w-full text-center text-greenleast font-semibold cursor-pointer hover:text-greenleastshade">
                        Don't have an account? <Link href="/signup" className="hover:underline duration-300">Sign up</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
