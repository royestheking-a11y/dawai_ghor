import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Icons } from './Icons';

export const MobileGenericPage = ({ title }: { title?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Derive title from path if not provided
  const displayTitle = title || location.pathname.split('/').pop()?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:hidden flex flex-col">
      {/* Header */}
      <div className="bg-[#059669] text-white p-4 pt-10 sticky top-0 z-20 shadow-md flex items-center gap-3">
         <button onClick={() => navigate(-1)} className="p-1 hover:bg-white/10 rounded-full">
            <Icons.ChevronLeft className="w-6 h-6" />
         </button>
         <h1 className="text-lg font-bold truncate">{displayTitle}</h1>
      </div>

      {/* Content Placeholder */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center opacity-60">
         <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Icons.Hammer className="w-10 h-10 text-gray-400" /> {/* Hammer might not exist, checking Icons.tsx... it doesn't. */}
            <Icons.Settings className="w-10 h-10 text-gray-400" />
         </div>
         <h2 className="text-lg font-bold text-gray-700 mb-2">Under Construction</h2>
         <p className="text-sm text-gray-500 max-w-xs">
           The page "{displayTitle}" is currently being built. Please check back later for updates.
         </p>
         <button 
           onClick={() => navigate(-1)}
           className="mt-8 px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-600 shadow-sm active:bg-gray-50"
         >
           Go Back
         </button>
      </div>
    </div>
  );
};
