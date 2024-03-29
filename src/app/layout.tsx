import { UserContextProvider } from "@/contexts/user";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EPA Morelia ",
  description: "Encuentro con Cristo, para adolescentes. ",
  manifest: "/manifest.json",
  icons: {
    apple: "/maskable_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          {children}
          <Toaster />
        </UserContextProvider>
      </body>
    </html>
  );
}
