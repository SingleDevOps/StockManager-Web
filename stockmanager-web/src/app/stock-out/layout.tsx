export default function StockOutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航栏 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">出库管理</h1>
        </div>
      </header>

      {/* 主体内容 */}
      <div className="container mx-auto px-4 py-6 flex">
        {/* 侧边栏 */}
        {/* <aside className="w-64 hidden md:block mr-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded p-4">
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">筛选条件</h2>
            <ul className="space-y-2">
              <li><button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">所有商品</button></li>
              <li><button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">最近出库</button></li>
              <li><button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">分类筛选</button></li>
            </ul>
          </div>
        </aside> */}

        {/* 主内容区域 */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}