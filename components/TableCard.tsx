'use client'

import Link from 'next/link'

interface Props {
  name: string
  columnCount: number
}

export default function TableCard({ name, columnCount }: Props) {
  return (
    <Link href={`/tables/${name}`} className="block border rounded p-4 shadow hover:shadow-md transition bg-white">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{columnCount} colunas</p>
    </Link>
  )
}
