"use client"

import { PiPassword } from "react-icons/pi"
import HeaderPassword from "../components/HeaderPassword"
import SectionPassword from "../components/SectionPassword"
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import Loading from "../components/Loading"
import { useAuth } from "../context/auth-context"
import Header from "../components/Header"

export default function Home() {
  const [searchText, setSearchText] = useState("")
  const [allPasswords, setAllPasswords] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  const { status } = useSession()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/unlock")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        setCategories(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchPasswords = async () => {
      const response = await fetch("/api/password")
      const data = await response.json()
      setAllPasswords(data)
    }

    fetchPasswords()
  }, [])

  const filteredPasswords = allPasswords.filter((password) => {
    const matchesSearch =
      password.name.toLowerCase().includes(searchText.toLowerCase()) ||
      password.email.toLowerCase().includes(searchText.toLowerCase())
    const matchesCategory =
      !selectedCategory || password.categoryId === selectedCategory

    return matchesSearch && matchesCategory
  })

  if (status === "loading") {
    return <Loading />
  }

  if (status === "unauthenticated") {
    redirect("/auth")
  }

  return (
    <div className="h-screen flex flex-col w-[80%] m-auto">
      <div className="flex-shrink-0">
        <Header /> {/* Fixo no topo */}
      </div>

      <div className="flex flex-grow overflow-hidden">
        <div className="w-64 flex flex-col gap-10 flex-shrink-0 overflow-hidden">
          <div>
            <h1 className="text-base font-medium">Passwords</h1>
            <div className="flex items-center gap-2 ml-3 mt-1">
              <PiPassword size={20} />
              <span className="text-sm">Passwords</span>
            </div>
          </div>

          <div>
            <h1 className="text-base font-medium">Categories</h1>
            <div className="flex flex-col gap-2 ml-3 mt-2">
              <div
                className={`flex items-center gap-2 hover:text-emerald-500 transition-all hover:cursor-pointer ${
                  !selectedCategory ? "text-emerald-500" : ""
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                <Icon icon="ic:outline-all-inclusive" />
                <span className="text-sm">All</span>
              </div>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`flex items-center gap-2 hover:text-emerald-500 transition-all hover:cursor-pointer ${
                    selectedCategory === category.id ? "text-emerald-500" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Icon icon={category.icon} />
                  <span className="text-sm">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col gap-12 overflow-hidden">
          <div className="flex-shrink-0">
            <HeaderPassword
              searchText={searchText}
              setSearchText={setSearchText}
              setAllPasswords={setAllPasswords}
            />
          </div>

          {/* Apenas esta seção terá o scroll */}
          <div className="overflow-auto flex-grow pr-3">
            <SectionPassword
              passwords={filteredPasswords}
              setPasswords={setAllPasswords}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
