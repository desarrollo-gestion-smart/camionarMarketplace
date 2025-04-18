"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Search, ChevronDown, ChevronUp } from "lucide-react"

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void
  tipo: string
}

export interface FilterValues {
  marca: string
  añoMin: number
  añoMax: number
  precioMin: number
  precioMax: number
  potenciaMin: number
  potenciaMax: number
  ubicacion: string
  condicion: string[]
}

// Datos de ejemplo para los filtros
const MARCAS_TRACTORES = ["Todas", "John Deere", "New Holland", "Massey Ferguson", "Case IH", "Deutz-Fahr", "Valtra"]
const MARCAS_COSECHADORAS = ["Todas", "John Deere", "New Holland", "Case IH", "Claas", "Massey Ferguson", "Deutz-Fahr"]
const MARCAS_SEMBRADORAS = ["Todas", "Agrometal", "Crucianelli", "Giorgi", "Apache", "Bertini", "John Deere"]
const MARCAS_PULVERIZADORAS = ["Todas", "Metalfor", "Pla", "John Deere", "Case IH", "Jacto", "Praba"]
const MARCAS_IMPLEMENTOS = ["Todas", "Mainero", "Akron", "Ombu", "Cestari", "Richiger", "Agromec"]

const UBICACIONES = ["Todas", "Buenos Aires", "Córdoba", "Santa Fe", "Entre Ríos", "La Pampa", "Tucumán", "Salta"]
const CONDICIONES = ["Usado", "Nuevo"]

const currentYear = new Date().getFullYear()
const MIN_YEAR = 1980
const MAX_YEAR = currentYear
const MIN_PRICE = 0
const MAX_PRICE = 100000000
const MIN_POTENCIA = 0
const MAX_POTENCIA = 500

