import './globals.css'
import { StateProvider } from 'app/state-provider'

export const metadata = {
  title: 'AI Templates for common prompts',
  description: 'AI Templates for common prompts',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center min-h-screen">
        <StateProvider> {children} </StateProvider>
      </body>
    </html>
  )
}
