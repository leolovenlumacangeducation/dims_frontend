import React, { useState } from 'react';
import { 
  FileCheck, 
  Search, 
  Bell, 
  LogOut,
  LayoutGrid,
  FileText,
  Package,
  Settings as SettingsIcon,
  Sparkles,
  Maximize2,
  GripVertical,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
  Shield,
  User,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import userAvatar from './assets/images/user_avatar_1791221113437.jpg';
import { PurchaseOrder, PurchaseRequest, SystemSettings } from './types/procurement';
import { initialPurchaseOrdersData, initialPurchaseRequestsData, defaultSystemSettingsData } from './data/procurementData';
import { PurchaseOrderView } from './components/PurchaseOrderView';
import { PurchaseRequestView } from './components/PurchaseRequestView';
import { SettingsView } from './components/SettingsView';
import { DashboardView } from './components/DashboardView';
import { InventoryView } from './components/InventoryView';

type NavigationPage = 'dashboard' | 'purchase-requests' | 'purchase-orders' | 'inventory' | 'settings';

export default function App() {
  const [activePage, setActivePage] = useState<NavigationPage>('purchase-orders');
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(initialPurchaseOrdersData);
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>(initialPurchaseRequestsData);
  const [settings, setSettings] = useState<SystemSettings>(defaultSystemSettingsData);
  const [highlightedPOId, setHighlightedPOId] = useState<string | null>(null);

  // Gemini Assistant State
  const [isGeminiOpen, setIsGeminiOpen] = useState(false);
  const [geminiMessages, setGeminiMessages] = useState<Array<{ sender: 'user' | 'gemini'; text: string; time: string }>>([
    {
      sender: 'gemini',
      text: 'Hello! I can analyze pending purchase orders, summarize spend commitments, trace PR fulfillment, or draft inspection checklists. How can I help you today?',
      time: '10:24 AM'
    }
  ]);
  const [geminiInput, setGeminiInput] = useState('');

  // Global dialog states
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; desc: string; time: string; read: boolean; type: 'pr' | 'po' | 'iar'; refId: string }>>([
    { id: '1', title: 'Delivery Inspected & Accepted', desc: 'IAR-2026-042 generated for PO-2026-001 by Inspection Committee.', time: '10 mins ago', read: false, type: 'po', refId: 'PO-2026-001' },
    { id: '2', title: 'Purchase Request Approved', desc: 'PR-2026-004 (Science Laboratory Apparatus) approved by Division BAC.', time: '1 hour ago', read: false, type: 'pr', refId: 'PR-2026-004' },
    { id: '3', title: 'New Requisition Submitted', desc: 'IT Infrastructure submitted PR-2026-008 for server battery replacement.', time: '3 hours ago', read: false, type: 'pr', refId: 'PR-2026-008' }
  ]);

  // Page title mapping
  const getPageTitle = () => {
    switch (activePage) {
      case 'purchase-orders':
        return 'Purchase Order Management';
      case 'purchase-requests':
        return 'Purchase Request Management';
      case 'settings':
        return 'Settings & System Configurations';
      case 'dashboard':
        return 'Procurement Executive Dashboard';
      case 'inventory':
        return 'Inventory & Warehouse Stock';
    }
  };

  // Convert PR to PO Handler
  const handleConvertToPO = (pr: PurchaseRequest, supplier: string, deliveryDate: string) => {
    const randomSuffix = Math.floor(Math.random() * 800 + 100);
    const newPOId = `PO-2026-${randomSuffix}`;

    const newPO: PurchaseOrder = {
      id: newPOId,
      prRef: pr.id,
      iarRef: null,
      date: 'Oct 05, 2026',
      supplier,
      amount: `₱${pr.estimatedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      amountNumber: pr.estimatedAmount,
      status: 'Pending',
      itemsCount: pr.items.length,
      department: pr.department,
      requester: pr.requester,
      deliveryDate,
      items: pr.items.map(it => ({
        name: it.name,
        qty: it.qty,
        unit: it.unit,
        unitPrice: it.estUnitPrice,
        total: it.total
      }))
    };

    setPurchaseOrders(prev => [newPO, ...prev]);
    setPurchaseRequests(prev => prev.map(p => {
      if (p.id === pr.id) {
        return {
          ...p,
          status: 'Approved',
          poRef: newPOId
        };
      }
      return p;
    }));

    setHighlightedPOId(newPOId);
    setActivePage('purchase-orders');
  };

  // Add new PR
  const handleAddPurchaseRequest = (newPR: PurchaseRequest) => {
    setPurchaseRequests(prev => [newPR, ...prev]);
  };

  // Edit PR
  const handleEditPurchaseRequest = (updatedPR: PurchaseRequest) => {
    setPurchaseRequests(prev => prev.map(p => p.id === updatedPR.id ? updatedPR : p));
  };

  // Delete PR
  const handleDeletePurchaseRequest = (prId: string) => {
    setPurchaseRequests(prev => prev.filter(p => p.id !== prId));
  };

  // Update PR Status
  const handleUpdatePRStatus = (prId: string, status: PurchaseRequest['status']) => {
    setPurchaseRequests(prev => prev.map(p => {
      if (p.id === prId) {
        return { ...p, status };
      }
      return p;
    }));
  };

  // Add new PO
  const handleAddPurchaseOrder = (newPO: PurchaseOrder) => {
    setPurchaseOrders(prev => [newPO, ...prev]);
  };

  // Edit PO
  const handleEditPurchaseOrder = (updatedPO: PurchaseOrder) => {
    setPurchaseOrders(prev => prev.map(p => p.id === updatedPO.id ? updatedPO : p));
  };

  // Delete PO
  const handleDeletePurchaseOrder = (poId: string) => {
    setPurchaseOrders(prev => prev.filter(p => p.id !== poId));
  };

  // Update PO Status
  const handleUpdatePOStatus = (poId: string, status: PurchaseOrder['status'], iarRef?: string) => {
    setPurchaseOrders(prev => prev.map(p => {
      if (p.id === poId) {
        return { 
          ...p, 
          status, 
          iarRef: iarRef || p.iarRef 
        };
      }
      return p;
    }));
  };

  // Gemini query handler
  const handleAskGemini = (promptText?: string) => {
    const textToSend = promptText || geminiInput;
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: textToSend,
      time: '10:25 AM'
    };

    setGeminiMessages(prev => [...prev, userMsg]);
    setGeminiInput('');

    setTimeout(() => {
      let reply = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('summarize') || lower.includes('pending spend') || lower.includes('total')) {
        const pendingPOs = purchaseOrders.filter(p => p.status === 'Pending');
        const total = pendingPOs.reduce((acc, curr) => acc + curr.amountNumber, 0);
        reply = `You currently have **${pendingPOs.length} pending purchase orders** totaling **₱${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}**. There are also **${purchaseRequests.filter(p => p.status === 'Pending').length} requisitions** pending approval.`;
      } else if (lower.includes('pr') || lower.includes('requisition')) {
        const pendingPRs = purchaseRequests.filter(p => p.status === 'Pending');
        reply = `There are **${pendingPRs.length} pending requisitions** awaiting review. Notable: **PR-2026-023** (IT Infrastructure, ₱11,500) has urgent priority and requires immediate attention.`;
      } else if (lower.includes('settings') || lower.includes('threshold') || lower.includes('approval')) {
        reply = `Under current settings, Small Value Procurement threshold is **₱${settings.rules.smallValueThreshold.toLocaleString()}**, MOOE budget balance is **₱${settings.finance.mooeBalance.toLocaleString()}**, and standard delivery SLA is **${settings.rules.defaultDeliveryPeriodDays} calendar days**.`;
      } else if (lower.includes('supplier') || lower.includes('vendor')) {
        reply = `Top pending suppliers include **TechCorp Industries** (₱14,500.00), **Vertex Global** (₱15,000.00), and **Prime Logistics** (₱12,100.00). All orders are within standard delivery windows.`;
      } else {
        reply = `Procurement database verified. You have ${purchaseOrders.length} total POs and ${purchaseRequests.length} PRs recorded. What specific requisition, order, or policy threshold would you like to review?`;
      }

      setGeminiMessages(prev => [...prev, {
        sender: 'gemini',
        text: reply,
        time: '10:25 AM'
      }]);
    }, 600);
  };

  const pendingPRCount = purchaseRequests.filter(pr => pr.status === 'Pending').length;
  const pendingPOCount = purchaseOrders.filter(po => po.status === 'Pending').length;

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 antialiased overflow-hidden select-none">
      {/* Sidebar - Viewable Always with Page titles and Groups */}
      <aside className="w-64 flex-shrink-0 flex flex-col bg-white border-r border-slate-200/80 z-20 shadow-xs">
        {/* Brand / Logo Header */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-100/90">
          <div 
            onClick={() => setActivePage('purchase-orders')}
            className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center shadow-xs cursor-pointer hover:bg-slate-900 transition-colors shrink-0"
            title="Procurement Management"
          >
            <div className="w-4 h-4 rounded-xs border-2 border-white"></div>
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-slate-900 text-sm tracking-tight truncate leading-tight">
              Procurement Hub
            </h2>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              DepEd Division Portal
            </p>
          </div>
        </div>

        {/* Sidebar Nav Items with Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Group 1: OVERVIEW */}
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Overview
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setActivePage('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activePage === 'dashboard'
                    ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <LayoutGrid size={17} className={activePage === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'} />
                <span className="flex-1 text-left">Dashboard</span>
              </button>
            </div>
          </div>

          {/* Group 2: PROCUREMENT WORKFLOW */}
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Procurement Workflow
            </div>
            <div className="space-y-1">
              {/* Purchase Requests */}
              <button
                onClick={() => setActivePage('purchase-requests')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activePage === 'purchase-requests'
                    ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <FileText size={17} className={activePage === 'purchase-requests' ? 'text-indigo-600' : 'text-slate-400'} />
                <span className="flex-1 text-left">Purchase Requests</span>
                {pendingPRCount > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    activePage === 'purchase-requests'
                      ? 'bg-indigo-200/80 text-indigo-900'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {pendingPRCount}
                  </span>
                )}
              </button>

              {/* Purchase Orders */}
              <button
                onClick={() => setActivePage('purchase-orders')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activePage === 'purchase-orders'
                    ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <FileCheck size={17} className={activePage === 'purchase-orders' ? 'text-indigo-600' : 'text-slate-400'} />
                <span className="flex-1 text-left">Purchase Orders</span>
                {pendingPOCount > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    activePage === 'purchase-orders'
                      ? 'bg-indigo-200/80 text-indigo-900'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {pendingPOCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Group 3: LOGISTICS & INVENTORY */}
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Logistics & Assets
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setActivePage('inventory')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activePage === 'inventory'
                    ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Package size={17} className={activePage === 'inventory' ? 'text-indigo-600' : 'text-slate-400'} />
                <span className="flex-1 text-left">Warehouse Inventory</span>
              </button>
            </div>
          </div>

          {/* Group 4: ADMINISTRATION */}
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              System & Governance
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setActivePage('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activePage === 'settings'
                    ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <SettingsIcon size={17} className={activePage === 'settings' ? 'text-indigo-600' : 'text-slate-400'} />
                <span className="flex-1 text-left">System Settings</span>
                <span className="text-[10px] text-slate-400 font-medium px-1.5 py-0.5 bg-slate-100 rounded-md">
                  9 Modules
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Footer: User Card & Sign Out */}
        <div className="p-3 border-t border-slate-100/90 bg-slate-50/50">
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
            <div 
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img 
                src={userAvatar} 
                alt="Officer Avatar" 
                className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200/80"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  Dr. M. Santos
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  BAC Secretariat
                </div>
              </div>
            </div>

            <button 
              title="Sign Out"
              onClick={() => setIsLogoutConfirmOpen(true)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <LogOut size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-14 flex-shrink-0 flex items-center justify-between px-7 bg-white border-b border-slate-200/70 z-10">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell size={18} strokeWidth={1.8} />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            <div 
              onClick={() => setIsProfileOpen(true)}
              className="w-8 h-8 rounded-full overflow-hidden border border-slate-200/80 shadow-xs cursor-pointer hover:ring-2 hover:ring-indigo-500/30 transition-all"
              title="User Profile & Settings"
            >
              <img 
                src={userAvatar} 
                alt="User Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Content View */}
        <main className="flex-1 overflow-y-auto px-8 py-6 relative">
          <div className="max-w-[1440px] mx-auto">
            {activePage === 'purchase-orders' && (
              <PurchaseOrderView 
                purchaseOrders={purchaseOrders}
                settings={settings}
                onNavigateToPR={(prId) => {
                  setActivePage('purchase-requests');
                }}
                onUpdateOrderStatus={handleUpdatePOStatus}
                onEditOrder={handleEditPurchaseOrder}
                onDeleteOrder={handleDeletePurchaseOrder}
                onAddOrder={handleAddPurchaseOrder}
                initialHighlightPOId={highlightedPOId}
              />
            )}

            {activePage === 'purchase-requests' && (
              <PurchaseRequestView 
                purchaseRequests={purchaseRequests}
                settings={settings}
                onAddRequest={handleAddPurchaseRequest}
                onEditRequest={handleEditPurchaseRequest}
                onDeleteRequest={handleDeletePurchaseRequest}
                onUpdateRequestStatus={handleUpdatePRStatus}
                onConvertToPO={handleConvertToPO}
                onNavigateToPO={(poId) => {
                  setHighlightedPOId(poId);
                  setActivePage('purchase-orders');
                }}
              />
            )}

            {activePage === 'settings' && (
              <SettingsView 
                settings={settings}
                onSaveSettings={(newSettings) => setSettings(newSettings)}
                onResetSettings={() => setSettings(defaultSystemSettingsData)}
              />
            )}

            {activePage === 'dashboard' && (
              <DashboardView 
                purchaseOrders={purchaseOrders}
                purchaseRequests={purchaseRequests}
                onNavigateToPOs={() => setActivePage('purchase-orders')}
                onNavigateToPRs={() => setActivePage('purchase-requests')}
              />
            )}

            {activePage === 'inventory' && (
              <InventoryView />
            )}
          </div>
        </main>

        {/* Floating "Ask Gemini" button at Bottom Center */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
          <button 
            onClick={() => setIsGeminiOpen(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#ECEFF3] hover:bg-white text-slate-800 text-xs font-semibold shadow-md border border-slate-200/80 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Ask Gemini</span>
          </button>
        </div>

        {/* Floating Tool Dock at Bottom Right */}
        <div className="fixed bottom-6 right-6 z-30 flex flex-col items-center gap-3 py-3 px-2 rounded-2xl bg-white border border-slate-200/90 shadow-lg text-slate-600">
          <button title="Drag Handle" className="text-slate-400 hover:text-slate-600 cursor-grab">
            <GripVertical size={16} />
          </button>
          <button 
            title="Procurement Intelligence"
            onClick={() => setIsGeminiOpen(true)}
            className="text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <Sparkles size={16} />
          </button>
          <button 
            title="Toggle View Mode"
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen?.();
              } else {
                document.documentElement.requestFullscreen?.();
              }
            }}
            className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Gemini AI Assistant Drawer */}
      {isGeminiOpen && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-white shadow-xs">
                <Sparkles size={15} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Procurement Assistant</h3>
                <p className="text-[10px] text-slate-500">Powered by Gemini AI</p>
              </div>
            </div>
            <button onClick={() => setIsGeminiOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {geminiMessages.map((m, i) => (
              <div 
                key={i} 
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-xs'
                      : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Suggested prompts */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/50">
            <div className="text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Suggested Inquiries</div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Summarize total pending spend',
                'Which PRs are awaiting approval?',
                'Show approval threshold limits',
                'Which supplier has the largest order?'
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskGemini(prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-slate-200/90 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors shadow-2xs cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={geminiInput}
              onChange={(e) => setGeminiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskGemini()}
              placeholder="Ask about PRs, POs, vendors, or policies..."
              className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
            <button
              onClick={() => handleAskGemini()}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIALOG: Notifications Dialog / Panel */}
      {/* ========================================================= */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Bell size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Procurement Notifications</h3>
                  <p className="text-slate-400 text-xs">
                    {notifications.filter(n => !n.read).length} unread alerts
                  </p>
                </div>
              </div>
              <button onClick={() => setIsNotificationsOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => {
                    if (n.type === 'po') {
                      setHighlightedPOId(n.refId);
                      setActivePage('purchase-orders');
                    } else {
                      setActivePage('purchase-requests');
                    }
                    setIsNotificationsOpen(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    n.read 
                      ? 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50' 
                      : 'bg-indigo-50/50 border-indigo-100 text-slate-800 hover:bg-indigo-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span>{n.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
              >
                Mark all as read
              </button>
              <button
                onClick={() => setIsNotificationsOpen(false)}
                className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIALOG: User Profile Dialog */}
      {/* ========================================================= */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <User size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Procurement Officer Profile</h3>
                  <p className="text-slate-400 text-xs">Civil Service & System Credentials</p>
                </div>
              </div>
              <button onClick={() => setIsProfileOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <img 
                src={userAvatar} 
                alt="User Profile" 
                className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500/20"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-900 text-sm">Dr. Maria Elena Santos</h4>
                <div className="text-slate-600 font-medium">Head of BAC Secretariat</div>
                <div className="text-[11px] text-slate-400">Division of City Schools — NCR</div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-slate-800 block">Quick Access to System Configs</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setActivePage('settings');
                    setIsProfileOpen(false);
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 text-left transition-all cursor-pointer"
                >
                  <div className="font-bold text-slate-800">School Profile</div>
                  <div className="text-[10px] text-slate-400">Tax ID, Division & Signatories</div>
                </button>
                <button
                  onClick={() => {
                    setActivePage('settings');
                    setIsProfileOpen(false);
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 text-left transition-all cursor-pointer"
                >
                  <div className="font-bold text-slate-800">Accredited Suppliers</div>
                  <div className="text-[10px] text-slate-400">PhilGEPS Directory & Ratings</div>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  setIsLogoutConfirmOpen(true);
                }}
                className="text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
              >
                Sign Out
              </button>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIALOG: Logout Confirmation Dialog */}
      {/* ========================================================= */}
      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <LogOut size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Sign Out of Portal?</h3>
                <p className="text-slate-500 text-xs">Confirm session termination</p>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-100">
              Are you sure you want to end your current procurement session? Unsaved form drafts will be discarded.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsLogoutConfirmOpen(false);
                  setActivePage('purchase-orders');
                }}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-2xs cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
