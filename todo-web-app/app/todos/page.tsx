'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { API_ENDPOINTS } from '../../config'
import { Header } from '../../components/todos/Header'
import { TodoForm } from '../../components/todos/TodoForm'
import { TodoList } from '../../components/todos/TodoList'
import PageAnimateWrapper from '../../components/PageAnimateWrapper'

interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

interface TodoUpdateData {
  title?: string
  description?: string
  completed?: boolean
}

interface TodosResponse {
  status: string
  data: {
    todos: Todo[]
  }
}

function TodoSkeleton() {
  return (
    <div className="min-h-screen bg-bgPrimary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="animate-pulse mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded" />
        </div>

        {/* Form skeleton */}
        <div className="animate-pulse mb-8">
          <div className="h-12 bg-gray-200 rounded-lg" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
            >
              {/* Title skeleton */}
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />

              {/* Description skeleton */}
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>

              {/* Status and date skeletons */}
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ListSkeleton() {
  return (
    <div className="min-h-screen bg-bgPrimary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="animate-pulse mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded" />
        </div>

        {/* Form skeleton */}
        <div className="animate-pulse mb-8">
          <div className="h-12 bg-gray-200 rounded-lg" />
        </div>

        {/* List skeleton */}
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
            >
              <div className="flex items-center justify-between">
                {/* Title and description skeleton */}
                <div className="flex-1">
                  <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                </div>
                {/* Status and date skeletons */}
                <div className="flex items-center gap-4">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const { user, isAuthenticated, isLoading: authLoading, updateUser, logout } = useAuth()
  const [isGridLayout, setIsGridLayout] = useState(false)
  const [newTodo, setNewTodo] = useState('')
  const queryClient = useQueryClient()

  useEffect(() => {
    if (user?.preferences?.layout) {
      setIsGridLayout(user.preferences.layout === 'grid')
    }
  }, [user])

  const { data: todos = [], isLoading } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axios.get<TodosResponse>(API_ENDPOINTS.todos)
      return response.data.data.todos
    },
    enabled: isAuthenticated && !authLoading,
  })

  const createTodoMutation = useMutation({
    mutationFn: async (newTodo: { title: string; description: string }) => {
      const response = await axios.post(API_ENDPOINTS.todos, newTodo)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TodoUpdateData }) => {
      const response = await axios.patch(`${API_ENDPOINTS.todos}/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`${API_ENDPOINTS.todos}/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      createTodoMutation.mutate({
        title: newTodo.trim(),
        description: ''
      })
      setNewTodo('')
    }
  }

  const handleToggleTodo = (id: string, completed: boolean) => {
    updateTodoMutation.mutate({
      id,
      data: { completed }
    })
  }

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id)
  }

  const handleLayoutToggle = () => {
    const newLayout = !isGridLayout
    setIsGridLayout(newLayout)
    if (user) {
      updateUser({
        preferences: {
          layout: newLayout ? 'grid' : 'list'
        }
      })
    }
  }

  if (authLoading || isLoading) {
    return (
      <PageAnimateWrapper>
        {isGridLayout ? <TodoSkeleton /> : <ListSkeleton />}
      </PageAnimateWrapper>
    )
  }

  return (
    <PageAnimateWrapper>
      <div className="min-h-screen bg-bgPrimary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Header
            userName={user?.name}
            onLogout={logout}
            isGridLayout={isGridLayout}
            onLayoutToggle={handleLayoutToggle}
          />
          <TodoForm
            value={newTodo}
            onChange={setNewTodo}
            onSubmit={handleSubmit}
          />
          <TodoList
            todos={todos}
            isLoading={isLoading}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            isGridLayout={isGridLayout}
          />
        </div>
      </div>
    </PageAnimateWrapper>
  )
}
