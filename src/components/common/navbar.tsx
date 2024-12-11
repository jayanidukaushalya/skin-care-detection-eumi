"use client"

import useAuthStore from "@/app/stores/auth.store"
import { auth } from "@/configs/firebase.config"
import { PAGES, Role } from "@/constants/common"
import { signOut } from "firebase/auth"
import { Bell, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"
import { useAuth } from "../providers/auth-provide"
import { Button } from "../ui/button"

const Navbar = () => {
  const router = useRouter()

  const { user } = useAuth()

  const role = useAuthStore((s) => s.role)
  const clearAuth = useAuthStore((s) => s.clearAuth)

  const pathName = usePathname()

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth)
      clearAuth()
      router.replace(PAGES.ROOT)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }, [clearAuth, router])

  return (
    <nav className="fixed z-50 bg-brand-500/10 backdrop-blur-3xl inset-x-0 top-0">
      <div className="h-16 items-center flex justify-between container">
        <Link href={PAGES.ROOT}>
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={150}
            height={150}
            className="object-fill"
          />
        </Link>

        <div className="flex gap-2">
          {user &&
            role === Role.PATIENT &&
            pathName !== PAGES.PATIENT_DASHBOARD && (
              <Button
                onClick={() => {
                  router.push(PAGES.PATIENT_DASHBOARD)
                }}
                variant="ghost"
              >
                Dashboard
              </Button>
            )}
          {user &&
            role === Role.DOCTOR &&
            pathName !== PAGES.DOCTOR_DASHBOARD && (
              <Button
                onClick={() => {
                  router.push(PAGES.DOCTOR_DASHBOARD)
                }}
                variant="ghost"
              >
                Dashboard
              </Button>
            )}
          {user &&
            (pathName === PAGES.DOCTOR_DASHBOARD ||
              pathName === PAGES.PATIENT_DASHBOARD) && (
              <Button
                onClick={() => {
                  router.push(PAGES.ROOT)
                }}
                variant="ghost"
              >
                Home Page
              </Button>
            )}
          <Button onClick={() => router.push(PAGES.QUIZ)} variant="ghost">
            Predict
          </Button>
          {!user ? (
            <>
              <Button onClick={() => router.push(PAGES.LOGIN)} variant="ghost">
                Login
              </Button>
              <Button onClick={() => router.push(PAGES.REGISTER_SELECT)}>
                Register
              </Button>
            </>
          ) : (
            <>
              <Button size="icon" variant="ghost" className="size-10">
                <Bell />
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                <LogOut />
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
