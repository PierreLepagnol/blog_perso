import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pierre LEPAGNOL - PhD Student & Data Scientist",
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
      <body className="min-h-screen overflow-x-hidden bg-newsprint text-ink font-body">
        <div className="mx-auto w-full max-w-7xl min-w-0 overflow-hidden px-4 sm:px-6">
          <Header />
          <main className="py-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
