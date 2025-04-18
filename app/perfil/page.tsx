"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { User, Mail, LogOut, Tractor, MapPin, Phone, Camera } from "lucide-react"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
const USUARIO_EJEMPLO = {
  nombre: "Juan Pérez",
  email: "juan.perez@example.com",
  telefono: "+54 11 1234-5678",
  ubicacion: "Buenos Aires",
  avatar: "/placeholder.svg?height=200&width=200&text=JP",
  publicaciones: 4,
  fechaRegistro: "01/01/2023",
}

export default function PerfilPage() {
  const router = useRouter()
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("perfil")
  const [isEditing, setIsEditing] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(USUARIO_EJEMPLO.avatar)

  const [userData, setUserData] = useState({
    nombre: USUARIO_EJEMPLO.nombre,
    email: USUARIO_EJEMPLO.email,
    telefono: USUARIO_EJEMPLO.telefono,
    ubicacion: USUARIO_EJEMPLO.ubicacion,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSaveProfile = () => {
    // Simulación de guardado
    setTimeout(() => {
      setIsEditing(false)
      alert("Perfil actualizado correctamente")
    }, 500)
  }

  const handleLogout = () => {
    // Simulación de cierre de sesión
    setTimeout(() => {
      router.push("/")
    }, 500)
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-[#1A4876]">Mi perfil</h1>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="perfil">Información personal</TabsTrigger>
              <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
            </TabsList>

            <TabsContent value="perfil">
              <Card>
                <CardHeader>
                  <CardTitle>Información personal</CardTitle>
                  <CardDescription>Gestiona tu información personal y cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#1A4876]">
                          <Image src={avatarPreview || "/placeholder.svg"} alt="Avatar" fill className="object-cover" />
                        </div>
                        {isEditing && (
                          <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-0 bg-[#1A4876] text-white p-2 rounded-full cursor-pointer"
                          >
                            <Camera className="h-5 w-5" />
                            <input
                              id="avatar-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleAvatarChange}
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">Miembro desde {USUARIO_EJEMPLO.fechaRegistro}</p>
                    </div>

                    <div className="flex-1 space-y-4">
                      {isEditing ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input id="nombre" name="nombre" value={userData.nombre} onChange={handleChange} />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={userData.email}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input id="telefono" name="telefono" value={userData.telefono} onChange={handleChange} />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="ubicacion">Ubicación</Label>
                            <Input id="ubicacion" name="ubicacion" value={userData.ubicacion} onChange={handleChange} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-md">
                            <User className="h-5 w-5 text-[#1A4876] mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Nombre</p>
                              <p className="font-medium">{userData.nombre}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-md">
                            <Mail className="h-5 w-5 text-[#1A4876] mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p className="font-medium">{userData.email}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-md">
                            <Phone className="h-5 w-5 text-[#1A4876] mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Teléfono</p>
                              <p className="font-medium">{userData.telefono}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-md">
                            <MapPin className="h-5 w-5 text-[#1A4876] mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Ubicación</p>
                              <p className="font-medium">{userData.ubicacion}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancelar
                      </Button>
                      <Button className="bg-[#1A4876] hover:bg-[#0d3761]" onClick={handleSaveProfile}>
                        Guardar cambios
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="border-[#1A4876] text-[#1A4876]"
                        onClick={() => router.push("/mis-publicaciones")}
                      >
                        <Tractor className="mr-2 h-4 w-4" />
                        Mis publicaciones
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#1A4876] text-[#1A4876]"
                        onClick={() => setIsEditing(true)}
                      >
                        Editar perfil
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="seguridad">
              <Card>
                <CardHeader>
                  <CardTitle>Seguridad</CardTitle>
                  <CardDescription>Gestiona tu contraseña y opciones de seguridad</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Contraseña actual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nueva contraseña</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50"
                    onClick={() => setIsLogoutDialogOpen(true)}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </Button>
                  <Button className="bg-[#1A4876] hover:bg-[#0d3761]">Actualizar contraseña</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
              <AlertDialogDescription>¿Estás seguro de que quieres cerrar sesión?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} className="bg-[#1A4876] hover:bg-[#0d3761]">
                Cerrar sesión
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </>
  )
}
