import React from 'react'
import { motion } from 'framer-motion'
import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'

interface TodoItemProps {
  id: string
  title: string
  completed: boolean
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  isGridLayout: boolean
}

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  onToggle,
  onDelete,
  isGridLayout
}) => {
  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      exit={{
        opacity: 0,
        x: -100,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      transition={{
        layout: { duration: 0.3 },
        default: { duration: 0.2 }
      }}
      className={`bg-surfacePrimary rounded-lg shadow-sm transition-shadow duration-200 p-4 ${
        isGridLayout
          ? 'flex flex-col gap-4 h-full hover:shadow-md'
          : 'flex items-center justify-between'
      }`}
    >
      <div className={`flex ${isGridLayout ? 'flex-col gap-4' : 'items-center gap-4'}`}>
        <motion.button
          onClick={() => onToggle(id, !completed)}
          className={`w-6 h-6 cursor-pointer rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
            completed
              ? 'bg-accentPrimary border-accentPrimary'
              : 'border-textSecondary hover:border-accentPrimary'
          }`}
        >
          {completed && (
            <CheckIcon className="h-4 w-4 text-surfacePrimary" />
          )}
        </motion.button>
        <span
          className={`text-lg transition-all duration-200 ${
            completed
              ? 'line-through text-textSecondary'
              : 'text-textPrimary'
          }`}
        >
          {title}
        </span>
      </div>
      <motion.button
        onClick={() => onDelete(id)}
        className={`text-textSecondary cursor-pointer hover:text-red transition-colors duration-200 ${
          isGridLayout ? 'self-end' : ''
        }`}
      >
        <TrashIcon className="h-5 w-5" />
      </motion.button>
    </motion.div>
  )
}