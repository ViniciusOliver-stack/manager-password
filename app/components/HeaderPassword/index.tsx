import React, { useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"
import PasswordForm from "../PasswordForm"

export default function HeaderPassword({
  searchText,
  setSearchText,
  setAllPasswords,
}) {
  const [categories, setCategories] = useState([])

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

  const handleSavePassword = async (passwordData) => {
    const response = await fetch("/api/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    })

    if (response.ok) {
      toast.success("Password saved successfully!")
      const fetchPasswords = async () => {
        const response = await fetch("/api/password")
        const data = await response.json()
        setAllPasswords(data)
      }
      fetchPasswords()
    } else {
      toast.error("Failed to save password")
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        <h1 className="font-medium text-lg">All Passwords</h1>
        <p className="text-neutral-500 text-sm">
          Safely manage and access your passwords.
        </p>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-2 md:gap-6">
        <Input
          type="text"
          placeholder="Search"
          className="flex-auto bg-transparent"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="w-fit md:w-[210px]">
          <Dialog>
            <DialogTrigger className="bg-white text-neutral-900 w-full h-full rounded-lg flex items-center gap-2 py-2 px-4 text-sm">
              <FiPlus />
              Add Password
            </DialogTrigger>
            <DialogContent className="bg-neutral-800 border-none">
              <PasswordForm
                categories={categories}
                onSave={handleSavePassword}
                isCreatePassword={true}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
