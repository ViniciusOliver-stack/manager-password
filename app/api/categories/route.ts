import prisma from "@/app/utils/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const categories = await prisma.category.findMany()
  return NextResponse.json(categories)
}

export async function POST(request: NextRequest, response: NextResponse) {
  const { name, icon } = await request.json()

  try {
    const categoryCreated = await prisma.category.create({
      data: {
        name,
        icon,
      },
    })
    return Response.json({
      message: "Category created successfully",
      categoryCreated,
    })
  } catch (error) {
    console.log(error)
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
