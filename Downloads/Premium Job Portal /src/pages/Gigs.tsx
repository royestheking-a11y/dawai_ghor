

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Icons } from '../components/Icons';

export const Gigs = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <div className="hidden md:block"><Navbar /></div>
            <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                        <Icons.Zap className="w-10 h-10 text-purple-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Freelance Gigs</h1>
                    <p className="text-gray-500 max-w-md">Find short-term projects and side hustles. This feature is coming soon.</p>
                </div>
            </main>
            <div className="hidden md:block"><Footer /></div>
        </div>
    );
};
