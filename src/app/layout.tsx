import '../styles/globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pétition : Apaisement rue de Verdun',
  description: "Signez la pétition pour l'apaisement de la rue de Verdun à Orsay",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col h-full">
          <header className="p-4 fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <h1 className="text-lg sm:text-xl font-bold">Pétition : Apaisement rue de Verdun</h1>
          </header>
          <main className="flex-1 overflow-y-auto mt-20 sm:mt-18 px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}