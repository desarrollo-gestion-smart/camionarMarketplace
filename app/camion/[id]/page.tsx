"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import ContactoModal from "@/components/contacto-modal"

// Datos de ejemplo
const CAMIONES_EJEMPLO = [
  {
    id: "1",
    imagenes: [
      "/placeholder.svg?height=400&width=600&text=Volvo+FH+1",
      "/placeholder.svg?height=400&width=600&text=Volvo+FH+2",
      "/placeholder.svg?height=400&width=600&text=Volvo+FH+3",
    ],
    marca: "Volvo",
    modelo: "FH 500",
    año: 2021,
    tipo: "Tractor",
    precio: 120000,
    descripcion:
      "Camión en excelente estado con 500 CV y 12.000 km. Motor D13K Euro 6 con tecnología SCR. Cabina Globetrotter XL con dos camas. Caja de cambios I-Shift automatizada. Frenos de disco en todos los ejes. Suspensión neumática. Climatizador. Nevera. Bluetooth. GPS. Cruise control adaptativo. Sistema de frenado de emergencia. Alerta de cambio de carril.",
    ubicacion: "Madrid",
  },
  {
    id: "2",
    imagenes: [
      "/placeholder.svg?height=400&width=600&text=Scania+R450+1",
      "/placeholder.svg?height=400&width=600&text=Scania+R450+2",
      "/placeholder.svg?height=400&width=600&text=Scania+R450+3",
    ],
    marca: "Scania",
    modelo: "R450",
    año: 2020,
    tipo: "Tractor",
    precio: 110000,
    descripcion:
      "Scania R450 con 450 CV y 25.000 km. Motor DC13 Euro 6 con tecnología SCR y EGR. Cabina CR20H Highline con una cama. Caja de cambios Opticruise automatizada. Frenos de disco en todos los ejes. Suspensión neumática. Climatizador. Nevera. Bluetooth. GPS. Cruise control adaptativo. Sistema de frenado de emergencia. Alerta de cambio de carril.",
    ubicacion: "Barcelona",
  },
]

export default function CamionDetailPage() {
  const { id } = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  // Buscar el camión por ID
  const camion = CAMIONES_EJEMPLO.find((c) => c.id === id)

  if (!camion) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Camión no encontrado</h1>
          <p className="mb-8">El camión que estás buscando no existe o ha sido eliminado.</p>
          <Button asChild className="bg-[#1A4876] hover:bg-[#0d3761]">
            <a href="/camiones">Volver a camiones</a>
          </Button>
        </main>
      </>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === camion.imagenes.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? camion.imagenes.length - 1 : prev - 1))
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <Button variant="outline" asChild className="mb-6">
          <a href="/camiones">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a camiones
          </a>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galería de imágenes */}
          <div className="relative rounded-lg overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src={camion.imagenes[currentImageIndex] || "/placeholder.svg"}
                alt={`${camion.marca} ${camion.modelo}`}
                fill
                className="object-cover"
              />
            </div>

            {camion.imagenes.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Miniaturas */}
            <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
              {camion.imagenes.map((img, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-14 rounded overflow-hidden border-2 ${
                    index === currentImageIndex ? "border-[#1A4876]" : "border-transparent"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image src={img || "/placeholder.svg"} alt={`Miniatura ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Información del camión */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                  {camion.marca} {camion.modelo}
                </h1>
                <Badge className="bg-[#1A4876]">{camion.tipo}</Badge>
              </div>
              <p className="text-xl mt-2 text-[#1A4876] font-bold">{formatCurrency(camion.precio)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y">
              <div>
                <p className="text-sm text-gray-500">Marca</p>
                <p className="font-medium">{camion.marca}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Modelo</p>
                <p className="font-medium">{camion.modelo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Año</p>
                <p className="font-medium">{camion.año}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tipo</p>
                <p className="font-medium">{camion.tipo}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-gray-700 whitespace-pre-line">{camion.descripcion}</p>
            </div>

            <div className="flex items-center text-gray-700 mb-6">
              <MapPin className="h-5 w-5 mr-2 text-[#1A4876]" />
              <span>{camion.ubicacion}</span>
            </div>

            <Button className="w-full bg-[#1A4876] hover:bg-[#0d3761]" onClick={() => setIsContactModalOpen(true)}>
              <Phone className="mr-2 h-4 w-4" />
              Contactar
            </Button>
          </div>
        </div>
      </main>

      <ContactoModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        camionInfo={`${camion.marca} ${camion.modelo} (${camion.año})`}
      />
    </>
  )
}
