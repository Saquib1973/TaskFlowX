'use client'

import React from 'react'
import { FaAndroid, FaDownload } from 'react-icons/fa'
import PageAnimateWrapper from '../../../components/PageAnimateWrapper'

const DownloadButton = () => {
  return (
    <button
      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      onClick={() => {
        window.location.href = '/android-app.apk'
      }}
    >
      <div className="mr-2">
        <FaDownload size={20} />
      </div>
      Download APK
    </button>
  )
}

export default function DownloadAndroidPage() {
  return (
    <PageAnimateWrapper>
    <div className="py-12 min-h-screen flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Download Our Android App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get the best todo experience on your Android device
          </p>
        </div>

        <div className="p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="text-green-500">
              <FaAndroid size={96} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Todo App for Android
              </h2>
              <p className="text-gray-600">
                Version 1.0.0 • 15MB
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Features:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Sync tasks across all your devices</li>
                <li>• Offline support</li>
                <li>• Push notifications</li>
                <li>• Dark mode support</li>
                <li>• Widget support</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <DownloadButton />
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>System Requirements: Android 6.0 or higher</p>
          <p className="mt-2">
            Having trouble? Contact our support team at support@todoapp.com
          </p>
        </div>
      </div>
      </div>
      </PageAnimateWrapper>
  )
}