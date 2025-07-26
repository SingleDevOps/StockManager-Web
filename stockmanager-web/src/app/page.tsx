'use client'
import React from 'react'
import FunctionButton from '../components/FunctionButton'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

const HomePage: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const router = useRouter()

  const handlePress = (action: string) => {
    console.log(`Button pressed: ${action}`)
    
    switch(action) {
      case '查看库存':
        router.push('/view-stock')
        break
      case '查看入库':
        router.push('/view-stock-in')
        break
      case '查看出库':
        router.push('/view-stock-out')
        break
      case '查看销售汇总':
        router.push('/view-sales-summary')
        break
      case '查看货物编码':
        router.push('/view-product-codes')
        break
      case '入库':
        router.push('/stock-in')
        break
      case '出库':
        router.push('/stock-out')
        break
      case '新增货物':
        router.push('/add-new-product')
        break
    }
  }
  

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen`}>
      <header className={`p-6 text-center shadow ${isDark ? 'bg-blue-800' : 'bg-blue-600'}`}>
        <h1 className="text-2xl font-bold">库存管理系统</h1>
      </header>
      <main className="flex flex-wrap justify-center gap-4 p-8">
        <FunctionButton text="查看库存" onClick={() => handlePress('查看库存')} />
        <FunctionButton text="查看入库" onClick={() => handlePress('查看入库')} />
        <FunctionButton text="查看出库" onClick={() => handlePress('查看出库')} />
        <FunctionButton text="查看货物编码" onClick={() => handlePress('查看货物编码')} />
        <FunctionButton text="查看销售汇总" onClick={() => handlePress('查看销售汇总')} />
        <FunctionButton text="入库" onClick={() => handlePress('入库')} />
        <FunctionButton text="出库" onClick={() => handlePress('出库')} />
        <FunctionButton text="新增货物" onClick={() => handlePress('新增货物')} />
      </main>
    </div>
  )
}

export default HomePage
