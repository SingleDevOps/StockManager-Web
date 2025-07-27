'use client'

import React, { useState } from 'react'
import { 出库 } from '../../../backend/database'
import { useRouter } from 'next/navigation'

interface 出库数据{
    日期: string;
    货物编码: string;
    货物名称: string;
    尺码: string;
    数量: number;
    备注: string;
    颜色: string;
}

export default function StockOutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const [entryData, setEntryData] = useState<出库数据>({
    日期: new Date().toISOString().split('T')[0], // Default to today's date
    货物编码: '',
    货物名称: '',
    尺码: '',
    数量: 0,
    备注: '',
    颜色: ''
  })

  const inputFields = [
    { label: '日期', key: '日期', type: 'date' },
    { label: '货物编码', key: '货物编码', type: 'text' },
    { label: '货物名称', key: '货物名称', type: 'text' },
    { label: '尺码', key: '尺码', type: 'text' },
    { label: '颜色', key: '颜色', type: 'text' },
    { label: '数量', key: '数量', type: 'number' },
    { label: '备注', key: '备注', type: 'text' },
  ]

  const handleChange = (key: string, value: string) => {
    setEntryData(prev => ({
      ...prev,
      [key]: key === '数量' ? (value === '' ? '' : Number(value)) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    try {
      await 出库(entryData)
      setSuccess(true)
      // Reset form but keep the date
      setEntryData({
        日期: new Date().toISOString().split('T')[0],
        货物编码: '',
        货物名称: '',
        尺码: '',
        数量: 0,
        备注: '',
        颜色: ''
      })
    } catch (err) {
      setError('添加出库记录时出错: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <header className="p-6 text-center shadow bg-blue-600 dark:bg-blue-800">
        <h1 className="text-2xl font-bold">出库</h1>
      </header>
      
      <main className="max-w-4xl mx-auto p-6">
        <button 
          onClick={handleBack}
          className="mb-6 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
        >
          ← 返回主页
        </button>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded">
            出库记录添加成功! 请前往&quot;查看出库&quot;页面刷新查看最新数据。
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-800 p-6 rounded shadow">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {inputFields.map(field => (
              <div key={field.key} className="flex flex-col">
                <label className="text-sm mb-1 text-gray-700 dark:text-gray-300">
                  {field.label} {['货物编码', '数量'].includes(field.key) ? '*' : ''}
                </label>
                <input
                  type={field.type}
                  value={entryData[field.key as keyof 出库数据] || (field.type === 'number' ? '' : '')}
                  onChange={e => handleChange(field.key, e.target.value)}
                  required={field.key === '货物编码' || field.key === '数量'}
                  min={field.type === 'number' ? 0 : (field.type === 'date' ? undefined : undefined)}
                  className="p-3 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-black dark:text-white"
                  placeholder={field.type !== 'date' ? `输入${field.label}` : undefined}
                />
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 px-4 rounded text-white font-medium ${
                loading 
                  ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed' 
                  : 'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600'
              }`}
            >
              {loading ? '提交中...' : '增加项目'}
            </button>
            
            <button
              type="button"
              onClick={handleBack}
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