"use client"

import { useState, useCallback } from "react"
import Navbar from "@/components/navbar"
import MaquinariaCard from "@/components/maquinaria-card"
import MaquinariaFilters, { type FilterValues } from "@/components/maquinaria-filters"
import { Button } from "@/components/ui/button"
import { Grid3X3, List } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo
const TRACTORES_EJEMPLO = [
  {
    id: "1",
    imagen: "/placeholder.svg?height=225&width=400&text=John+Deere+6130J",
    titulo: "Tractor John Deere 6130J - Excelente estado",
    marca: "John Deere",
    modelo: "6130J",
    año: 2018,
    tipo: "tractores",
    precio: 25000000,
    potencia: 130,
    ubicacion: "Buenos Aires",
    condicion: "Usado",
    fechaPublicacion: "Hace 2 días",
    descripcion: "Tractor John Deere 6130J con 130 HP, 2500 horas de uso. Excelente estado, service al día.",
  },
  {
    id: "2",
    imagen: "/placeholder.svg?height=225&width=400&text=New+Holland+T7",
    titulo: "Tractor New Holland T7.240 - Poco uso",
    marca: "New Holland",
    modelo: "T7.240",
    año: 2020,
    tipo: "tractores",
    precio: 35000000,
    potencia: 240,
    ubicacion: "Córdoba",
    condicion: "Usado",
    fechaPublicacion: "Hace 5 días",
    descripcion: "Tractor New Holland T7.240 con 240 HP, 1200 horas de uso. Excelente estado, service al día.",
  },
  {
    id: "3",
    imagen: "/placeholder.svg?height=225&width=400&text=Massey+Ferguson+7215",
    titulo: "Tractor Massey Ferguson 7215 - Oportunidad",
    marca: "Massey Ferguson",
    modelo: "7215",
    año: 2017,
    tipo: "tractores",
    precio: 22000000,
    potencia: 215,
    ubicacion: "Santa Fe",
    condicion: "Usado",
    fechaPublicacion: "Hace 1 semana",
    descripcion: "Tractor Massey Ferguson 7215 con 215 HP, 3000 horas de uso. Buen estado, service al día.",
  },
  {
    id: "4",
    imagen: "/placeholder.svg?height=225&width=400&text=Case+IH+Puma+185",
    titulo: "Tractor Case IH Puma 185 - Impecable",
    marca: "Case IH",
    modelo: "Puma 185",
    año: 2019,
    tipo: "tractores",
    precio: 28000000,
    potencia: 185,
    ubicacion: "Entre Ríos",
    condicion: "Usado",
    fechaPublicacion: "Hace 3 días",
    descripcion: "Tractor Case IH Puma 185 con 185 HP, 1800 horas de uso. Impecable estado, service al día.",
  },
  {
    id: "5",
    imagen: "/placeholder.svg?height=225&width=400&text=Deutz-Fahr+6165",
    titulo: "Tractor Deutz-Fahr 6165 - Buen precio",
    marca: "Deutz-Fahr",
    modelo: "6165",
    año: 2016,
    tipo: "tractores",
    precio: 20000000,
    potencia: 165,
    ubicacion: "La Pampa",
    condicion: "Usado",
    fechaPublicacion: "Hace 1 semana",
    descripcion: "Tractor Deutz-Fahr 6165 con 165 HP, 3500 horas de uso. Buen estado, service al día.",
  },
  {
    id: "6",
    imagen: "/placeholder.svg?height=225&width=400&text=Valtra+BH180",
    titulo: "Tractor Valtra BH180 - Financiación disponible",
    marca: "Valtra",
    modelo: "BH180",
    año: 2018,
    tipo: "tractores",
    precio: 23000000,
    potencia: 180,
    ubicacion: "Tucumán",
    condicion: "Usado",
    fechaPublicacion: "Hace 4 días",
    descripcion: "Tractor Valtra BH180 con 180 HP, 2200 horas de uso. Excelente estado, service al día.",
  },
  {
    id: "7",
    imagen: "/placeholder.svg?height=225&width=400&text=John+Deere+7230J",
    titulo: "Tractor John Deere 7230J - Único dueño",
    marca: "John Deere",
    modelo: "7230J",
    año: 2019,
    tipo: "tractores",
    precio: 32000000,
    potencia: 230,
    ubicacion: "Buenos Aires",
    condicion: "Usado",
    fechaPublicacion: "Hace 2 días",
    descripcion: "Tractor John Deere 7230J con 230 HP, 1600 horas de uso. Excelente estado, único dueño.",
  },
  {
    id: "8",
    imagen: "/placeholder.svg?height=225&width=400&text=New+Holland+T6.180",
    titulo: "Tractor New Holland T6.180 - Oportunidad",
    marca: "New Holland",
    modelo: "T6.180",
    año: 2017,
    tipo: "tractores",
    precio: 21000000,
    potencia: 180,
    ubicacion: "Córdoba",
    condicion: "Usado",
    fechaPublicacion: "Hace 1 semana",
    descripcion: "Tractor New Holland T6.180 con 180 HP, 2800 horas de uso. Buen estado, service al día.",
  },
]

