import Link from "next/link"
import Image from "next/image"
import { Truck, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Banner promocional */}
      <section className="relative bg-gradient-to-r from-[#1A4876] to-[#2A5A88] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="max-w-xl">
              <h2 className="text-xl md:text-2xl font-bold">Feria de camiones usados</h2>
              <p className="text-sm md:text-base mt-2">*Evento del 14 al 20 de abril</p>
            </div>
            <Button className="bg-white text-[#1A4876] hover:bg-gray-100">Ver más</Button>
          </div>
        </div>
      </section>

      {/* Ofertas de la semana */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Ofertas de la semana</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Camión 1 */}
            <div className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg">
                  Publicado ayer
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=300&text=Volvo+FH"
                  alt="Volvo FH"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Volvo FH 500, año 2017, Buen Estado</h3>
                <p className="text-gray-500 text-sm mb-2">2017</p>
                <p className="font-bold text-xl text-[#1A4876]">$120.000.000</p>
              </div>
            </div>

            {/* Camión 2 */}
            <div className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="absolute top-0 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded-br-lg">
                  Nuevo
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=300&text=Scania+R450"
                  alt="Scania R450"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Scania R450 Streamline, año 2020</h3>
                <p className="text-gray-500 text-sm mb-2">2020</p>
                <p className="font-bold text-xl text-[#1A4876]">$145.000.000</p>
              </div>
            </div>

            {/* Camión 3 */}
            <div className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br-lg">
                  Publicado hoy
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=300&text=Mercedes+Actros"
                  alt="Mercedes Actros"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Mercedes Actros 1845, año 2019</h3>
                <p className="text-gray-500 text-sm mb-2">2019 - 40.000 km</p>
                <p className="font-bold text-xl text-[#1A4876]">$135.000.000</p>
              </div>
            </div>

            {/* Camión 4 */}
            <div className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg">
                  Publicado ayer
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=300&text=MAN+TGX"
                  alt="MAN TGX"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">MAN TGX 18.500, año 2020</h3>
                <p className="text-gray-500 text-sm mb-2">2020 - 30.000 km</p>
                <p className="font-bold text-xl text-[#1A4876]">$140.000.000</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button asChild variant="outline" className="border-[#1A4876] text-[#1A4876]">
              <Link href="/camiones">Ver todas las ofertas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categorías principales */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Categorías principales</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link
              href="/camiones/tractores"
              className="bg-white p-4 rounded-lg border text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#1A4876]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-[#1A4876]" />
              </div>
              <h3 className="font-medium text-sm">Tractores</h3>
            </Link>

            <Link
              href="/camiones/rigidos"
              className="bg-white p-4 rounded-lg border text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#1A4876]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-[#1A4876]" />
              </div>
              <h3 className="font-medium text-sm">Rígidos</h3>
            </Link>

            <Link
              href="/camiones/frigorificos"
              className="bg-white p-4 rounded-lg border text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#1A4876]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-[#1A4876]" />
              </div>
              <h3 className="font-medium text-sm">Frigoríficos</h3>
            </Link>

            <Link
              href="/camiones/cisternas"
              className="bg-white p-4 rounded-lg border text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#1A4876]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-[#1A4876]" />
              </div>
              <h3 className="font-medium text-sm">Cisternas</h3>
            </Link>

            <Link
              href="/camiones/volquetes"
              className="bg-white p-4 rounded-lg border text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#1A4876]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-[#1A4876]" />
              </div>
              <h3 className="font-medium text-sm">Volquetes</h3>
            </Link>

            <Link
              href="/camiones/portacontenedores"
              className="bg-white p-4 rounded-lg border text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#1A4876]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-[#1A4876]" />
              </div>
              <h3 className="font-medium text-sm">Portacontenedores</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Publicar */}
      <section className="py-12 bg-[#1A4876] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Querés vender tu camión?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Publicá gratis y llegá a miles de compradores potenciales en toda Argentina
          </p>
          <Button asChild size="lg" className="bg-white text-[#1A4876] hover:bg-gray-100">
            <Link href="/publicar">
              <Upload className="mr-2 h-5 w-5" />
              Publicar ahora
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
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

          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} CamionAR. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
