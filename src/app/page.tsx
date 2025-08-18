import Hero from '@/app/components/Hero'
import Services from '@/app/components/Services'
import FAQ from '@/app/components/FAQ'
import Contact from '@/app/components/Contact'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1220]">
      <Hero />
      <Services />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
