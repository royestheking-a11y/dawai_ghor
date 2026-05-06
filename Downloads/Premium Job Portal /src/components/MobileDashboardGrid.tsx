import React from 'react';
import { Icons } from './Icons';
import { motion } from 'motion/react';

export const MobileDashboardGrid = () => {
  const items = [
    { label: 'Applied Jobs', id: 'applied' },
    { label: 'Saved Jobs', id: 'saved' },
    { label: 'My Test/Interview', id: 'test' },
    { label: 'Profile Viewed', id: 'viewed' },
    { label: 'My Points', id: 'points' },
    { label: 'My Calendar', id: 'calendar' },
    { label: 'Fresher Jobs', id: 'fresher' },
    { label: 'Career Counselling', id: 'counselling' },
  ];

  const renderIcon = (id: string) => {
      // Premium illustrated icons style
      switch(id) {
          case 'applied':
              return (
                <div className="relative w-11 h-11 flex items-center justify-center">
                    {/* Document shape */}
                    <div className="w-8 h-10 bg-[#e3f2fd] rounded border border-blue-100 relative shadow-sm flex flex-col items-center pt-2">
                         <div className="w-4 h-0.5 bg-blue-200 mb-1 rounded-full"></div>
                         <div className="w-4 h-0.5 bg-blue-200 mb-1 rounded-full"></div>
                         <div className="w-3 h-0.5 bg-blue-200 rounded-full"></div>
                    </div>
                    {/* Check badge */}
                    <div className="absolute -bottom-1 -right-1 bg-[#059669] rounded-full p-0.5 border-2 border-white shadow-sm">
                        <Icons.Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                </div>
              );
          case 'saved':
              return (
                <div className="relative w-11 h-11 flex items-center justify-center">
                     <Icons.Star className="w-10 h-10 text-[#90caf9] fill-[#e3f2fd]" strokeWidth={1.5} />
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-0.5 shadow-sm">
                         <Icons.Star className="w-3.5 h-3.5 text-[#f06292] fill-[#f06292]" />
                     </div>
                </div>
              );
          case 'test':
              return (
                <div className="relative w-11 h-11 flex items-center justify-center">
                   <div className="absolute left-0 bottom-0 bg-[#ecfdf5] rounded-lg p-1 border border-emerald-100">
                        <Icons.MessageSquare className="w-5 h-5 text-[#f48fb1]" />
                   </div>
                   <div className="absolute right-0 top-0 bg-[#e3f2fd] rounded-full p-1 border border-blue-100 shadow-sm">
                        <Icons.HelpCircle className="w-4 h-4 text-[#64b5f6]" />
                   </div>
                </div>
              );
          case 'viewed':
               return (
                <div className="relative w-11 h-11 flex items-center justify-center">
                    <div className="w-9 h-9 bg-[#e3f2fd] rounded-full flex items-center justify-center border border-blue-100 shadow-sm">
                        <Icons.User className="w-5 h-5 text-[#64b5f6]" />
                    </div>
                    <div className="absolute -bottom-1 -right-0 bg-white rounded-full p-[2px] shadow-sm border border-gray-50">
                        <Icons.Eye className="w-3.5 h-3.5 text-[#ec407a]" />
                    </div>
                </div>
               );
          case 'points':
              return (
                <div className="relative w-11 h-11 flex items-center justify-center">
                   <div className="flex -space-x-1 relative">
                       <div className="w-6 h-6 rounded-full bg-[#ffcc80] border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-[#e65100] z-10">$</div>
                       <div className="w-6 h-6 rounded-full bg-[#ffe0b2] border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-[#e65100] transform -translate-y-1">P</div>
                   </div>
                </div>
              );
          case 'calendar':
              return (
                  <div className="relative w-11 h-11 flex items-center justify-center">
                     <div className="w-9 h-9 bg-[#e1f5fe] rounded flex items-center justify-center border border-[#b3e5fc] shadow-sm relative">
                         <div className="absolute top-0 w-full h-2.5 bg-[#4fc3f7] rounded-t"></div>
                         <span className="mt-2 text-[10px] font-bold text-[#0277bd]">24</span>
                     </div>
                  </div>
              );
          case 'fresher':
              return (
                  <div className="relative w-11 h-11 flex items-center justify-center">
                     <div className="w-10 h-10 bg-[#f3e5f5] rounded-full flex items-center justify-center border border-[#e1bee7]">
                         <Icons.GraduationCap className="w-6 h-6 text-[#ba68c8]" strokeWidth={2} />
                     </div>
                  </div>
              );
          case 'counselling':
               return (
                  <div className="relative w-11 h-11 flex items-center justify-center">
                      <div className="relative">
                          <Icons.User className="w-9 h-9 text-[#90caf9] fill-[#e3f2fd]" strokeWidth={1.5} />
                          <div className="absolute -top-1 -right-1 bg-[#ec407a] rounded-full p-[1px] border border-white">
                              <Icons.HelpCircle className="w-3 h-3 text-white" />
                          </div>
                      </div>
                  </div>
               );
          default:
              return <Icons.Circle className="w-8 h-8 text-gray-400" />;
      }
  };

  return (
    <div className="bg-white py-5 px-3 rounded-xl mx-3 mt-2 shadow-sm border border-gray-50">
      <div className="grid grid-cols-4 gap-y-6 gap-x-1">
        {items.map((item, i) => (
            <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center gap-2 text-center group cursor-pointer"
            >
            <div className="h-11 w-11 flex items-center justify-center transition-transform group-hover:scale-110">
                {renderIcon(item.id)}
            </div>
            <span className="text-[10px] font-semibold text-gray-600 leading-tight px-1 min-h-[2.5em] flex items-center justify-center">{item.label}</span>
            </motion.div>
        ))}
      </div>
      <div className="flex justify-end mt-4 px-2 border-t border-gray-50 pt-3">
          <button className="text-[#059669] font-bold text-[11px] flex items-center gap-1 hover:underline">
             See More <Icons.ChevronRight className="w-3 h-3 stroke-[3]" />
          </button>
      </div>
    </div>
  );
};
