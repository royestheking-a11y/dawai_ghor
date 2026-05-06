
import React, { useState } from 'react';
import { Icons } from '../components/Icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const SalaryInsights = () => {
  const [selectedRole, setSelectedRole] = useState('Frontend Developer');
  
  const roles = [
    'Frontend Developer',
    'Backend Developer', 
    'Product Designer',
    'Data Scientist',
    'Marketing Manager'
  ];

  // Mock Data
  const data = [
    { range: '20k-40k', count: 15 },
    { range: '40k-60k', count: 35 },
    { range: '60k-80k', count: 25 },
    { range: '80k-100k', count: 15 },
    { range: '100k+', count: 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Salary Insights</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover real salary trends in the Bangladeshi tech market based on verified job postings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Select Role</h3>
              <div className="space-y-2">
                {roles.map(role => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedRole === role 
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl text-white">
              <h3 className="font-bold text-lg mb-2">Premium Access</h3>
              <p className="text-gray-400 text-sm mb-4">Unlock detailed company-wise breakdown.</p>
              <button className="w-full py-2 bg-emerald-600 rounded-lg font-bold text-sm hover:bg-emerald-700 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
             {/* Stats Cards */}
             <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                   <p className="text-xs text-gray-500 uppercase font-bold">Average</p>
                   <p className="text-2xl font-bold text-gray-900 mt-1">৳55,000</p>
                   <span className="text-green-500 text-xs font-bold flex items-center gap-1 mt-2">
                     <Icons.TrendingUp className="w-3 h-3" /> +12% YoY
                   </span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                   <p className="text-xs text-gray-500 uppercase font-bold">Entry Level</p>
                   <p className="text-2xl font-bold text-gray-900 mt-1">৳30,000</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                   <p className="text-xs text-gray-500 uppercase font-bold">Senior Level</p>
                   <p className="text-2xl font-bold text-gray-900 mt-1">৳95,000</p>
                </div>
             </div>

             {/* Main Chart */}
             <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm h-96">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Icons.BarChart className="w-5 h-5 text-emerald-600" />
                  Salary Distribution for {selectedRole}
                </h3>
                
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart data={data}>
                    <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 1 ? '#059669' : '#e5e7eb'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
