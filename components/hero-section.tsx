"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Imágenes de camiones reales (usando placeholders pero con nombres realistas)
const HERO_IMAGES = [
  {
    url: "/placeholder.svg?height=600&width=1200&text=Volvo+FH16+750",
    alt: "Volvo FH16 750",
    title: "Descubre los mejores camiones del mercado",
    subtitle: "Miles de opciones para tu flota",
  },
  {
    url: "/placeholder.svg?height=600&width=1200&text=Scania+S730+V8",
    alt: "Scania S730 V8",
    title: "Potencia y rendimiento sin igual",
    subtitle: "Encuentra el camión perfecto para tu negocio",
  },
  {
    url: "/placeholder.svg?height=600&width=1200&text=Mercedes+Actros+2653",
    alt: "Mercedes Actros 2653",
    title: "Tecnología de vanguardia",
    subtitle: "Camiones con las últimas innovaciones",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("todos")

  // Cambiar slide automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_IMAGES.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_IMAGES.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para buscar camiones
    console.log("Buscando:", searchTerm, "Tipo:", selectedType)
    // Redireccionar a la página de resultados
    // router.push(`/camiones?search=${searchTerm}&tipo=${selectedType}`)
  }

  return (
    <section className="relative">
      {/* Slider de imágenes */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
              <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 max-w-3xl">{image.title}</h1>
              <p className="text-xl md:text-2xl text-center mb-8">{image.subtitle}</p>
            </div>
          </div>
        ))}

        {/* Controles del slider */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm"
          onClick={prevSlide}
          aria-label="Anterior"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm"
          onClick={nextSlide}
          aria-label="Siguiente"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              } transition-colors`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Buscador */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-4xl z-40">
        <form
          onSubmit={handleSearch}
          className="mx-4 flex flex-col md:flex-row gap-2 p-4 bg-white rounded-lg shadow-lg"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="¿Qué camión estás buscando?"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Tipo de camión" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los tipos</SelectItem>
              <SelectItem value="tractor">Tractores</SelectItem>
              <SelectItem value="rigido">Rígidos</SelectItem>
              <SelectItem value="frigorifico">Frigoríficos</SelectItem>
              <SelectItem value="cisterna">Cisternas</SelectItem>
              <SelectItem value="volquete">Volquetes</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="bg-camionar hover:bg-camionar-dark">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </form>
      </div>
    </section>
  )
}
