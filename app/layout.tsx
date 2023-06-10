"use client"
import { QueryClient, QueryClientProvider } from "react-query";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>{children}</body>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </html>
  );
}
