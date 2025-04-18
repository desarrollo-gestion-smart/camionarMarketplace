'use client';
import { SetStateAction, useState } from 'react';

const truckTypes = [
  { id: 'all', name: 'Todos', icon: 'grid' },
  { id: 'light', name: 'Ligeros', icon: 'truck-light' },
  { id: 'medium', name: 'Medianos', icon: 'truck-medium' },
  { id: 'heavy', name: 'Pesados', icon: 'truck-heavy' },
  { id: 'trailers', name: 'Remolques', icon: 'trailer' },
  { id: 'special', name: 'Especiales', icon: 'special' },
];

interface TruckFilterBarProps {
  onFilterChange: (typeId: string) => void;
}

const TruckFilterBar = ({ onFilterChange }: TruckFilterBarProps) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (typeId: SetStateAction<string>) => {
    setActiveFilter(typeId);
    onFilterChange(typeId as string);
  };

  return (
    <div className="flex overflow-x-auto space-x-6 p-6 bg-white shadow-sm">
      {truckTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => handleFilterClick(type.id)}
          className={`flex flex-col items-center px-4 py-3 rounded-lg transition-colors ${
            activeFilter === type.id
              ? 'bg-gray-100 text-gray-800'
              : 'hover:bg-gray-50 text-gray-600'
          }`}
        >
          {/* Placeholder para íconos: reemplaza con librería como @heroicons/react */}
          <span className="text-lg text-gray-500 mb-1">
            {/* Aquí iría el ícono, por ejemplo: <TruckIcon className="h-5 w-5" /> */}
            [{type.icon}]
          </span>
          <span className="text-sm font-medium">{type.name}</span>
        </button>
      ))}
    </div>
  );
};

export default TruckFilterBar;