import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import prisma from "./db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const { name } = req.body

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    })
    res.status(200).json({ message: "Profile updated successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error })
  }
}
