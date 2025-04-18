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
}

export interface FilterValues {
  marca: string
  añoMin: number
  añoMax: number
  precioMin: number
  precioMax: number
  tipos: string[]
}

const MARCAS = ["Todas", "Volvo", "Scania", "Mercedes-Benz", "MAN", "DAF", "Iveco", "Renault", "Kenworth"]
const TIPOS = ["Tractor", "Rígido", "Frigorífico", "Cisterna", "Volquete", "Portacontenedores"]

const currentYear = new Date().getFullYear()
const MIN_YEAR = 1990
const MAX_YEAR = currentYear
const MIN_PRICE = 0
const MAX_PRICE = 200000000

export default function CamionFilters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    marca: "Todas",
    añoMin: MIN_YEAR,
    añoMax: MAX_YEAR,
    precioMin: MIN_PRICE,
    precioMax: MAX_PRICE,
    tipos: [],
  })

  const [precioRange, setPrecioRange] = useState([MIN_PRICE, MAX_PRICE])
  const [añoRange, setAñoRange] = useState([MIN_YEAR, MAX_YEAR])

  // Estados para controlar la visibilidad de cada sección de filtros
  const [showMarca, setShowMarca] = useState(true)
  const [showAño, setShowAño] = useState(true)
  const [showPrecio, setShowPrecio] = useState(true)
  const [showTipo, setShowTipo] = useState(true)

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

  const handleTipoChange = (tipo: string, checked: boolean) => {
    const newTipos = checked ? [...filters.tipos, tipo] : filters.tipos.filter((t) => t !== tipo)
    const newFilters = { ...filters, tipos: newTipos }
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
      tipos: [],
    }
    setFilters(defaultFilters)
    setAñoRange([MIN_YEAR, MAX_YEAR])
    setPrecioRange([MIN_PRICE, MAX_PRICE])
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
                {MARCAS.map((marca) => (
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

      {/* Filtro por tipo */}
      <div className="border-b">
        <button
          className="flex items-center justify-between w-full p-4 text-left font-medium"
          onClick={() => setShowTipo(!showTipo)}
        >
          Tipo
          {showTipo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {showTipo && (
          <div className="p-4 pt-0">
            <div className="space-y-2">
              {TIPOS.map((tipo) => (
                <div key={tipo} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tipo-${tipo}`}
                    checked={filters.tipos.includes(tipo)}
                    onCheckedChange={(checked) => handleTipoChange(tipo, checked as boolean)}
                  />
                  <label
                    htmlFor={`tipo-${tipo}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {tipo}
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
