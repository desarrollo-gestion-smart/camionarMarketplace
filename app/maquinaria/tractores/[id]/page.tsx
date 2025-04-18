"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, Phone, Calendar, Tractor, Info, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Datos de ejemplo
const TRACTORES_EJEMPLO = [
  {
    id: "1",
    imagenes: [
      "/placeholder.svg?height=400&width=600&text=John+Deere+6130J+1",
      "/placeholder.svg?height=400&width=600&text=John+Deere+6130J+2",
      "/placeholder.svg?height=400&width=600&text=John+Deere+6130J+3",
      "/placeholder.svg?height=400&width=600&text=John+Deere+6130J+4",
    ],
    titulo: "Tractor John Deere 6130J - Excelente estado",
    marca: "John Deere",
    modelo: "6130J",
    año: 2018,
    tipo: "tractores",
    precio: 25000000,
    potencia: 130,
    horasUso: 2500,
    traccion: "4x4",
    ubicacion: "Buenos Aires",
    condicion: "Usado",
    fechaPublicacion: "Hace 2 días",
    descripcion:
      "Tractor John Deere 6130J con 130 HP, 2500 horas de uso. Excelente estado, service al día. Cabina con aire acondicionado y calefacción. Transmisión PowerQuad. Levante hidráulico de 3 puntos. Toma de fuerza 540/1000 RPM. Neumáticos en buen estado. Documentación al día. Listo para trabajar.",
    vendedor: {
      nombre: "Agrícola del Sur",
      telefono: "+54 11 1234-5678",
      email: "contacto@agricoladelsur.com",
      ubicacion: "Buenos Aires, Argentina",
      verificado: true,
    },
  },
  {
    id: "2",
    imagenes: [
      "/placeholder.svg?height=400&width=600&text=New+Holland+T7.240+1",
      "/placeholder.svg?height=400&width=600&text=New+Holland+T7.240+2",
      "/placeholder.svg?height=400&width=600&text=New+Holland+T7.240+3",
    ],
    titulo: "Tractor New Holland T7.240 - Poco uso",
    marca: "New Holland",
    modelo: "T7.240",
    año: 2020,
    tipo: "tractores",
    precio: 35000000,
    potencia: 240,
    horasUso: 1200,
    traccion: "4x4",
    ubicacion: "Córdoba",
    condicion: "Usado",
    fechaPublicacion: "Hace 5 días",
    descripcion:
      "Tractor New Holland T7.240 con 240 HP, 1200 horas de uso. Excelente estado, service al día. Cabina con aire acondicionado y calefacción. Transmisión automática. Levante hidráulico de 3 puntos. Toma de fuerza 540/1000 RPM. Neumáticos en excelente estado. Documentación al día. Listo para trabajar.",
    vendedor: {
      nombre: "Maquinaria Agrícola Córdoba",
      telefono: "+54 351 2345-6789",
      email: "ventas@maquinariascordoba.com",
      ubicacion: "Córdoba, Argentina",
      verificado: true,
    },
  },
]

