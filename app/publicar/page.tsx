"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, X, Info } from "lucide-react"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

// Datos de ejemplo para los selects
const MARCAS_TRACTORES = ["John Deere", "New Holland", "Massey Ferguson", "Case IH", "Deutz-Fahr", "Valtra"]
const MARCAS_COSECHADORAS = ["John Deere", "New Holland", "Case IH", "Claas", "Massey Ferguson", "Deutz-Fahr"]
const MARCAS_SEMBRADORAS = ["Agrometal", "Crucianelli", "Giorgi", "Apache", "Bertini", "John Deere"]
const MARCAS_PULVERIZADORAS = ["Metalfor", "Pla", "John Deere", "Case IH", "Jacto", "Praba"]
const MARCAS_IMPLEMENTOS = ["Mainero", "Akron", "Ombu", "Cestari", "Richiger", "Agromec"]

const UBICACIONES = ["Buenos Aires", "Córdoba", "Santa Fe", "Entre Ríos", "La Pampa", "Tucumán", "Salta"]
const CONDICIONES = ["Usado", "Nuevo"]

export default function PublicarPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [tipoMaquinaria, setTipoMaquinaria] = useState("tractores")

  const [formData, setFormData] = useState({
    titulo: "",
    marca: "",
    modelo: "",
    año: new Date().getFullYear(),
    precio: 0,
    potencia: 0,
    horasUso: 0,
    descripcion: "",
    ubicacion: "",
    condicion: "Usado",
    contactoNombre: "",
    contactoTelefono: "",
    contactoEmail: "",
    contactoWhatsapp: false,
  })

  // Obtener las marcas según el tipo de maquinaria
  const getMarcasByTipo = () => {
    switch (tipoMaquinaria) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error al editar
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error al editar
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleTipoChange = (value: string) => {
    setTipoMaquinaria(value)
    // Resetear la marca al cambiar el tipo
    setFormData((prev) => ({ ...prev, marca: "" }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newPreviews: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()

      reader.onload = () => {
        newPreviews.push(reader.result as string)
        if (newPreviews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...newPreviews])
        }
      }

      reader.readAsDataURL(file)
    }

    // Limpiar error al editar
    if (formErrors.imagenes) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.imagenes
        return newErrors
      })
    }
  }

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.titulo.trim()) {
      errors.titulo = "El título es obligatorio"
    }

    if (!formData.marca) {
      errors.marca = "La marca es obligatoria"
    }

    if (!formData.modelo.trim()) {
      errors.modelo = "El modelo es obligatorio"
    }

    if (!formData.año) {
      errors.año = "El año es obligatorio"
    } else if (formData.año < 1900 || formData.año > new Date().getFullYear() + 1) {
      errors.año = "El año no es válido"
    }

    if (!formData.precio) {
      errors.precio = "El precio es obligatorio"
    } else if (formData.precio <= 0) {
      errors.precio = "El precio debe ser mayor que 0"
    }

    if (!formData.ubicacion) {
      errors.ubicacion = "La ubicación es obligatoria"
    }

    if (imagePreviews.length === 0) {
      errors.imagenes = "Debe subir al menos una imagen"
    }

    if (!formData.contactoNombre.trim()) {
      errors.contactoNombre = "El nombre de contacto es obligatorio"
    }

    if (!formData.contactoTelefono.trim()) {
      errors.contactoTelefono = "El teléfono de contacto es obligatorio"
    }

    if (!formData.contactoEmail.trim()) {
      errors.contactoEmail = "El email de contacto es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.contactoEmail)) {
      errors.contactoEmail = "El email no es válido"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/mis-publicaciones")
      alert("Maquinaria publicada correctamente")
    }, 1500)
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-[#1A4876]">Publica en Camionar</h1>

        <div className="max-w-4xl mx-auto bg-white rounded-lg border p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de maquinaria */}
            <div className="space-y-2">
              <Label htmlFor="tipo">
                Tipo de maquinaria <span className="text-red-500">*</span>
              </Label>
              <Tabs value={tipoMaquinaria} onValueChange={handleTipoChange} className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="tractores">Tractores</TabsTrigger>
                  <TabsTrigger value="cosechadoras">Cosechadoras</TabsTrigger>
                  <TabsTrigger value="sembradoras">Sembradoras</TabsTrigger>
                  <TabsTrigger value="pulverizadoras">Pulverizadoras</TabsTrigger>
                  <TabsTrigger value="implementos">Implementos</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">
                      Título del anuncio <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="titulo"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleChange}
                      className={formErrors.titulo ? "border-red-500" : ""}
                      placeholder="Ej: Tractor John Deere 6130J - Excelente estado"
                    />
                    {formErrors.titulo && <p className="text-sm text-red-500">{formErrors.titulo}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condicion">
                      Condición <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.condicion}
                      onValueChange={(value) => handleSelectChange("condicion", value)}
                    >
                      <SelectTrigger id="condicion" className={formErrors.condicion ? "border-red-500" : ""}>
                        <SelectValue placeholder="Seleccionar condición" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONDICIONES.map((condicion) => (
                          <SelectItem key={condicion} value={condicion}>
                            {condicion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.condicion && <p className="text-sm text-red-500">{formErrors.condicion}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marca">
                      Marca <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.marca} onValueChange={(value) => handleSelectChange("marca", value)}>
                      <SelectTrigger id="marca" className={formErrors.marca ? "border-red-500" : ""}>
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
                    {formErrors.marca && <p className="text-sm text-red-500">{formErrors.marca}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="modelo">
                      Modelo <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="modelo"
                      name="modelo"
                      value={formData.modelo}
                      onChange={handleChange}
                      className={formErrors.modelo ? "border-red-500" : ""}
                    />
                    {formErrors.modelo && <p className="text-sm text-red-500">{formErrors.modelo}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="año">
                      Año <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="año"
                      name="año"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      value={formData.año}
                      onChange={handleChange}
                      className={formErrors.año ? "border-red-500" : ""}
                    />
                    {formErrors.año && <p className="text-sm text-red-500">{formErrors.año}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="precio">
                      Precio (ARS) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="precio"
                      name="precio"
                      type="number"
                      min="0"
                      step="10000"
                      value={formData.precio}
                      onChange={handleChange}
                      className={formErrors.precio ? "border-red-500" : ""}
                    />
                    {formData.precio > 0 && <p className="text-sm text-gray-500">{formatCurrency(formData.precio)}</p>}
                    {formErrors.precio && <p className="text-sm text-red-500">{formErrors.precio}</p>}
                  </div>

                  {(tipoMaquinaria === "tractores" || tipoMaquinaria === "cosechadoras") && (
                    <div className="space-y-2">
                      <Label htmlFor="potencia">Potencia (HP)</Label>
                      <Input
                        id="potencia"
                        name="potencia"
                        type="number"
                        min="0"
                        value={formData.potencia}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  {formData.condicion === "Usado" && (
                    <div className="space-y-2">
                      <Label htmlFor="horasUso">Horas de uso</Label>
                      <Input
                        id="horasUso"
                        name="horasUso"
                        type="number"
                        min="0"
                        value={formData.horasUso}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="ubicacion">
                      Ubicación <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.ubicacion}
                      onValueChange={(value) => handleSelectChange("ubicacion", value)}
                    >
                      <SelectTrigger id="ubicacion" className={formErrors.ubicacion ? "border-red-500" : ""}>
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
                    {formErrors.ubicacion && <p className="text-sm text-red-500">{formErrors.ubicacion}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    rows={5}
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Describe las características de la maquinaria, estado, equipamiento, etc."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label>
                    Imágenes <span className="text-red-500">*</span>
                  </Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Input
                      id="imagenes"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label htmlFor="imagenes" className="flex flex-col items-center cursor-pointer">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700">Haz clic para seleccionar imágenes</span>
                      <span className="text-xs text-gray-500 mt-1">O arrastra y suelta archivos aquí</span>
                    </Label>
                  </div>

                  {formErrors.imagenes && <p className="text-sm text-red-500">{formErrors.imagenes}</p>}

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt={`Vista previa ${index + 1}`}
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-[#1A4876]" />
                  Información de contacto
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactoNombre">
                      Nombre <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactoNombre"
                      name="contactoNombre"
                      value={formData.contactoNombre}
                      onChange={handleChange}
                      className={formErrors.contactoNombre ? "border-red-500" : ""}
                    />
                    {formErrors.contactoNombre && <p className="text-sm text-red-500">{formErrors.contactoNombre}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactoTelefono">
                      Teléfono <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactoTelefono"
                      name="contactoTelefono"
                      value={formData.contactoTelefono}
                      onChange={handleChange}
                      className={formErrors.contactoTelefono ? "border-red-500" : ""}
                    />
                    {formErrors.contactoTelefono && (
                      <p className="text-sm text-red-500">{formErrors.contactoTelefono}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactoEmail">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactoEmail"
                      name="contactoEmail"
                      type="email"
                      value={formData.contactoEmail}
                      onChange={handleChange}
                      className={formErrors.contactoEmail ? "border-red-500" : ""}
                    />
                    {formErrors.contactoEmail && <p className="text-sm text-red-500">{formErrors.contactoEmail}</p>}
                  </div>

                  <div className="flex items-center space-x-2 h-full pt-6">
                    <Checkbox
                      id="contactoWhatsapp"
                      checked={formData.contactoWhatsapp}
                      onCheckedChange={(checked) => handleCheckboxChange("contactoWhatsapp", checked as boolean)}
                    />
                    <label
                      htmlFor="contactoWhatsapp"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Recibir consultas por WhatsApp
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full bg-[#1A4876] hover:bg-[#0d3761]" disabled={isSubmitting}>
              {isSubmitting ? "Publicando..." : "Publicar maquinaria"}
            </Button>
          </form>
        </div>
      </main>
    </>
  )
}
