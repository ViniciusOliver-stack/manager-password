import { DivOrigami } from "../LogoOrigami"

export default function Section() {
  return (
    <section className="mt-12 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-lg md:max-w-md lg:max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold">
            Everything in One Place
          </h1>
          <p className="text-base md:text-lg text-neutral-400">
            Imagine having all your passwords securely stored and easily
            accessible in one place. No more forgotten passwords, no more
            hassle. With our platform, you can:
          </p>
          <ul className="list-disc list-inside text-base md:text-lg text-neutral-400">
            <li className="mt-2">
              Save time by managing all your passwords effortlessly
            </li>
            <li className="mt-2">
              Enhance security with robust encryption and protection
            </li>
            <li className="mt-2">Access your passwords anytime, anywhere</li>
            <li className="mt-2">
              Simplify your digital life with one secure vault
            </li>
          </ul>
        </div>
        <DivOrigami />
      </div>
    </section>
  )
}
