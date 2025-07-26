'use client'

import React, { useState } from 'react'
import { saveSimpleIncome } from '@/lib/indexedDB'

const IncomeForm: React.FC = () => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [saved, setSaved] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const parsedAmount = parseFloat(amount)
    if (!parsedAmount || !description.trim() || isSubmitting) return

    setIsSubmitting(true) // 🔒 Bloquear envío

    await saveSimpleIncome(parsedAmount, description.trim())

    setAmount('')
    setDescription('')
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
      setIsSubmitting(false) // 🔓 Desbloquear por si no hay recarga
      window.location.reload() // 🔁 Recargar todo
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 rounded space-y-4">
      <h2 className="text-base font-medium">
        <span className='text-pink-400 pr-5'>+</span>Registrar ingreso
      </h2>

      <input
        type="number"
        placeholder="Monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border px-3 py-2 rounded text-sm"
        disabled={isSubmitting}
      />

      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded text-sm"
        disabled={isSubmitting}
      />

      <button
        type="submit"
        className={`w-full py-2 border rounded text-sm hover:scale-x-105 hover:bg-pink-400 ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Guardando...' : 'Guardar ingreso'}
      </button>

      {saved && (
        <p className="text-xs text-center">Guardado correctamente ✅</p>
      )}
    </form>
  )
}

export default IncomeForm
