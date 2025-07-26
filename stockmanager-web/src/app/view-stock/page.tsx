'use client'

import React, { useState, useEffect } from 'react'
import { 查看库存, 删除库存记录 } from '../../../backend/database'
import { useRouter } from 'next/navigation'

interface 库存数据{
    货物编码: string;
    货物种类: string;
    商标: string;
    颜色: string;
    尺码: string;
    初始库存: number;
    采购数量: number;
    销售数量: number;
    当前库存: number;
    货物名称: string;
}

export default function ViewStockPage() {
  const [filters, setFilters] = useState<{ [key: string]: string }>({})
  const [stockData, setStockData] = useState<库存数据[]>([])
  const [filteredData, setFilteredData] = useState<库存数据[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRow, setSelectedRow] = useState<number | null>(null) // 添加选中行状态
  const router = useRouter()

  const filterFields = [
    { label: '货物编码', key: '货物编码' },
    { label: '货物种类', key: '货物种类' },
    { label: '商标', key: '商标' },
    { label: '颜色', key: '颜色' },
    { label: '尺码', key: '尺码' },
    { label: '货物名称', key: '货物名称' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await 查看库存()
        setStockData(data || [])
        setError(null)
      } catch (err) {
        setError('Failed to fetch stock data')
        console.error('Error fetching stock data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const filtered = stockData.filter(item =>
      filterFields.every(field => {
        // If no filter value, include all items
        const filterValue = filters[field.key]?.toLowerCase().trim();
        if (!filterValue) return true;
        
        // Get the item value for this field
        const itemValue = item[field.key as keyof 库存数据];
        
        // If item value is null/undefined, don't match
        if (itemValue == null) return false;
        
        // Convert to string and check if it includes the filter value
        return itemValue.toString().toLowerCase().includes(filterValue);
      })
    );
    setFilteredData(filtered);
  }, [stockData, filters])

  const handleChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleBack = () => {
    router.back()
  }

  // 处理行点击事件
  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index)
  }

  // 处理删除操作
  const handleDelete = async () => {
    if (selectedRow === null) return

    try {
      // 获取选中行的实际数据
      const selectedItem = filteredData[selectedRow]
      if (!selectedItem) {
        throw new Error('无法找到选中的记录')
      }
      
      await 删除库存记录(selectedItem.货物编码)
      // 重新获取数据
      const data = await 查看库存()
      setStockData(data || [])
      setSelectedRow(null) // 重置选中行
    } catch (err) {
      setError('删除库存记录失败: ' + (err as Error).message)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">查看库存</h1>
        <div className="flex space-x-2">
          <button 
            onClick={handleDelete}
            disabled={selectedRow === null}
            className={`px-4 py-2 rounded transition-colors ${
              selectedRow === null 
                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            删除
          </button>
          <button 
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            返回
          </button>
        </div>
      </div>

      {/* Filter Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 bg-white dark:bg-zinc-800 p-4 rounded shadow">
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
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">库存数据表</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            显示 {filteredData.length} / {stockData.length} 条记录
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
                  <th className="border px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-medium">初始库存</th>
                  <th className="border px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-medium">采购数量</th>
                  <th className="border px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-medium">销售数量</th>
                  <th className="border px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-medium">当前库存</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, rowIndex) => (
                    <tr 
                      key={rowIndex} 
                      className={`border-t transition-colors cursor-pointer ${
                        rowIndex === selectedRow 
                          ? 'bg-blue-100 dark:bg-blue-900' 
                          : 'hover:bg-gray-50 dark:hover:bg-zinc-700'
                      }`}
                      onClick={() => handleRowClick(rowIndex)}
                    >
                      {filterFields.map(field => (
                        <td key={field.key} className="border px-4 py-2 text-gray-600 dark:text-gray-300">
                          {item[field.key as keyof 库存数据]}
                        </td>
                      ))}
                      <td className="border px-4 py-2 text-gray-600 dark:text-gray-300">{item.初始库存}</td>
                      <td className="border px-4 py-2 text-gray-600 dark:text-gray-300">{item.采购数量}</td>
                      <td className="border px-4 py-2 text-gray-600 dark:text-gray-300">{item.销售数量}</td>
                      <td className="border px-4 py-2 text-gray-600 dark:text-gray-300">{item.当前库存}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={filterFields.length + 4} className="text-center p-8 text-gray-500 dark:text-gray-400">
                      未找到匹配的库存记录
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