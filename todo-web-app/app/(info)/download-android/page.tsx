import fs from 'fs'
import path from 'path'
import { FaAndroid, FaDownload } from 'react-icons/fa'
import PageAnimateWrapper from '../../../components/PageAnimateWrapper'

const releasesDir = path.join(process.cwd(), 'public', 'releases')

function getApkFiles() {
  const files = fs.readdirSync(releasesDir)
  return files.filter(f => f.endsWith('.apk')).sort((a, b) => b.localeCompare(a))
}

export default function DownloadAndroidPage() {
  const apkFiles = getApkFiles()
  const latestApk = apkFiles[0]
  const previousApks = apkFiles.slice(1)

  return (
    <PageAnimateWrapper>
      <div className="py-12 min-h-screen flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl w-full mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">Download Our Android App</h1>
            <p className="text-lg text-gray-600">Get the best todo experience on your Android device</p>
          </div>

          <div className="rounded-2xl bg-white p-8 mb-8 flex flex-col items-center">
            <div className="flex items-center mb-4">
              <span className="text-green-600 mr-3"><FaAndroid size={48} /></span>
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-900">Latest Release</h2>
                <span className="block text-sm text-green-700 font-medium mt-1">{latestApk.replace('.apk', '')}</span>
              </div>
            </div>
            <a
              href={`/releases/${latestApk}`}
              download
              className="mt-4 inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 group"
            >
              <FaDownload className="mr-3 group-hover:scale-110 transition-transform duration-300" size={22} />
              Download APK
            </a>
          </div>

          {/* Previous Releases */}
          {previousApks.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Previous Releases</h3>
              <ul className="space-y-3">
                {previousApks.map(apk => (
                  <li key={apk} className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3">
                    <span className="text-gray-800 font-medium">{apk.replace('.apk', '')}</span>
                    <a
                      href={`/releases/${apk}`}
                      download
                      className="inline-flex items-center px-4 py-2 rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors"
                    >
                      <FaDownload className="mr-2" />Download
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-center text-sm text-gray-500 mt-8">
            <p>System Requirements: Android 6.0 or higher</p>
            <p className="mt-2">
              Having trouble? Contact our support team at <a href="mailto:support@todoapp.com" className="text-green-600 hover:text-green-700">support@todoapp.com</a>
            </p>
          </div>
        </div>
      </div>
    </PageAnimateWrapper>
  )
}