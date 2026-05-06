
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';

export const MobileApp = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Content */}
            <div className="space-y-8 text-center lg:text-left">
               <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Get {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'} on your <br/>
                <span className="text-emerald-600 dark:text-emerald-500">Pocket.</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
                Apply to jobs, chat with recruiters, and track your applications on the go. Available for iOS and Android.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                  <Icons.Apple className="w-8 h-8" />
                  <div className="text-left">
                    <p className="text-xs font-medium opacity-80">Download on the</p>
                    <p className="text-lg font-bold leading-none">App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                  <Icons.Smartphone className="w-8 h-8" />
                  <div className="text-left">
                    <p className="text-xs font-medium opacity-80">GET IT ON</p>
                    <p className="text-lg font-bold leading-none">Google Play</p>
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-400">
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-900"></div>
                   ))}
                </div>
                <p>Trusted by 50k+ users</p>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative flex justify-center">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
              
              <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-gray-800 flex flex-col">
                  {/* Mock App Header */}
                  <div className="bg-emerald-600 p-6 pt-12 text-white">
                     <div className="flex justify-between items-center mb-4">
                      <Icons.Menu className="w-6 h-6" />
                      <span className="font-bold text-lg">{language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'}</span>
                      <Icons.User className="w-6 h-6" />
                    </div>
                    <p className="text-emerald-100 text-sm">Hello, Rahim</p>
                    <h2 className="text-2xl font-bold">Find your dream job</h2>
                  </div>

                  {/* Mock App Content */}
                  <div className="p-4 space-y-4 overflow-hidden">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                        <div className="flex gap-3 mb-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg"></div>
                          <div>
                            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
                            <div className="h-3 w-20 bg-gray-100 dark:bg-gray-500 rounded"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                           <div className="h-6 w-16 bg-gray-100 dark:bg-gray-600 rounded-full"></div>
                           <div className="h-6 w-16 bg-gray-100 dark:bg-gray-600 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mock Bottom Nav */}
                  <div className="mt-auto bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between text-gray-400">
                    <Icons.Home className="w-6 h-6 text-emerald-600" />
                    <Icons.Search className="w-6 h-6" />
                    <Icons.MessageSquare className="w-6 h-6" />
                    <Icons.User className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why use the Mobile App?</h2>
            <p className="text-gray-500 dark:text-gray-400">Experience the full power of {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'} in your hand.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Instant Notifications', desc: 'Get notified immediately when a recruiter views your profile or sends a message.', icon: Icons.Bell },
              { title: 'Easy Apply', desc: 'Apply to jobs with a single tap using your saved profile and CV.', icon: Icons.Zap },
              { title: 'Chat on the Go', desc: 'Communicate with recruiters anytime, anywhere without missing a beat.', icon: Icons.MessageSquare }
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="bg-gradient-to-br from-emerald-600 to-purple-700 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="text-3xl font-bold mb-6">Scan to Download</h2>
               <p className="text-emerald-100 mb-8 max-w-md mx-auto">
                 Point your camera at the QR code to install the app instantly.
               </p>
               
               <div className="bg-white p-4 rounded-xl w-48 h-48 mx-auto flex items-center justify-center shadow-lg">
                 {/* CSS QR Code Mock */}
                 <div className="w-40 h-40 bg-gray-900 relative grid grid-cols-5 grid-rows-5 gap-1 p-2">
                    <div className="col-span-2 row-span-2 border-4 border-white bg-gray-900"></div>
                    <div className="col-span-2 row-span-2 col-start-4 border-4 border-white bg-gray-900"></div>
                    <div className="col-span-2 row-span-2 row-start-4 border-4 border-white bg-gray-900"></div>
                    <div className="bg-white col-start-3 row-start-3 rounded-full"></div>
                    <div className="bg-white col-start-2 row-start-4"></div>
                    <div className="bg-white col-start-4 row-start-2"></div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};
