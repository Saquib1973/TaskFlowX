export const API_BASE_URL = 'https://taskflowx.onrender.com'

export const API_ENDPOINTS = {
  todos: `${API_BASE_URL}/api/todos`,
  profile: `${API_BASE_URL}/api/users/me`,
} as const