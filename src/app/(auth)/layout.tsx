import type { Metadata } from "next";
import { Geist, Geist_Mono , Ubuntu } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header/Header";

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
  title: "Login Libary",
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
        <Header />
        {children}
       
      </body>
    </html>
  );
}
