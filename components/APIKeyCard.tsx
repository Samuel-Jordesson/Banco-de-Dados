'use client'

import { useState } from 'react'
import { ClipboardCopy, Trash2, Check } from 'lucide-react'

type Props = {
  keyData: { name: string; key: string; description?: string }
  onDelete: () => void
}

export default function APIKeyCard({ keyData, onDelete }: Props) {
  const [copied, setCopied] = useState(false)

  function copyKey() {
    navigator.clipboard.writeText(keyData.key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border p-4 rounded bg-white shadow">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{keyData.name}</h3>
        <button onClick={onDelete} className="text-red-500 hover:underline">
          <Trash2 size={18} />
        </button>
      </div>

      {keyData.description && (
        <p className="text-sm text-gray-600">{keyData.description}</p>
      )}

      <div className="mt-2 bg-gray-100 px-3 py-2 rounded font-mono text-sm flex items-center justify-between">
        <span className="truncate">{keyData.key}</span>
        <button onClick={copyKey} className="text-blue-600 hover:underline ml-2">
          {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
        </button>
      </div>
    </div>
  )
}
