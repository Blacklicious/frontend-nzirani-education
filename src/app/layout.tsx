import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nzi-Edu",
  description: "Centre de formation Nzirani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="bg-gray-200 py-[20px] h-[100vh] overflow-auto text-black">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
