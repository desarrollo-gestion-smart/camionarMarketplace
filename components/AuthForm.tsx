// components/AuthForm.tsx
'use client';
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function AuthForm({ type }: { type: 'login' | 'register' }) {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">{type === 'login' ? 'Ingresar' : 'Registrarse'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border p-2 mb-4 rounded"
      />
      <button type="submit" className="w-full bg-[#1A4876] text-white p-2 rounded">
        {type === 'login' ? 'Ingresar' : 'Crear cuenta'}
      </button>
    </form>
  );
}