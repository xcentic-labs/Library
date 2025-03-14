import type { Metadata } from "next";
import { Geist, Geist_Mono, Ubuntu } from "next/font/google";
import "../globals.css";
import SideBar from "@/components/SideBar/Sidebar";
import Navbar from "@/components/AdminNavBar/NavBar";
import { ToastContainer } from "react-toastify";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable : "--font-ubuntu",
  subsets: ['latin'],
  weight: ['400' , '700'],
})

export const metadata: Metadata = {
  title: "Libary",
  description: "Book your libary seat now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ubuntu.className} antialiased`}
      >
        <ToastContainer />
          <header className="w-full h-fit ">
            <Navbar />
          </header>
          <section className="flex w-full h-[90vh] justify-between items-center">
            <aside className="w-[20%]">
              <SideBar />
            </aside>
            <div className="w-[80%] h-full bg-slate-100">
                {children}
            </div>
          </section>
      </body>
    </html>
  );
}
