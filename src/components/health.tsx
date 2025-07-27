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

// ✅ Normalizar fechas
const normalize = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

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
      daysData[id] = diff
    } else {
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

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date().toDateString()
      setToday(prev => (current !== prev ? current : prev))
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

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
  }

  return (
    <div className="p-3 space-y-6">
      {months.map(({ id, days }) => {
        const isStarted = startDates[id] !== null

        return (
          <div key={id} className="flex items-center gap-4">
            <Image src="/life.ico" alt={`Mes ${id}`} width={40} height={40} />

            <div className="grid grid-cols-6 gap-1 p-2">
              {Array.from({ length: days }, (_, i) => {
                let color = 'bg-gray-300'
                if (isStarted) {
                  color = i < (daysPassed[id] ?? 0) ? 'bg-gray-400' : 'bg-pink-300'
                }
                return (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${color}`}
                    title={`Día ${i + 1}`}
                  />
                )
              })}
            </div>

            <div className="-translate-y-6 text-center">
              <button
                onClick={() => activateMonth(id)}
                className={`text-xs px-2 py-1 rounded hover:scale-110 transition ${
                  isStarted
                    ? 'bg-pink-400 text-white'
                    : 'bg-gray-400 text-gray-800'
                }`}
              >
                Recargar
              </button>
              <p
                className={`text-xs mt-1 ${
                  isStarted ? 'text-gray-600' : 'text-gray-400 italic'
                }`}
              >
                Inicio: {startDates[id]?.toISOString().split('T')[0] || 'N/A'}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MonthlyTracker