export default function TractoresPage() {
  const [filteredTractores, setFilteredTractores] = useState(TRACTORES_EJEMPLO)
  const [viewMode, setViewMode] = useState("grid") // grid o list
  const [sortBy, setSortBy] = useState("recientes")

  const handleFilterChange = useCallback(
    (filters: FilterValues) => {
      const filtered = TRACTORES_EJEMPLO.filter((tractor) => {
        // Filtro por marca
        if (filters.marca !== "Todas" && tractor.marca !== filters.marca) {
          return false
        }

        // Filtro por año
        if (tractor.año < filters.añoMin || tractor.año > filters.añoMax) {
          return false
        }

        // Filtro por precio
        if (tractor.precio < filters.precioMin || tractor.precio > filters.precioMax) {
          return false
        }

        // Filtro por potencia
        if (tractor.potencia < filters.potenciaMin || tractor.potencia > filters.potenciaMax) {
          return false
        }

        // Filtro por ubicación
        if (filters.ubicacion !== "Todas" && tractor.ubicacion !== filters.ubicacion) {
          return false
        }

        // Filtro por condición
        if (filters.condicion.length > 0 && !filters.condicion.includes(tractor.condicion)) {
          return false
        }

        return true
      })

      // Ordenar resultados
      const sortedResults = [...filtered]

      switch (sortBy) {
        case "recientes":
          // Ya están ordenados por fecha en los datos de ejemplo
          break
        case "precio_asc":
          sortedResults.sort((a, b) => a.precio - b.precio)
          break
        case "precio_desc":
          sortedResults.sort((a, b) => b.precio - a.precio)
          break
        case "año_asc":
          sortedResults.sort((a, b) => a.año - b.año)
          break
        case "año_desc":
          sortedResults.sort((a, b) => b.año - a.año)
          break
      }

      setFilteredTractores(sortedResults)
    },
    [sortBy],
  )

  const handleSortChange = (value: string) => {
    setSortBy(value)

    // Reordenar los resultados actuales
    let sortedResults = [...filteredTractores]

    switch (value) {
      case "recientes":
        // Mantener el orden original de los datos de ejemplo
        sortedResults = TRACTORES_EJEMPLO.filter((item) =>
          filteredTractores.some((filtered) => filtered.id === item.id),
        )
        break
      case "precio_asc":
        sortedResults.sort((a, b) => a.precio - b.precio)
        break
      case "precio_desc":
        sortedResults.sort((a, b) => b.precio - a.precio)
        break
      case "año_asc":
        sortedResults.sort((a, b) => a.año - b.año)
        break
      case "año_desc":
        sortedResults.sort((a, b) => b.año - a.año)
        break
    }

    setFilteredTractores(sortedResults)
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-4 mb-6">
          <h1 className="text-3xl font-bold text-[#1A4876]">Tractores Usados</h1>
          <p className="text-gray-600">
            Encuentra los mejores tractores usados de las principales marcas: John Deere, New Holland, Massey Ferguson y
            más.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtros */}
          <div className="w-full md:w-1/4">
            <MaquinariaFilters onFilterChange={handleFilterChange} tipo="tractores" />
          </div>

          {/* Resultados */}
          <div className="w-full md:w-3/4">
            {/* Barra de herramientas */}
            <div className="bg-white rounded-lg border p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-500">{filteredTractores.length} resultados encontrados</div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex-1 sm:flex-none">
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recientes">Más recientes</SelectItem>
                      <SelectItem value="precio_asc">Menor precio</SelectItem>
                      <SelectItem value="precio_desc">Mayor precio</SelectItem>
                      <SelectItem value="año_asc">Año (menor a mayor)</SelectItem>
                      <SelectItem value="año_desc">Año (mayor a menor)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Tabs value={viewMode} onValueChange={setViewMode} className="hidden sm:block">
                  <TabsList className="h-9">
                    <TabsTrigger value="grid" className="px-3">
                      <Grid3X3 className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="list" className="px-3">
                      <List className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Lista de resultados */}
            {filteredTractores.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col space-y-4"
                }
              >
                {filteredTractores.map((tractor) => (
                  <MaquinariaCard
                    key={tractor.id}
                    id={tractor.id}
                    imagen={tractor.imagen}
                    titulo={tractor.titulo}
                    marca={tractor.marca}
                    modelo={tractor.modelo}
                    año={tractor.año}
                    tipo={tractor.tipo}
                    precio={tractor.precio}
                    ubicacion={tractor.ubicacion}
                    fechaPublicacion={tractor.fechaPublicacion}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border">
                <p className="text-lg text-gray-500">No se encontraron tractores con los filtros seleccionados</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFilteredTractores(TRACTORES_EJEMPLO)
                  }}
                >
                  Ver todos los tractores
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
