"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search } from "lucide-react"
import Navbar from "@/components/navbar"
import MaquinariaCard from "@/components/maquinaria-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo
const MIS_PUBLICACIONES_EJEMPLO = [
  {
    id: "1",
    imagen: "/placeholder.svg?height=225&width=400&text=John+Deere+6130J",
    titulo: "Tractor John Deere 6130J - Excelente estado",
    marca: "John Deere",
    modelo: "6130J",
    año: 2018,
    tipo: "tractores",
    precio: 25000000,
    ubicacion: "Buenos Aires",
    fechaPublicacion: "Hace 2 días",
    estado: "activa",
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
    ubicacion: "Córdoba",
    fechaPublicacion: "Hace 5 días",
    estado: "activa",
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
    ubicacion: "Santa Fe",
    fechaPublicacion: "Hace 1 semana",
    estado: "pausada",
  },
  {
    id: "4",
    imagen: "/placeholder.svg?height=225&width=400&text=Claas+Tucano+570",
    titulo: "Cosechadora Claas Tucano 570 - Impecable",
    marca: "Claas",
    modelo: "Tucano 570",
    año: 2019,
    tipo: "cosechadoras",
    precio: 65000000,
    ubicacion: "Entre Ríos",
    fechaPublicacion: "Hace 3 días",
    estado: "activa",
  },
]

export default function MisPublicacionesPage() {
  const router = useRouter()
  const [misPublicaciones, setMisPublicaciones] = useState(MIS_PUBLICACIONES_EJEMPLO)
  const [publicacionToDelete, setPublicacionToDelete] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("todas")
  const [searchTerm, setSearchTerm] = useState("")

  const handleEdit = (id: string) => {
    router.push(`/publicar?id=${id}`)
  }

  const handleDelete = (id: string) => {
    setPublicacionToDelete(id)
  }

  const confirmDelete = () => {
    if (publicacionToDelete) {
      setMisPublicaciones((prev) => prev.filter((publicacion) => publicacion.id !== publicacionToDelete))
      setPublicacionToDelete(null)
    }
  }

  const cancelDelete = () => {
    setPublicacionToDelete(null)
  }

  // Filtrar publicaciones según la pestaña activa y el término de búsqueda
  const filteredPublicaciones = misPublicaciones.filter((publicacion) => {
    const matchesTab = activeTab === "todas" || publicacion.estado === activeTab
    const matchesSearch =
      publicacion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publicacion.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publicacion.modelo.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesTab && matchesSearch
  })

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#1A4876] mb-4 md:mb-0">Mis publicaciones</h1>
          <Button className="bg-[#1A4876] hover:bg-[#0d3761]" onClick={() => router.push("/publicar")}>
            <Plus className="mr-2 h-4 w-4" />
            Publicar nueva maquinaria
          </Button>
        </div>

        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar en mis publicaciones..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="activa">Activas</TabsTrigger>
                <TabsTrigger value="pausada">Pausadas</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredPublicaciones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublicaciones.map((publicacion) => (
              <MaquinariaCard
                key={publicacion.id}
                id={publicacion.id}
                imagen={publicacion.imagen}
                titulo={publicacion.titulo}
                marca={publicacion.marca}
                modelo={publicacion.modelo}
                año={publicacion.año}
                tipo={publicacion.tipo}
                precio={publicacion.precio}
                ubicacion={publicacion.ubicacion}
                fechaPublicacion={publicacion.fechaPublicacion}
                showActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border">
            <p className="text-lg text-gray-500 mb-4">
              No tienes publicaciones {activeTab !== "todas" ? `${activeTab}s` : ""}
            </p>
            <Button className="bg-[#1A4876] hover:bg-[#0d3761]" onClick={() => router.push("/publicar")}>
              <Plus className="mr-2 h-4 w-4" />
              Publicar mi primera maquinaria
            </Button>
          </div>
        )}

        <AlertDialog open={!!publicacionToDelete} onOpenChange={cancelDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. La publicación será eliminada permanentemente.
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
