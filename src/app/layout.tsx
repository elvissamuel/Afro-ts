import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ContextProvider } from "@/contexts/LoginContext";
import "./globals.css";
import { ReactQueryProvider } from "./ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Afro Market Square",
  description: "A marketplace for african items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
    <html lang="en">
      <body className={inter.className}>
          <ContextProvider>
            {children}
          </ContextProvider>
      </body>
    </html>
    </ReactQueryProvider>
  );
}
