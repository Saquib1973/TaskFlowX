import AddTodo from '@/components/add-todo'
import Navbar from '@/components/header'
import SearchBar from '@/components/search-bar'
import TodoList from '@/components/todo-list'
import { useTodos } from '@/hooks/useTodos'
import { useEffect, useState } from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/style'

export default function TodosPage() {
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accentPrimary} />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />

      <SearchBar
        search={search}
        setSearch={setSearch}
        todos={filteredTodos}
      />

      <TodoList
        todos={filteredTodos}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />

      <AddTodo onAdd={createTodo} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.bgPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})