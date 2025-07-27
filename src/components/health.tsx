'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { saveMonthStartDate, getMonthStartDate } from '@/lib/indexedDB'

type Month = {
  id: number
  days: number
}

const months: Month[] = [
  { id: 1, days: 30 },
  { id: 2, days: 30 },
  { id: 3, days: 30 },
]

// ✅ Normalizar fechas (sin horas)
const normalize = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

// ✅ Mover fuera para evitar advertencias
const fetchDates = async () => {
  const todayDate = normalize(new Date())
  const startData: Record<number, Date | null> = {}
  const daysData: Record<number, number> = {}

  for (const { id } of months) {
    const savedDate = await getMonthStartDate(id)
    startData[id] = savedDate

    if (savedDate) {
      const start = normalize(new Date(savedDate))
      const diff = Math.floor(
        (todayDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      )

      console.log(
        `Mes ${id}: Hoy = ${todayDate.toDateString()} | Guardado = ${start.toDateString()} | Días pasados = ${diff}`
      )

      daysData[id] = diff
    } else {
      console.log(`Mes ${id}: No hay fecha guardada. Se asigna 0 días.`)
      daysData[id] = 0
    }
  }

  return { startData, daysData }
}

const MonthlyTracker: React.FC = () => {
  const [startDates, setStartDates] = useState<Record<number, Date | null>>({})
  const [daysPassed, setDaysPassed] = useState<Record<number, number>>({})
  const [today, setToday] = useState(new Date().toDateString())

  useEffect(() => {
    const load = async () => {
      const { startData, daysData } = await fetchDates()
      setStartDates(startData)
      setDaysPassed(daysData)
    }

    load()
  }, [])

  // Intervalo para detectar cambio de día
  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date().toDateString()
      setToday(prev => {
        if (current !== prev) {
          console.log(`Cambio detectado: ayer era ${prev}, ahora es ${current}`)
          return current
        }
        return prev
      })
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  // Cuando cambia el día, vuelve a calcular días pasados
  useEffect(() => {
    const update = async () => {
      const { startData, daysData } = await fetchDates()
      setStartDates(startData)
      setDaysPassed(daysData)
    }

    update()
  }, [today])

  const activateMonth = async (id: number) => {
    const now = new Date()
    await saveMonthStartDate(id, now)

    setStartDates(prev => ({ ...prev, [id]: now }))
    setDaysPassed(prev => ({ ...prev, [id]: 0 }))

    console.log(`Mes ${id} reiniciado con fecha: ${now.toDateString()}`)
  }

  return (
    <div className="p-3 space-y-6">
      {months.map(({ id, days }) => (
        <div key={id} className="flex items-center gap-4">
          <Image src="/life.ico" alt={`Mes ${id}`} width={40} height={40} />

          <div className="grid grid-cols-6 gap-1 p-2">
            {Array.from({ length: days }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < (daysPassed[id] ?? 0) ? 'bg-gray-400' : 'bg-pink-300'
                }`}
                title={`Día ${i + 1}`}
              />
            ))}
          </div>

          <div className="-translate-y-6 text-center">
            <button
              onClick={() => activateMonth(id)}
              className="text-xs bg-pink-400 text-white px-2 py-1 rounded hover:scale-110"
            >
              Recargar
            </button>
            <p className="text-xs text-gray-600 mt-1">
              Inicio: {startDates[id]?.toISOString().split('T')[0] || 'N/A'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MonthlyTracker
