'use client'

import { useState } from 'react'
import CreateTableModal from '../../components/CreateTableModal'
import TableCard from '../../components/TableCard'

export default function TablesPage() {
  const [tables, setTables] = useState<
    { name: string; columns: { name: string; type: string }[] }[]
  >([])

  function handleCreate(data: { name: string; columns: { name: string; type: string }[] }) {
    // Aqui futuramente enviaremos para o backend
    setTables([...tables, data])
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tabelas</h2>
        <CreateTableModal onCreate={handleCreate} />
      </div>

      {tables.length === 0 ? (
        <p className="text-gray-600">Nenhuma tabela criada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tables.map((tabela) => (
            <TableCard key={tabela.name} name={tabela.name} columnCount={tabela.columns.length} />
          ))}
        </div>
      )}
    </div>
  )
}
