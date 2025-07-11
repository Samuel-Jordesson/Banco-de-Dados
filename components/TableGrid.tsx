'use client'

import { useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'

type RecordType = { [key: string]: string | number | boolean }

interface Props {
  columns: string[]
  rows: RecordType[]
  onAdd: (row: RecordType) => void
  onUpdate: (index: number, updated: RecordType) => void
  onDelete: (index: number) => void
}

export default function TableGrid({ columns, rows, onAdd, onUpdate, onDelete }: Props) {
  const [newRow, setNewRow] = useState<RecordType>({})

  function handleChange(key: string, value: string) {
    setNewRow((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="overflow-auto bg-white border rounded-lg shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2">{col}</th>
            ))}
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col} className="px-4 py-2">{row[col]}</td>
              ))}
              <td className="px-4 py-2 flex gap-2">
                <button className="text-blue-600 hover:underline" onClick={() => {
                  const updated = { ...row }
                  updated[columns[0]] = String(row[columns[0]]) + ' (editado)'
                  onUpdate(i, updated)
                }}>
                  <Pencil size={16} />
                </button>
                <button className="text-red-600 hover:underline" onClick={() => onDelete(i)}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {/* Nova linha */}
          <tr className="border-t bg-gray-50">
            {columns.map((col) => (
              <td key={col} className="px-4 py-2">
                <input
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={String(newRow[col] ?? '')}
                  onChange={(e) => handleChange(col, e.target.value)}
                />
              </td>
            ))}
            <td className="px-4 py-2">
              <button
                onClick={() => {
                  if (columns.some((col) => !newRow[col])) return
                  onAdd(newRow)
                  setNewRow({})
                }}
                className="text-green-600 hover:underline"
              >
                <Plus size={16} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
