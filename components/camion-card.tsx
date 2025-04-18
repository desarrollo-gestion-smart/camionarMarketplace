"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { MapPin, Calendar, Clock } from "lucide-react"

interface CamionCardProps {
  id: string
  imagen: string
  marca: string
  modelo: string
  año: number
  tipo: string
  precio: number
  ubicacion?: string
  fechaPublicacion?: string
  showActions?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function CamionCard({
  id,
  imagen,
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
}: CamionCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={imagen || "/placeholder.svg?height=225&width=400"}
          alt={`${marca} ${modelo}`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {fechaPublicacion && (
          <div className="absolute top-0 left-0 bg-[#1A4876] text-white text-xs px-2 py-1">{fechaPublicacion}</div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-900">
            {marca} {modelo}
          </h3>
          <Badge variant="outline" className="bg-[#1A4876]/10 text-[#1A4876] border-[#1A4876]/20">
            {tipo}
          </Badge>
        </div>

        <div className="mb-3 flex flex-col space-y-1 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Año: {año}</span>
          </div>
          {ubicacion && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{ubicacion}</span>
            </div>
          )}
          {fechaPublicacion && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Publicado: {fechaPublicacion}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <span className="text-2xl font-bold text-[#1A4876]">{formatCurrency(precio)}</span>
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
            <Link href={`/camiones/${id}`} className="w-full">
              <Button className="w-full bg-[#1A4876] hover:bg-[#0d3761]">Ver más</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
