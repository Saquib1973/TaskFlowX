import { colors, radius } from '@/constants/style'
import type { Todo } from '@/types/todo'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const SearchBar = ({ search, setSearch, todos }: { search: string, setSearch: (search: string) => void, todos: Todo[] }) => {
  return (
    <View style={styles.searchBar}>
      <Ionicons name="search" size={20} color="black" style={{paddingLeft: 10}} />
      <TextInput
        placeholder="Search"
        style={styles.searchInput}
        clearButtonMode="always"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    backgroundColor: colors.surfacePrimary,
    alignItems: 'center',
    padding: 5,
    borderRadius: radius.sm,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
})
