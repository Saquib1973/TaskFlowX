'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check for token and user data in cookies on mount
    const token = Cookies.get('token')
    const userData = Cookies.get('user')

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
        // Set the token in axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (error) {
        // If there's an error parsing the user data, clear the invalid data
        Cookies.remove('token')
        Cookies.remove('user')
        setUser(null)
        setIsAuthenticated(false)
        delete axios.defaults.headers.common['Authorization']
      }
    }
  }, [])

  const login = (token: string, userData: User) => {
    // Set cookies with expiration
    Cookies.set('token', token, { expires: 7 }) // Expires in 7 days
    Cookies.set('user', JSON.stringify(userData), { expires: 7 })
    setUser(userData)
    setIsAuthenticated(true)
    // Set the token in axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('user')
    setUser(null)
    setIsAuthenticated(false)
    // Remove the token from axios headers
    delete axios.defaults.headers.common['Authorization']
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}