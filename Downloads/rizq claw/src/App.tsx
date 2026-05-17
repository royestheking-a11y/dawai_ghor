import { useState } from 'react';
import type { Lead, ActivityLog, LeadStatus, FollowUpStage } from './types';
import { INITIAL_LEADS, INITIAL_LOGS } from './data/mockLeads';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { LeadHunter } from './components/LeadHunter';
import { DigitalAudit } from './components/DigitalAudit';
import { AiSalesBrain } from './components/AiSalesBrain';
import { CrmPipeline } from './components/CrmPipeline';
import { FollowUpEngine } from './components/FollowUpEngine';
import { ProposalGenerator } from './components/ProposalGenerator';
import { ChromeExtensionSim } from './components/ChromeExtensionSim';
import { SettingsModal } from './components/SettingsModal';
import { AddLeadModal } from './components/AddLeadModal';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [logs, setLogs] = useState<ActivityLog[]>(INITIAL_LOGS);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedAuditLeadId, setSelectedAuditLeadId] = useState<string | undefined>(undefined);
  const [selectedMessageLeadId, setSelectedMessageLeadId] = useState<string | undefined>(undefined);

  // Helper to add activity log
  const addLog = (leadName: string, action: string, type: ActivityLog['type']) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      leadId: `lead-${Date.now()}`,
      leadName,
      action,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Handlers
  const handleAddLeads = (newLeads: Lead[]) => {
    setLeads(prev => [...newLeads, ...prev]);
    newLeads.forEach(l => {
      addLog(l.businessName, `Discovered via ${l.createdVia}. Trust score calculated: ${l.score}/100.`, 'audit');
    });
  };

  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        addLog(l.businessName, `CRM Pipeline status updated from ${l.status} to ${newStatus}.`, 'status_change');
        return { ...l, status: newStatus };
      }
      return l;
    }));
  };

  const handleApproveMessage = (leadId: string, updatedMessage: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        addLog(l.businessName, `Human review approved AI outreach draft. Dispatching via ${l.outreachChannel}.`, 'approval');
        return { 
          ...l, 
          approved: true, 
          aiMessageDraft: updatedMessage, 
          status: l.status === 'New' ? 'Contacted' : l.status,
          followUpStage: l.followUpStage === 'None' ? 'Day 1' : l.followUpStage,
          lastContactDate: new Date().toISOString().split('T')[0]
        };
      }
      return l;
    }));
  };

  const handleUpdateFollowUp = (leadId: string, nextStage: FollowUpStage, nextStatus?: LeadStatus) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const statusToSet = nextStatus || l.status;
        addLog(l.businessName, `Automated sequence '${nextStage}' triggered. CRM status shifted to '${statusToSet}'.`, 'message');
        return { 
          ...l, 
          followUpStage: nextStage, 
          status: statusToSet,
          lastContactDate: new Date().toISOString().split('T')[0]
        };
      }
      return l;
    }));
  };

  const handleConvertDeal = (leadId: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        addLog(l.businessName, `Agreement signed and converted! Initial payment deposit verified.`, 'proposal');
        return { ...l, status: 'Converted' };
      }
      return l;
    }));
  };

  // Navigation jumpers
  const handleJumpToAudit = (lead: Lead) => {
    setSelectedAuditLeadId(lead.id);
    setActiveTab('audit');
  };

  const handleJumpToMessage = (lead: Lead) => {
    setSelectedMessageLeadId(lead.id);
    setActiveTab('sales-brain');
  };

  const hotLeadsCount = leads.filter(l => l.score >= 80).length;
  const pendingApprovals = leads.filter(l => !l.approved).length;

  // Unauthenticated view renders the premium Login Page
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfafb] text-[#1a1516] font-sans">
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hotLeadsCount={hotLeadsCount}
        pendingApprovals={pendingApprovals}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Main Tab Render */}
      <main className="flex-1 pb-16">
        {activeTab === 'dashboard' && (
          <Dashboard
            leads={leads}
            logs={logs}
            setActiveTab={setActiveTab}
            onSelectLeadForAudit={handleJumpToAudit}
            onSelectLeadForMessage={handleJumpToMessage}
          />
        )}

        {activeTab === 'hunter' && (
          <LeadHunter
            onAddLeads={handleAddLeads}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onSelectLeadForAudit={handleJumpToAudit}
          />
        )}

        {activeTab === 'audit' && (
          <DigitalAudit
            leads={leads}
            onSelectLeadForMessage={handleJumpToMessage}
            selectedLeadId={selectedAuditLeadId}
          />
        )}

        {activeTab === 'sales-brain' && (
          <AiSalesBrain
            leads={leads}
            onApproveMessage={handleApproveMessage}
            selectedLeadId={selectedMessageLeadId}
          />
        )}

        {activeTab === 'pipeline' && (
          <CrmPipeline
            leads={leads}
            onUpdateStatus={handleUpdateStatus}
            onSelectLeadForMessage={handleJumpToMessage}
            onSelectLeadForAudit={handleJumpToAudit}
          />
        )}

        {activeTab === 'followup' && (
          <FollowUpEngine
            leads={leads}
            onUpdateFollowUp={handleUpdateFollowUp}
          />
        )}

        {activeTab === 'proposals' && (
          <ProposalGenerator
            leads={leads}
            onConvertDeal={handleConvertDeal}
          />
        )}

        {activeTab === 'extension' && (
          <ChromeExtensionSim
            onAddLeads={handleAddLeads}
            onSelectLeadForAudit={handleJumpToAudit}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsModal
            onClose={() => setActiveTab('dashboard')}
          />
        )}
      </main>

      {/* Manual Lead Injection Modal */}
      {isAddModalOpen && (
        <AddLeadModal
          onClose={() => setIsAddModalOpen(false)}
          onAddLead={(newLead) => {
            handleAddLeads([newLead]);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-maroon-100 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-maroon-950 font-['Outfit']">RizQ Claw System V1</span>
            <span>&copy; 2026 RizQara Tech Ltd. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-4 font-semibold">
            <span className="text-emerald-600">&bull; Secure 256-Bit SSL</span>
            <span className="text-blue-600">&bull; Hybrid AI Sales Brain v1.2</span>
            <span className="text-purple-600">&bull; Dhaka &amp; Barishal Clusters Active</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
