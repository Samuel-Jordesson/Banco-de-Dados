'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import TableGrid from '../../../components/TableGrid'

export default function TableDetailPage() {
  const { id } = useParams()

  // Simulando a estrutura da tabela
  const [columns, setColumns] = useState<string[]>(['id', 'nome', 'email'])
  const [rows, setRows] = useState<any[]>([
    { id: 1, nome: 'João', email: 'joao@email.com' },
    { id: 2, nome: 'Maria', email: 'maria@email.com' },
  ])

  function addRow(newRow: any) {
    const id = rows.length + 1
    setRows([...rows, { ...newRow, id }])
  }

  function updateRow(index: number, updated: any) {
    const updatedRows = [...rows]
    updatedRows[index] = updated
    setRows(updatedRows)
  }

  function deleteRow(index: number) {
    const updatedRows = [...rows]
    updatedRows.splice(index, 1)
    setRows(updatedRows)
  }

  useEffect(() => {
    // Quando conectarmos com backend, aqui vamos buscar os dados reais da tabela
    // Ex: fetch(`/api/tables/${id}`)
  }, [id])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tabela: {id}</h2>
      <TableGrid
        columns={columns}
        rows={rows}
        onAdd={addRow}
        onUpdate={updateRow}
        onDelete={deleteRow}
      />
    </div>
  )
}
