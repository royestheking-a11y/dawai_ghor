
import { useState } from 'react';
import { Icons } from '../components/Icons';
import { Link } from 'react-router';

// Mock Interview Data
const MOCK_INTERVIEWS = [
    {
        id: 'i1',
        companyName: 'Tech Solutions Ltd',
        jobTitle: 'Senior React Developer',
        date: '2026-05-15',
        time: '10:00 AM',
        type: 'video', // video, phone, onsite
        link: 'https://meet.google.com/abc-defg-hij',
        status: 'scheduled', // scheduled, completed, cancelled
        recruiterName: 'Sarah Khan'
    },
    {
        id: 'i2',
        companyName: 'Creative Agency',
        jobTitle: 'UX Designer',
        date: '2026-05-18',
        time: '2:30 PM',
        type: 'video',
        link: 'https://zoom.us/j/123456789',
        status: 'scheduled',
        recruiterName: 'Mike Ross'
    },
    {
        id: 'i3',
        companyName: 'Startup BD',
        jobTitle: 'Frontend Engineer',
        date: '2026-05-10',
        time: '11:00 AM',
        type: 'onsite',
        location: 'Gulshan 1, Dhaka',
        status: 'completed',
        recruiterName: 'Ali Reza'
    }
];

export const Interviews = () => {
    const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

    const filteredInterviews = MOCK_INTERVIEWS.filter(interview => {
        if (filter === 'upcoming') {
            return interview.status === 'scheduled';
        }
        return interview.status === 'completed' || interview.status === 'cancelled';
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <Link to="/me/dashboard" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-4 transition-colors">
                        <Icons.ChevronLeft className="w-5 h-5" /> Back to Dashboard
                    </Link>
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interviews</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your upcoming and past selection rounds.</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setFilter('upcoming')}
                        className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${filter === 'upcoming' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setFilter('past')}
                        className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${filter === 'past' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        Past & Cancelled
                    </button>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {filteredInterviews.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-500">
                                <Icons.CalendarDays className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No interviews found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                {filter === 'upcoming' ? "You don't have any upcoming interviews scheduled." : "No past interview history."}
                            </p>
                        </div>
                    ) : (
                        filteredInterviews.map(interview => (
                            <div key={interview.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row gap-6">

                                    {/* Date Card */}
                                    <div className="flex-shrink-0 flex md:flex-col items-center justify-center bg-emerald-50 dark:bg-emerald-900/10 rounded-lg p-4 w-full md:w-24 text-center border border-emerald-100 dark:border-emerald-900/30">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xl md:text-2xl block mr-2 md:mr-0">{new Date(interview.date).getDate()}</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 text-sm uppercase font-bold block">{new Date(interview.date).toLocaleString('default', { month: 'short' })}</span>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{interview.jobTitle}</h3>
                                                <p className="text-gray-600 dark:text-gray-300 font-medium">{interview.companyName}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${interview.status === 'scheduled' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-100 dark:border-green-900/30' :
                                                interview.status === 'completed' ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600' :
                                                    'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-100 dark:border-red-900/30'
                                                }`}>
                                                {interview.status.toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                <Icons.Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                <span>{interview.time} (30 mins)</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                <Icons.User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                <span>With {interview.recruiterName}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 col-span-1 sm:col-span-2">
                                                {interview.type === 'video' ? (
                                                    <>
                                                        <Icons.Video className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                        <span>Video Interview via Google Meet</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Icons.MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                        <span>{interview.location}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {filter === 'upcoming' && (
                                            <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                                                {interview.type === 'video' && interview.link ? (
                                                    <a
                                                        href={interview.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-colors flex items-center gap-2"
                                                    >
                                                        <Icons.Video className="w-4 h-4" /> Join Meeting
                                                    </a>
                                                ) : (
                                                    <button className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-lg cursor-default flex items-center gap-2">
                                                        <Icons.MapPin className="w-4 h-4" /> On-site Location
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => alert("Reschedule request sent to recruiter.")}
                                                    className="px-6 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Reschedule
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
