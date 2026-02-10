import { Header } from "@/components/Header";
import NavBar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pierre LEPAGNOL — PhD Student & Data Scientist",
  description:
    "PhD Student in Computer Science at LISN/Paris-Saclay University and Data Scientist Consultant at SCIAM.",
  authors: [{ name: "Pierre Lepagnol" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-newsprint text-ink font-body">
        <div className="max-w-4xl mx-auto px-4">
          <Header />
          <NavBar />
          <main className="py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
