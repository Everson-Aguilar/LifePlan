'use client'

import React, { useEffect, useState } from 'react'
import {
  getSimpleIncomes,
  getSimpleExpenses,
  getTools,
  getSkills,
  getProducts,
  saveTotalBalance,
} from '@/lib/indexedDB'

const TotalBalance: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null)

  useEffect(() => {
    const calculateBalance = async () => {
      const incomes = await getSimpleIncomes()
      const expenses = await getSimpleExpenses()
      const tools = await getTools()
      const skills = await getSkills()
      const products = await getProducts()

      const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0)
      const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0)
      const totalTools = tools.reduce((acc, tool) => acc + tool.value, 0)
      const totalSkills = skills.reduce((acc, skill) => acc + skill.cost, 0)
      const totalProducts = products.reduce((acc, product) => acc + product.value, 0)

      const totalSpent = totalExpense + totalTools + totalSkills + totalProducts
      const finalBalance = totalIncome - totalSpent

      setBalance(finalBalance)
      await saveTotalBalance(finalBalance) // << GUARDAR AQUÍ
    }

    calculateBalance()
  }, [])

  return (
    <div>
  
  {balance !== null ? (
    <p>${balance.toFixed(2)}</p>
  ) : (
    <p>Cargando...</p>
  )}
</div>

  )
}

export default TotalBalance
