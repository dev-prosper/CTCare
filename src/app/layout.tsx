import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CT Care by Cavista Technologies",
  description: "Your Rest is One Click Away",
};
const queryclient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {/* <QueryClientProvider client={queryclient}> */}
        <main className="w-full">{children}</main>
        <ToastContainer />
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
