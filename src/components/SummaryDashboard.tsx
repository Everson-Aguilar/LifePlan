'use client'

import React, { useEffect, useState } from 'react'
import {
  getSimpleIncomes,
  getSimpleExpenses,
  getTools,
  getSkills,
  getProducts
} from '@/lib/indexedDB'

// Tipos
type Income = { amount: number; description: string; date: string }
type Expense = { amount: number; description: string; date: string }
type Tool = { name: string; action: string; value: number }
type Skill = { name: string; action: string; cost: number }
type Product = { name: string; action: string; value: number }

// Componente Modal centrado
const TextModal: React.FC<{ text: string; onClose: () => void }> = ({ text, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="p-6 rounded bg-amber-500 border-2  border-neutral-900 shadow-md max-w-md w-full relative">
        <span className="text-3xl font-bold text-white">!</span>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-100 hover:text-red-300 font-bold text-xl"
        >
          ×
        </button>
        <p className="text-white text-sm whitespace-pre-wrap mt-4">{text}</p>
      </div>
    </div>
  )
}

// Botón para mostrar texto en modal
const ToggleModalText: React.FC<{ text: string }> = ({ text }) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="px-2 py-1 text-xs border text-neutral-800 rounded hover:bg-pink-200"
      >
        Ver
      </button>
      {show && <TextModal text={text} onClose={() => setShow(false)} />}
    </>
  )
}

const SummaryDashboard: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [tools, setTools] = useState<Tool[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [i, e, t, s, p] = await Promise.all([
        getSimpleIncomes(),
        getSimpleExpenses(),
        getTools(),
        getSkills(),
        getProducts()
      ])
      setIncomes(i)
      setExpenses(e)
      setTools(t)
      setSkills(s)
      setProducts(p)
    }

    fetchData()
  }, [])

  const cardStyle = '  h-[300px]  scroll-invisible p-1 shadow-sm overflow-auto '
  const titleStyle = 'text-lg text-neutral-500 font-semibold mb-2'
  const tableStyle = 'min-w-full text-sm text-left'
  const thStyle = 'font-semibold text-neutral-600 border-b pb-1 pr-2'
  const tdStyle = 'py-1 pr-2 text-gray-500'

  return (
    <div className="p-3  space-y-6 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-4 text-neutral-700  ">Resumen general</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
        {/* Ingresos */}
        <div className={cardStyle}>
          <h3 className={titleStyle}>Ingresos</h3>
          {incomes.length === 0 ? (
            <p className="text-sm text-neutral-700">Sin ingresos</p>
          ) : (
            <table className={tableStyle}>
              <thead>
                <tr>
                  <th className={thStyle}>Monto</th>
                  <th className={thStyle}>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((item, idx) => (
                  <tr key={idx}>
                    <td className={tdStyle}>${item.amount}</td>
                    <td className={tdStyle}>
                      <ToggleModalText text={item.description} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Gastos */}
        <div className={cardStyle}>
          <h3 className={titleStyle}>Gastos</h3>
          {expenses.length === 0 ? (
            <p className="text-sm  text-neutral-600">Sin gastos</p>
          ) : (
            <table className={tableStyle}>
              <thead>
                <tr>
                  <th className={thStyle}>Monto</th>
                  <th className={thStyle}>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((item, idx) => (
                  <tr key={idx}>
                    <td className={tdStyle}>${item.amount}</td>
                    <td className={tdStyle}>
                      <ToggleModalText text={item.description} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Herramientas */}
        <div className={cardStyle}>
          <h3 className={titleStyle}>Herramientas</h3>
          <table className={tableStyle}>
            <thead>
              <tr>
                <th className={thStyle}>Nombre</th>
                <th className={thStyle}>Acción</th>
                <th className={thStyle}>Valor</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((item, idx) => (
                <tr key={idx}>
                  <td className={tdStyle}>
                    <ToggleModalText text={item.name} />
                  </td>
                  <td className={tdStyle}>
                    <ToggleModalText text={item.action} />
                  </td>
                  <td className={tdStyle}>${item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Servicios */}
        <div className={cardStyle}>
          <h3 className={titleStyle}>Servicios</h3>
          <table className={tableStyle}>
            <thead>
              <tr>
                <th className={thStyle}>Nombre</th>
                <th className={thStyle}>Acción</th>
                <th className={thStyle}>Costo</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((item, idx) => (
                <tr key={idx}>
                  <td className={tdStyle}>
                    <ToggleModalText text={item.name} />
                  </td>
                  <td className={tdStyle}>
                    <ToggleModalText text={item.action} />
                  </td>
                  <td className={tdStyle}>${item.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Productos */}
        <div className={cardStyle}>
          <h3 className={titleStyle}>Productos</h3>
          <table className={tableStyle}>
            <thead>
              <tr>
                <th className={thStyle}>Nombre</th>
                <th className={thStyle}>Acción</th>
                <th className={thStyle}>Valor</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, idx) => (
                <tr key={idx}>
                  <td className={tdStyle}>
                    <ToggleModalText text={item.name} />
                  </td>
                  <td className={tdStyle}>
                    <ToggleModalText text={item.action} />
                  </td>
                  <td className={tdStyle}>${item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SummaryDashboard
