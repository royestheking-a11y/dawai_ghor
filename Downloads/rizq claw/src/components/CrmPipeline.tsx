import React, { useState } from 'react';
import type { Lead, LeadStatus } from '../types';
import { 
  KanbanSquare, 
  ListFilter, 
  TrendingUp, 
  ExternalLink,
  PhoneCall,
  Mail,
  Building2,
  Sparkles
} from 'lucide-react';

interface CrmPipelineProps {
  leads: Lead[];
  onUpdateStatus: (leadId: string, newStatus: LeadStatus) => void;
  onSelectLeadForMessage: (lead: Lead) => void;
  onSelectLeadForAudit: (lead: Lead) => void;
}

export const CrmPipeline: React.FC<CrmPipelineProps> = ({ 
  leads, 
  onUpdateStatus, 
  onSelectLeadForMessage,
  onSelectLeadForAudit 
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Filtered leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.businessName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || l.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Kanban groups
  const pipelineColumns: { title: string; statuses: LeadStatus[]; bg: string; border: string; text: string }[] = [
    {
      title: 'Scraped & Audited',
      statuses: ['New', 'Verified', 'Audited', 'Hot Lead', 'Message Generated'],
      bg: 'bg-gray-50/80',
      border: 'border-gray-200',
      text: 'text-gray-900'
    },
    {
      title: 'Outreach Active',
      statuses: ['Contacted', 'Replied'],
      bg: 'bg-blue-50/60',
      border: 'border-blue-200',
      text: 'text-blue-950'
    },
    {
      title: 'Demo & Meeting',
      statuses: ['Interested', 'Demo Sent', 'Meeting Booked', 'Proposal Sent'],
      bg: 'bg-purple-50/60',
      border: 'border-purple-200',
      text: 'text-purple-950'
    },
    {
      title: 'Closed Deals',
      statuses: ['Converted'],
      bg: 'bg-emerald-50/60',
      border: 'border-emerald-200',
      text: 'text-emerald-950'
    },
    {
      title: 'Archived',
      statuses: ['Rejected'],
      bg: 'bg-red-50/40',
      border: 'border-red-200',
      text: 'text-red-950'
    }
  ];

  const allCategories = ['All', ...Array.from(new Set(leads.map(l => l.category)))];

  const totalValue = filteredLeads
    .filter(l => ['Interested', 'Demo Sent', 'Meeting Booked', 'Proposal Sent', 'Converted'].includes(l.status))
    .reduce((sum, l) => sum + (l.estimatedDealValue || 650), 0);

  const statusesList: LeadStatus[] = [
    'New', 'Verified', 'Audited', 'Hot Lead', 'Message Generated',
    'Contacted', 'Replied', 'Interested', 'Demo Sent', 'Meeting Booked',
    'Proposal Sent', 'Converted', 'Rejected'
  ];

  return (
    <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-maroon-50 text-maroon-800 px-3.5 py-1.5 rounded-full text-xs font-extrabold mb-2 border border-maroon-200 shadow-2xs">
            <KanbanSquare className="w-4 h-4 text-maroon-600 shrink-0" />
            <span>Autonomous Sales Pipeline</span>
          </div>
          <h1 className="text-3xl font-extrabold text-maroon-950 font-['Outfit']">
            CRM Deal Board
          </h1>
          <p className="text-gray-600 text-sm mt-1 max-w-2xl">
            Track business prospects from initial discovery to contract conversion. Easily update status, inspect communications, and calculate estimated revenue.
          </p>
        </div>

        {/* View Toggle & Stats */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="bg-gradient-to-r from-maroon-50 to-maroon-100 p-3.5 rounded-2xl border border-maroon-200 flex items-center space-x-3 text-xs font-bold text-maroon-950 shadow-2xs w-full sm:w-auto justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-maroon-700 shrink-0" />
            <span>Active Deal Value: <strong className="text-maroon-900 text-base font-extrabold font-mono">${totalValue.toLocaleString()}</strong></span>
          </div>

          <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 w-full sm:w-auto justify-center shrink-0">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                viewMode === 'kanban' 
                  ? 'bg-maroon-700 text-white shadow-md shadow-maroon-700/20' 
                  : 'text-gray-700 hover:text-maroon-950'
              }`}
            >
              <KanbanSquare className="w-4 h-4 shrink-0" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                viewMode === 'table' 
                  ? 'bg-maroon-700 text-white shadow-md shadow-maroon-700/20' 
                  : 'text-gray-700 hover:text-maroon-950'
              }`}
            >
              <ListFilter className="w-4 h-4 shrink-0" />
              <span>List Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-maroon-100 shadow-2xs">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by business name or location..."
          className="w-full sm:w-96 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all shadow-xs"
        />

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-gray-500 whitespace-nowrap px-2">Filter Niche:</span>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all border shrink-0 ${
                categoryFilter === cat
                  ? 'bg-maroon-700 text-white border-maroon-700 shadow-sm shadow-maroon-700/20'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-start">
          {pipelineColumns.map((col) => {
            const columnLeads = filteredLeads.filter(l => col.statuses.includes(l.status));
            const columnTotalVal = columnLeads.reduce((sum, l) => sum + (l.estimatedDealValue || 650), 0);
            
            return (
              <div 
                key={col.title} 
                className={`rounded-3xl p-4 border ${col.border} ${col.bg} space-y-4 shadow-sm min-h-[550px] flex flex-col overflow-hidden`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-200/80 gap-2">
                  <div className="flex items-center space-x-2 truncate">
                    <span className={`font-extrabold text-sm ${col.text} font-['Outfit'] truncate`}>{col.title}</span>
                    <span className="bg-white/90 text-maroon-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs border border-gray-200 shrink-0 font-mono">
                      {columnLeads.length}
                    </span>
                  </div>
                  {columnTotalVal > 0 && (
                    <span className="text-xs font-extrabold text-maroon-900 bg-white px-2.5 py-1 rounded-xl border border-maroon-200 shrink-0 font-mono shadow-2xs">
                      ${columnTotalVal}
                    </span>
                  )}
                </div>

                <div className="space-y-3.5 flex-1 overflow-y-auto overflow-x-hidden max-h-[700px] pr-2 pl-0.5 py-1">
                  {columnLeads.length === 0 ? (
                    <div className="text-center py-12 text-xs text-gray-400 font-bold border-2 border-dashed border-gray-200 rounded-2xl bg-white/50">
                      No prospects in stage
                    </div>
                  ) : (
                    columnLeads.map((lead) => (
                      <div 
                        key={lead.id} 
                        className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-maroon-400 transition-all shadow-xs hover:shadow-md space-y-3 relative group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <span className="bg-gray-100 text-gray-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase border border-gray-200 shrink-0 font-mono">
                              {lead.category}
                            </span>
                            <h4 className="font-extrabold text-sm text-maroon-950 mt-1.5 leading-snug break-words">{lead.businessName}</h4>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">📍 {lead.location}</p>
                          </div>

                          <span className={`px-2 py-1 rounded-lg text-xs font-extrabold shrink-0 shadow-2xs font-mono ${
                            lead.score >= 80 ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-gray-100 text-gray-800'
                          }`}>
                            ⭐️ {lead.rating}
                          </span>
                        </div>

                        <div className="bg-maroon-50/70 p-2.5 rounded-xl border border-maroon-100 text-xs text-maroon-950 font-bold flex items-center justify-between gap-1">
                          <span className="truncate font-medium text-gray-600">Deal: <strong className="text-maroon-800 font-extrabold font-mono">${lead.estimatedDealValue || 650}</strong></span>
                          <span className="text-[10px] font-extrabold bg-white text-maroon-900 px-2 py-0.5 rounded-md shadow-2xs shrink-0 font-mono border border-maroon-200">
                            Score {lead.score}
                          </span>
                        </div>

                        {/* Status Dropdown & Action Buttons Stacked Cleanly */}
                        <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider shrink-0">Stage</span>
                            <select
                              value={lead.status}
                              onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                              className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs text-maroon-950 px-2.5 py-1.5 rounded-lg font-extrabold focus:outline-none focus:ring-1 focus:ring-maroon-600 cursor-pointer w-full max-w-[150px] truncate shadow-2xs"
                            >
                              {statusesList.map(st => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              onClick={() => onSelectLeadForAudit(lead)}
                              className="w-full bg-gray-100 hover:bg-maroon-100 text-maroon-950 px-2 py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center space-x-1.5 transition-all shadow-2xs border border-gray-200"
                            >
                              <ExternalLink className="w-3.5 h-3.5 shrink-0 text-maroon-700" />
                              <span className="truncate">Audit</span>
                            </button>
                            <button
                              onClick={() => onSelectLeadForMessage(lead)}
                              className="w-full bg-maroon-700 hover:bg-maroon-800 text-white px-2 py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center space-x-1.5 transition-all shadow-sm shadow-maroon-700/20"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                              <span className="truncate">Outreach</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    ))
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Table List View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 uppercase font-extrabold text-[11px] bg-gray-50/80">
                <th className="p-4">Business / Location</th>
                <th className="p-4">Category</th>
                <th className="p-4">Lead Score</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Identified Gap &amp; Service Pitch</th>
                <th className="p-4">Est. Deal</th>
                <th className="p-4">Pipeline Stage</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-maroon-50/40 transition-all group">
                  <td className="p-4 font-bold text-maroon-950">
                    <div className="text-sm font-extrabold flex items-center space-x-1.5">
                      <Building2 className="w-4 h-4 text-maroon-700 shrink-0" />
                      <span>{lead.businessName}</span>
                    </div>
                    <div className="text-xs text-gray-500 font-normal mt-1">📍 {lead.location} &bull; ⭐️ {lead.rating}</div>
                  </td>
                  <td className="p-4 font-bold text-gray-700">
                    <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg border border-gray-200 uppercase font-mono text-[10px]">
                      {lead.category}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold font-mono">
                    <span className="bg-maroon-100 text-maroon-950 px-3 py-1.5 rounded-xl border border-maroon-200 shadow-2xs">
                      {lead.score}/100
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs">
                    <div className="flex items-center space-x-1 font-bold text-gray-900">
                      <PhoneCall className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{lead.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400 mt-1">
                      <Mail className="w-3 h-3 shrink-0" />
                      <span>{lead.email || 'No email'}</span>
                    </div>
                  </td>
                  <td className="p-4 max-w-xs">
                    <div className="font-extrabold text-maroon-900">{lead.serviceRecommended}</div>
                    <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">{lead.needDetected}</div>
                  </td>
                  <td className="p-4 font-extrabold text-emerald-700 font-mono text-sm">
                    ${lead.estimatedDealValue || 650}
                  </td>
                  <td className="p-4">
                    <select
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                      className="bg-white hover:bg-gray-50 border border-gray-300 text-xs text-maroon-950 px-3 py-2 rounded-xl font-extrabold focus:outline-none focus:ring-2 focus:ring-maroon-600 cursor-pointer shadow-xs"
                    >
                      {statusesList.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onSelectLeadForAudit(lead)}
                        className="bg-gray-100 hover:bg-maroon-100 text-maroon-950 px-3 py-2 rounded-xl text-xs font-extrabold transition-all shadow-xs border border-gray-200 flex items-center space-x-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 text-maroon-700" />
                        <span>Audit</span>
                      </button>
                      <button
                        onClick={() => onSelectLeadForMessage(lead)}
                        className="bg-maroon-700 hover:bg-maroon-800 text-white px-3 py-2 rounded-xl text-xs font-extrabold transition-all shadow-sm shadow-maroon-700/20 flex items-center space-x-1"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                        <span>Outreach</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
