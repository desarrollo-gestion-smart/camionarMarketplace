"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { MapPin, Calendar, Clock } from "lucide-react"

interface MaquinariaCardProps {
  id: string
  imagen: string
  titulo: string
  marca: string
  modelo: string
  año: number
  tipo: string
  precio: number
  ubicacion: string
  fechaPublicacion: string
  showActions?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function MaquinariaCard({
  id,
  imagen,
  titulo,
  marca,
  modelo,
  año,
  tipo,
  precio,
  ubicacion,
  fechaPublicacion,
  showActions = false,
  onEdit,
  onDelete,
}: MaquinariaCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={imagen || "/placeholder.svg?height=225&width=400"}
          alt={titulo}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 bg-[#1A4876] text-white text-xs px-2 py-1">USADO</div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{titulo}</h3>
        </div>

        <div className="mb-3 flex flex-col space-y-1 text-sm text-gray-500">
          <div className="flex items-center">
            <span className="font-medium mr-2">Marca:</span> {marca}
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2">Modelo:</span> {modelo}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="font-medium mr-2">Año:</span> {año}
          </div>
        </div>

        <div className="mb-4">
          <span className="text-2xl font-bold text-[#1A4876]">{formatCurrency(precio)}</span>
        </div>

        <div className="flex flex-col space-y-2 text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {ubicacion}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Publicado: {fechaPublicacion}
          </div>
        </div>

        <div className="flex items-center justify-between">
          {showActions ? (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="text-[#1A4876] border-[#1A4876]"
                onClick={() => onEdit && onEdit(id)}
              >
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 border-red-500 hover:bg-red-50"
                onClick={() => onDelete && onDelete(id)}
              >
                Eliminar
              </Button>
            </div>
          ) : (
            <Link href={`/maquinaria/${tipo.toLowerCase()}/${id}`} className="w-full">
              <Button className="w-full bg-[#1A4876] hover:bg-[#0d3761]">Ver detalle</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
