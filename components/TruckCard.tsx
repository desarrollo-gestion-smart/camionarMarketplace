// components/TruckCard.tsx
import Link from "next/link";

export function TruckCard({ truck }: { truck: any }) {
  return (
    <Link href={`/camion/${truck.id}`} className="border rounded-xl shadow hover:shadow-md transition overflow-hidden">
      <img src={truck.image} alt={truck.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#1A4876]">{truck.title}</h3>
        <p className="text-sm text-gray-600">{truck.year} - {truck.location}</p>
        <p className="text-xl font-bold text-[#1A4876] mt-2">${truck.price}</p>
      </div>
    </Link>
  );
}
