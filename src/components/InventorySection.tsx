'use client'

import React, { useState } from 'react'
import { saveTool, saveSkill, saveProduct } from '@/lib/indexedDB'

const InventorySection: React.FC = () => {
  const [tool, setTool] = useState({ name: '', action: '', value: '' })
  const [skill, setSkill] = useState({ name: '', action: '', cost: '' })
  const [product, setProduct] = useState({ name: '', action: '', value: '' })

  const [isSubmittingTool, setIsSubmittingTool] = useState(false)
  const [isSubmittingSkill, setIsSubmittingSkill] = useState(false)
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false)

  const handleToolSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, action, value } = tool
    const parsedValue = parseFloat(value)
    if (!name || !action || isNaN(parsedValue) || isSubmittingTool) return

    setIsSubmittingTool(true)
    await saveTool(name, action, parsedValue)
    setTool({ name: '', action: '', value: '' })

    setTimeout(() => {
      setIsSubmittingTool(false)
      window.location.reload()
    }, 3000)
  }

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, action, cost } = skill
    const parsedCost = parseFloat(cost)
    if (!name || !action || isNaN(parsedCost) || isSubmittingSkill) return

    setIsSubmittingSkill(true)
    await saveSkill(name, action, parsedCost)
    setSkill({ name: '', action: '', cost: '' })

    setTimeout(() => {
      setIsSubmittingSkill(false)
      window.location.reload()
    }, 3000)
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, action, value } = product
    const parsedValue = parseFloat(value)
    if (!name || !action || isNaN(parsedValue) || isSubmittingProduct) return

    setIsSubmittingProduct(true)
    await saveProduct(name, action, parsedValue)
    setProduct({ name: '', action: '', value: '' })

    setTimeout(() => {
      setIsSubmittingProduct(false)
      window.location.reload()
    }, 3000)
  }

  const inputClass = 'w-full border px-3 py-2 rounded text-sm'
  const sectionClass = 'p-4 space-y-4'
  const buttonBase = 'w-full py-2 rounded border text-sm hover:scale-x-105 hover:bg-pink-400'

  return (
    <div className="gap-6 flex w-full">
      {/* Herramientas */}
      <form onSubmit={handleToolSubmit} className={sectionClass}>
        <h3 className="font-semibold text-base">Herramienta</h3>

        <input
          type="text"
          placeholder="Nombre"
          value={tool.name}
          onChange={(e) => setTool({ ...tool, name: e.target.value })}
          className={inputClass}
          disabled={isSubmittingTool}
        />
        <input
          type="text"
          placeholder="Acción"
          value={tool.action}
          onChange={(e) => setTool({ ...tool, action: e.target.value })}
          className={inputClass}
          disabled={isSubmittingTool}
        />
        <input
          type="number"
          placeholder="Valor"
          value={tool.value}
          onChange={(e) => setTool({ ...tool, value: e.target.value })}
          className={inputClass}
          disabled={isSubmittingTool}
        />

        <button
          type="submit"
          className={`${buttonBase} ${isSubmittingTool ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmittingTool}
        >
          {isSubmittingTool ? 'Guardando...' : 'Guardar herramienta'}
        </button>
      </form>

      {/* Habilidades */}
      <form onSubmit={handleSkillSubmit} className={sectionClass}>
        <h3 className="font-semibold text-base">Servicios</h3>

        <input
          type="text"
          placeholder="Nombre"
          value={skill.name}
          onChange={(e) => setSkill({ ...skill, name: e.target.value })}
          className={inputClass}
          disabled={isSubmittingSkill}
        />
        <input
          type="text"
          placeholder="Key"
          value={skill.action}
          onChange={(e) => setSkill({ ...skill, action: e.target.value })}
          className={inputClass}
          disabled={isSubmittingSkill}
        />
        <input
          type="number"
          placeholder="Costo"
          value={skill.cost}
          onChange={(e) => setSkill({ ...skill, cost: e.target.value })}
          className={inputClass}
          disabled={isSubmittingSkill}
        />

        <button
          type="submit"
          className={`${buttonBase} ${isSubmittingSkill ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmittingSkill}
        >
          {isSubmittingSkill ? 'Guardando...' : 'Guardar servicios'}
        </button>
      </form>

      {/* Productos */}
      <form onSubmit={handleProductSubmit} className={sectionClass}>
        <h3 className="font-semibold text-base">Producto</h3>

        <input
          type="text"
          placeholder="Nombre"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className={inputClass}
          disabled={isSubmittingProduct}
        />
        <input
          type="text"
          placeholder="Acción"
          value={product.action}
          onChange={(e) => setProduct({ ...product, action: e.target.value })}
          className={inputClass}
          disabled={isSubmittingProduct}
        />
        <input
          type="number"
          placeholder="Valor"
          value={product.value}
          onChange={(e) => setProduct({ ...product, value: e.target.value })}
          className={inputClass}
          disabled={isSubmittingProduct}
        />

        <button
          type="submit"
          className={`${buttonBase} ${isSubmittingProduct ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmittingProduct}
        >
          {isSubmittingProduct ? 'Guardando...' : 'Guardar producto'}
        </button>
      </form>
    </div>
  )
}

export default InventorySection
