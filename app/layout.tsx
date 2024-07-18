"use client"

import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import Header from "./components/Header"
import { Toaster } from "react-hot-toast"
import { usePathname } from "next/navigation"
import { AuthProvider } from "./context/auth-context"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <html lang="pt-br">
      <SessionProvider>
        <AuthProvider>
          <body className={`${poppins.className} bg-neutral-900 text-white`}>
            <Toaster />
            {/* {pathname === "/home" && <Header />} */}
            {children}
            <Toaster />
          </body>
        </AuthProvider>
      </SessionProvider>
    </html>
  )
}
