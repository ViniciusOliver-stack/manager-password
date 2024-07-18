"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { GoSignOut } from "react-icons/go"
import { RiUser3Line } from "react-icons/ri"
import { FaRegMoon } from "react-icons/fa"

import LogoutButton from "../LogoutButton"
import Loading from "../Loading"
import Link from "next/link"
import { signOut } from "next-auth/react"

export default function Header() {
  const { data, status } = useSession()

  if (status === "loading") {
    return <Loading />
  }

  const { user } = data

  const userName = user?.name || "User"
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <header className="h-10 py-10 flex items-center justify-between">
      <div>Manager Password</div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3">
            {user.image ? (
              <Image
                src={user.image}
                alt={`profile picture ${userName}`}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full text-sm font-semibold">
                {userInitial}
              </div>
            )}
            <span className="text-sm">{user.name}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200">
              <Link href="/profile">
                <RiUser3Line size={18} />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200">
              <FaRegMoon size={18} />
              Dark theme
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200">
              Team
            </DropdownMenuItem> */}
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200">
              <button
                type="button"
                onClick={() =>
                  signOut({ callbackUrl: `${window.location.origin}/auth` })
                }
                className="flex items-center gap-2 w-full"
              >
                <GoSignOut size={18} />
                Log out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
