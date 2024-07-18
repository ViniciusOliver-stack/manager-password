"use client"

import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"
import { TbBrandGoogleFilled } from "react-icons/tb"

export default function SignInWithGithub() {
  return (
    //Vamos chamar a função de signIn e vamos passar o provedor que a gente deseja.
    <Button
      className="border flex items-center gap-4"
      onClick={() =>
        signIn("github", {
          callbackUrl: `${window.location.origin}/auth`,
        })
      }
    >
      Login with Github <Github />
    </Button>
  )
}
