'use client'

import React, { useState } from 'react'
import { saveSimpleExpense } from '@/lib/indexedDB'

const ExpenseForm: React.FC = () => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const parsedAmount = parseFloat(amount)
    if (!parsedAmount || !description.trim()) return

    await saveSimpleExpense(parsedAmount, description.trim())

    setAmount('')
    setDescription('')
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-4   space-y-4">
      <h2 className="text-base font-medium"> <span className='text-pink-400 pr-5'>-</span>Registrar gasto</h2>

      <input
        type="number"
        placeholder="Monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border px-3 py-2 rounded text-sm"
      />

      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded text-sm "
      />

      <button type="submit" className="w-full py-2 border rounded text-sm hover:scale-x-105 hover:bg-pink-400">
        Guardar gasto
      </button>

      {saved && (
        <p className="text-xs text-center">Gasto guardado ✅</p>
      )}
    </form>
  )
}

export default ExpenseForm
