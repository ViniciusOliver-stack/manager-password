import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/utils/db"
import { authOptions } from "@/app/utils/auth"

export async function GET() {
  const passwords = await prisma.password.findMany({
    include: {
      category: true,
    },
  })
  revalidatePath("/home")

  return NextResponse.json(passwords)
}

export async function POST(request: NextRequest, response: NextResponse) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { name, email, password, url, category } = await request.json()

  // const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const passwordCreated = await prisma.password.create({
      data: {
        email,
        password,
        url,
        name, // Adicione um nome relevante para a senha, caso seja necessário
        user: {
          connect: { email: session.user?.email! },
        },
        category: {
          connect: { name: category },
        },
      },
    })

    revalidatePath("/home")

    return Response.json({ message: "ok", passwordCreated })
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: "Error",
        err,
      },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { id } = await request.json()

  try {
    const passwordDeleted = await prisma.password.delete({
      where: {
        id,
      },
    })

    revalidatePath("/home")

    return Response.json({ message: "ok", passwordDeleted })
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: "Error",
        err,
      },
      {
        status: 500,
      }
    )
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { id, name, email, password, url, category } = await request.json()

  const updateData: any = {}

  if (name) updateData.name = name
  if (email) updateData.email = email
  if (password) updateData.password = password
  if (url) updateData.url = url
  if (category) {
    const categoryObj = await prisma.category.findUnique({
      where: { name: category },
    })
    if (categoryObj) {
      updateData.category = { connect: { id: categoryObj.id } }
    }
  }

  try {
    const passwordUpdated = await prisma.password.update({
      where: { id },
      data: updateData,
    })

    revalidatePath("/home")

    return NextResponse.json({ message: "ok", passwordUpdated })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Error", err }, { status: 500 })
  }
}
