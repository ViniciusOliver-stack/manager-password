"use client"

import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { UnlockInputEmail } from "../components/UnlockInputEmail"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import Loading from "../components/Loading"
import { useSession } from "next-auth/react"

export default function ChoosePassword() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const { status } = useSession()

  const router = useRouter()

  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)

  useEffect(() => {
    if (status === "loading") {
      return
    }
    if (status === "unauthenticated") {
      redirect("/auth")
    }
    generateNewPassword()
  }, [status])

  const generateRandomPassword = (): string => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()-_=+[{]}|;:,<.>/?"
    const allChars = lowercase + uppercase + numbers + symbols
    const getRandomChar = (pool: string): string => {
      const randomIndex = Math.floor(Math.random() * pool.length)
      return pool[randomIndex]
    }
    let password = ""
    for (let i = 0; i < 18; i++) {
      const pool = i % 2 === 0 ? allChars : lowercase
      password += getRandomChar(pool)
    }
    return password
  }

  const generateNewPassword = () => {
    const newPassword = generateRandomPassword()
    setPassword(newPassword)
  }

  const handleMouseEnter = () => {
    setShowPassword(true)
  }

  const handleMouseLeave = () => {
    setShowPassword(false)
  }

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password)
    toast.success("Password copied successfully!")
  }

  const handleSavePassword = async () => {
    const response = await fetch(`/api/masterpassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, masterPassword: password }),
    })
    if (response.ok) {
      toast.success("Success to save master password")
      router.push("/home")
    } else {
      toast.error("Failed to save master password")
    }
  }

  if (status === "loading") {
    return <Loading />
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen w-[40%] m-auto gap-10">
      <UnlockInputEmail email={email} />
      <div className="text-center flex flex-col items-center gap-4">
        <div>
          <p className="uppercase text-xs text-neutral-400">
            Say hello to your
          </p>
          <p className="uppercase">Master password</p>
        </div>
        <div className="w-[450px] py-4 border rounded-md border-neutral-500">
          <p
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer"
            onClick={handleCopyPassword}
          >
            {showPassword ? (
              password
            ) : (
              <span className="font-medium text-neutral-500">
                Hover to reveal
              </span>
            )}
          </p>
        </div>
        <p className="w-[450px] text-sm text-neutral-500">
          The master password is randomly generated just for you. You can change
          this password in the future if necessary.
        </p>
      </div>
      <button onClick={handleSavePassword} className="btn btn-primary">
        Continue
      </button>
    </section>
  )
}
