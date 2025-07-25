'use client'

import React, { useState } from 'react'
import { saveTool, saveSkill, saveProduct } from '@/lib/indexedDB'

const InventorySection: React.FC = () => {
  const [tool, setTool] = useState({ name: '', action: '', value: '' })
  const [skill, setSkill] = useState({ name: '', action: '', cost: '' })
  const [product, setProduct] = useState({ name: '', action: '', value: '' })

  const handleToolSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, action, value } = tool
    const parsedValue = parseFloat(value)
    if (!name || !action || isNaN(parsedValue)) return
    await saveTool(name, action, parsedValue)
    setTool({ name: '', action: '', value: '' })
  }

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, action, cost } = skill
    const parsedCost = parseFloat(cost)
    if (!name || !action || isNaN(parsedCost)) return
    await saveSkill(name, action, parsedCost)
    setSkill({ name: '', action: '', cost: '' })
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, action, value } = product
    const parsedValue = parseFloat(value)
    if (!name || !action || isNaN(parsedValue)) return
    await saveProduct(name, action, parsedValue)
    setProduct({ name: '', action: '', value: '' })
  }

  const inputClass ='w-full border px-3 py-2 rounded text-sm'

  const sectionClass = 'p-4 space-y-4 '

  const buttonClass = 'w-full py-2 rounded border text-sm hover:scale-x-105 hover:bg-pink-400'

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
        />

        <input
          type="text"
          placeholder="Acción"
          value={tool.action}
          onChange={(e) => setTool({ ...tool, action: e.target.value })}
          className={inputClass}
        />

        <input
          type="number"
          placeholder="Valor"
          value={tool.value}
          onChange={(e) => setTool({ ...tool, value: e.target.value })}
          className={inputClass}
        />

        <button type="submit" className={buttonClass}>
          Guardar herramienta
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
        />

        <input
          type="text"
          placeholder="Key"
          value={skill.action}
          onChange={(e) => setSkill({ ...skill, action: e.target.value })}
          className={inputClass}
        />

        <input
          type="number"
          placeholder="Costo"
          value={skill.cost}
          onChange={(e) => setSkill({ ...skill, cost: e.target.value })}
          className={inputClass}
        />

        <button type="submit" className={buttonClass}>
          Guardar Servicios
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
        />

        <input
          type="text"
          placeholder="Acción"
          value={product.action}
          onChange={(e) => setProduct({ ...product, action: e.target.value })}
          className={inputClass}
        />

        <input
          type="number"
          placeholder="Valor"
          value={product.value}
          onChange={(e) => setProduct({ ...product, value: e.target.value })}
          className={inputClass}
        />

        <button type="submit" className={buttonClass}>
          Guardar producto
        </button>
      </form>
    </div>
  )
}

export default InventorySection
