// import { ReactNode } from "react";
import type { Metadata } from "next";
import { ReactQueryClientProvider } from "@/_providers/ReactQueryClientProvider";
import { Libre_Baskerville } from "next/font/google";
import ClientModal from "@/_components/ClientModal";
import "./globals.css";
import { Suspense } from "react";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galleria Slideshow Site",
  description: "CRUD with React Query and Supabase",
};

interface LayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
}

export default function RootLayout({ children, modal }: LayoutProps) {
  // console.log("Modal prop:", modal);
  // console.log("Layout props:", { children, modal });
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={libreBaskerville.className}>
          <div id="modal-root-id">
            <div>{children}</div>
            {/* ClientModal is wrapped in a Suspense boundary becauseuseSearchParams() causes client-side rendering up to the closest Suspense boundary during static rendering */}
            <Suspense fallback={null}>
              {modal && <ClientModal modal={modal} />}
            </Suspense>
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
