
import { useState } from 'react';
import { Icons } from './Icons';
import { Job } from '../lib/db';
import { useLanguage } from '../lib/language';

interface ApplyModalProps {
    job: Job;
    isOpen: boolean;
    onClose: () => void;
    onApply: (method: 'chakri bazar' | 'whatsapp', coverLetter?: string) => Promise<void>;
}

export const ApplyModal = ({ job, isOpen, onClose, onApply }: ApplyModalProps) => {
    const { language } = useLanguage();
    const [step, setStep] = useState<'select' | 'confirm'>('select');
    const [method, setMethod] = useState<'chakri bazar' | 'whatsapp' | null>(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!method) return;
        setIsSubmitting(true);
        await onApply(method, coverLetter);
        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-8 relative border border-gray-100 dark:border-gray-700 shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <Icons.X className="w-6 h-6" />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
                        <Icons.Briefcase className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Apply for {job.title}</h2>
                    <p className="text-gray-500 dark:text-gray-400">Tech Solutions Ltd</p>
                </div>

                {step === 'select' ? (
                    <div className="space-y-4">
                        <button
                            onClick={() => { setMethod('whatsapp'); setStep('confirm'); }}
                            className="w-full flex items-center justify-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-green-500 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/10 transition-all group"
                        >
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
                                <Icons.MessageSquare className="w-4 h-4" />
                            </div>
                            <div className="text-left flex-1">
                                <span className="block font-bold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400">Apply via WhatsApp</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Fastest response time</span>
                            </div>
                            <Icons.ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-green-600 dark:group-hover:text-green-400" />
                        </button>

                        <button
                            onClick={() => { setMethod('chakri bazar'); setStep('confirm'); }}
                            className="w-full flex items-center justify-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all group"
                        >
                            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white shrink-0">
                                <Icons.FileText className="w-4 h-4" />
                            </div>
                             <div className="text-left flex-1">
                                <span className="block font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                  {language === 'bn' ? 'চাকরি বাজার প্রোফাইল দিয়ে আবেদন করুন' : 'Apply with Chakri Bazar Profile'}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Recommended for tracking</span>
                            </div>
                            <Icons.ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                        </button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200 dark:border-gray-700"></span></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">Or</span></div>
                        </div>

                        <button
                            className="w-full flex items-center justify-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
                            onClick={() => alert("Upload feature coming soon!")}
                        >
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0">
                                <Icons.Plus className="w-4 h-4" />
                            </div>
                            <div className="text-left flex-1">
                                <span className="block font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400">Upload Resume / CV</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX up to 5MB</span>
                            </div>
                            <Icons.ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                        </button>

                        <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
                            By applying, you agree to share your profile with the recruiter.
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in slide-in-from-right-8 duration-200">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Applying via {method === 'whatsapp' ? 'WhatsApp' : (language === 'bn' ? 'চাকরি বাজার Profile' : 'Chakri Bazar Profile')}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Your {method === 'whatsapp' ? 'chat app' : 'application'} will open shortly.</p>
                        </div>

                        {method === 'chakri bazar' && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Cover Letter (Optional)</label>
                                <textarea
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                    className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-32 resize-none"
                                    placeholder="Introduce yourself..."
                                />
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep('select')}
                                className="flex-1 py-3 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <Icons.Zap className="animate-spin w-4 h-4" /> : 'Confirm Apply'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
