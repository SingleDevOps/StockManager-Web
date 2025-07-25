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
      <body className="transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
