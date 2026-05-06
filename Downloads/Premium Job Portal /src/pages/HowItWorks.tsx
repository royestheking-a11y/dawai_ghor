

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useLanguage } from '../lib/language';

export const HowItWorks = () => {
    const { language } = useLanguage();
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <div className="hidden md:block"><Navbar /></div>
            <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
                <div className="text-center py-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        How {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'} Works
                    </h1>
                    <p className="text-gray-600">Your guide to finding the perfect job or candidate.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mt-10">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-emerald-600 mb-6">For Candidates</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">1</span> Create your profile</li>
                            <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">2</span> Build your CV</li>
                            <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">3</span> Apply to verified jobs</li>
                        </ul>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-blue-600 mb-6">For Recruiters</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</span> Create company profile</li>
                            <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">2</span> Post a job</li>
                            <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">3</span> Hire the best talent</li>
                        </ul>
                    </div>
                </div>
            </main>
            <div className="hidden md:block"><Footer /></div>
        </div>
    );
};
