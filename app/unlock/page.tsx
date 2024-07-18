"use client"

import { Input } from "@/components/ui/input"
import { UnlockInputEmail } from "../components/UnlockInputEmail"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { useSession } from "next-auth/react"
import UnlockInputContinue from "../components/UnlockInputContinue"
import Loading from "../components/Loading"
import { redirect } from "next/navigation"

export default function Unlock() {
  const [showPassword, setShowPassword] = useState(false)
  const [getMasterPassword, setGetMasterPassword] = useState("")
  const { data: session, status } = useSession()

  const email = session?.user?.email ?? null

  if (status === "loading") {
    return <Loading />
  }

  if (status === "unauthenticated") {
    redirect("/auth")
  }

  return (
    <section className="w-full px-4 md:w-[50%] m-auto h-screen flex flex-col items-center justify-center gap-4">
      <UnlockInputEmail email={email} />
      <div className="flex items-center gap-2 w-full">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Master Password"
          className="text-neutral-900 focus:outline-none focus:border-none"
          onChange={(e) => setGetMasterPassword(e.target.value)}
        />
        <Button
          className="hover:bg-neutral-600 transition-all delay-100"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <VscEye /> : <VscEyeClosed />}
        </Button>
      </div>

      <UnlockInputContinue masterPassword={getMasterPassword} />
    </section>
  )
}
