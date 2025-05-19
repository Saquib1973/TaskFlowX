import React from 'react';
import PageAnimateWrapper from '../../../components/PageAnimateWrapper';

export default function TermsOfService() {
  return (
    <PageAnimateWrapper>
      <div className="min-h-screen max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700">
              By accessing and using this application, you accept and agree to
              be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
            <p className="text-gray-700">
              Permission is granted to temporarily use this application for
              personal, non-commercial purposes. This license shall
              automatically terminate if you violate any of these restrictions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. User Responsibilities
            </h2>
            <p className="text-gray-700">
              As a user of this application, you agree to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Use the service in compliance with all applicable laws</li>
              <li>Not misuse or abuse the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              4. Service Modifications
            </h2>
            <p className="text-gray-700">
              We reserve the right to modify or discontinue, temporarily or
              permanently, the service with or without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              In no event shall we be liable for any damages arising out of the
              use or inability to use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Contact Information
            </h2>
            <p className="text-gray-700">
              If you have any questions about these Terms, please contact us at
              support@todoapp.com
            </p>
          </section>
        </div>
      </div>
    </PageAnimateWrapper>
  )
}