import React, { useState } from 'react';
import type { Lead, LeadStatus } from '../types';
import { 
  KanbanSquare, 
  ListFilter, 
  TrendingUp, 
  ExternalLink 
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
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-800'
    },
    {
      title: 'Outreach Active',
      statuses: ['Contacted', 'Replied'],
      bg: 'bg-blue-50/50',
      border: 'border-blue-200',
      text: 'text-blue-900'
    },
    {
      title: 'Demo & Meeting',
      statuses: ['Interested', 'Demo Sent', 'Meeting Booked', 'Proposal Sent'],
      bg: 'bg-purple-50/50',
      border: 'border-purple-200',
      text: 'text-purple-950'
    },
    {
      title: 'Closed Deals',
      statuses: ['Converted'],
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-200',
      text: 'text-emerald-950'
    },
    {
      title: 'Archived',
      statuses: ['Rejected'],
      bg: 'bg-red-50/30',
      border: 'border-red-200',
      text: 'text-red-900'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-maroon-50 text-maroon-800 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-maroon-200">
            <KanbanSquare className="w-3.5 h-3.5 text-maroon-600" />
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
          <div className="bg-maroon-50 p-3 rounded-2xl border border-maroon-100 flex items-center space-x-3 text-xs font-semibold text-maroon-950">
            <TrendingUp className="w-4 h-4 text-maroon-600" />
            <span>Active Deal Value: <strong className="text-maroon-700 text-sm font-extrabold">${totalValue.toLocaleString()}</strong></span>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 w-full sm:w-auto justify-center">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'kanban' 
                  ? 'bg-maroon-600 text-white shadow-sm' 
                  : 'text-gray-700 hover:text-maroon-950'
              }`}
            >
              <KanbanSquare className="w-4 h-4" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table' 
                  ? 'bg-maroon-600 text-white shadow-sm' 
                  : 'text-gray-700 hover:text-maroon-950'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              <span>List Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by business name or location..."
          className="w-full sm:w-80 px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all shadow-sm"
        />

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Filter Industry:</span>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                categoryFilter === cat
                  ? 'bg-maroon-600 text-white border-maroon-600 shadow-sm'
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
              <div key={col.title} className={`rounded-3xl p-4 border ${col.border} ${col.bg} space-y-4 shadow-sm min-h-[500px] flex flex-col`}>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200/80">
                  <div className="flex items-center space-x-2">
                    <span className={`font-extrabold text-sm ${col.text} font-['Outfit']`}>{col.title}</span>
                    <span className="bg-white/80 text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full shadow-2xs border border-gray-200">
                      {columnLeads.length}
                    </span>
                  </div>
                  {columnTotalVal > 0 && (
                    <span className="text-[11px] font-extrabold text-maroon-800 bg-white/90 px-2 py-0.5 rounded-md border border-maroon-200">
                      ${columnTotalVal}
                    </span>
                  )}
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[700px] pr-1">
                  {columnLeads.length === 0 ? (
                    <div className="text-center py-8 text-xs text-gray-400 font-medium border-2 border-dashed border-gray-200 rounded-2xl">
                      No leads in this stage
                    </div>
                  ) : (
                    columnLeads.map((lead) => (
                      <div key={lead.id} className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-maroon-300 transition-all shadow-sm hover:shadow space-y-3 relative group">
                        
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="bg-gray-100 text-gray-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase border border-gray-200">
                              {lead.category}
                            </span>
                            <h4 className="font-extrabold text-sm text-maroon-950 mt-1 leading-snug">{lead.businessName}</h4>
                            <p className="text-[11px] text-gray-500 mt-0.5">{lead.location}</p>
                          </div>

                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            lead.score >= 80 ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            ⭐️ {lead.rating}
                          </span>
                        </div>

                        <div className="bg-maroon-50/50 p-2.5 rounded-xl border border-maroon-100 text-[11px] text-maroon-950 font-semibold flex items-center justify-between">
                          <span>Est. Deal: <strong className="text-maroon-700">${lead.estimatedDealValue || 650}</strong></span>
                          <span className="text-[10px] font-extrabold bg-white text-maroon-800 px-1.5 py-0.5 rounded shadow-2xs">
                            Score {lead.score}
                          </span>
                        </div>

                        {/* Status Dropdown selector */}
                        <div className="flex items-center justify-between pt-1 text-xs">
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                            className="bg-gray-50 border border-gray-200 text-[11px] text-gray-800 px-2 py-1 rounded-lg font-bold focus:outline-none focus:ring-1 focus:ring-maroon-600 cursor-pointer"
                          >
                            {statusesList.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>

                          <div className="flex items-center space-x-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => onSelectLeadForAudit(lead)}
                              className="p-1 rounded hover:bg-gray-100 text-gray-600 hover:text-maroon-800"
                              title="Inspect Digital Audit"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onSelectLeadForMessage(lead)}
                              className="p-1 rounded bg-maroon-700 text-white hover:bg-maroon-800 px-2 py-0.5 text-[10px] font-bold flex items-center space-x-1"
                              title="Open AI Outreach Draft"
                            >
                              <span>Outreach</span>
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
              <tr className="border-b border-gray-200 text-gray-500 uppercase font-bold text-[11px] bg-gray-50/50">
                <th className="p-3.5">Business / Location</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Lead Score</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Identified Gap &amp; Service Pitch</th>
                <th className="p-3.5">Est. Deal</th>
                <th className="p-3.5">Pipeline Stage</th>
                <th className="p-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-maroon-50/30 transition-all group">
                  <td className="p-3.5 font-bold text-maroon-950">
                    <div className="text-sm font-extrabold">{lead.businessName}</div>
                    <div className="text-[11px] text-gray-500 font-normal">📍 {lead.location} &bull; ⭐️ {lead.rating}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-gray-700">{lead.category}</td>
                  <td className="p-3.5 font-extrabold">
                    <span className="bg-maroon-100 text-maroon-900 px-2.5 py-1 rounded-lg border border-maroon-200">
                      {lead.score}/100
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-[11px]">
                    <div>{lead.phone}</div>
                    <div className="text-gray-400">{lead.email || 'No email'}</div>
                  </td>
                  <td className="p-3.5 max-w-xs">
                    <div className="font-semibold text-maroon-800">{lead.serviceRecommended}</div>
                    <div className="text-[11px] text-gray-500 truncate">{lead.needDetected}</div>
                  </td>
                  <td className="p-3.5 font-extrabold text-emerald-700 font-mono">
                    ${lead.estimatedDealValue || 650}
                  </td>
                  <td className="p-3.5">
                    <select
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                      className="bg-white border border-gray-300 text-xs text-gray-900 px-3 py-1.5 rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-maroon-600 cursor-pointer shadow-xs"
                    >
                      {statusesList.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => onSelectLeadForAudit(lead)}
                        className="bg-gray-100 hover:bg-maroon-600 hover:text-white px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all shadow-xs"
                      >
                        Audit
                      </button>
                      <button
                        onClick={() => onSelectLeadForMessage(lead)}
                        className="bg-maroon-700 hover:bg-maroon-800 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all shadow-xs"
                      >
                        Outreach
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
