"use client"

import { PAGES } from "@/constants/common"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"
import { useAuth } from "./auth-provide"

const Protected = ({ children }: PropsWithChildren) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(PAGES.ROOT)
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="h-screen flex w-full justify-center items-center">
        <Loader className="size-6 animate-spin text-primary" />
      </div>
    )
  }

  return user ? <>{children}</> : null
}

export default Protected
