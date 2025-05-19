import React from 'react'
import { motion } from 'framer-motion'
import { PlusIcon } from '@heroicons/react/24/outline'

interface TodoFormProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export const TodoForm: React.FC<TodoFormProps> = ({
  value,
  onChange,
  onSubmit
}) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      onSubmit={onSubmit}
      className="mb-10 sticky top-0 left-0 py-4 px-1 bg-bgPrimary"
    >
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-lg border outline-none bg-white border-gray-200 px-4 py-3 transition-all duration-200"
        />
        <motion.button
          type="submit"
          className="bg-accentPrimary text-white px-6 cursor-pointer h-12 aspect-square rounded-xl hover:bg-accentSecondary transition-colors duration-200"
        >
          <PlusIcon className="h-6 w-6" />
        </motion.button>
      </div>
    </motion.form>
  )
}