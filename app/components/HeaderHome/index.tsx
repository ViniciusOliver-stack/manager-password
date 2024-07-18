import { authOptions } from "@/app/utils/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"
import LogoutButton from "../LogoutButton"
import { HeroHighlight } from "@/components/ui/hero-highlight"

export async function HeaderHome() {
  const session = await getServerSession(authOptions)

  return (
    <header className="flex items-center justify-between">
      <h1>Password Manager</h1>

      <div>
        {session ? <LogoutButton /> : <Link href="/auth">Sign in</Link>}
      </div>
    </header>
  )
}
