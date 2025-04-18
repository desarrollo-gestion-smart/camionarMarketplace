// components/TruckForm.tsx
'use client';
import { useState } from "react";

export function TruckForm() {
  const [form, setForm] = useState({
    title: '',
    year: '',
    location: '',
    price: '',
    image: '',
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Camión publicado (simulado):\n" + JSON.stringify(form, null, 2));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 mt-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-[#1A4876] mb-4">Publicar Camión</h2>
      <input name="title" placeholder="Título" onChange={handleChange} className="w-full border p-2 mb-4 rounded" />
      <input name="year" placeholder="Año" onChange={handleChange} className="w-full border p-2 mb-4 rounded" />
      <input name="location" placeholder="Ubicación" onChange={handleChange} className="w-full border p-2 mb-4 rounded" />
      <input name="price" placeholder="Precio" onChange={handleChange} className="w-full border p-2 mb-4 rounded" />
      <input name="image" placeholder="URL de imagen" onChange={handleChange} className="w-full border p-2 mb-4 rounded" />
      <button type="submit" className="w-full bg-[#1A4876] text-white p-2 rounded">Publicar</button>
    </form>
  );
}