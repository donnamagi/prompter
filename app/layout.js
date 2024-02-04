import './globals.css'

export const metadata = {
  title: 'AI Templates for common prompts',
  description: 'AI Templates for common prompts',
}

export default function RootLayout({
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center min-h-screen">
        {children}
      </body>
    </html>
  )
}
