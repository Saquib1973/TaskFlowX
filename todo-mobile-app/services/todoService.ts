import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const API_URL = API_BASE_URL + '/api'

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const todoService = {
  async getTodos(): Promise<Todo[]> {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}/todos`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }

    const data = await response.json();
    return data.data.todos;
  },

  async createTodo(title: string, description: string): Promise<Todo> {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      throw new Error('Failed to create todo');
    }

    const data = await response.json();
    return data.data.todo;
  },

  async updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update todo');
    }

    const data = await response.json();
    return data.data.todo;
  },

  async deleteTodo(id: string): Promise<void> {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },
};