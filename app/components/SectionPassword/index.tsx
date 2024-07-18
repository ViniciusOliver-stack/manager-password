import Link from "next/link"
import { Icon } from "@iconify/react"
import { toast } from "react-hot-toast"
import React, { useEffect, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import PasswordForm from "../PasswordForm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function SectionPassword({ passwords, setPasswords }) {
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

  const handleSavePassword = async (id, passwordData) => {
    const response = await fetch(`/api/password/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...passwordData, id }),
    })

    if (response.ok) {
      toast.success("Password updated successfully!")
      // Refresh passwords
    } else {
      toast.error("Failed to update password")
    }
  }

  const handleDeletePassword = async (id) => {
    const response = await fetch(`/api/password`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })

    if (response.ok) {
      toast.success("Password deleted successfully!")
      setPasswords((prevPasswords) =>
        prevPasswords.filter((password) => password.id !== id)
      )
      // Refresh passwords
    } else {
      toast.error("Failed to delete password")
    }
  }

  const getCategoryIcon = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.icon : null
  }

  const handleCopyPassword = (password) => {
    navigator.clipboard.writeText(password)
    toast.success("Password copied to clipboard!")
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {passwords.length > 0
        ? passwords.map((password) => (
            <AccordionItem
              value={password.id}
              key={password.id}
              className="border p-2 rounded-lg flex flex-col gap-3 mt-3 text-sm"
            >
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <Icon
                    icon={
                      getCategoryIcon(password.categoryId) || "ic:outline-lock"
                    }
                    fontSize={20}
                  />
                  {password.name}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="font-medium">Email:</p>
                    <span className="text-neutral-500 text-sm">
                      {password.email}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">Password:</p>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500 text-sm">********</span>
                      <button
                        onClick={() => handleCopyPassword(password.password)}
                        className="text-neutral-500 hover:text-emerald-500 text-sm"
                      >
                        <Icon icon="lucide:copy" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">URL:</p>
                    <Link
                      href={password.url}
                      target="_blank"
                      className="text-neutral-500 text-sm hover:underline"
                    >
                      {password.url}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-around gap-6 mt-6">
                  <Button
                    className="border w-full hover:bg-red-500 transition-all delay-150"
                    onClick={() => handleDeletePassword(password.id)}
                  >
                    Delete
                  </Button>
                  <Dialog>
                    <DialogTrigger className="bg-white text-neutral-900 w-full h-[40px] rounded-lg">
                      Edit
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-800 border-none">
                      <PasswordForm
                        initialData={password}
                        categories={categories}
                        onSave={(data) => handleSavePassword(password.id, data)}
                        isCreatePassword={false}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        : "Não possui passwords registrada"}
    </Accordion>
  )
}
