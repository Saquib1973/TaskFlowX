import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TodoItem } from './TodoItem'

interface Todo {
  id: string
  title: string
  completed: boolean
}

interface TodoListProps {
  todos: Todo[]
  isLoading: boolean
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  isGridLayout: boolean
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  isLoading,
  onToggle,
  onDelete,
  isGridLayout
}) => {
  if (isLoading) {
    return (
      <motion.div
        className={`${isGridLayout ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'} px-2`}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1
            }
          }
        }}
      >
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center text-gray-500 mt-8"
      >
        No todos yet. Add one above!
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        className={`${isGridLayout ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'} px-2`}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1
            }
          }
        }}
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggle={onToggle}
            onDelete={onDelete}
            isGridLayout={isGridLayout}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}