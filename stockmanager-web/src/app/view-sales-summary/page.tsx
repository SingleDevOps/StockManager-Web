'use client'

import React, { useState, useEffect } from 'react'
import { 查看销售汇总 } from '../../../backend/database'
import { useRouter } from 'next/navigation'

interface 销售数据 {
  货物名称: string
  货物种类: string
  销售数量: number
  当前库存: number
  销售额: number
}

export default function ViewSalesSummaryPage() {
  const [salesData, setSalesData] = useState<销售数据[]>([])
  const [filteredData, setFilteredData] = useState<销售数据[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<{ [key: string]: string }>({})
  const router = useRouter()

  const filterFields = [
    { label: '货物名称', key: '货物名称' },
    { label: '货物种类', key: '货物种类' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await 查看销售汇总()
        setSalesData(data || [])
        setError(null)
      } catch (err) {
        setError('Failed to fetch sales summary data')
        console.error('Error fetching sales summary data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const filtered = salesData.filter(item =>
      filterFields.every(field => {
        // If no filter value, include all items
        const filterValue = filters[field.key]?.toLowerCase().trim();
        if (!filterValue) return true;
        
        // Get the item value for this field
        const itemValue = item[field.key as keyof 销售数据];
        
        // If item value is null/undefined, don't match
        if (itemValue == null) return false;
        
        // Convert to string and check if it includes the filter value
        return itemValue.toString().toLowerCase().includes(filterValue);
      })
    );
    setFilteredData(filtered);
  }, [salesData, filters])

  const handleChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">查看销售汇总</h1>
        <button 
          onClick={handleBack}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          返回
        </button>
      </div>

      {/* Filter Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 bg-white dark:bg-zinc-800 p-4 rounded shadow">
        {filterFields.map(field => (
          <div key={field.key} className="flex flex-col">
            <label className="text-sm mb-1 text-gray-700 dark:text-gray-300">{field.label}</label>
            <input
              type="text"
              value={filters[field.key] || ''}
              onChange={e => handleChange(field.key, e.target.value)}
              className="p-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-black dark:text-white"
              placeholder={`输入${field.label}`}
            />
          </div>
        ))}
      </div>

      {/* Data Display Area */}
      <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">销售汇总数据表</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            显示 {filteredData.length} / {salesData.length} 条记录
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-zinc-700 sticky top-0">
                  {filterFields.map(field => (
                    <th key={field.key} className="border px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-medium">
                      {field.label}
                    </th>
                  ))}
                  <th className="border px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-medium">销售数量</th>
                  <th className="border px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-medium">当前库存</th>
                  <th className="border px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-medium">销售额</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, rowIndex) => (
                    <tr key={rowIndex} className="border-t hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
                      {filterFields.map(field => (
                        <td key={field.key} className="border px-4 py-2 text-gray-600 dark:text-gray-300">
                          {item[field.key as keyof 销售数据]}
                        </td>
                      ))}
                      <td className="border px-4 py-2 text-gray-600 dark:text-gray-300">{item.销售数量}</td>
                      <td className="border px-4 py-2 text-gray-600 dark:text-gray-300">{item.当前库存}</td>
                      <td className="border px-4 py-2 text-gray-600 dark:text-gray-300">{item.销售额}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={filterFields.length + 3} className="text-center p-8 text-gray-500 dark:text-gray-400">
                      未找到匹配的销售汇总记录
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}