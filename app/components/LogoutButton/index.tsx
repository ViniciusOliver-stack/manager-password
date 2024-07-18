"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <Button
      className="hover:bg-white hover:text-neutral-900 bg-neutral-700 transition-all duration-100 px-2 py-1 rounded-md"
      onClick={() => signOut({ callbackUrl: `${window.location.origin}/auth` })}
    >
      Log out
    </Button>
  )
}
