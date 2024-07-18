"use client"

import { useState } from "react"
import Header from "../components/Header"
import { useSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client"
import prisma from "../utils/db"

export default function Profile() {
  const { data: session, status } = useSession()

  const [name, setName] = useState(session?.user?.name || "")

  async function UpdateUser(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch("/app/utils/updateUser.ts", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.ok) {
      console.log("Foi")
    } else {
      console.error("Failed to update profile")
    }
  }

  return (
    <>
      <Header />
      <h1>Edit Profile</h1>
      <form onSubmit={UpdateUser}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </>
  )
}
