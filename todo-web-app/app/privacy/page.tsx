import React from 'react'
import PageAnimateWrapper from '../../components/PageAnimateWrapper'

export default function PrivacyPolicy() {
  return (
    <PageAnimateWrapper>
      <div className="min-h-screen max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p className="text-gray-700">
              We collect information that you provide directly to us, including
              but not limited to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Account information (name, email address)</li>
              <li>Task and todo list data</li>
              <li>Usage information and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700">
              We use the information we collect to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Provide and maintain our services</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you about updates and changes</li>
              <li>Ensure the security of our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your
              personal information. However, no method of transmission over the
              internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Your Rights</h2>
            <p className="text-gray-700">You have the right to:</p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please
              contact us at support@todoapp.com
            </p>
          </section>
        </div>
      </div>
    </PageAnimateWrapper>
  )
}
