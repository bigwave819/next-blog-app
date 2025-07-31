import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Quicksand } from 'next/font/google'

// Load the Quicksand font
const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
})



export const metadata: Metadata = {
  title: "Next 15 blog App",
  description: "Blog app using next zustand , drizzle and postgress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}
      >
        <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
