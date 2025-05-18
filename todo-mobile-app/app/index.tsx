import AddTodo from '@/components/add-todo'
import Navbar from '@/components/header'
import SearchBar from '@/components/search-bar'
import TodoList from '@/components/todo-list'
import type { Todo } from '@/types/todo'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTodos } from '@/hooks/useTodos'

export default function Index() {
  const [search, setSearch] = useState('')
  const { todos, loading, error, createTodo, updateTodo, deleteTodo, refreshTodos } = useTodos()

  useEffect(() => {
    if (search.trim() === '') {
      refreshTodos()
    }
  }, [search])

  const filteredTodos = (search.trim() === ''
    ? todos
    : todos.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      )
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <Navbar />

      {/* Search bar */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        todos={filteredTodos}
      />

      {/* TODO List */}
      <TodoList
        todos={filteredTodos}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />

      {/* Add Todo */}
      <AddTodo onAdd={createTodo} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'semibold',
  },
})
