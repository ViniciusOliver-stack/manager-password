import { getServerSession } from "next-auth"
import { authOptions } from "../utils/auth"
import { redirect } from "next/navigation"
import SingInForm from "../components/SignInForm"
import SignInWithGoogle from "../components/SignInWithGoogle"
import SignInWithGithub from "../components/SignInWithGithub"
import { CheckMasterPassword } from "../utils/getMasterPassword"

export default async function AuthRoute() {
  const session = await getServerSession(authOptions)

  if (session) {
    const hasMasterPassword = await CheckMasterPassword(session.user?.email)

    if (!hasMasterPassword) {
      return redirect(`/choose-password?email=${session.user.email}`)
    } else {
      return redirect("/unlock")
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="border px-3 py-6 rounded-lg border-neutral-600">
        <div className="mb-5">
          <h1 className="text-xl">Login</h1>
          <p className="text-sm text-neutral-400">
            Sign in to your account to continue
          </p>
        </div>

        <div className="flex flex-col">
          <SingInForm />

          <div className="flex items-center justify-around gap-6 border-t mt-6 pt-6">
            <SignInWithGoogle />
            <SignInWithGithub />
          </div>
        </div>
      </div>
    </div>
  )
}
