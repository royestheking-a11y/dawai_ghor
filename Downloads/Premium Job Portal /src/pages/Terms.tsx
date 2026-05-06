
import { useLanguage } from '../lib/language';

export const Terms = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-emerald dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Last updated: February 11, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-400">
              By accessing and using {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'} ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Platform's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'} provides a platform for job seekers ("Candidates") to find employment opportunities and for employers ("Recruiters") to post job openings and search for talent. The Platform includes features such as profile creation, job posting, application management, and skill testing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. User Obligations</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>You are responsible for maintaining the confidentiality of your password and account.</li>
              <li>You agree not to use the Platform for any unlawful purpose.</li>
              <li>You agree not to interfere with the proper working of the Platform.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-400">
              The content, organization, graphics, design, compilation, and other matters related to the Platform are protected under applicable copyrights and other proprietary (including but not limited to intellectual property) rights. The copying, redistribution, use or publication by you of any such matters or any part of the Platform is strictly prohibited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'} shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses.
            </p>
          </section>

           <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Questions about the Terms of Service should be sent to us at legal@chakribazar.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
