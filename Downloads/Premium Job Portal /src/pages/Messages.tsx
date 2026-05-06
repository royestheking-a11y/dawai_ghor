
import React, { useState } from 'react';
import { useAuth } from '../lib/auth';
import { Icons } from '../components/Icons';

export const Messages = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  // Mock Conversations
  const conversations = [
    { 
      id: 1, 
      user: 'Tech Solutions HR', 
      role: 'Recruiter',
      avatar: 'TS',
      lastMsg: 'Can you join for an interview tomorrow?', 
      time: '10:30 AM', 
      unread: 1,
      messages: [
        { id: 1, text: 'Hi Rahim, we reviewed your profile.', sender: 'them', time: '10:00 AM' },
        { id: 2, text: 'Thank you! I am very interested.', sender: 'me', time: '10:05 AM' },
        { id: 3, text: 'Can you join for an interview tomorrow at 11 AM?', sender: 'them', time: '10:30 AM' }
      ]
    },
    { 
      id: 2, 
      user: 'Startup Dhaka', 
      role: 'Recruiter',
      avatar: 'SD', 
      lastMsg: 'Thanks for applying.', 
      time: 'Yesterday', 
      unread: 0,
      messages: [
        { id: 1, text: 'Thanks for applying to the Senior Dev role.', sender: 'them', time: 'Yesterday' }
      ]
    }
  ];

  const templates = [
    { title: 'Interview Invite', text: 'Hi, we would like to invite you for an interview. Are you available this week?' },
    { title: 'Follow Up', text: 'Hi, just following up on our previous conversation.' },
    { title: 'Rejection', text: 'Thank you for your interest, but we have decided to move forward with another candidate.' },
    { title: 'Offer', text: 'We are pleased to offer you the position! When can we discuss details?' }
  ];

  const activeChat = conversations.find(c => c.id === selectedChat);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if(!newMessage.trim()) return;
    // In a real app, this would send to backend
    alert(`Sent: ${newMessage}`);
    setNewMessage('');
  };

  const insertTemplate = (text: string) => {
    setNewMessage(text);
    setShowTemplates(false);
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-50 flex">
       {/* Sidebar List */}
       <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-xl text-gray-900">Messages</h2>
            <button className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-full">
              <Icons.Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {conversations.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${selectedChat === chat.id ? 'bg-emerald-50/50 border-l-4 border-l-emerald-600' : 'border-l-4 border-l-transparent'}`}
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 flex-shrink-0">
                    {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900 truncate">{chat.user}</h3>
                      <span className="text-xs text-gray-400 flex-shrink-0">{chat.time}</span>
                    </div>
                    <p className={`text-sm truncate ${chat.unread ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                      {chat.lastMsg}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
       </div>

       {/* Chat Area */}
       <div className="hidden md:flex flex-1 flex-col bg-white">
         {activeChat ? (
           <>
             {/* Chat Header */}
             <div className="p-4 border-b border-gray-100 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
                   {activeChat.avatar}
                 </div>
                 <div>
                   <h3 className="font-bold text-gray-900">{activeChat.user}</h3>
                   <span className="text-xs text-gray-500">{activeChat.role}</span>
                 </div>
               </div>
               <div className="flex gap-2">
                 <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                   <Icons.MoreHorizontal className="w-5 h-5" />
                 </button>
               </div>
             </div>

             {/* Messages List */}
             <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
               {activeChat.messages.map(msg => (
                 <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
                     msg.sender === 'me' 
                       ? 'bg-emerald-600 text-white rounded-br-none' 
                       : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                   }`}>
                     <p className="text-sm">{msg.text}</p>
                     <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-emerald-200' : 'text-gray-400'}`}>
                       {msg.time}
                     </p>
                   </div>
                 </div>
               ))}
             </div>

             {/* Input Area */}
             <div className="p-4 border-t border-gray-100 bg-white relative">
               {showTemplates && (
                 <div className="absolute bottom-20 left-4 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-10 animate-in slide-in-from-bottom-2">
                   <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 text-xs font-bold text-gray-500">
                     QUICK TEMPLATES
                   </div>
                   <div className="max-h-60 overflow-y-auto">
                     {templates.map((t, i) => (
                       <button
                         key={i}
                         onClick={() => insertTemplate(t.text)}
                         className="w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors border-b border-gray-50 last:border-0"
                       >
                         <p className="font-bold text-sm text-gray-900">{t.title}</p>
                         <p className="text-xs text-gray-500 truncate">{t.text}</p>
                       </button>
                     ))}
                   </div>
                 </div>
               )}

               <form onSubmit={handleSend} className="flex gap-2">
                 <button 
                   type="button" 
                   onClick={() => setShowTemplates(!showTemplates)}
                   className={`p-2 rounded-full transition-colors ${showTemplates ? 'text-emerald-600 bg-emerald-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                   title="Use Template"
                 >
                   <Icons.FileText className="w-5 h-5" />
                 </button>
                 <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                   <Icons.Paperclip className="w-5 h-5" />
                 </button>
                 <input 
                   value={newMessage}
                   onChange={e => setNewMessage(e.target.value)}
                   className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                   placeholder="Type a message..."
                 />
                 <button 
                   type="submit"
                   disabled={!newMessage.trim()}
                   className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                   <Icons.Send className="w-5 h-5" />
                 </button>
               </form>
             </div>
           </>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
               <Icons.MessageSquare className="w-8 h-8" />
             </div>
             <p>Select a conversation to start messaging</p>
           </div>
         )}
       </div>
    </div>
  );
};
