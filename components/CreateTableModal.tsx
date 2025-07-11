'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Plus, X } from 'lucide-react'

const columnTypes = ['text', 'number', 'boolean', 'date', 'json']

const schema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  columns: z.array(
    z.object({
      name: z.string().min(1),
      type: z.enum(['text', 'number', 'boolean', 'date', 'json']),
    })
  ).min(1, 'Mínimo 1 coluna'),
})

type FormData = z.infer<typeof schema>

export default function CreateTableModal({ onCreate }: { onCreate: (data: FormData) => void }) {
  const [open, setOpen] = useState(false)
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', columns: [{ name: '', type: 'text' }] }
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'columns' })

  function submit(data: FormData) {
    onCreate(data)
    reset()
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
        + Nova Tabela
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6">
          <Dialog.Title className="text-xl font-bold mb-4">Criar nova tabela</Dialog.Title>

          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label className="block font-medium">Nome da Tabela</label>
              <input {...register('name')} className="w-full border px-3 py-2 rounded" />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block font-medium mb-2">Colunas</label>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input {...register(`columns.${index}.name`)} placeholder="nome" className="w-1/2 border px-2 py-1 rounded" />
                    <select {...register(`columns.${index}.type`)} className="w-1/3 border px-2 py-1 rounded">
                      {columnTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <button type="button" onClick={() => remove(index)} className="text-red-500 hover:underline">remover</button>
                  </div>
                ))}
                <button type="button" onClick={() => append({ name: '', type: 'text' })} className="text-sm text-blue-600 hover:underline">
                  + Adicionar coluna
                </button>
              </div>
              {errors.columns && <p className="text-sm text-red-500">{errors.columns.message}</p>}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Dialog.Close className="px-4 py-2 bg-gray-200 rounded">Cancelar</Dialog.Close>
              <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Criar</button>
            </div>
          </form>

          <Dialog.Close className="absolute top-3 right-4 text-gray-500 hover:text-black">
            <X size={20} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
