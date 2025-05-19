import React from 'react';
import PageAnimateWrapper from '../../components/PageAnimateWrapper';

export default function Help() {
  return (
    <PageAnimateWrapper>
      <div className="min-h-screen max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">
                  How do I create a new task?
                </h3>
                <p className="text-gray-700">
                  Click the &quot;+&quot; button in the top right corner of your
                  todo list. Enter your task details and click &quot;Add
                  Task&quot; to create it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">
                  How do I mark a task as complete?
                </h3>
                <p className="text-gray-700">
                  Click the checkbox next to any task to mark it as complete.
                  Completed tasks will be moved to the &quot;Completed&quot;
                  section.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">
                  Can I edit or delete a task?
                </h3>
                <p className="text-gray-700">
                  Yes, you can edit or delete any task by clicking the three
                  dots menu next to the task. Choose &quot;Edit&quot; to modify
                  the task or &quot;Delete&quot; to remove it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">
                  How do I organize my tasks?
                </h3>
                <p className="text-gray-700">
                  You can organize tasks by creating different lists, adding due
                  dates, and using priority levels. Use the &quot;Sort&quot;
                  button to arrange tasks by different criteria.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                If you couldn&apos;t find the answer you&apos;re looking for,
                our support team is here to help.
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  📧 Email us at: saquibali35@gmail.com
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageAnimateWrapper>
  )
}