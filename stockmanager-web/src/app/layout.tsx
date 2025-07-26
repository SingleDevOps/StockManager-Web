import './globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

export const metadata = {
  title: '库存管理系统',
  description: '一个简单的库存管理前端界面',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <title>库存管理系统</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
