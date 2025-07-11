'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'

/**
 * 🎯 Esquema de validação do formulário
 * Só valida os campos enviados manualmente (sem a chave)
 */
const schema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  description: z.string().optional(),
})

/**
 * Tipos separados:
 * - FormInputs: o que vem do formulário
 * - FormData: inclui a chave gerada (não validada)
 */
type FormInputs = z.infer<typeof schema>
type FormData = FormInputs & { key: string }

export default function CreateAPIKeyModal({
  onCreate,
}: {
  onCreate: (data: FormData) => void
}) {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema), // ✅ Agora os tipos batem com o schema
  })

  /**
   * 🔐 Gera a chave única e chama a função `onCreate` com todos os dados
   */
  function submit(data: FormInputs) {
    const key = crypto.randomUUID().replace(/-/g, '') // 🧠 Gera chave segura
    onCreate({ ...data, key }) // ✅ Envia para o pai
    reset() // Limpa o formulário
    setOpen(false) // Fecha modal
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        + Nova API Key
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-w-md w-full -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl">
          <Dialog.Title className="text-xl font-bold mb-4">Gerar nova chave</Dialog.Title>

          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label className="font-medium">Nome</label>
              <input
                {...register('name')}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="font-medium">Descrição (opcional)</label>
              <textarea
                {...register('description')}
                className="w-full border px-3 py-2 rounded"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Dialog.Close className="px-4 py-2 bg-gray-200 rounded">Cancelar</Dialog.Close>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Criar
              </button>
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
