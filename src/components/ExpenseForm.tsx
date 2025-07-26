'use client'

import React, { useState } from 'react'
import { saveSimpleExpense } from '@/lib/indexedDB'

const ExpenseForm: React.FC = () => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [saved, setSaved] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const parsedAmount = parseFloat(amount)
    if (!parsedAmount || !description.trim() || isSubmitting) return

    setIsSubmitting(true) // Bloquear envíos

    await saveSimpleExpense(parsedAmount, description.trim())

    setAmount('')
    setDescription('')
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
      setIsSubmitting(false)
      window.location.reload()
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 space-y-4">
      <h2 className="text-base font-medium">
        <span className='text-pink-400 pr-5'>-</span>Registrar gasto
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
        {isSubmitting ? 'Guardando...' : 'Guardar gasto'}
      </button>

      {saved && (
        <p className="text-xs text-center">Gasto guardado ✅</p>
      )}
    </form>
  )
}

export default ExpenseForm
