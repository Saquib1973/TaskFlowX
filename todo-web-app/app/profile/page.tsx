'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { API_ENDPOINTS } from '../../config'
import {
  UserCircleIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PageAnimateWrapper from '../../components/PageAnimateWrapper'

interface UserProfile {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

interface ProfileResponse {
  status: string
  data: {
    user: UserProfile
  }
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="animate-pulse space-y-8">
          {/* Back button skeleton */}
          <div className="h-6 w-32 bg-gray-200 rounded" />

          {/* Profile card skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Avatar skeleton */}
            <div className="text-center mb-8">
              <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto" />
            </div>

            {/* Content skeletons */}
            <div className="space-y-8">
              {/* Name field skeleton */}
              <div>
                <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>

              {/* Email field skeleton */}
              <div>
                <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>

              {/* Member since field skeleton */}
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>

              {/* Logout button skeleton */}
              <div className="pt-6 border-t border-gray-200">
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const {
    user,
    logout,
    updateUser,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [shouldRedirect, setShouldRedirect] = useState(false)

  // Initialize state from user context
  useEffect(() => {
    if (user) {
      setEditedName(user.name || '')
    }
  }, [user])

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setShouldRedirect(true)
    }
  }, [isAuthenticated])

  // Handle redirect
  useEffect(() => {
    if (shouldRedirect) {
      router.replace('/auth/login')
    }
  }, [shouldRedirect, router])

  const { data: profile, isLoading: profileLoading } = useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axios.get<ProfileResponse>(API_ENDPOINTS.profile)
      return response.data.data.user
    },
    enabled: isAuthenticated && !authLoading,
  })

  useEffect(() => {
    if (profile) {
      setEditedName(profile.name)
      updateUser({
        name: profile.name,
      })
    }
  }, [])

  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name?: string }) => {
      const response = await axios.patch<ProfileResponse>(
        API_ENDPOINTS.profile,
        data
      )
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      setIsEditing(false)
      updateUser({
        name: data.data.user.name,
      })
    },
  })

  const handleUpdateProfile = () => {
    if (editedName.trim()) {
      updateProfileMutation.mutate({ name: editedName.trim() })
    }
  }

  if (authLoading || profileLoading) {
    return (
      <PageAnimateWrapper>
        <ProfileSkeleton />
      </PageAnimateWrapper>
    )
  }

  if (shouldRedirect) {
    return null
  }

  return (
    <PageAnimateWrapper>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/todos"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform" />
            Back to Tasks
          </Link>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            <div className="text-center mb-8">
              <div className="relative inline-block group">
                <div className="relative">
                  <UserCircleIcon className="h-32 w-32 text-gray-400 group-hover:text-gray-500 transition-colors" />
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Click to update profile picture
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accentPrimary"
                        autoFocus
                      />
                      <button
                        onClick={handleUpdateProfile}
                        className="p-2 text-green-600 hover:text-green-700 transition-colors"
                        title="Save changes"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false)
                          setEditedName(profile?.name || '')
                        }}
                        className="p-2 text-red-600 hover:text-red-700 transition-colors"
                        title="Cancel editing"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 text-lg font-medium text-gray-900">
                        {profile?.name}
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-gray-600 hover:text-gray-700 transition-colors"
                        title="Edit name"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="flex items-center gap-2 text-lg text-gray-900">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  {profile?.email}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Member Since
                </label>
                <div className="flex items-center gap-2 text-lg text-gray-900">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  {new Date(profile?.createdAt || '').toLocaleDateString(
                    undefined,
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={logout}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v3a1 1 0 102 0V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageAnimateWrapper>
  )
}
