'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 添加货物编码 } from '../../../backend/database'

const AddNewProductPage: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [productData, setProductData] = useState({
    货物编码: '',
    货物种类: '',
    商标: '',
    货物名称: '',
    颜色: '',
    尺码: '',
    数量: 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProductData(prev => ({
      ...prev,
      [name]: name === '数量' ? (value === '' ? '' : Number(value)) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      // Add the product to the database
      await 添加货物编码(productData)
      
      // Show success and redirect
      alert('货物添加成功!')
      router.push('/')
    } catch (err) {
      setError('添加货物时出错: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <header className="p-6 text-center shadow bg-blue-600 dark:bg-blue-800">
        <h1 className="text-2xl font-bold">新增货物</h1>
      </header>
      
      <main className="max-w-2xl mx-auto p-6">
        <button 
          onClick={() => router.push('/')}
          className="mb-6 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
        >
          ← 返回主页
        </button>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">货物编码 *</label>
            <input
              type="text"
              name="货物编码"
              value={productData.货物编码}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              placeholder="输入货物编码"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">货物种类 *</label>
            <input
              type="text"
              name="货物种类"
              value={productData.货物种类}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              placeholder="输入货物种类"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">商标 *</label>
            <input
              type="text"
              name="商标"
              value={productData.商标}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              placeholder="输入商标"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">货物名称 *</label>
            <input
              type="text"
              name="货物名称"
              value={productData.货物名称}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              placeholder="输入货物名称"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">颜色</label>
            <input
              type="text"
              name="颜色"
              value={productData.颜色}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              placeholder="输入颜色"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">尺码</label>
            <input
              type="text"
              name="尺码"
              value={productData.尺码}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              placeholder="输入尺码"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">数量 *</label>
            <input
              type="number"
              name="数量"
              value={productData.数量 || ''}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              placeholder="输入数量"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 px-4 rounded text-white font-medium ${
                loading 
                  ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed' 
                  : 'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600'
              }`}
            >
              {loading ? '添加中...' : '添加货物'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex-1 py-3 px-4 bg-gray-300 dark:bg-gray-700 rounded font-medium hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            >
              取消
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default AddNewProductPage