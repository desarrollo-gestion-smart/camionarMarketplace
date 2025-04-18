"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"
import { Clock, MapPin } from "lucide-react"

// Datos de ejemplo ampliados
const CAMIONES_DESTACADOS = [
  {
    id: "1",
    imagen: "/placeholder.svg?height=200&width=300&text=Volvo+FH+500",
    marca: "Volvo",
    modelo: "FH 500",
    año: 2021,
    tipo: "Tractor",
    precio: 120000000,
    ubicacion: "Buenos Aires",
    km: 12000,
    publicado: "Hace 2 días",
    destacado: true,
    condicion: "Usado",
    categoria: "ofertas",
  },
  {
    id: "2",
    imagen: "/placeholder.svg?height=200&width=300&text=Scania+R450",
    marca: "Scania",
    modelo: "R450 Streamline",
    año: 2020,
    tipo: "Tractor",
    precio: 145000000,
    ubicacion: "Córdoba",
    km: 25000,
    publicado: "Hace 5 días",
    destacado: true,
    condicion: "Usado",
    categoria: "ofertas",
  },
  {
    id: "3",
    imagen: "/placeholder.svg?height=200&width=300&text=Mercedes+Actros",
    marca: "Mercedes-Benz",
    modelo: "Actros 1845",
    año: 2019,
    tipo: "Tractor",
    precio: 135000000,
    ubicacion: "Santa Fe",
    km: 40000,
    publicado: "Hoy",
    destacado: false,
    condicion: "Usado",
    categoria: "recientes",
  },
  {
    id: "4",
    imagen: "/placeholder.svg?height=200&width=300&text=MAN+TGX",
    marca: "MAN",
    modelo: "TGX 18.500",
    año: 2020,
    tipo: "Tractor",
    precio: 140000000,
    ubicacion: "Entre Ríos",
    km: 30000,
    publicado: "Ayer",
    destacado: false,
    condicion: "Usado",
    categoria: "recientes",
  },
  {
    id: "5",
    imagen: "/placeholder.svg?height=200&width=300&text=DAF+XF+530",
    marca: "DAF",
    modelo: "XF 530",
    año: 2022,
    tipo: "Tractor",
    precio: 160000000,
    ubicacion: "Mendoza",
    km: 5000,
    publicado: "Hace 3 días",
    destacado: true,
    condicion: "Usado",
    categoria: "ofertas",
  },
  {
    id: "6",
    imagen: "/placeholder.svg?height=200&width=300&text=Iveco+S-Way",
    marca: "Iveco",
    modelo: "S-Way 460",
    año: 2022,
    tipo: "Tractor",
    precio: 155000000,
    ubicacion: "Tucumán",
    km: 8000,
    publicado: "Hace 1 semana",
    destacado: false,
    condicion: "Usado",
    categoria: "recientes",
  },
  {
    id: "7",
    imagen: "/placeholder.svg?height=200&width=300&text=Volvo+FM+420",
    marca: "Volvo",
    modelo: "FM 420",
    año: 2018,
    tipo: "Rígido",
    precio: 85000000,
    ubicacion: "Rosario",
    km: 60000,
    publicado: "Hace 2 semanas",
    destacado: false,
    condicion: "Usado",
    categoria: "ofertas",
  },
  {
    id: "8",
    imagen: "/placeholder.svg?height=200&width=300&text=Scania+G410",
    marca: "Scania",
    modelo: "G410",
    año: 2019,
    tipo: "Frigorífico",
    precio: 90000000,
    ubicacion: "La Plata",
    km: 50000,
    publicado: "Hace 4 días",
    destacado: true,
    condicion: "Usado",
    categoria: "recientes",
  },
]

export default function FeaturedTrucks() {
  const [activeTab, setActiveTab] = useState("todos")

  // Filtrar camiones según la pestaña activa
  const filteredTrucks = CAMIONES_DESTACADOS.filter((camion) => {
    if (activeTab === "todos") return true
    if (activeTab === "ofertas") return camion.categoria === "ofertas"
    if (activeTab === "recientes") return camion.categoria === "recientes"
    if (activeTab === "destacados") return camion.destacado
    return true
  })

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Camiones destacados</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="ofertas">Ofertas</TabsTrigger>
              <TabsTrigger value="recientes">Recientes</TabsTrigger>
              <TabsTrigger value="destacados">Destacados</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTrucks.map((camion) => (
            <div
              key={camion.id}
              className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <div className="absolute top-0 left-0 bg-camionar text-white text-xs px-2 py-1 rounded-br-lg">
                  {camion.publicado}
                </div>
                {camion.destacado && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                    Destacado
                  </div>
                )}
                <Image
                  src={camion.imagen || "/placeholder.svg"}
                  alt={`${camion.marca} ${camion.modelo}`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">
                    {camion.marca} {camion.modelo}
                  </h3>
                  <Badge variant="outline" className="bg-gray-100">
                    {camion.tipo}
                  </Badge>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {camion.año} • {camion.km.toLocaleString()} km
                  </span>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{camion.ubicacion}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-xl text-camionar">{formatCurrency(camion.precio)}</p>
                  <Button asChild size="sm" variant="outline" className="border-camionar text-camionar">
                    <Link href={`/camiones/${camion.id}`}>Ver más</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild className="bg-camionar hover:bg-camionar-dark">
            <Link href="/camiones" className="text-color-[#1A4876]">Ver todos los camiones</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