export default function MaquinariaFilters({ onFilterChange, tipo }: FiltersProps) {
  // Determinar qué marcas mostrar según el tipo
  const getMarcasByTipo = () => {
    switch (tipo.toLowerCase()) {
      case "tractores":
        return MARCAS_TRACTORES
      case "cosechadoras":
        return MARCAS_COSECHADORAS
      case "sembradoras":
        return MARCAS_SEMBRADORAS
      case "pulverizadoras":
        return MARCAS_PULVERIZADORAS
      case "implementos":
        return MARCAS_IMPLEMENTOS
      default:
        return MARCAS_TRACTORES
    }
  }

  const [filters, setFilters] = useState<FilterValues>({
    marca: "Todas",
    añoMin: MIN_YEAR,
    añoMax: MAX_YEAR,
    precioMin: MIN_PRICE,
    precioMax: MAX_PRICE,
    potenciaMin: MIN_POTENCIA,
    potenciaMax: MAX_POTENCIA,
    ubicacion: "Todas",
    condicion: ["Usado"],
  })

  const [precioRange, setPrecioRange] = useState([MIN_PRICE, MAX_PRICE])
  const [añoRange, setAñoRange] = useState([MIN_YEAR, MAX_YEAR])
  const [potenciaRange, setPotenciaRange] = useState([MIN_POTENCIA, MAX_POTENCIA])

  // Estados para controlar la visibilidad de cada sección de filtros
  const [showMarca, setShowMarca] = useState(true)
  const [showAño, setShowAño] = useState(true)
  const [showPrecio, setShowPrecio] = useState(true)
  const [showPotencia, setShowPotencia] = useState(true)
  const [showUbicacion, setShowUbicacion] = useState(true)
  const [showCondicion, setShowCondicion] = useState(true)

  const handleMarcaChange = (value: string) => {
    const newFilters = { ...filters, marca: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleAñoRangeChange = (values: number[]) => {
    setAñoRange(values)
    const newFilters = {
      ...filters,
      añoMin: values[0],
      añoMax: values[1],
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePrecioRangeChange = (values: number[]) => {
    setPrecioRange(values)
    const newFilters = {
      ...filters,
      precioMin: values[0],
      precioMax: values[1],
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePotenciaRangeChange = (values: number[]) => {
    setPotenciaRange(values)
    const newFilters = {
      ...filters,
      potenciaMin: values[0],
      potenciaMax: values[1],
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleUbicacionChange = (value: string) => {
    const newFilters = { ...filters, ubicacion: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleCondicionChange = (condicion: string, checked: boolean) => {
    const newCondiciones = checked
      ? [...filters.condicion, condicion]
      : filters.condicion.filter((c) => c !== condicion)

    const newFilters = { ...filters, condicion: newCondiciones }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const resetFilters = () => {
    const defaultFilters = {
      marca: "Todas",
      añoMin: MIN_YEAR,
      añoMax: MAX_YEAR,
      precioMin: MIN_PRICE,
      precioMax: MAX_PRICE,
      potenciaMin: MIN_POTENCIA,
      potenciaMax: MAX_POTENCIA,
      ubicacion: "Todas",
      condicion: ["Usado"],
    }
    setFilters(defaultFilters)
    setAñoRange([MIN_YEAR, MAX_YEAR])
    setPrecioRange([MIN_PRICE, MAX_PRICE])
    setPotenciaRange([MIN_POTENCIA, MAX_POTENCIA])
    onFilterChange(defaultFilters)
  }

  return (
    <div className="space-y-4 bg-white rounded-lg border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium text-[#1A4876]">Filtros</h3>
      </div>

      {/* Buscador */}
      <div className="p-4 border-b">
        <div className="relative">
          <Input placeholder="Buscar..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Filtro por marca */}
      <div className="border-b">
        <button
          className="flex items-center justify-between w-full p-4 text-left font-medium"
          onClick={() => setShowMarca(!showMarca)}
        >
          Marca
          {showMarca ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {showMarca && (
          <div className="p-4 pt-0">
            <Select value={filters.marca} onValueChange={handleMarcaChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar marca" />
              </SelectTrigger>
              <SelectContent>
                {getMarcasByTipo().map((marca) => (
                  <SelectItem key={marca} value={marca}>
                    {marca}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Filtro por año */}
      <div className="border-b">
        <button
          className="flex items-center justify-between w-full p-4 text-left font-medium"
          onClick={() => setShowAño(!showAño)}
        >
          Año
          {showAño ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {showAño && (
          <div className="p-4 pt-0">
            <div className="pt-6 pb-2">
              <Slider min={MIN_YEAR} max={MAX_YEAR} step={1} value={añoRange} onValueChange={handleAñoRangeChange} />
            </div>
            <div className="flex items-center justify-between">
              <Input
                type="number"
                min={MIN_YEAR}
                max={MAX_YEAR}
                value={filters.añoMin}
                onChange={(e) => handleAñoRangeChange([Number.parseInt(e.target.value), filters.añoMax])}
                className="w-20"
              />
              <span>-</span>
              <Input
                type="number"
                min={MIN_YEAR}
                max={MAX_YEAR}
                value={filters.añoMax}
                onChange={(e) => handleAñoRangeChange([filters.añoMin, Number.parseInt(e.target.value)])}
                className="w-20"
              />
            </div>
          </div>
        )}
      </div>

      {/* Filtro por precio */}
      <div className="border-b">
        <button
          className="flex items-center justify-between w-full p-4 text-left font-medium"
          onClick={() => setShowPrecio(!showPrecio)}
        >
          Precio
          {showPrecio ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {showPrecio && (
          <div className="p-4 pt-0">
            <div className="pt-6 pb-2">
              <Slider
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={1000000}
                value={precioRange}
                onValueChange={handlePrecioRangeChange}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>{formatCurrency(filters.precioMin)}</span>
              <span>{formatCurrency(filters.precioMax)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Filtro por potencia (solo para tractores y cosechadoras) */}
      {(tipo.toLowerCase() === "tractores" || tipo.toLowerCase() === "cosechadoras") && (
        <div className="border-b">
          <button
            className="flex items-center justify-between w-full p-4 text-left font-medium"
            onClick={() => setShowPotencia(!showPotencia)}
          >
            Potencia (HP)
            {showPotencia ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showPotencia && (
            <div className="p-4 pt-0">
              <div className="pt-6 pb-2">
                <Slider
                  min={MIN_POTENCIA}
                  max={MAX_POTENCIA}
                  step={10}
                  value={potenciaRange}
                  onValueChange={handlePotenciaRangeChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <Input
                  type="number"
                  min={MIN_POTENCIA}
                  max={MAX_POTENCIA}
                  value={filters.potenciaMin}
                  onChange={(e) => handlePotenciaRangeChange([Number.parseInt(e.target.value), filters.potenciaMax])}
                  className="w-20"
                />
                <span>-</span>
                <Input
                  type="number"
                  min={MIN_POTENCIA}
                  max={MAX_POTENCIA}
                  value={filters.potenciaMax}
                  onChange={(e) => handlePotenciaRangeChange([filters.potenciaMin, Number.parseInt(e.target.value)])}
                  className="w-20"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filtro por ubicación */}
      <div className="border-b">
        <button
          className="flex items-center justify-between w-full p-4 text-left font-medium"
          onClick={() => setShowUbicacion(!showUbicacion)}
        >
          Ubicación
          {showUbicacion ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {showUbicacion && (
          <div className="p-4 pt-0">
            <Select value={filters.ubicacion} onValueChange={handleUbicacionChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar ubicación" />
              </SelectTrigger>
              <SelectContent>
                {UBICACIONES.map((ubicacion) => (
                  <SelectItem key={ubicacion} value={ubicacion}>
                    {ubicacion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Filtro por condición */}
      <div className="border-b">
        <button
          className="flex items-center justify-between w-full p-4 text-left font-medium"
          onClick={() => setShowCondicion(!showCondicion)}
        >
          Condición
          {showCondicion ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {showCondicion && (
          <div className="p-4 pt-0">
            <div className="space-y-2">
              {CONDICIONES.map((condicion) => (
                <div key={condicion} className="flex items-center space-x-2">
                  <Checkbox
                    id={`condicion-${condicion}`}
                    checked={filters.condicion.includes(condicion)}
                    onCheckedChange={(checked) => handleCondicionChange(condicion, checked as boolean)}
                  />
                  <label
                    htmlFor={`condicion-${condicion}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {condicion}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Botón para limpiar filtros */}
      <div className="p-4">
        <Button variant="outline" size="sm" className="w-full" onClick={resetFilters}>
          Limpiar filtros
        </Button>
      </div>
    </div>
  )
}
