import prisma from "./db"

type CheckMasterPasswordProps = {
  email: string | null
}

export async function CheckMasterPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (user?.masterPassword) {
    return true
  } else {
    return false
  }
}
