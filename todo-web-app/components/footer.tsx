'use client'
import React from 'react'
import Link from 'next/link'
import { FaGithub, FaHome, FaQuestionCircle, FaAndroid, FaList } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import PageAnimateWrapper from './PageAnimateWrapper'

const Footer = () => {
  const pathname = usePathname()
  if (
    pathname === '/auth/login' ||
    pathname === '/' ||
    pathname === '/auth/register'
  ) {
    return null
  }
  return (
    <PageAnimateWrapper>
      <footer className="bg-surfaceSecondary border-gray-200 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 space-y-6">
              <div>
                <Link
                  href="/"
                  className="text-3xl font-bold text-textPrimary font-unique"
                >
                  TaskFlow<span className="text-accentPrimary text-4xl">X</span>
                </Link>
                <p className="mt-2 text-sm text-gray-600">
                  Organize your tasks efficiently and boost your productivity.
                </p>
              </div>
              <div className="space-y-4">
                <Link
                  href="/download-android"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accentPrimary hover:bg-accentSecondary transition-colors duration-200"
                >
                  <FaAndroid size={18} className="mr-2" />
                  Download Android App
                </Link>
              </div>
            </div>

            <div className="md:col-span-2 md:col-start-6">
              <h3 className="text-sm font-semibold text-textPrimary uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-textSecondary hover:text-textPrimary flex items-center transition-colors duration-200"
                  >
                    <FaHome size={16} className="mr-2" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/todos"
                    className="text-textSecondary hover:text-textPrimary flex items-center transition-colors duration-200"
                  >
                    <FaList size={16} className="mr-2" />
                    Todos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-textSecondary hover:text-textPrimary flex items-center transition-colors duration-200"
                  >
                    <FaQuestionCircle size={16} className="mr-2" />
                    Help & Support
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-textPrimary uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-textSecondary hover:text-textPrimary transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-textSecondary hover:text-textPrimary transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-sm font-semibold text-textPrimary uppercase tracking-wider">
                Connect
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex space-x-4">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-textSecondary hover:text-textPrimary transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <FaGithub size={24} />
                  </Link>
                </div>
                <div className="text-sm text-textSecondary">
                  <p className="font-medium">Have questions?</p>
                  <p className="mt-1">Reach out to us at saquibali35@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-surfaceSecondary">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-textSecondary">
                © {new Date().getFullYear()} TaskFlowX. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <p className="text-sm text-textSecondary">
                  Made with ❤️ for better productivity
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </PageAnimateWrapper>
  )
}

export default Footer
