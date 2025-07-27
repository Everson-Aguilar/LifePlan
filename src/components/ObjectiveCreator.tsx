'use client'

import React, { useState } from 'react'
import { saveObjective } from '@/lib/indexedDB'

type Objective = {
  title: string
  description?: string
  active: boolean
}

const ObjectiveCreator: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Objective>({
    title: '',
    description: '',
    active: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert('El título es obligatorio.')
      return
    }

    setIsSubmitting(true)

    try {
      await saveObjective(formData)
      console.log('✅ Objetivo guardado:', formData)

      setFormData({ title: '', description: '', active: true })
      setShowForm(false)

      setTimeout(() => {
        setIsSubmitting(false)
        window.location.reload()
      }, 3000)
    } catch (error) {
      console.error('❌ Error al guardar el objetivo:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4 text-center">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-neutral-700 text-white px-5 py-2 shadow-md hover:scale-105 transition"
        >
          Añadir objetivo
        </button>
      )}

      {showForm && (
        <div className="bg-neutral-800 text-white border border-neutral-600 p-6 rounded-xl shadow-lg max-w-xl mt-6 mx-auto space-y-4">
          <h2 className="text-xl font-semibold text-pink-400">
            Marca el siguiente paso de ese único camino lineal...
          </h2>

          <div className="space-y-2">
            <label className="block text-sm text-pink-300">Título *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-pink-500 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Escribe un objetivo claro..."
            />

            <label className="block text-sm text-pink-300">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-pink-500 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              rows={3}
              placeholder="Detalles o notas opcionales..."
            />
          </div>

          <p className="text-sm text-pink-300">
            ¿Estás listo para hacerlo realidad?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-1 text-gray-400 hover:text-white underline"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded transition ${
                isSubmitting
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-pink-600 hover:bg-pink-700 text-white'
              }`}
            >
              {isSubmitting ? 'Guardando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ObjectiveCreator
