import prisma from "@/app/utils/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { email, masterPassword } = await request.json()

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user || !user.masterPassword) {
      return NextResponse.json(
        { message: "User not found or master password not set." },
        { status: 400 }
      )
    }

    const passwordMatch = user.masterPassword == masterPassword

    if (passwordMatch) {
      return NextResponse.json({ message: "Password Matched" }, { status: 200 })
    } else {
      return NextResponse.json({ message: "Invalid Password" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      {
        status: 500,
      }
    )
  }
}
