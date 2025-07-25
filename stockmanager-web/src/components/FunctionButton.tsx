'use client'
import React from 'react'

interface FunctionButtonProps {
  text: string
  onClick: () => void
}

const FunctionButton: React.FC<FunctionButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 rounded-xl px-6 py-4 shadow-md hover:shadow-lg transition-all w-60"
    >
      {text}
    </button>
  )
}

export default FunctionButton
