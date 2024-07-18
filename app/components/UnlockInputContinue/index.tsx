"use client"

import { useAuth } from "@/app/context/auth-context"
import prisma from "@/app/utils/db"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type UnlockInputContinueProps = {
  masterPassword: string
}

export default function UnlockInputContinue({
  masterPassword,
}: UnlockInputContinueProps) {
  const session = useSession()
  const email = session.data?.user?.email
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { authenticate } = useAuth()

  const handleContinue = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, masterPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        authenticate()
        router.push("/home")
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <Button
        className="bg-white text-neutral-900 w-[30%] hover:bg-emerald-500 hover:text-white"
        onClick={handleContinue}
        type="button"
        disabled={loading}
      >
        {loading ? "Loading..." : "Continue"}
      </Button>
    </>
  )
}
