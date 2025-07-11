import { Router } from 'express'
import { prisma } from '../db'

const router = Router()

// GET - Listar todas as API Keys
router.get('/', async (req, res) => {
  const keys = await prisma.apiKey.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(keys)
})

// POST - Criar nova chave
router.post('/', async (req, res) => {
  const { name, description, key } = req.body

  if (!name || !key) {
    return res.status(400).json({ error: 'Nome e chave são obrigatórios.' })
  }

  try {
    const created = await prisma.apiKey.create({
      data: { name, description, key }
    })

    res.status(201).json(created)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar chave', detail: err })
  }
})

// DELETE - Remover chave por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await prisma.apiKey.delete({ where: { id } })
    res.status(204).end()
  } catch (err) {
    res.status(404).json({ error: 'Chave não encontrada' })
  }
})

export default router
