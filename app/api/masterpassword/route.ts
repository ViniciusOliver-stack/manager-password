import prisma from "@/app/utils/db"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
  const { email, masterPassword } = await request.json()

  try {
    const updateMasterPassword = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        masterPassword: masterPassword,
      },
    })

    return NextResponse.json({ message: "ok", updateMasterPassword })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
