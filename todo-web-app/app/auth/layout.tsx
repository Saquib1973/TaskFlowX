'use client'

import PageAnimateWrapper from '../../components/PageAnimateWrapper'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-surfacePrimary flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <PageAnimateWrapper className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl">
        {children}
      </PageAnimateWrapper>
    </div>
  )
}