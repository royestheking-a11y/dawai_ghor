
import React, { useState } from 'react';
import { Icons } from '../components/Icons';
import { Link } from 'react-router';

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: 0,
      description: 'Perfect for small teams hiring occasionally.',
      features: [
        '1 Active Job Post',
        'Basic Candidate Search',
        'Standard Support',
        '1 Team Member'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Growth',
      price: billingCycle === 'monthly' ? 5000 : 4500,
      description: 'For growing companies hiring regularly.',
      features: [
        '10 Active Job Posts',
        'Advanced Candidate Search',
        'Verified Badge',
        'Priority Support',
        '5 Team Members',
        'AI Job Descriptions'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations with high volume.',
      features: [
        'Unlimited Job Posts',
        'Dedicated Account Manager',
        'API Access',
        'Custom Branding',
        'SSO & Advanced Security',
        'SLA Support'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-emerald-600 dark:bg-emerald-700 py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
          Choose the plan that fits your hiring needs. No hidden fees. Cancel anytime.
        </p>
      </div>

      {/* Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 max-w-xs mx-auto flex mb-12 border border-gray-100 dark:border-gray-700">
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Monthly
          </button>
          <button 
             onClick={() => setBillingCycle('yearly')}
             className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${billingCycle === 'yearly' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Yearly <span className="text-[10px] ml-1 opacity-80">(Save 10%)</span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-8 border transition-all hover:shadow-xl relative flex flex-col ${plan.popular ? 'border-emerald-500 shadow-emerald-100 dark:shadow-none scale-105 z-10' : 'border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-gray-600'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  {typeof plan.price === 'number' ? (
                    <>
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">৳{plan.price}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  )}
                </div>
                {billingCycle === 'yearly' && typeof plan.price === 'number' && plan.price > 0 && (
                   <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">
                     Billed ৳{plan.price * 12} yearly
                   </p>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <Icons.CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                plan.popular 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 dark:shadow-none' 
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.' },
              { q: 'Do you offer refunds?', a: 'We offer a 7-day money-back guarantee for all paid plans if you are not satisfied with our service.' },
              { q: 'Is there a free trial for the Growth plan?', a: 'Yes, we offer a 14-day free trial for the Growth plan so you can experience all the premium features.' },
              { q: 'Do I need a credit card to sign up?', a: 'No credit card is required for the Starter plan. For paid plans, we accept all major credit cards and mobile banking (bKash, Nagad).' }
            ].map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-gray-500 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl p-12 text-center relative overflow-hidden mb-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
              Still have questions?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
              Our support team is here to help you find the right plan for your business.
            </p>
            <div className="flex justify-center relative z-10">
              <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors">
                Contact Support
              </Link>
            </div>
        </div>

      </div>
    </div>
  );
};
