import React, { useEffect, useState } from "react"
import { z } from "zod"
import { toast } from "react-hot-toast"
import { DialogClose } from "@radix-ui/react-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { BsStars } from "react-icons/bs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const passwordSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().optional(),
  url: z.string().url("Invalid URL").optional(),
  category: z.string().optional(),
})

const PasswordForm = ({
  initialData = {},
  categories,
  onSave,
  isCreatePassword,
}) => {
  const [name, setName] = useState(initialData.name || "")
  const [email, setEmail] = useState(initialData.email || "")
  const [password, setPassword] = useState(initialData.password || "")
  const [showPassword, setShowPassword] = useState(false)
  const [url, setUrl] = useState(initialData.url || "")
  const [selectedCategory, setSelectedCategory] = useState(
    initialData.category || ""
  )
  const [handleIsCreatePassword, setHandleIsCreatePassword] = useState(false)

  useEffect(() => {
    setHandleIsCreatePassword(isCreatePassword)
  }, [isCreatePassword])

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    url: "",
    category: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationResult = passwordSchema.safeParse({
      name,
      email,
      password,
      url,
      category: selectedCategory,
    })

    if (!validationResult.success) {
      const newErrors = validationResult.error.formErrors.fieldErrors
      setErrors({
        name: newErrors.name ? newErrors.name[0] : "",
        email: newErrors.email ? newErrors.email[0] : "",
        password: newErrors.password ? newErrors.password[0] : "",
        url: newErrors.url ? newErrors.url[0] : "",
        category: newErrors.category ? newErrors.category[0] : "",
      })

      toast.error("Preencha os campos corretamente!")
      return
    }

    setErrors({
      name: "",
      email: "",
      password: "",
      url: "",
      category: "",
    })

    const updatedData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password }),
      ...(url && { url }),
      ...(selectedCategory && { category: selectedCategory }),
    }

    onSave(updatedData)
  }

  const generatePassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:',.<>?/~`"
    let newPassword = ""
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(newPassword)
  }

  return (
    <form className="flex flex-col gap-4 rounded-md" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          type="text"
          id="name"
          placeholder="Vercel"
          className={`${errors.name && "border border-red-500"} bg-transparent`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          id="email"
          placeholder="Email"
          className={`${
            errors.email && "border border-red-500"
          } bg-transparent`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="flex items-center gap-3">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="*************"
            className={`${
              errors.password && "border border-red-500"
            } bg-transparent`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {handleIsCreatePassword && (
            <Button
              className="hover:bg-neutral-600 transition-all delay-100"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VscEye /> : <VscEyeClosed />}
            </Button>
          )}
        </div>
        <Button
          className="flex items-center gap-2 hover:bg-neutral-600 transition-all delay-100"
          type="button"
          onClick={generatePassword}
        >
          <BsStars />
          Generate Automatically
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <Label htmlFor="url">Url</Label>
          <Input
            className={`${
              errors.url && "border border-red-500"
            } bg-transparent`}
            id="url"
            type="url"
            placeholder="https://managerPassword.vercel.app"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <Label>Categories</Label>
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger
              className={`${
                errors.category && "border border-red-500"
              } w-full bg-transparent border-white focus:outline-none`}
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900 text-white">
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-8 flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-700 transition-all duration-100 delay-100"
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default PasswordForm