export default function TractorDetailPage() {
  const { id } = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("descripcion")

  // Buscar el tractor por ID
  const tractor = TRACTORES_EJEMPLO.find((t) => t.id === id)

  if (!tractor) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Tractor no encontrado</h1>
          <p className="mb-8">El tractor que estás buscando no existe o ha sido eliminado.</p>
          <Button asChild className="bg-[#1A4876] hover:bg-[#0d3761]">
            <a href="/maquinaria/tractores">Volver a tractores</a>
          </Button>
        </main>
      </>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === tractor.imagenes.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? tractor.imagenes.length - 1 : prev - 1))
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <Button variant="outline" asChild className="mb-6">
          <a href="/maquinaria/tractores">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a tractores
          </a>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Galería de imágenes */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={tractor.imagenes[currentImageIndex] || "/placeholder.svg"}
                  alt={tractor.titulo}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 left-0 bg-[#1A4876] text-white text-xs px-2 py-1">
                  {tractor.condicion.toUpperCase()}
                </div>
              </div>

              {tractor.imagenes.length > 1 && (
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
                {tractor.imagenes.map((img, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-14 rounded overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-[#1A4876]" : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs de información */}
            <div className="mt-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                  <TabsTrigger value="caracteristicas">Características</TabsTrigger>
                </TabsList>
                <TabsContent value="descripcion" className="p-4 border rounded-b-lg bg-white">
                  <p className="whitespace-pre-line">{tractor.descripcion}</p>
                </TabsContent>
                <TabsContent value="caracteristicas" className="p-4 border rounded-b-lg bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Tractor className="h-5 w-5 text-[#1A4876]" />
                      <span className="font-medium">Marca:</span>
                      <span>{tractor.marca}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Info className="h-5 w-5 text-[#1A4876]" />
                      <span className="font-medium">Modelo:</span>
                      <span>{tractor.modelo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-[#1A4876]" />
                      <span className="font-medium">Año:</span>
                      <span>{tractor.año}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Info className="h-5 w-5 text-[#1A4876]" />
                      <span className="font-medium">Potencia:</span>
                      <span>{tractor.potencia} HP</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-[#1A4876]" />
                      <span className="font-medium">Horas de uso:</span>
                      <span>{tractor.horasUso}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Info className="h-5 w-5 text-[#1A4876]" />
                      <span className="font-medium">Tracción:</span>
                      <span>{tractor.traccion}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-[#1A4876]" />
                      <span className="font-medium">Ubicación:</span>
                      <span>{tractor.ubicacion}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Info className="h-5 w-5 text-[#1A4876]" />
                      <span className="font-medium">Condición:</span>
                      <span>{tractor.condicion}</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Información del tractor y vendedor */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{tractor.titulo}</h1>
                <p className="text-2xl font-bold text-[#1A4876]">{formatCurrency(tractor.precio)}</p>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-6">
                <Clock className="h-4 w-4 mr-1" />
                <span>Publicado: {tractor.fechaPublicacion}</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Tractor className="h-5 w-5 text-[#1A4876] mr-2" />
                  <span className="font-medium mr-2">Marca:</span>
                  <span>{tractor.marca}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-[#1A4876] mr-2" />
                  <span className="font-medium mr-2">Año:</span>
                  <span>{tractor.año}</span>
                </div>
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-[#1A4876] mr-2" />
                  <span className="font-medium mr-2">Potencia:</span>
                  <span>{tractor.potencia} HP</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-[#1A4876] mr-2" />
                  <span className="font-medium mr-2">Ubicación:</span>
                  <span>{tractor.ubicacion}</span>
                </div>
              </div>

              <Button className="w-full bg-[#1A4876] hover:bg-[#0d3761]" onClick={() => setIsContactModalOpen(true)}>
                <Phone className="mr-2 h-4 w-4" />
                Contactar vendedor
              </Button>
            </div>

            {/* Información del vendedor */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Información del vendedor</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{tractor.vendedor.nombre}</span>
                  {tractor.vendedor.verificado && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verificado</Badge>
                  )}
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {tractor.vendedor.ubicacion}
                </div>

                <Button
                  variant="outline"
                  className="w-full border-[#1A4876] text-[#1A4876] hover:bg-[#1A4876] hover:text-white"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Ver teléfono
                </Button>

                <Button className="w-full bg-[#1A4876] hover:bg-[#0d3761]" onClick={() => setIsContactModalOpen(true)}>
                  Enviar mensaje
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de contacto */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#1A4876]">Contactar al vendedor</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium mb-2">{tractor.titulo}</h3>
              <p className="text-lg font-bold text-[#1A4876]">{formatCurrency(tractor.precio)}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Datos del vendedor</h3>
              <div className="space-y-2">
                <p>{tractor.vendedor.nombre}</p>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-[#1A4876]" />
                  {tractor.vendedor.telefono}
                </p>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-[#1A4876]" />
                  {tractor.vendedor.ubicacion}
                </p>
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" placeholder="Tu nombre" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Tu email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" placeholder="Tu teléfono" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea
                  id="mensaje"
                  rows={4}
                  placeholder="Estoy interesado en este tractor. Por favor contáctame para más información."
                />
              </div>
            </form>
          </div>

          <DialogFooter>
            <Button className="w-full bg-[#1A4876] hover:bg-[#0d3761]">Enviar mensaje</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
