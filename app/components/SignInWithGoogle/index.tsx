"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { TbBrandGoogleFilled } from "react-icons/tb"

export default function SignInWithGoogle() {
  return (
    //Vamos chamar a função de signIn e vamos passar o provedor que a gente deseja.
    <Button
      className="border flex items-center gap-4"
      onClick={() =>
        signIn("google", {
          callbackUrl: `${window.location.origin}/auth`,
        })
      }
    >
      Login with Google <TbBrandGoogleFilled />
    </Button>
  )
}
