'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import axios from 'axios'
import { useAuth } from '../../../context/AuthContext'
import { API_BASE_URL } from '../../../config'
import PageAnimateWrapper from '../../../components/PageAnimateWrapper'
import Input from '../../../components/atom/Input'
import Button from '../../../components/atom/Button'

interface RegisterResponse {
  status: string
  token: string
  data: {
    user: {
      id: string
      name: string
      email: string
      createdAt: string
      updatedAt: string
    }
  }
}

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await axios.post<RegisterResponse>(API_BASE_URL+'/api/auth/register', {
        name,
        email,
        password,
      })

      login(response.data.token, response.data.data.user)
      window.location.href = '/todos'
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'An error occurred during registration')
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageAnimateWrapper>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-textPrimary font-unique">Create Account</h2>
          <p className="mt-2 text-sm text-textSecondary font-simple">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-accentPrimary hover:text-accentSecondary transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-500 p-3 rounded-md text-sm font-simple"
            >
              {error}
            </motion.div>
          )}

          <Input
            id="name"
            type="text"
            label="Full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />

          <Input
            id="email"
            type="email"
            label="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <Input
            id="password"
            type="password"
            label="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            className="w-full"
          >
            Create account
          </Button>
        </form>
      </div>
    </PageAnimateWrapper>
  )
}