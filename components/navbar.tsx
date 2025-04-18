"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Truck, LogOut, Plus, Settings, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

export default function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulación de estado de autenticación

  // Simulación de datos de usuario
  const user = isLoggedIn
    ? {
        name: "Juan Pérez",
        email: "juan@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=JP",
      }
    : null

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    router.push("/")
  }

  // Simulación de inicio de sesión para demostración
  const simulateLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      {/* Barra superior con logo, buscador y acciones */}
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Truck className="h-8 w-8 text-[#1A4876]" />
          <span className="text-xl font-bold text-[#1A4876]">CamionAR</span>
        </Link>

        <div className="hidden md:flex flex-1 mx-6">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscá lo que necesitás aquí" className="pl-10" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Button
                asChild
                variant="outline"
                className="border-[#1A4876] text-[#1A4876] hover:bg-[#1A4876] hover:text-white"
              >
                <Link href="/publicar">
                  <Plus className="h-4 w-4 mr-2" />
                  Publicar
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#1A4876]">
                    <Image src={user?.avatar || ""} alt="Avatar" fill className="object-cover" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start p-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                      <Image src={user?.avatar || ""} alt="Avatar" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{user?.name}</span>
                      <span className="text-xs text-gray-500">{user?.email}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/mis-camiones" className="cursor-pointer w-full">
                      Mis Camiones
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favoritos" className="cursor-pointer w-full">
                      Favoritos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/mensajes" className="cursor-pointer w-full">
                      Mensajes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="cursor-pointer w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Configuración
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                asChild
                variant="outline"
                className="border-[#1A4876] text-[#1A4876] hover:bg-[#1A4876] hover:text-white"
              >
                <Link href="/publicar">
                  <Plus className="h-4 w-4 mr-2" />
                  Publicar
                </Link>
              </Button>
              <Button className="bg-[#1A4876] hover:bg-[#0d3761] text-white" onClick={() => router.push("/login")}>
                Ingresar
              </Button>
              <Button variant="link" className="text-[#1A4876]" onClick={() => router.push("/registro")}>
                Registrate
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-gray-700" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Barra de categorías */}
      <div className="border-t border-gray-200 overflow-x-auto">
        <div className="container flex items-center h-12 space-x-6">
          <Link
            href="/lo-ultimo"
            className="flex flex-col items-center justify-center min-w-[60px] text-xs text-gray-600 hover:text-[#1A4876]"
          >
            <span>Lo último</span>
          </Link>
          <Link
            href="/ofertas"
            className="flex flex-col items-center justify-center min-w-[60px] text-xs text-gray-600 hover:text-[#1A4876]"
          >
            <span>Ofertas</span>
          </Link>
          <Link
            href="/cerca-mio"
            className="flex flex-col items-center justify-center min-w-[60px] text-xs text-gray-600 hover:text-[#1A4876]"
          >
            <span>Cerca mío</span>
          </Link>
          <Link
            href="/camiones/tractores"
            className="flex flex-col items-center justify-center min-w-[60px] text-xs text-gray-600 hover:text-[#1A4876]"
          >
            <span>Tractores</span>
          </Link>
          <Link
            href="/camiones/rigidos"
            className="flex flex-col items-center justify-center min-w-[60px] text-xs text-gray-600 hover:text-[#1A4876]"
          >
            <span>Rígidos</span>
          </Link>
          <Link
            href="/camiones/frigorificos"
            className="flex flex-col items-center justify-center min-w-[60px] text-xs text-gray-600 hover:text-[#1A4876]"
          >
            <span>Frigoríficos</span>
          </Link>
          <Link
            href="/camiones/cisternas"
            className="flex flex-col items-center justify-center min-w-[60px] text-xs text-gray-600 hover:text-[#1A4876]"
          >
            <span>Cisternas</span>
          </Link>
          <Link
            href="/camiones/volquetes"
            className="flex flex-col items-center justify-center min-w-[60px] text-xs text-gray-600 hover:text-[#1A4876]"
          >
            <span>Volquetes</span>
          </Link>
          <Link
            href="/camiones/portacontenedores"
            className="flex flex-col items-center justify-center min-w-[60px] text-xs text-gray-600 hover:text-[#1A4876]"
          >
            <span>Portacontenedores</span>
          </Link>
          <Link
            href="/remolques"
            className="flex flex-col items-center justify-center min-w-[60px] text-xs text-gray-600 hover:text-[#1A4876]"
          >
            <span>Remolques</span>
          </Link>
          <Link
            href="/repuestos"
            className="flex flex-col items-center justify-center min-w-[60px] text-xs text-gray-600 hover:text-[#1A4876]"
          >
            <span>Repuestos</span>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 bg-white md:hidden transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-4">
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscá lo que necesitás para tu flota" className="pl-10" />
          </div>
        </div>

        <nav className="container flex flex-col space-y-4 p-4">
          <Link
            href="/lo-ultimo"
            className="py-2 text-lg font-medium text-gray-700 hover:text-[#1A4876]"
            onClick={() => setIsMenuOpen(false)}
          >
            Lo último
          </Link>
          <Link
            href="/ofertas"
            className="py-2 text-lg font-medium text-gray-700 hover:text-[#1A4876]"
            onClick={() => setIsMenuOpen(false)}
          >
            Ofertas
          </Link>
          <Link
            href="/cerca-mio"
            className="py-2 text-lg font-medium text-gray-700 hover:text-[#1A4876]"
            onClick={() => setIsMenuOpen(false)}
          >
            Cerca mío
          </Link>
          <Link
            href="/camiones/tractores"
            className="py-2 text-lg font-medium text-gray-700 hover:text-[#1A4876]"
            onClick={() => setIsMenuOpen(false)}
          >
            Tractores
          </Link>
          <Link
            href="/camiones/rigidos"
            className="py-2 text-lg font-medium text-gray-700 hover:text-[#1A4876]"
            onClick={() => setIsMenuOpen(false)}
          >
            Rígidos
          </Link>
          <Link
            href="/camiones/frigorificos"
            className="py-2 text-lg font-medium text-gray-700 hover:text-[#1A4876]"
            onClick={() => setIsMenuOpen(false)}
          >
            Frigoríficos
          </Link>

          <div className="border-t border-gray-200 pt-4">
            <Link
              href="/publicar"
              className="flex items-center py-2 text-lg font-medium text-[#1A4876]"
              onClick={() => setIsMenuOpen(false)}
            >
              <Plus className="h-5 w-5 mr-2" />
              Publicar
            </Link>
          </div>

          {isLoggedIn ? (
            <div className="space-y-4 border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#1A4876]">
                  <Image src={user?.avatar || ""} alt="Avatar" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>

              <Link
                href="/mis-camiones"
                className="block py-2 text-lg font-medium text-gray-700 hover:text-[#1A4876]"
                onClick={() => setIsMenuOpen(false)}
              >
                Mis Camiones
              </Link>
              <Link
                href="/favoritos"
                className="block py-2 text-lg font-medium text-gray-700 hover:text-[#1A4876]"
                onClick={() => setIsMenuOpen(false)}
              >
                Favoritos
              </Link>
              <Link
                href="/mensajes"
                className="block py-2 text-lg font-medium text-gray-700 hover:text-[#1A4876]"
                onClick={() => setIsMenuOpen(false)}
              >
                Mensajes
              </Link>
              <Link
                href="/perfil"
                className="block py-2 text-lg font-medium text-gray-700 hover:text-[#1A4876]"
                onClick={() => setIsMenuOpen(false)}
              >
                Configuración
              </Link>
              <button
                className="flex items-center py-2 text-lg font-medium text-red-500"
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-4">
              <button
                className="block w-full py-2 text-lg font-medium text-[#1A4876]"
                onClick={() => {
                  simulateLogin()
                  setIsMenuOpen(false)
                }}
              >
                Ingresar
              </button>
              <Link
                href="/registro"
                className="block py-2 text-lg font-medium text-gray-700 hover:text-[#1A4876]"
                onClick={() => setIsMenuOpen(false)}
              >
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
