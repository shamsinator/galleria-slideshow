import type { Metadata } from "next";
import { ReactQueryClientProvider } from "@/_providers/ReactQueryClientProvider";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";

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
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: LayoutProps) {
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
