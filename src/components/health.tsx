'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { saveMonthStartDate, getMonthStartDate } from '@/lib/indexedDB'

type Month = {
  id: number
  days: number[]
}

const MonthlyTracker: React.FC = () => {
  const months: Month[] = [
    { id: 1, days: Array.from({ length: 30 }, (_, i) => i + 1) },
    { id: 2, days: Array.from({ length: 30 }, (_, i) => i + 1) },
    { id: 3, days: Array.from({ length: 30 }, (_, i) => i + 1) },
  ]

  const [startDates, setStartDates] = useState<Record<number, Date | null>>({})
  const [diffInDays, setDiffInDays] = useState<Record<number, number>>({})

  useEffect(() => {
    const loadStartDates = async () => {
      const now = new Date()
      const newStartDates: Record<number, Date | null> = {}
      const newDiffs: Record<number, number> = {}

      for (const month of months) {
        const startDate = await getMonthStartDate(month.id)

        console.log(`Mes ${month.id}: Fecha actual = ${startDate.toISOString()}`)

        newStartDates[month.id] = startDate

        const diff = Math.floor(
          (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        )
        newDiffs[month.id] = diff
      }

      setStartDates(newStartDates)
      setDiffInDays(newDiffs)
    }

    loadStartDates()
  }, [])

  const handleActivate = async (monthId: number) => {
    const now = new Date()
    const previousDate = startDates[monthId]

    if (previousDate) {
      console.log(`Mes ${monthId}: Fecha anterior = ${previousDate.toISOString()}`)
    } else {
      console.log(`Mes ${monthId}: No tenía fecha asignada`)
    }

    await saveMonthStartDate(monthId, now)

    console.log(`Mes ${monthId}: Nueva fecha guardada = ${now.toISOString()}`)

    setStartDates((prev) => ({ ...prev, [monthId]: now }))
    setDiffInDays((prev) => ({ ...prev, [monthId]: 0 }))
  }

  return (
    <div className="justify-center gap-8 p-3">
      {months.map((month) => (
        <div key={month.id} className="flex gap-5 items-center">
          <Image src="/life.ico" alt={`Mes ${month.id}`} width={50} height={50} />

          <div className="grid grid-cols-6 gap-1 p-3">
            {month.days.map((day, dayIndex) => {
              const isPast = dayIndex < (diffInDays[month.id] ?? 0)

              return (
                <div
                  key={day}
                  className={`w-3 h-3 rounded-full ${
                    isPast ? 'bg-gray-400' : 'bg-pink-300'
                  }`}
                  title={`Día ${day}`}
                />
              )
            })}
          </div>

          <div className="-translate-y-10 ">
            <button
              onClick={() => handleActivate(month.id)}
              className="text-xs bg-pink-400 text-white px-2 py-1 rounded mb-1 hover:scale-125"
            >
              Recharge
            </button>
            <p className="text-xs text-gray-600">
              Inicio: {startDates[month.id]?.toISOString().split('T')[0]}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MonthlyTracker
