'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Table, Settings, LayoutDashboard } from 'lucide-react'

const menu = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard size={18} /> },
  { label: 'Tabelas', href: '/tables', icon: <Table size={18} /> },
  { label: 'Configurações', href: '/settings', icon: <Settings size={18} /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r p-4">
      <h1 className="text-2xl font-bold mb-8 text-red-500">Visual DB</h1>
      <nav className="space-y-2">
        {menu.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 transition ${
              pathname === href ? 'bg-gray-200 font-semibold' : ''
            }`}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
