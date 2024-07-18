import { Footer } from "./components/Footer"
import { HeaderHome } from "./components/HeaderHome"
import { Hero } from "./components/Hero"
import Section from "./components/Section"

export default async function Home() {
  return (
    <div className="p-10">
      <HeaderHome />
      <Hero />
      <Section />

      <Footer />
    </div>
  )
}
