import React from 'react';
import { Icons } from './Icons';
import { useAuth } from '../lib/auth';

export const MobileHeader = () => {
  const { user } = useAuth();

  return (
    <div className="md:hidden bg-[#059669] text-white pt-8 pb-4 px-4 shadow-md rounded-b-[2rem] relative z-20">
      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-6 mt-2">
        {/* Avatar */}
        <div className="w-9 h-9 bg-white rounded-full overflow-hidden border border-white/30 shrink-0">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
               <Icons.User className="w-5 h-5" />
            </div>
          )}
        </div>
        
        {/* Search Bar - Exactly like screenshot: "Search Jobs" with Q icon on right */}
        <div className="flex-1 relative h-9">
           <input 
             type="text" 
             placeholder="Search Jobs"
             className="w-full h-full bg-white rounded-md pl-3 pr-9 text-gray-800 text-sm font-medium focus:outline-none placeholder-gray-400 shadow-inner"
           />
           <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
              <Icons.Search className="w-4 h-4 text-gray-400" strokeWidth={3} />
           </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2 shrink-0 ml-0.5">
           <button className="relative p-1.5 hover:bg-white/10 rounded-full transition-colors">
              <Icons.Coins className="w-6 h-6 text-white" strokeWidth={1.5} />
           </button>
           <button className="relative p-1.5 hover:bg-white/10 rounded-full transition-colors">
              <Icons.Bell className="w-6 h-6 text-white" strokeWidth={1.5} />
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-600 rounded-full text-[9px] flex items-center justify-center border border-[#059669] font-bold shadow-sm">2</span>
           </button>
           <button className="relative p-1.5 hover:bg-white/10 rounded-full transition-colors">
              <Icons.Mail className="w-6 h-6 text-white" strokeWidth={1.5} />
           </button>
           <button className="relative p-1.5 hover:bg-white/10 rounded-full transition-colors">
              <Icons.MoreVertical className="w-6 h-6 text-white" strokeWidth={1.5} />
           </button>
        </div>
      </div>

      {/* Stats Area - Exactly as per screenshot */}
      <div className="flex justify-between items-start text-center px-1 pb-2">
         <div className="flex flex-col items-center w-1/3 group cursor-pointer">
            <div className="text-[20px] font-bold leading-none mb-1 tracking-tight">4810</div>
            <div className="text-[11px] font-medium opacity-80 group-hover:opacity-100 transition-opacity">Live Jobs</div>
         </div>
         <div className="flex flex-col items-center w-1/3 border-l border-white/10 border-r group cursor-pointer">
            <div className="text-[20px] font-bold leading-none mb-1 tracking-tight">2856</div>
            <div className="text-[11px] font-medium opacity-80 group-hover:opacity-100 transition-opacity">Companies</div>
         </div>
         <div className="flex flex-col items-center w-1/3 group cursor-pointer">
            <div className="text-[20px] font-bold leading-none mb-1 tracking-tight">22</div>
            <div className="text-[11px] font-medium opacity-80 group-hover:opacity-100 transition-opacity">New Jobs</div>
         </div>
      </div>
    </div>
  );
};
