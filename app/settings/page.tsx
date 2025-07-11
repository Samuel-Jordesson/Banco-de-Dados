'use client'

import { useState } from 'react'
import CreateAPIKeyModal from '../../components/CreateAPIKeyModal'
import APIKeyCard from '../../components/APIKeyCard'

/**
 * Tipagem da API Key usada no sistema
 */
type APIKey = {
  name: string
  key: string
  description?: string
}

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])

  /**
   * Adiciona nova chave na lista
   */
  function handleCreate(newKey: APIKey) {
    setApiKeys(prev => [...prev, newKey])
  }

  /**
   * Remove chave pelo índice
   */
  function handleDelete(index: number) {
    const clone = [...apiKeys]
    clone.splice(index, 1)
    setApiKeys(clone)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">API Keys</h2>
        <CreateAPIKeyModal onCreate={handleCreate} />
      </div>

      {apiKeys.length === 0 ? (
        <p className="text-gray-600">Nenhuma chave criada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {apiKeys.map((key, index) => (
            <APIKeyCard key={index} keyData={key} onDelete={() => handleDelete(index)} />
          ))}
        </div>
      )}
    </div>
  )
}
