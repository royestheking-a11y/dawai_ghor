


export const Privacy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-emerald dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Last updated: February 11, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Account information (name, email, password)</li>
              <li>Profile information (resume, work history, skills)</li>
              <li>Communications you send to us</li>
              <li>Job applications and search history</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Provide, maintain, and improve our services</li>
              <li>Match candidates with relevant job opportunities</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We may share your information with Recruiters when you apply for a job or make your profile visible. We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Your Choices</h2>
            <p className="text-gray-600 dark:text-gray-400">
              You may update, correct or delete information about you at any time by logging into your online account or emailing us at privacy@chakribazar.com.
            </p>
          </section>

           <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Changes to this Policy</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
