import type { Metadata } from "next";
import { ReactQueryClientProvider } from "@/_providers/ReactQueryClientProvider";
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

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={libreBaskerville.className}>
          <div id="modal-root-id">
            {modal}
            <div>{children}</div>
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
