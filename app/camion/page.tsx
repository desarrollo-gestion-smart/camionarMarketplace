"use client"

import { useState, useCallback } from "react"
import Navbar from "@/components/navbar"
import CamionCard from "@/components/camion-card"
import CamionFilters, { type FilterValues } from "@/components/camion-filters"
import { Button } from "@/components/ui/button"
import { Grid3X3, List } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo
const CAMIONES_EJEMPLO = [
  {
    id: "1",
    imagen: "/placeholder.svg?height=225&width=400&text=Volvo+FH",
    marca: "Volvo",
    modelo: "FH 500",
    año: 2021,
    tipo: "Tractor",
    precio: 120000000,
    descripcion: "Camión en excelente estado con 500 CV y 12.000 km.",
    ubicacion: "Buenos Aires",
    fechaPublicacion: "Hace 2 días",
  },
  {
    id: "2",
    imagen: "/placeholder.svg?height=225&width=400&text=Scania+R450",
    marca: "Scania",
    modelo: "R450",
    año: 2020,
    tipo: "Tractor",
    precio: 110000000,
    descripcion: "Scania R450 con 450 CV y 25.000 km.",
    ubicacion: "Córdoba",
    fechaPublicacion: "Hace 5 días",
  },
  {
    id: "3",
    imagen: "/placeholder.svg?height=225&width=400&text=Mercedes+Actros",
    marca: "Mercedes-Benz",
    modelo: "Actros 1845",
    año: 2019,
    tipo: "Tractor",
    precio: 95000000,
    descripcion: "Mercedes Actros 1845 con 450 CV y 40.000 km.",
    ubicacion: "Santa Fe",
    fechaPublicacion: "Hace 1 semana",
  },
  {
    id: "4",
    imagen: "/placeholder.svg?height=225&width=400&text=MAN+TGX",
    marca: "MAN",
    modelo: "TGX 18.500",
    año: 2020,
    tipo: "Tractor",
    precio: 105000000,
    descripcion: "MAN TGX 18.500 con 500 CV y 30.000 km.",
    ubicacion: "Entre Ríos",
    fechaPublicacion: "Hace 3 días",
  },
  {
    id: "5",
    imagen: "/placeholder.svg?height=225&width=400&text=DAF+XF",
    marca: "DAF",
    modelo: "XF 480",
    año: 2021,
    tipo: "Tractor",
    precio: 115000000,
    descripcion: "DAF XF 480 con 480 CV y 15.000 km.",
    ubicacion: "Mendoza",
    fechaPublicacion: "Hace 1 día",
  },
  {
    id: "6",
    imagen: "/placeholder.svg?height=225&width=400&text=Iveco+S-Way",
    marca: "Iveco",
    modelo: "S-Way 460",
    año: 2022,
    tipo: "Tractor",
    precio: 125000000,
    descripcion: "Iveco S-Way 460 con 460 CV y 5.000 km.",
    ubicacion: "Tucumán",
    fechaPublicacion: "Hace 4 días",
  },
  {
    id: "7",
    imagen: "/placeholder.svg?height=225&width=400&text=Volvo+FM",
    marca: "Volvo",
    modelo: "FM 420",
    año: 2018,
    tipo: "Rígido",
    precio: 85000000,
    descripcion: "Volvo FM 420 con 420 CV y 60.000 km.",
    ubicacion: "Salta",
    fechaPublicacion: "Hace 1 semana",
  },
  {
    id: "8",
    imagen: "/placeholder.svg?height=225&width=400&text=Scania+G410",
    marca: "Scania",
    modelo: "G410",
    año: 2019,
    tipo: "Frigorífico",
    precio: 90000000,
    descripcion: "Scania G410 con 410 CV y 50.000 km.",
    ubicacion: "Rosario",
    fechaPublicacion: "Hace 6 días",
  },
]

export default function CamionesPage() {
  const [filteredCamiones, setFilteredCamiones] = useState(CAMIONES_EJEMPLO)
  const [viewMode, setViewMode] = useState("grid") // grid o list
  const [sortBy, setSortBy] = useState("recientes")

  const handleFilterChange = useCallback(
    (filters: FilterValues) => {
      const filtered = CAMIONES_EJEMPLO.filter((camion) => {
        // Filtro por marca
        if (filters.marca !== "Todas" && camion.marca !== filters.marca) {
          return false
        }

        // Filtro por año
        if (camion.año < filters.añoMin || camion.año > filters.añoMax) {
          return false
        }

        // Filtro por precio
        if (camion.precio < filters.precioMin || camion.precio > filters.precioMax) {
          return false
        }

        // Filtro por tipo
        if (filters.tipos.length > 0 && !filters.tipos.includes(camion.tipo)) {
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

      setFilteredCamiones(sortedResults)
    },
    [sortBy],
  )

  const handleSortChange = (value: string) => {
    setSortBy(value)

    // Reordenar los resultados actuales
    let sortedResults = [...filteredCamiones]

    switch (value) {
      case "recientes":
        // Mantener el orden original de los datos de ejemplo
        sortedResults = CAMIONES_EJEMPLO.filter((item) => filteredCamiones.some((filtered) => filtered.id === item.id))
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

    setFilteredCamiones(sortedResults)
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-4 mb-6">
          <h1 className="text-3xl font-bold text-[#1A4876]">Camiones disponibles</h1>
          <p className="text-gray-600">
            Encuentra los mejores camiones de las principales marcas: Volvo, Scania, Mercedes-Benz y más.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtros */}
          <div className="w-full md:w-1/4">
            <CamionFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Resultados */}
          <div className="w-full md:w-3/4">
            {/* Barra de herramientas */}
            <div className="bg-white rounded-lg border p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-500">{filteredCamiones.length} resultados encontrados</div>

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
            {filteredCamiones.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col space-y-4"
                }
              >
                {filteredCamiones.map((camion) => (
                  <CamionCard
                    key={camion.id}
                    id={camion.id}
                    imagen={camion.imagen}
                    marca={camion.marca}
                    modelo={camion.modelo}
                    año={camion.año}
                    tipo={camion.tipo}
                    precio={camion.precio}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border">
                <p className="text-lg text-gray-500">No se encontraron camiones con los filtros seleccionados</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFilteredCamiones(CAMIONES_EJEMPLO)
                  }}
                >
                  Ver todos los camiones
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
