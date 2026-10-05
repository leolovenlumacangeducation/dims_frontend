import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Link2, 
  MoreHorizontal, 
  Eye, 
  Download, 
  Edit, 
  ClipboardCheck, 
  Ban, 
  Trash2, 
  Printer, 
  AlertCircle, 
  Check,
  FileCheck2,
  Calendar,
  DollarSign,
  Plus,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { PurchaseOrder } from '../types/procurement';

interface PurchaseOrderViewProps {
  purchaseOrders: PurchaseOrder[];
  onNavigateToPR: (prId: string) => void;
  onUpdateOrderStatus: (poId: string, status: PurchaseOrder['status'], iarRef?: string) => void;
  onEditOrder: (order: PurchaseOrder) => void;
  onDeleteOrder: (poId: string) => void;
  onAddOrder?: (order: PurchaseOrder) => void;
  initialHighlightPOId?: string | null;
}

export function PurchaseOrderView({
  purchaseOrders,
  onNavigateToPR,
  onUpdateOrderStatus,
  onEditOrder,
  onDeleteOrder,
  onAddOrder,
  initialHighlightPOId
}: PurchaseOrderViewProps) {
  const [activeTab, setActiveTab] = useState<'Pending' | 'Delivered' | 'Partially Delivered'>('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'recent' | 'oldest'>('recent');

  // Dialog states
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [inspectingPO, setInspectingPO] = useState<PurchaseOrder | null>(null);
  const [editingPO, setEditingPO] = useState<PurchaseOrder | null>(null);
  const [cancellingPO, setCancellingPO] = useState<PurchaseOrder | null>(null);
  const [deletingPOId, setDeletingPOId] = useState<string | null>(null);
  const [downloadingDoc, setDownloadingDoc] = useState<{ po: PurchaseOrder; docType: 'PO' | 'PR' | 'IAR' } | null>(null);
  const [isCreatePOOpen, setIsCreatePOOpen] = useState(false);

  // If initialHighlightPOId changes, auto-select it if found
  useEffect(() => {
    if (initialHighlightPOId) {
      const found = purchaseOrders.find(p => p.id === initialHighlightPOId);
      if (found) {
        setActiveTab(found.status === 'Cancelled' ? 'Pending' : found.status);
        setSelectedPO(found);
      }
    }
  }, [initialHighlightPOId, purchaseOrders]);

  // Filtering
  const filteredOrders = purchaseOrders.filter(po => {
    const matchesTab = po.status === activeTab;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesTab;
    const matchesSearch = 
      po.id.toLowerCase().includes(q) ||
      po.prRef.toLowerCase().includes(q) ||
      po.supplier.toLowerCase().includes(q) ||
      po.amount.toLowerCase().includes(q) ||
      (po.iarRef && po.iarRef.toLowerCase().includes(q));
    return matchesTab && matchesSearch;
  });

  // Sorting
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
  });

  const handleMarkAsDelivered = (poId: string, isPartial: boolean) => {
    const iarRef = `IAR-2026-0${Math.floor(Math.random() * 80 + 20)}`;
    onUpdateOrderStatus(poId, isPartial ? 'Partially Delivered' : 'Delivered', iarRef);
    setInspectingPO(null);
  };

  const handleConfirmCancel = (poId: string, reason: string) => {
    onUpdateOrderStatus(poId, 'Cancelled');
    setCancellingPO(null);
  };

  const handleConfirmDelete = () => {
    if (deletingPOId) {
      onDeleteOrder(deletingPOId);
      setDeletingPOId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Subtitle */}
      <p className="text-xs text-slate-500 font-normal">
        Track vendor orders, inspect fulfillment, and download official procurement documents.
      </p>

      {/* Filter and Search Bar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        {/* Filter Tabs */}
        <div className="inline-flex items-center bg-[#ECEFF3] p-1 rounded-xl">
          {(['Pending', 'Delivered', 'Partially Delivered'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2">
          <div className="relative w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search POs, PRs, IARs or suppliers..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <button
            onClick={() => setSortOrder(prev => prev === 'recent' ? 'oldest' : 'recent')}
            title={`Sort: ${sortOrder === 'recent' ? 'Newest first' : 'Oldest first'}`}
            className="p-1.5 bg-white border border-slate-200/90 rounded-xl text-indigo-600 hover:bg-slate-50 transition-colors shadow-2xs flex items-center justify-center cursor-pointer"
          >
            <ArrowUpDown size={15} />
          </button>

          {onAddOrder && (
            <button
              onClick={() => setIsCreatePOOpen(true)}
              title="Issue New Purchase Order"
              className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-2xs flex items-center justify-center cursor-pointer"
            >
              <Plus size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Table Container Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">PO Number</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">PR Reference</th>
                {activeTab !== 'Pending' && (
                  <th className="px-6 py-3.5 text-xs font-medium text-slate-500">IAR Reference</th>
                )}
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Date</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Supplier</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Items</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Amount</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Status</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {sortedOrders.length > 0 ? (
                sortedOrders.map((po) => (
                  <tr key={po.id} className="hover:bg-slate-50/60 transition-colors group">
                    {/* PO Number */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderCodeLink 
                        type="po" 
                        code={po.id} 
                        po={po} 
                        onClick={() => setSelectedPO(po)} 
                      />
                    </td>

                    {/* PR Reference */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderCodeLink 
                        type="pr" 
                        code={po.prRef} 
                        po={po} 
                        onClick={() => onNavigateToPR(po.prRef)} 
                      />
                    </td>

                    {/* IAR Reference if active tab is not Pending */}
                    {activeTab !== 'Pending' && (
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-emerald-600">
                        {po.iarRef ? (
                          <span 
                            onClick={() => setDownloadingDoc({ po, docType: 'IAR' })}
                            className="inline-flex items-center gap-1.5 hover:text-emerald-700 cursor-pointer"
                          >
                            <Link2 size={12} className="text-emerald-500" />
                            <span>{po.iarRef}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 italic font-normal">Pending IAR</span>
                        )}
                      </td>
                    )}

                    {/* Date */}
                    <td className="px-6 py-4 text-slate-700 whitespace-nowrap">
                      {po.date}
                    </td>

                    {/* Supplier */}
                    <td className="px-6 py-4 text-slate-800 font-normal whitespace-nowrap">
                      {po.supplier}
                    </td>

                    {/* Items */}
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      {po.itemsCount} items
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap tabular-nums">
                      {po.amount}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusPill status={po.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <TableRowMenu 
                        po={po} 
                        onView={() => setSelectedPO(po)}
                        onInspect={() => setInspectingPO(po)}
                        onEdit={() => setEditingPO(po)}
                        onCancel={() => setCancellingPO(po)}
                        onDelete={() => setDeletingPOId(po.id)}
                        onDownload={(docType) => setDownloadingDoc({ po, docType })}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={activeTab === 'Pending' ? 8 : 9} className="px-6 py-12 text-center text-slate-400 text-xs">
                    No {activeTab.toLowerCase()} purchase orders found matching '{searchQuery}'.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-white text-xs text-slate-500">
          <span>
            Showing 1 to {sortedOrders.length} of {sortedOrders.length} entries
          </span>

          <div className="flex items-center gap-2">
            <button 
              disabled 
              className="p-1 rounded-md border border-slate-200 bg-white text-slate-300 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="font-normal text-slate-700 px-1">
              Page 1 of 1
            </span>
            <button 
              disabled 
              className="p-1 rounded-md border border-slate-200 bg-white text-slate-300 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 1. PO View Document Modal */}
      {selectedPO && (
        <PurchaseOrderModal 
          po={selectedPO} 
          onClose={() => setSelectedPO(null)} 
          onInspect={() => {
            const current = selectedPO;
            setSelectedPO(null);
            setInspectingPO(current);
          }}
          onDownload={() => {
            const current = selectedPO;
            setSelectedPO(null);
            setDownloadingDoc({ po: current, docType: 'PO' });
          }}
        />
      )}

      {/* 2. Inspection Modal (IAR Workflow) */}
      {inspectingPO && (
        <InspectionModal 
          po={inspectingPO} 
          onClose={() => setInspectingPO(null)} 
          onComplete={handleMarkAsDelivered}
        />
      )}

      {/* 3. Edit Order Modal */}
      {editingPO && (
        <EditOrderModal
          po={editingPO}
          onClose={() => setEditingPO(null)}
          onSave={(updated) => {
            onEditOrder(updated);
            setEditingPO(null);
          }}
        />
      )}

      {/* 4. Cancel Order Confirmation Dialog */}
      {cancellingPO && (
        <CancelOrderDialog
          po={cancellingPO}
          onClose={() => setCancellingPO(null)}
          onConfirm={handleConfirmCancel}
        />
      )}

      {/* 5. Delete Order Confirmation Dialog */}
      {deletingPOId && (
        <DeleteOrderDialog
          poId={deletingPOId}
          onClose={() => setDeletingPOId(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* 6. Download / Export Document Dialog */}
      {downloadingDoc && (
        <DownloadDocumentDialog
          po={downloadingDoc.po}
          docType={downloadingDoc.docType}
          onClose={() => setDownloadingDoc(null)}
        />
      )}

      {/* 7. Create New Purchase Order Modal */}
      {isCreatePOOpen && onAddOrder && (
        <CreatePurchaseOrderModal
          onClose={() => setIsCreatePOOpen(false)}
          onSubmit={(newPO) => {
            onAddOrder(newPO);
            setIsCreatePOOpen(false);
            setSelectedPO(newPO);
          }}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Subcomponents & Dialogs
// -------------------------------------------------------------

function StatusPill({ status }: { status: PurchaseOrder['status'] }) {
  if (status === 'Pending') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#FEF3C7] text-[#B45309]">
        Pending
      </span>
    );
  }
  if (status === 'Delivered') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700">
        Delivered
      </span>
    );
  }
  if (status === 'Cancelled') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700">
        Cancelled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-sky-50 text-sky-700">
      Partially Delivered
    </span>
  );
}

function OrderCodeLink({ 
  type, 
  code, 
  po, 
  onClick 
}: { 
  type: 'po' | 'pr'; 
  code: string; 
  po: PurchaseOrder; 
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top - 8,
        left: rect.left + rect.width / 2
      });
    }
    setIsHovered(true);
  };

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        className={`inline-flex items-center gap-1 font-medium transition-colors group cursor-pointer ${
          type === 'po' 
            ? 'text-slate-900 hover:text-indigo-600' 
            : 'text-indigo-600 hover:text-indigo-800'
        }`}
      >
        <Link2 
          size={12} 
          className={
            type === 'po' 
              ? 'text-slate-400 group-hover:text-indigo-600 transition-colors' 
              : 'text-indigo-400 group-hover:text-indigo-600 transition-colors'
          } 
        />
        <span>{code}</span>
      </button>

      {/* Floating Tooltip Card */}
      {isHovered && (
        <div 
          className="fixed z-50 w-72 bg-white rounded-xl shadow-xl shadow-slate-900/10 border border-slate-200 p-4 text-left pointer-events-none -translate-x-1/2 -translate-y-full animate-in fade-in zoom-in-95 duration-100"
          style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {type === 'po' ? 'Purchase Order' : 'Purchase Request'}
            </span>
            <StatusPill status={po.status} />
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Supplier:</span>
              <span className="font-semibold text-slate-800 text-right truncate max-w-[150px]">{po.supplier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Department:</span>
              <span className="text-slate-700">{po.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Requested By:</span>
              <span className="text-slate-700">{po.requester}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Items:</span>
              <span className="text-slate-700">{po.itemsCount} items</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-100">
              <span className="text-slate-500 font-medium">Order Total:</span>
              <span className="font-bold text-slate-900">{po.amount}</span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>Date: {po.date}</span>
            <span className="text-indigo-600 font-semibold">Click to view document →</span>
          </div>
        </div>
      )}
    </div>
  );
}

function TableRowMenu({ 
  po, 
  onView, 
  onInspect,
  onEdit,
  onCancel,
  onDelete,
  onDownload
}: { 
  po: PurchaseOrder; 
  onView: () => void; 
  onInspect: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onDownload: (docType: 'PO' | 'PR' | 'IAR') => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });

  const toggleOpen = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right
      });
    }
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleDismiss = () => setIsOpen(false);
    window.addEventListener('click', handleDismiss);
    window.addEventListener('scroll', handleDismiss, true);
    return () => {
      window.removeEventListener('click', handleDismiss);
      window.removeEventListener('scroll', handleDismiss, true);
    };
  }, [isOpen]);

  const isPending = po.status === 'Pending';

  return (
    <div className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
      <button
        ref={buttonRef}
        onClick={toggleOpen}
        className={`p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer ${
          isOpen ? 'bg-slate-100 text-slate-900' : ''
        }`}
      >
        <MoreHorizontal size={15} />
      </button>

      {isOpen && (
        <div 
          className="fixed w-48 bg-white rounded-xl shadow-xl border border-slate-200/90 z-50 py-1 text-left animate-in fade-in zoom-in-95 duration-100 text-xs"
          style={{ top: `${position.top}px`, right: `${position.right}px` }}
        >
          <button
            onClick={() => { setIsOpen(false); onView(); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Eye size={14} className="text-slate-400" />
            <span>View Details</span>
          </button>

          {isPending ? (
            <>
              <button
                onClick={() => { setIsOpen(false); onInspect(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <ClipboardCheck size={14} className="text-emerald-500" />
                <span>Inspect PO Delivery</span>
              </button>
              <button
                onClick={() => { setIsOpen(false); onEdit(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <Edit size={14} className="text-sky-500" />
                <span>Edit Order</span>
              </button>
              <div className="my-1 border-t border-slate-100"></div>
              <button
                onClick={() => { setIsOpen(false); onCancel(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
              >
                <Ban size={14} className="text-amber-500" />
                <span>Cancel Order</span>
              </button>
              <button
                onClick={() => { setIsOpen(false); onDelete(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <Trash2 size={14} className="text-rose-500" />
                <span>Delete Order</span>
              </button>
            </>
          ) : (
            <>
              <div className="my-1 border-t border-slate-100"></div>
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Download Official Forms
              </div>
              <button
                onClick={() => { setIsOpen(false); onDownload('PR'); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <Download size={14} className="text-indigo-500" />
                <span>Download PR</span>
              </button>
              <button
                onClick={() => { setIsOpen(false); onDownload('PO'); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <Download size={14} className="text-indigo-500" />
                <span>Download PO</span>
              </button>
              <button
                onClick={() => { setIsOpen(false); onDownload('IAR'); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <Download size={14} className="text-indigo-500" />
                <span>Download IAR</span>
              </button>
              <div className="my-1 border-t border-slate-100"></div>
              <button
                onClick={() => { setIsOpen(false); onDelete(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <Trash2 size={14} className="text-rose-500" />
                <span>Delete Record</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Dialog: Edit Order Modal
// -------------------------------------------------------------

function EditOrderModal({
  po,
  onClose,
  onSave
}: {
  po: PurchaseOrder;
  onClose: () => void;
  onSave: (updatedPO: PurchaseOrder) => void;
}) {
  const [supplier, setSupplier] = useState(po.supplier);
  const [deliveryDate, setDeliveryDate] = useState(po.deliveryDate);
  const [department, setDepartment] = useState(po.department);
  const [requester, setRequester] = useState(po.requester);
  const [items, setItems] = useState([...po.items]);

  const handleItemChange = (index: number, field: string, value: any) => {
    setItems(prev => {
      const updated = [...prev];
      const item = { ...updated[index], [field]: value };
      if (field === 'qty' || field === 'unitPrice') {
        item.total = (Number(item.qty) || 0) * (Number(item.unitPrice) || 0);
      }
      updated[index] = item;
      return updated;
    });
  };

  const addItemRow = () => {
    setItems(prev => [...prev, { name: '', qty: 1, unit: 'pcs', unitPrice: 0, total: 0 }]);
  };

  const removeItemRow = (idx: number) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter((_, i) => i !== idx));
  };

  const grandTotal = items.reduce((acc, curr) => acc + curr.total, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validItems = items.filter(it => it.name.trim().length > 0);
    if (validItems.length === 0) {
      alert('Please include at least one item description.');
      return;
    }

    const updatedPO: PurchaseOrder = {
      ...po,
      supplier,
      deliveryDate,
      department,
      requester,
      itemsCount: validItems.length,
      amount: `₱${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      amountNumber: grandTotal,
      items: validItems
    };

    onSave(updatedPO);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Edit size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Edit Purchase Order: {po.id}</h3>
              <p className="text-xs text-slate-500">Modify awarded vendor, delivery schedule, and item lines</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Awarded Supplier</label>
              <input
                type="text"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                required
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Expected Delivery Date</label>
              <input
                type="text"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                required
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Requisition Officer</label>
              <input
                type="text"
                value={requester}
                onChange={(e) => setRequester(e.target.value)}
                required
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-slate-800">Ordered Line Items</label>
              <button
                type="button"
                onClick={addItemRow}
                className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer"
              >
                <Plus size={13} />
                <span>Add Item Line</span>
              </button>
            </div>

            <div className="space-y-2">
              {items.map((it, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50/80 rounded-xl border border-slate-200/80">
                  <input
                    type="text"
                    placeholder="Item specification"
                    value={it.name}
                    onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                    className="flex-2 p-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) => handleItemChange(idx, 'qty', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 p-1.5 rounded-lg border border-slate-200 bg-white text-xs text-center focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Unit"
                    value={it.unit}
                    onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                    className="w-16 p-1.5 rounded-lg border border-slate-200 bg-white text-xs text-center focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="number"
                    min={0}
                    value={it.unitPrice || ''}
                    onChange={(e) => handleItemChange(idx, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="w-24 p-1.5 rounded-lg border border-slate-200 bg-white text-xs text-right tabular-nums focus:outline-none focus:border-indigo-500"
                  />
                  <div className="w-24 text-right font-semibold text-slate-800 tabular-nums">
                    ₱{it.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItemRow(idx)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <span className="font-semibold text-slate-700">Calculated Purchase Order Total:</span>
            <span className="font-bold text-slate-900 text-sm tabular-nums">
              ₱{grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              Save Order Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Dialog: Cancel Order Confirmation Dialog
// -------------------------------------------------------------

function CancelOrderDialog({
  po,
  onClose,
  onConfirm
}: {
  po: PurchaseOrder;
  onClose: () => void;
  onConfirm: (poId: string, reason: string) => void;
}) {
  const [reason, setReason] = useState('Vendor unable to commit to stated delivery schedule');
  const [notes, setNotes] = useState('');

  const reasons = [
    'Vendor unable to commit to stated delivery schedule',
    'Procurement budget realignment or cancellation by BAC',
    'Item specifications obsolete or superseded',
    'Duplicate Purchase Order issuance',
    'Vendor non-compliance with statutory requirements'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Ban size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Cancel Order: {po.id}</h3>
              <p className="text-slate-400 text-xs">{po.supplier} — {po.amount}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Cancellation Justification</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-xl bg-white text-slate-800"
            >
              {reasons.map((r, i) => (
                <option key={i} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Administrative Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide notice reference or official cancellation memorandum..."
              className="w-full p-2 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-amber-800 text-[11px] flex gap-2">
            <AlertTriangle size={15} className="shrink-0 text-amber-600 mt-0.5" />
            <span>Cancelling this order will release the financial commitment and flag the order as Cancelled in audit logs.</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button onClick={onClose} className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer">
            Keep Active
          </button>
          <button
            onClick={() => onConfirm(po.id, reason)}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-2xs cursor-pointer"
          >
            Confirm Order Cancellation
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Dialog: Delete Order Confirmation Dialog
// -------------------------------------------------------------

function DeleteOrderDialog({
  poId,
  onClose,
  onConfirm
}: {
  poId: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Trash2 size={18} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Delete Order Record?</h3>
            <p className="text-slate-500 text-xs">Are you sure you want to permanently delete <strong className="text-slate-800">{poId}</strong>?</p>
          </div>
        </div>

        <p className="text-slate-500 leading-relaxed text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-100">
          This operation will remove the purchase order and its inspection history from the database. This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-2xs cursor-pointer"
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Dialog: Download / Export Document Dialog
// -------------------------------------------------------------

function DownloadDocumentDialog({
  po,
  docType,
  onClose
}: {
  po: PurchaseOrder;
  docType: 'PO' | 'PR' | 'IAR';
  onClose: () => void;
}) {
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf');
  const [includeSignatures, setIncludeSignatures] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const getDocTitle = () => {
    switch (docType) {
      case 'PO': return `Purchase Order (${po.id})`;
      case 'PR': return `Purchase Request (${po.prRef})`;
      case 'IAR': return `Inspection and Acceptance Report (${po.iarRef || 'IAR'})`;
    }
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Download size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Download Official Form</h3>
              <p className="text-slate-400 text-xs">{getDocTitle()}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={16} />
          </button>
        </div>

        {downloadSuccess ? (
          <div className="py-6 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>
            <div className="font-bold text-slate-900 text-sm">Export Completed!</div>
            <div className="text-slate-500 text-xs">Your official {docType} document is ready.</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1.5">File Format</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat('pdf')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    format === 'pdf'
                      ? 'border-indigo-500 bg-indigo-50/40 ring-1 ring-indigo-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-slate-800">PDF Document</div>
                  <div className="text-[11px] text-slate-500">Official printable DepEd BAC form</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('excel')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    format === 'excel'
                      ? 'border-indigo-500 bg-indigo-50/40 ring-1 ring-indigo-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-slate-800">Excel / Spreadsheet</div>
                  <div className="text-[11px] text-slate-500">Editable itemized XLSX worksheet</div>
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-1 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={includeSignatures}
                  onChange={(e) => setIncludeSignatures(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span>Include digital approval signature blocks</span>
              </label>

              <div className="p-3 bg-slate-50 rounded-xl text-slate-600 text-[11px] space-y-0.5">
                <div><strong>Vendor:</strong> {po.supplier}</div>
                <div><strong>Total Amount:</strong> {po.amount} ({po.itemsCount} items)</div>
                <div><strong>Delivery Date:</strong> {po.deliveryDate}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={onClose} className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer">
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={14} />
                <span>Export {docType} ({format.toUpperCase()})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Existing Modals: PurchaseOrderModal & InspectionModal
// -------------------------------------------------------------

function PurchaseOrderModal({ 
  po, 
  onClose, 
  onInspect,
  onDownload
}: { 
  po: PurchaseOrder; 
  onClose: () => void; 
  onInspect: () => void;
  onDownload: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
              PO
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">{po.id}</h3>
                <StatusPill status={po.status} />
              </div>
              <p className="text-xs text-slate-500">Official Purchase Order Document</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={onDownload}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Download Document"
            >
              <Download size={16} />
            </button>
            <button 
              onClick={() => window.print()}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Print Document"
            >
              <Printer size={16} />
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Document Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Top metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="text-slate-400 text-[11px]">Supplier</div>
              <div className="font-semibold text-slate-800 mt-0.5">{po.supplier}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">PR Reference</div>
              <div className="font-semibold text-indigo-600 mt-0.5">{po.prRef}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Date Issued</div>
              <div className="font-semibold text-slate-800 mt-0.5">{po.date}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Expected Delivery</div>
              <div className="font-semibold text-slate-800 mt-0.5">{po.deliveryDate}</div>
            </div>
          </div>

          {/* Department & Requisition info */}
          <div className="grid grid-cols-2 gap-4 px-1">
            <div>
              <span className="text-slate-400">Department / Office: </span>
              <span className="font-medium text-slate-800">{po.department}</span>
            </div>
            <div>
              <span className="text-slate-400">Requisition Officer: </span>
              <span className="font-medium text-slate-800">{po.requester}</span>
            </div>
          </div>

          {/* Line Items Table */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2.5">Ordered Line Items</h4>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-500">
                  <tr>
                    <th className="px-4 py-2 font-medium">#</th>
                    <th className="px-4 py-2 font-medium">Item Description</th>
                    <th className="px-4 py-2 font-medium text-center">Qty</th>
                    <th className="px-4 py-2 font-medium text-center">Unit</th>
                    <th className="px-4 py-2 font-medium text-right">Unit Cost</th>
                    <th className="px-4 py-2 font-medium text-right">Total Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {po.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-800">{item.name}</td>
                      <td className="px-4 py-2.5 text-center text-slate-600">{item.qty}</td>
                      <td className="px-4 py-2.5 text-center text-slate-600">{item.unit}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-slate-600">
                        ₱{item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-slate-900">
                        ₱{item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50/70 border-t border-slate-200 font-semibold text-slate-900">
                  <tr>
                    <td colSpan={5} className="px-4 py-2.5 text-right">Grand Total:</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-sm text-indigo-700">{po.amount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment Terms & Instructions */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-slate-600 text-[11px]">
            <p className="font-semibold text-slate-800">Procurement Notes & Delivery Terms:</p>
            <p>1. Deliver within fifteen (15) working days from receipt of this Purchase Order.</p>
            <p>2. Subject to standard Inspection and Acceptance Report (IAR) upon arrival at designated warehouse.</p>
            <p>3. Liquidated damages equivalent to 1/10th of 1% of unperformed portion per day of delay shall be applied.</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-100 bg-white">
          <span className="text-slate-400 text-xs">Generated by Procurement Division</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>
            {po.status === 'Pending' && (
              <button
                onClick={onInspect}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ClipboardCheck size={14} />
                <span>Inspect Fulfillment</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InspectionModal({ 
  po, 
  onClose, 
  onComplete 
}: { 
  po: PurchaseOrder; 
  onClose: () => void; 
  onComplete: (poId: string, isPartial: boolean) => void;
}) {
  const [inspectionState, setInspectionState] = useState<'full' | 'partial'>('full');
  const [inspectorNotes, setInspectorNotes] = useState('All items inspected and found in good physical condition according to procurement specifications.');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ClipboardCheck size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Inspect Delivery & Generate IAR</h3>
              <p className="text-xs text-slate-500">For {po.id} — {po.supplier}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-800 block mb-1.5">Fulfillment Result</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setInspectionState('full')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  inspectionState === 'full'
                    ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-800">Complete Delivery</div>
                <div className="text-[11px] text-slate-500 mt-0.5">All {po.itemsCount} line items verified & accepted</div>
              </button>

              <button
                type="button"
                onClick={() => setInspectionState('partial')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  inspectionState === 'partial'
                    ? 'border-sky-500 bg-sky-50/40 ring-1 ring-sky-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-800">Partial Delivery</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Some items pending backorder / delivery</div>
              </button>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-800 block mb-1.5">Inspection Remarks</label>
            <textarea
              rows={3}
              value={inspectorNotes}
              onChange={(e) => setInspectorNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
            />
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-amber-800 text-[11px] flex gap-2">
            <AlertCircle size={16} className="shrink-0 text-amber-600 mt-0.5" />
            <span>
              Submitting will automatically issue an official **Inspection & Acceptance Report (IAR)** number and update the Purchase Order state.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-white text-xs font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onComplete(po.id, inspectionState === 'partial')}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Check size={14} />
            <span>Confirm Inspection</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Dialog: Create Purchase Order Modal
// -------------------------------------------------------------

function CreatePurchaseOrderModal({
  onClose,
  onSubmit
}: {
  onClose: () => void;
  onSubmit: (po: PurchaseOrder) => void;
}) {
  const [prRef, setPrRef] = useState(`PR-2026-${Math.floor(Math.random() * 80 + 10)}`);
  const [supplier, setSupplier] = useState('TechCorp Industries');
  const [deliveryDate, setDeliveryDate] = useState('Oct 28, 2026');
  const [department, setDepartment] = useState('IT Infrastructure');
  const [requester, setRequester] = useState('John Doe');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [items, setItems] = useState<Array<{ name: string; qty: number; unit: string; unitPrice: number; total: number }>>([
    { name: '', qty: 1, unit: 'pcs', unitPrice: 0, total: 0 }
  ]);

  const suppliers = [
    'TechCorp Industries',
    'Initech Solutions',
    'Prime Logistics',
    'Delta Tech',
    'Vertex Global',
    'Pioneer Hardware',
    'Pacific Traders',
    'Alliance Supplies',
    'NextGen Systems',
    'Office Supplies Inc'
  ];

  const handleItemChange = (index: number, field: string, value: any) => {
    setItems(prev => {
      const updated = [...prev];
      const item = { ...updated[index], [field]: value };
      if (field === 'qty' || field === 'unitPrice') {
        item.total = (Number(item.qty) || 0) * (Number(item.unitPrice) || 0);
      }
      updated[index] = item;
      return updated;
    });
  };

  const addItemRow = () => {
    setItems(prev => [...prev, { name: '', qty: 1, unit: 'pcs', unitPrice: 0, total: 0 }]);
  };

  const removeItemRow = (index: number) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const grandTotal = items.reduce((acc, curr) => acc + curr.total, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validItems = items.filter(it => it.name.trim().length > 0);
    if (validItems.length === 0) {
      setErrorMessage('Please include at least one valid line item with description.');
      return;
    }

    const randomSuffix = Math.floor(Math.random() * 800 + 100);
    const newPO: PurchaseOrder = {
      id: `PO-2026-${randomSuffix}`,
      prRef,
      iarRef: null,
      date: 'Oct 05, 2026',
      supplier,
      itemsCount: validItems.length,
      amount: `₱${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      amountNumber: grandTotal,
      status: 'Pending',
      deliveryDate,
      department,
      requester,
      items: validItems
    };

    onSubmit(newPO);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Plus size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Issue New Purchase Order</h3>
              <p className="text-xs text-slate-500">Allocate accredited supplier and generate official PO record</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Awarded Supplier / Vendor</label>
              <select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                {suppliers.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">PR Reference Code</label>
              <input
                type="text"
                value={prRef}
                onChange={(e) => setPrRef(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Fulfillment Delivery Date</label>
              <input
                type="text"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                placeholder="e.g. Oct 28, 2026"
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Requisition Officer</label>
              <input
                type="text"
                value={requester}
                onChange={(e) => setRequester(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-slate-800">Contract Line Items</label>
              <button
                type="button"
                onClick={addItemRow}
                className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer"
              >
                <Plus size={13} />
                <span>Add Item Row</span>
              </button>
            </div>

            <div className="space-y-2">
              {items.map((it, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50/80 rounded-xl border border-slate-200/80">
                  <input
                    type="text"
                    placeholder="Item description / specification"
                    value={it.name}
                    onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                    className="flex-2 p-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) => handleItemChange(idx, 'qty', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 p-1.5 rounded-lg border border-slate-200 bg-white text-xs text-center focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Unit"
                    value={it.unit}
                    onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                    className="w-16 p-1.5 rounded-lg border border-slate-200 bg-white text-xs text-center focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="number"
                    min={0}
                    placeholder="Unit Price"
                    value={it.unitPrice || ''}
                    onChange={(e) => handleItemChange(idx, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="w-24 p-1.5 rounded-lg border border-slate-200 bg-white text-xs text-right tabular-nums focus:outline-none focus:border-indigo-500"
                  />
                  <div className="w-24 text-right font-semibold text-slate-800 tabular-nums">
                    ₱{it.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItemRow(idx)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <span className="font-semibold text-slate-700">Calculated Purchase Order Commitment:</span>
            <span className="font-bold text-slate-900 text-sm tabular-nums text-indigo-700">
              ₱{grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              Issue Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
