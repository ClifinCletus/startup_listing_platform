import '../globals.css'
import React from "react";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Startup Listing Platform",
  description: "A platform to list and discover startups",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="font-work-sans">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}