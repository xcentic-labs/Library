"use client"
import { Geist, Geist_Mono, Ubuntu } from "next/font/google";
import "../globals.css";
import SideBar from "@/components/SideBar/Sidebar";
import Navbar from "@/components/AdminNavBar/NavBar";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useIsLoggedIn } from "@/hooks/login";
import { useRouter } from "next/navigation";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ['latin'],
  weight: ['400', '700'],
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const redirect = useRouter()
  const { status, loading } = useIsLoggedIn(); // Include loading from the hook
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!loading && !status) {
      // Only redirect when loading is false and status is false
      redirect.push('/');
    }
  }, [loading, status, redirect]);

  return (
    <html lang="en">
       <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" />
       </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ubuntu.className} antialiased`}
      >
        <ToastContainer />
        <header className="w-full h-fit ">
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
        <section className="flex w-full h-[90vh] justify-between items-center relative z-50">
          <div className={`absolute top-0 left-0  lg:w-[20%] md:w-[30%] w-[60%] lg:hidden block duration-300 z-50 ${isOpen ?  'translate-x-[0%]' : '-translate-x-[100%]'}`}>
              <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <aside className="w-[20%] lg:block hidden">
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
          </aside>
          <div className="lg:w-[80%] h-full bg-slate-100 w-full">
            {children}
          </div>
        </section>
      </body>
    </html>
  );
}
