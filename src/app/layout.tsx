import type { Metadata } from "next"
import { EB_Garamond, Inter } from "next/font/google"

import { AppProvider } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Cataract App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
      <body className="font-sans antialiased">
        <div>
          <AppProvider>{children}</AppProvider>
          <Toaster />
        </div>
      </body>
    </html>
  )
}
