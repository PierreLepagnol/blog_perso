import { Header } from "@/components/Header";
import NavBar from "@/components/Navbar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pierre LEPAGNOL - PhD Student & Data Scientist",
  description:
    "PhD Student in Computer Science at LISN/Paris-Saclay University and Data Scientist Consultant at SCIAM. Explore my research, articles, and professional journey.",
  keywords: [
    "Pierre Lepagnol",
    "PhD Student",
    "Computer Science",
    "Data Scientist",
    "LISN",
    "Paris-Saclay",
    "SCIAM",
  ],
  authors: [{ name: "Pierre Lepagnol" }],
  openGraph: {
    title: "Pierre LEPAGNOL - PhD Student & Data Scientist",
    description:
      "PhD Student in Computer Science at LISN/Paris-Saclay University and Data Scientist Consultant at SCIAM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <div className="max-w-7xl mx-auto">
          <Header />
          <NavBar />
          <main className="px-4 md:px-6 lg:px-8 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
