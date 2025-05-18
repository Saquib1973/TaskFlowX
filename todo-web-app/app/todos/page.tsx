'use client'

import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  PlusIcon,
  TrashIcon,
  CheckIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { API_ENDPOINTS } from '../config'

interface Todo {
  id: string
  title: string
  completed: boolean
}

interface TodosResponse {
  status: string
  data: {
    todos: Todo[]
  }
}

export default function Home() {
  const [newTodo, setNewTodo] = useState('')
  const queryClient = useQueryClient()
  const { logout, user } = useAuth()

  const { data: todos = [], isLoading } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axios.get<TodosResponse>(API_ENDPOINTS.todos)
      return response.data.data.todos
    },
  })

  const addTodoMutation = useMutation({
    mutationFn: async (title: string) => {
      const response = await axios.post(API_ENDPOINTS.todos, { title })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setNewTodo('')
    },
  })

  const toggleTodoMutation = useMutation({
    mutationFn: async ({
      id,
      completed,
    }: {
      id: string
      completed: boolean
    }) => {
      const response = await axios.patch(`${API_ENDPOINTS.todos}/${id}`, {
        completed,
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_ENDPOINTS.todos}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodoMutation.mutate(newTodo.trim())
    }
  }
  const renderTodo = () => {
    if (isLoading) {
      return (
        <motion.div
          className="space-y-3"
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
    } else if (todos.length === 0) {
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
    } else {
      return (
        <AnimatePresence mode="popLayout">
          <motion.div
            className="space-y-3"
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
            {Array.isArray(todos) &&
              todos.map((todo) => (
                <motion.div
                  key={todo.id}
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
                  className="bg-white rounded-lg shadow-sm transition-shadow duration-200 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={() =>
                        toggleTodoMutation.mutate({
                          id: todo.id,
                          completed: !todo.completed,
                        })
                      }
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                        todo.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {todo.completed && (
                        <CheckIcon className="h-4 w-4 text-white" />
                      )}
                    </motion.button>
                    <span
                      className={`text-lg transition-all duration-200 ${
                        todo.completed
                          ? 'line-through text-gray-400'
                          : 'text-gray-700'
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>
                  <motion.button
                    onClick={() => deleteTodoMutation.mutate(todo.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </motion.button>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      )
    }
  }

  return (
    <Suspense>
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center mb-10"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">TodoFlow
                <span className='text-blue-500 text-4xl'>
                X
                </span>
              </h1>
              {user && (
                <p className="text-sm text-gray-600 mt-1">
                  Welcome back, {user.name}
                </p>
              )}
            </div>
            <motion.button
              onClick={logout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Logout</span>
            </motion.button>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="mb-10"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 rounded-lg border outline-none border-gray-200 px-4 py-3 transition-all duration-200"
              />
              <motion.button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <PlusIcon className="h-6 w-6" />
              </motion.button>
            </div>
          </motion.form>
          {renderTodo()}
        </div>
      </main>
    </Suspense>
  )
}
