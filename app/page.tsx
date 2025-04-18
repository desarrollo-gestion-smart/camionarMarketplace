import Link from "next/link"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeaturedTrucks from "@/components/featured-trucks"
import CategoryFilter from "@/components/category-filter"

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero Section con slider y buscador */}
      <HeroSection />

      {/* Espacio para compensar el buscador superpuesto */}
      <div className="h-16 md:h-20"></div>

      {/* Camiones destacados con filtros */}
      <FeaturedTrucks />

      {/* Categorías */}
      <CategoryFilter />

      {/* CTA Publicar */}
      <section className="py-16 bg-camionar text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 ">¿Querés vender tu camión?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Publicá gratis y llegá a miles de compradores potenciales en toda Argentina. Más de 10,000 camiones vendidos
            en nuestra plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-camionar hover:bg-gray-100">
              <Link href="/publicar">
                <Upload className="mr-2 h-5 w-5" />
                Publicar ahora
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/como-funciona">Cómo funciona</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CamionAR</h3>
              <p className="text-gray-400 text-sm">
                El marketplace líder de camiones en Argentina. Compra y vende camiones de forma rápida y segura.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Categorías</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/camiones/tractores" className="hover:text-white">
                    Tractores
                  </Link>
                </li>
                <li>
                  <Link href="/camiones/rigidos" className="hover:text-white">
                    Rígidos
                  </Link>
                </li>
                <li>
                  <Link href="/camiones/frigorificos" className="hover:text-white">
                    Frigoríficos
                  </Link>
                </li>
                <li>
                  <Link href="/camiones/cisternas" className="hover:text-white">
                    Cisternas
                  </Link>
                </li>
                <li>
                  <Link href="/camiones/volquetes" className="hover:text-white">
                    Volquetes
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces útiles</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/ayuda" className="hover:text-white">
                    Centro de ayuda
                  </Link>
                </li>
                <li>
                  <Link href="/publicar" className="hover:text-white">
                    Cómo publicar
                  </Link>
                </li>
                <li>
                  <Link href="/seguridad" className="hover:text-white">
                    Consejos de seguridad
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-white">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/terminos" className="hover:text-white">
                    Términos y condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="hover:text-white">
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white">
                    Política de cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} CamionAR. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
