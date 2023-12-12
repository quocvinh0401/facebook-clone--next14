import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "~/providers/ToastProvider";
import ReduxProvider from "~/providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social",
  description: "Clone from Facebook",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ToastProvider>
        <ReduxProvider>
          <body className={inter.className}>{children}</body>
        </ReduxProvider>
      </ToastProvider>
    </html>
  );
}
