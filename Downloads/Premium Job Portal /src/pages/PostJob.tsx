
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Icons } from '../components/Icons';

export const PostJob = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Info, 2: Billing, 3: Complete
    const [form, setForm] = useState({
        role: '',
        requirements: '',
        location: '',
        showMobile: false, // Default to NO as per screenshot
        hideName: false,   // Default to NO as per screenshot
    });

    const steps = [
        { id: 1, label: 'Job Information' },
        { id: 2, label: 'Billing' },
        { id: 3, label: 'Complete' }
    ];

    return (
        <div className="min-h-screen bg-white pb-2 font-sans md:hidden flex flex-col">
            {/* Header */}
            <div className="bg-[#1e5cba] text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)}>
                        <Icons.ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-bold">Post a New Job</h1>
                </div>
                <button className="flex items-center gap-1 text-sm font-medium opacity-90">
                    <Icons.HelpCircle className="w-5 h-5" /> Help
                </button>
            </div>

            {/* Stepper */}
            <div className="bg-white px-6 py-4 shadow-sm mb-2">
                <div className="flex justify-between items-center relative">
                    {/* Progress Bar Background */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 translate-y-[-50%]" />

                    {/* Progress Bar Fill */}
                    <div className="absolute top-1/2 left-0 h-0.5 bg-[#1e5cba] -z-10 translate-y-[-50%]"
                        style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} />

                    {steps.map((s) => (
                        <div key={s.id} className="flex flex-col items-center bg-white px-1">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 mb-1 transition-colors
                          ${step >= s.id ? 'border-[#1e5cba] text-[#1e5cba]' : 'border-gray-300 text-gray-400'}`}>
                                {step > s.id ? <Icons.Check className="w-4 h-4" /> : (step === s.id ? <div className="w-2.5 h-2.5 bg-[#1e5cba] rounded-full" /> : '')}
                            </div>
                            <span className={`text-[10px] font-bold ${step >= s.id ? 'text-[#1e5cba]' : 'text-gray-400'}`}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
                {step === 1 && (
                    <div className="space-y-5">
                        <h3 className="text-[#104a8e] font-bold text-sm uppercase mb-4">Job Information</h3>

                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2">Role <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white text-gray-600 focus:outline-none focus:border-[#1e5cba] focus:ring-1 focus:ring-[#1e5cba]"
                                    value={form.role}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                >
                                    <option value="">Select a job role</option>
                                    <option value="driver">Driver</option>
                                    <option value="nurse">Nurse</option>
                                    <option value="chef">Chef/Cook</option>
                                    <option value="tutor">Home Tutor</option>
                                </select>
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                                    <Icons.ChevronDown className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
                                Requirements for Candidates <span className="text-red-500">*</span>
                                <Icons.Info className="w-4 h-4 text-blue-500" />
                            </label>
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                {/* Rich Text Toolbar Mock */}
                                <div className="bg-gray-100 p-2 border-b border-gray-300 flex items-center gap-4 text-gray-600">
                                    <button className="font-bold hover:text-black">B</button>
                                    <button className="italic hover:text-black font-serif">I</button>
                                    <button className="underline hover:text-black">U</button>
                                    <div className="w-px h-4 bg-gray-300"></div>
                                    <button><Icons.List className="w-4 h-4" /></button>
                                    <button><Icons.ListOrdered className="w-4 h-4" /></button>
                                </div>
                                <textarea
                                    className="w-full p-3 h-32 focus:outline-none resize-none"
                                    placeholder="Enter Job Responsibilities...."
                                    value={form.requirements}
                                    onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-2">Job Location <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1e5cba] focus:ring-1 focus:ring-[#1e5cba]"
                                placeholder="Enter Your Job Location"
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-3">Do you want to show your mobile number with this job post?</label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.showMobile ? 'border-[#1e5cba]' : 'border-gray-400'}`}>
                                        {form.showMobile && <div className="w-2.5 h-2.5 bg-[#1e5cba] rounded-full" />}
                                    </div>
                                    <input type="radio" className="hidden" checked={form.showMobile} onChange={() => setForm({ ...form, showMobile: true })} />
                                    <span className="font-bold text-sm text-gray-700">YES</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!form.showMobile ? 'border-[#1e5cba]' : 'border-gray-400'}`}>
                                        {!form.showMobile && <div className="w-2.5 h-2.5 bg-[#1e5cba] rounded-full" />}
                                    </div>
                                    <input type="radio" className="hidden" checked={!form.showMobile} onChange={() => setForm({ ...form, showMobile: false })} />
                                    <span className="font-bold text-sm text-gray-700">NO</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-2 flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-700">Hide your name</span>
                            <div className="bg-white border rounded-full p-0.5 flex w-24 relative shadow-sm cursor-pointer" onClick={() => setForm({ ...form, hideName: !form.hideName })}>
                                <div className={`w-1/2 text-center text-[10px] font-bold py-1 rounded-full text-white transition-all
                                ${!form.hideName ? 'bg-[#1e5cba] translate-x-0' : 'text-gray-500 translate-x-full'}`}>NO</div>
                                <div className={`w-1/2 text-center text-[10px] font-bold py-1 rounded-full text-white transition-all absolute top-0.5 left-0.5
                                ${form.hideName ? 'bg-[#1e5cba] translate-x-full' : 'text-gray-500 opacity-0'}`}>YES</div>
                            </div>
                        </div>

                        <p className="text-xs text-[#0d47a1] bg-blue-50 p-2 rounded mt-2">
                            * A Role can be used once to publish a job...
                        </p>
                    </div>
                )}
                {step === 2 && (
                    <div className="space-y-6">
                        <h3 className="text-[#104a8e] font-bold text-sm uppercase mb-2">Order Summary</h3>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 font-medium">Job Posting Fee</span>
                                <span className="font-bold text-gray-900">৳ 100</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 font-medium">VAT (5%)</span>
                                <span className="font-bold text-gray-900">৳ 5</span>
                            </div>
                            <div className="h-px bg-blue-200 my-2" />
                            <div className="flex justify-between items-center text-lg">
                                <span className="text-[#0d47a1] font-bold">Total Payable</span>
                                <span className="text-[#0d47a1] font-bold">৳ 105</span>
                            </div>
                        </div>

                        <h3 className="text-[#104a8e] font-bold text-sm uppercase mt-6 mb-2">Select Payment Method</h3>

                        <div className="grid grid-cols-2 gap-3">
                            {['bKash', 'Nagad', 'Rocket', 'Card'].map((method) => (
                                <button key={method} className="border border-gray-200 rounded-lg p-3 flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all focus:ring-2 focus:ring-blue-500">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Icons.CreditCard className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{method}</span>
                                </button>
                            ))}
                        </div>

                        <div className="bg-yellow-50 p-3 rounded border border-yellow-100 text-xs text-yellow-800 flex gap-2">
                            <Icons.Info className="w-4 h-4 flex-shrink-0" />
                            <span>By continuing, you agree to our Terms of Service and Privacy Policy.</span>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col items-center justify-center text-center py-10 space-y-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                            <Icons.Check className="w-10 h-10" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Posted Successfully!</h2>
                            <p className="text-gray-500 text-sm max-w-xs mx-auto">
                                Your job post for <span className="font-bold text-gray-800">{form.role || 'Service'}</span> is now live. Candidates will start applying soon.
                            </p>
                        </div>

                        <div className="w-full space-y-3 pt-6">
                            <button onClick={() => navigate('/my-hiring')} className="w-full bg-[#1e5cba] text-white font-bold py-3 rounded-lg shadow-lg hover:bg-[#15468d]">
                                Manage My Jobs
                            </button>
                            <button onClick={() => setStep(1)} className="w-full bg-white text-[#1e5cba] font-bold py-3 rounded-lg border border-[#1e5cba]">
                                Post Another Job
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Action */}
            {step !== 3 && (
                <div className="p-4 bg-white border-t border-gray-100 flex justify-end sticky bottom-0 z-50">
                    <button
                        onClick={() => {
                            if (step === 1) setStep(2);
                            else if (step === 2) setStep(3);
                        }}
                        className="bg-[#1e5cba] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#15468d] transition-colors flex items-center gap-2"
                    >
                        {step === 1 ? (
                            <>
                                <Icons.Eye className="w-5 h-5" /> Preview
                            </>
                        ) : (
                            <>
                                Pay & Post <Icons.ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Helper FAB */}
            {step === 1 && (
                <div className="fixed bottom-6 right-6 md:hidden">
                    <button className="w-14 h-14 bg-[#1e5cba] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                        <Icons.Eye className="w-7 h-7" />
                    </button>
                </div>
            )}
        </div>
    );
};
