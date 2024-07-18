import { Icon } from "@iconify/react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center w-[90%] md:w-[70%] m-auto mt-10">
      <span className="bg-emerald-500 text-xs rounded-full px-3 py-1 text-white">
        ✨ Access for free!
      </span>
      <h1 className="text-4xl md:text-6xl font-bold mt-4">
        Save and Manage Your Passwords Securely
      </h1>
      <p className="text-base md:text-lg text-neutral-400 mt-6">
        Easily store and manage all your passwords in one secure place. Our
        platform ensures your credentials are safe and accessible whenever you
        need them.
      </p>
      <Link
        href="/auth"
        className="bg-blue-600 text-white px-6 py-3 rounded-full mt-8 hover:bg-blue-700 transition-all duration-300"
      >
        Get Started for Free
      </Link>
      <div className="flex mt-10 space-x-4">
        <div className="flex flex-col items-center">
          <Icon icon="mdi:secure" fontSize={40} />
          <p className="mt-2 text-sm text-neutral-400">Highly Secure</p>
        </div>
        <div className="flex flex-col items-center">
          <Icon icon="material-symbols:computer-outline" fontSize={40} />
          <p className="mt-2 text-sm text-neutral-400">Easy to Use</p>
        </div>
        <div className="flex flex-col items-center">
          <Icon icon="iconamoon:headphone-fill" fontSize={40} />
          <p className="mt-2 text-sm text-neutral-400">24/7 Support</p>
        </div>
      </div>
    </section>
  )
}
