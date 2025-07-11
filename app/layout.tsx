import '../styles/globals.css'
import { ReactNode } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export const metadata = {
  title: 'Visual DB',
  description: 'Banco de dados visual autogerenciado',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-6 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
