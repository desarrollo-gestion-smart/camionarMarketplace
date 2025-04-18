import Link from "next/link"
import { Truck, Wrench, ShieldCheck, TrendingUp } from "lucide-react"

const CATEGORIAS = [
  {
    id: "tractores",
    nombre: "Tractores",
    icono: <Truck className="h-6 w-6 text-camionar" />,
    descripcion: "Camiones tractores para transporte de larga distancia",
    cantidad: 245,
  },
  {
    id: "rigidos",
    nombre: "Rígidos",
    icono: <Truck className="h-6 w-6 text-camionar" />,
    descripcion: "Camiones rígidos para distribución urbana",
    cantidad: 187,
  },
  {
    id: "frigorificos",
    nombre: "Frigoríficos",
    icono: <Truck className="h-6 w-6 text-camionar" />,
    descripcion: "Camiones con caja frigorífica para transporte refrigerado",
    cantidad: 93,
  },
  {
    id: "cisternas",
    nombre: "Cisternas",
    icono: <Truck className="h-6 w-6 text-camionar" />,
    descripcion: "Camiones cisterna para transporte de líquidos",
    cantidad: 64,
  },
  {
    id: "volquetes",
    nombre: "Volquetes",
    icono: <Truck className="h-6 w-6 text-camionar" />,
    descripcion: "Camiones volquete para transporte de materiales",
    cantidad: 78,
  },
  {
    id: "portacontenedores",
    nombre: "Portacontenedores",
    icono: <Truck className="h-6 w-6 text-camionar" />,
    descripcion: "Camiones para transporte de contenedores",
    cantidad: 56,
  },
  {
    id: "repuestos",
    nombre: "Repuestos",
    icono: <Wrench className="h-6 w-6 text-camionar" />,
    descripcion: "Repuestos y accesorios para camiones",
    cantidad: 312,
  },
  {
    id: "seguros",
    nombre: "Seguros",
    icono: <ShieldCheck className="h-6 w-6 text-camionar" />,
    descripcion: "Seguros para camiones y transporte",
    cantidad: 24,
  },
]

export default function CategoryFilter() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explora por categoría</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIAS.map((categoria) => (
            <Link
              key={categoria.id}
              href={`/camiones/${categoria.id}`}
              className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-camionar/10 transition-colors">
                {categoria.icono}
              </div>
              <h3 className="font-semibold text-lg mb-1">{categoria.nombre}</h3>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">{categoria.descripcion}</p>
              <span className="text-xs font-medium text-camionar flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {categoria.cantidad} anuncios
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
