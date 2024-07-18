import Link from "next/link"

export function Footer() {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className="flex items-center justify-around border-t border-t-neutral-800 pt-2 select-none">
      <p>Password Manager</p>
      <span className="flex items-center gap-1 text-sm">
        Developed by
        <Link href="#">
          <span className="hover:text-neutral-500">Vinicius</span>.
        </Link>
        💜 - {year}
      </span>
    </footer>
  )
}
