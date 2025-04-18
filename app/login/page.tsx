"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Truck, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({})
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({})

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error al editar
    if (loginErrors[name]) {
      setLoginErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error al editar
    if (registerErrors[name]) {
      setRegisterErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateLoginForm = () => {
    const errors: Record<string, string> = {}

    if (!loginData.email.trim()) {
      errors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errors.email = "El email no es válido"
    }

    if (!loginData.password) {
      errors.password = "La contraseña es obligatoria"
    }

    setLoginErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateRegisterForm = () => {
    const errors: Record<string, string> = {}

    if (!registerData.name.trim()) {
      errors.name = "El nombre es obligatorio"
    }

    if (!registerData.email.trim()) {
      errors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      errors.email = "El email no es válido"
    }

    if (!registerData.password) {
      errors.password = "La contraseña es obligatoria"
    } else if (registerData.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    if (!registerData.confirmPassword) {
      errors.confirmPassword = "Debe confirmar la contraseña"
    } else if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden"
    }

    setRegisterErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateLoginForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulación de inicio de sesión
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/camiones")
    }, 1000)
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateRegisterForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulación de registro
    setTimeout(() => {
      setIsSubmitting(false)
      setActiveTab("login")
      alert("Registro completado correctamente. Ahora puedes iniciar sesión.")
    }, 1000)
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-[#1A4876] p-3 rounded-full">
              <Truck className="h-8 w-8 text-white" />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Iniciar sesión</CardTitle>
                  <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
                </CardHeader>
                <form onSubmit={handleLoginSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        className={loginErrors.email ? "border-red-500" : ""}
                      />
                      {loginErrors.email && <p className="text-sm text-red-500">{loginErrors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">Contraseña</Label>
                        <Link href="#" className="text-xs text-[#1A4876] hover:underline">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="login-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={loginData.password}
                          onChange={handleLoginChange}
                          className={loginErrors.password ? "border-red-500 pr-10" : "pr-10"}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                      {loginErrors.password && <p className="text-sm text-red-500">{loginErrors.password}</p>}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-[#1A4876] hover:bg-[#0d3761]" disabled={isSubmitting}>
                      {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Crear cuenta</CardTitle>
                  <CardDescription>Regístrate para publicar y gestionar tus anuncios</CardDescription>
                </CardHeader>
                <form onSubmit={handleRegisterSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Nombre</Label>
                      <Input
                        id="register-name"
                        name="name"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        className={registerErrors.name ? "border-red-500" : ""}
                      />
                      {registerErrors.name && <p className="text-sm text-red-500">{registerErrors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        className={registerErrors.email ? "border-red-500" : ""}
                      />
                      {registerErrors.email && <p className="text-sm text-red-500">{registerErrors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          className={registerErrors.password ? "border-red-500 pr-10" : "pr-10"}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                      {registerErrors.password && <p className="text-sm text-red-500">{registerErrors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Confirmar contraseña</Label>
                      <div className="relative">
                        <Input
                          id="register-confirm-password"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={registerData.confirmPassword}
                          onChange={handleRegisterChange}
                          className={registerErrors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                      {registerErrors.confirmPassword && (
                        <p className="text-sm text-red-500">{registerErrors.confirmPassword}</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-[#1A4876] hover:bg-[#0d3761]" disabled={isSubmitting}>
                      {isSubmitting ? "Registrando..." : "Registrarse"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
