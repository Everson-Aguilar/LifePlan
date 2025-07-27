// indexedDB.ts  configuracion

import { openDB } from 'idb'

const DB_NAME = 'Local'
const STORE_NAME = 'tracker'

const getDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    },
  })
}


///////////////////////////////////////////////////////////////////////////////////// api local ////////////////////////////////////////////////////


// Guarda la fecha de inicio para un mes
export const saveMonthStartDate = async (monthId: number, date: Date) => {
  const db = await getDB()
  await db.put(STORE_NAME, date.toISOString(), monthId.toString())
}

// Recupera la fecha de inicio para un mes
export const getMonthStartDate = async (monthId: number): Promise<Date | null> => {
  const db = await getDB()
  const dateString = await db.get(STORE_NAME, monthId.toString())

  return dateString ? new Date(dateString) : null
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// registrar ingresos

export const saveSimpleIncome = async (amount: number, description: string) => {
  const db = await getDB()
  const timestamp = new Date().toISOString()
  const key = `income-${timestamp}`

  await db.put(STORE_NAME, { amount, description, date: timestamp }, key)
}


// restar ingresos

export const saveSimpleExpense = async (amount: number, description: string) => {
  const db = await getDB()
  const timestamp = new Date().toISOString()
  const key = `expense-${timestamp}`

  await db.put(STORE_NAME, { amount, description, date: timestamp }, key)
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Guardar herramienta
export const saveTool = async (name: string, action: string, value: number) => {
  const db = await getDB()
  const key = `tool-${Date.now()}`
  await db.put(STORE_NAME, { name, action, value }, key)
}

// Guardar Servicios
export const saveSkill = async (name: string, action: string, cost: number) => {
  const db = await getDB()
  const key = `skill-${Date.now()}`
  await db.put(STORE_NAME, { name, action, cost }, key)
}

// Guardar producto
export const saveProduct = async (name: string, action: string, value: number) => {
  const db = await getDB()
  const key = `product-${Date.now()}`
  await db.put(STORE_NAME, { name, action, value }, key)
}



//--------------------------------------------------------------------Get-------------------------------------------------------------------------///








type Income = { amount: number; description: string; date: string }
type Expense = { amount: number; description: string; date: string }
type Tool = { name: string; action: string; value: number }
type Skill = { name: string; action: string; cost: number; subscription?: number }
type Product = { name: string; action: string; value: number }

/// typando datos para que no esten en el aire....




export const getSimpleIncomes = async (): Promise<Income[]> => {
  const db = await getDB()
  const all = await db.getAllKeys(STORE_NAME)
  const keys = all.filter((key): key is string => typeof key === 'string' && key.startsWith('income-'))
  return await Promise.all(keys.map((key) => db.get(STORE_NAME, key) as Promise<Income>))
}

export const getSimpleExpenses = async (): Promise<Expense[]> => {
  const db = await getDB()
  const all = await db.getAllKeys(STORE_NAME)
  const keys = all.filter((key): key is string => typeof key === 'string' && key.startsWith('expense-'))
  return await Promise.all(keys.map((key) => db.get(STORE_NAME, key) as Promise<Expense>))
}

export const getTools = async (): Promise<Tool[]> => {
  const db = await getDB()
  const all = await db.getAllKeys(STORE_NAME)
  const keys = all.filter((key): key is string => typeof key === 'string' && key.startsWith('tool-'))
  return await Promise.all(keys.map((key) => db.get(STORE_NAME, key) as Promise<Tool>))
}

export const getSkills = async (): Promise<Skill[]> => {
  const db = await getDB()
  const all = await db.getAllKeys(STORE_NAME)
  const keys = all.filter((key): key is string => typeof key === 'string' && key.startsWith('skill-'))
  return await Promise.all(keys.map((key) => db.get(STORE_NAME, key) as Promise<Skill>))
}

export const getProducts = async (): Promise<Product[]> => {
  const db = await getDB()
  const all = await db.getAllKeys(STORE_NAME)
  const keys = all.filter((key): key is string => typeof key === 'string' && key.startsWith('product-'))
  return await Promise.all(keys.map((key) => db.get(STORE_NAME, key) as Promise<Product>))
}


/////////////////////////////////////////////////////////// calculator ////////////////////////////////////////////////////


// Guarda el balance total actual
export const saveTotalBalance = async (amount: number) => {
  const db = await getDB()
  const key = 'balance-total'
  await db.put(STORE_NAME, { amount, date: new Date().toISOString() }, key)
  console.log(`Balance guardado: ${amount}`)
}

// Obtener el balance total guardado
export const getSavedBalance = async (): Promise<{ amount: number; date: string } | null> => {
  const db = await getDB()
  const key = 'balance-total'
  const result = await db.get(STORE_NAME, key)
  return result || null
}





