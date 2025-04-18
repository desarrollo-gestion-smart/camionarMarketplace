"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import Navbar from "@/components/navbar"
import CamionCard from "@/components/camion-card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Datos de ejemplo
const MIS_CAMIONES_EJEMPLO = [
  {
    id: "1",
    imagen: "/placeholder.svg?height=225&width=400&text=Volvo+FH",
    marca: "Volvo",
    modelo: "FH 500",
    año: 2021,
    tipo: "Tractor",
    precio: 120000,
    descripcion: "Camión en excelente estado con 500 CV y 12.000 km.",
    ubicacion: "Madrid",
  },
  {
    id: "2",
    imagen: "/placeholder.svg?height=225&width=400&text=Scania+R450",
    marca: "Scania",
    modelo: "R450",
    año: 2020,
    tipo: "Tractor",
    precio: 110000,
    descripcion: "Scania R450 con 450 CV y 25.000 km.",
    ubicacion: "Barcelona",
  },
  {
    id: "3",
    imagen: "/placeholder.svg?height=225&width=400&text=Mercedes+Actros",
    marca: "Mercedes-Benz",
    modelo: "Actros 1845",
    año: 2019,
    tipo: "Tractor",
    precio: 95000,
    descripcion: "Mercedes Actros 1845 con 450 CV y 40.000 km.",
    ubicacion: "Valencia",
  },
]

export default function MisCamionesPage() {
  const router = useRouter()
  const [misCamiones, setMisCamiones] = useState(MIS_CAMIONES_EJEMPLO)
  const [camionToDelete, setCamionToDelete] = useState<string | null>(null)

  const handleEdit = (id: string) => {
    router.push(`/publicar?id=${id}`)
  }

  const handleDelete = (id: string) => {
    setCamionToDelete(id)
  }

  const confirmDelete = () => {
    if (camionToDelete) {
      setMisCamiones((prev) => prev.filter((camion) => camion.id !== camionToDelete))
      setCamionToDelete(null)
    }
  }

  const cancelDelete = () => {
    setCamionToDelete(null)
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#1A4876] mb-4 md:mb-0">Mis camiones</h1>
          <Button className="bg-[#1A4876] hover:bg-[#0d3761]" onClick={() => router.push("/publicar")}>
            <Plus className="mr-2 h-4 w-4" />
            Publicar nuevo camión
          </Button>
        </div>

        {misCamiones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {misCamiones.map((camion) => (
              <CamionCard
                key={camion.id}
                id={camion.id}
                imagen={camion.imagen}
                marca={camion.marca}
                modelo={camion.modelo}
                año={camion.año}
                tipo={camion.tipo}
                precio={camion.precio}
                showActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border">
            <p className="text-lg text-gray-500 mb-4">No tienes camiones publicados</p>
            <Button className="bg-[#1A4876] hover:bg-[#0d3761]" onClick={() => router.push("/publicar")}>
              <Plus className="mr-2 h-4 w-4" />
              Publicar mi primer camión
            </Button>
          </div>
        )}

        <AlertDialog open={!!camionToDelete} onOpenChange={cancelDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. El camión será eliminado permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </>
  )
}
