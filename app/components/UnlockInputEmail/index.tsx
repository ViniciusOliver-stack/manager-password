"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import LogoutButton from "../LogoutButton"

type UnlockInputEmailProps = {
  email: string | null
}

export function UnlockInputEmail({ email }: UnlockInputEmailProps) {
  const urlChoosePassword = `${window.location.origin}/choose-password`

  return (
    <div className="w-full">
      <Label htmlFor="passwordUnlock">Logged in as</Label>
      <div className="flex items-center gap-2">
        <Input
          id="passwordUnlock"
          type="email"
          contentEditable={false}
          value={email!}
          className="text-white focus:outline-none focus:border-none bg-neutral-700 border-none"
        />
        {!urlChoosePassword && <LogoutButton />}
      </div>
    </div>
  )
}
