"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SingInForm() {
  const [email, setEmail] = useState("")

  async function SignInWithEmail() {
    const signInResult = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}/auth`,
      redirect: false,
    })

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      })
    }

    return toast({
      title: "Check your email",
      description:
        "We sent you a login link. Be sure to check your spam folder.",
    })
  }

  return (
    <form action={SignInWithEmail}>
      <div className="flex flex-col gap-y-2">
        <Label className="text-neutral-500 font-sm" htmlFor="email">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        className="border flex items-center gap-4 mt-4 w-full"
        type="submit"
      >
        Login with Email
      </Button>
    </form>
  )
}
