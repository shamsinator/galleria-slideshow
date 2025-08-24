import type { Metadata } from "next";
import { ReactQueryClientProvider } from "@/_providers/ReactQueryClientProvider";
import { PerformanceMonitor } from "@/_components/PerformanceMonitor";
import { Libre_Baskerville } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap", // Optional: Add display swap for better performance
});

export const metadata: Metadata = {
  title: "Galleria Slideshow Site",
  description: "CRUD with React Query and Supabase",
};

// Root layout component that wraps the application with necessary providers
export default function RootLayout({
  children,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={libreBaskerville.className}>
          <div id="modal-root-id">
            <div>{children}</div>
            <PerformanceMonitor />
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
