'use client'
import React from 'react'
import Link from 'next/link'
import { FaGithub, FaHome, FaQuestionCircle, FaAndroid } from 'react-icons/fa'
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  if(pathname === "/auth/login" || pathname === "/" || pathname === "/auth/register") {
    return null;
  }
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand and Download Section */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Todo App</h2>
              <p className="mt-2 text-sm text-gray-600">
                Organize your tasks efficiently and boost your productivity.
              </p>
            </div>
            <div className="space-y-4">
              <Link
                href="/download-android"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                <FaAndroid size={18} className="mr-2" />
                Download Android App
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center transition-colors duration-200">
                  <FaHome size={16} className="mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-gray-900 flex items-center transition-colors duration-200">
                  <FaQuestionCircle size={16} className="mr-2" />
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Connect</h3>
            <div className="mt-4 space-y-4">
              <div className="flex space-x-4">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </Link>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium">Have questions?</p>
                <p className="mt-1">Reach out to us at support@todoapp.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Todo App. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">
                Made with ❤️ for better productivity
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer