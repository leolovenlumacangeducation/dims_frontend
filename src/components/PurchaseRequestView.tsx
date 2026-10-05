import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Link2, 
  MoreHorizontal, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2, 
  ArrowRightCircle, 
  XCircle, 
  Printer, 
  FileCheck2,
  Calendar,
  Building,
  Download,
  CheckCircle2
} from 'lucide-react';
import { PurchaseRequest } from '../types/procurement';

interface PurchaseRequestViewProps {
  purchaseRequests: PurchaseRequest[];
  onAddRequest: (pr: PurchaseRequest) => void;
  onEditRequest: (pr: PurchaseRequest) => void;
  onDeleteRequest: (prId: string) => void;
  onUpdateRequestStatus: (prId: string, status: PurchaseRequest['status']) => void;
  onConvertToPO: (pr: PurchaseRequest, supplier: string, deliveryDate: string) => void;
  onNavigateToPO: (poId: string) => void;
}

export function PurchaseRequestView({
  purchaseRequests,
  onAddRequest,
  onEditRequest,
  onDeleteRequest,
  onUpdateRequestStatus,
  onConvertToPO,
  onNavigateToPO
}: PurchaseRequestViewProps) {
  // Only Pending, Approved, Rejected tabs
  const [activeTab, setActiveTab] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'recent' | 'oldest'>('recent');
  const [selectedPR, setSelectedPR] = useState<PurchaseRequest | null>(null);
  const [editingPR, setEditingPR] = useState<PurchaseRequest | null>(null);
  const [convertingPR, setConvertingPR] = useState<PurchaseRequest | null>(null);
  const [deletingPRId, setDeletingPRId] = useState<string | null>(null);
  const [rejectingPR, setRejectingPR] = useState<PurchaseRequest | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [downloadingPR, setDownloadingPR] = useState<PurchaseRequest | null>(null);

  // Filter only for Pending, Approved, Rejected
  const filteredRequests = purchaseRequests.filter(pr => {
    const matchesTab = pr.status === activeTab;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesTab;

    const matchesSearch = 
      pr.id.toLowerCase().includes(q) ||
      pr.department.toLowerCase().includes(q) ||
      pr.requester.toLowerCase().includes(q) ||
      pr.purpose.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  // Sort
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
  });

  const handleConfirmDelete = () => {
    if (deletingPRId) {
      onDeleteRequest(deletingPRId);
      setDeletingPRId(null);
    }
  };

  const handleConfirmReject = (prId: string, reason: string) => {
    onUpdateRequestStatus(prId, 'Rejected');
    setRejectingPR(null);
  };

  return (
    <div className="space-y-4">
      {/* Subtitle */}
      <div>
        <p className="text-xs text-slate-500 font-normal">
          Track departmental purchase requests, inspect justification details, and convert approved requisitions to Purchase Orders.
        </p>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        {/* Filter Tabs: ONLY Pending, Approved, Rejected */}
        <div className="inline-flex items-center bg-[#ECEFF3] p-1 rounded-xl">
          {(['Pending', 'Approved', 'Rejected'] as const).map(tab => (
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

        {/* Search, Sort, and + Icon-only button */}
        <div className="flex items-center gap-2">
          <div className="relative w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PRs, departments, requesters..."
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

          {/* + New Purchase Request button is JUST AN ICON, NO LABEL */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            title="New Purchase Request"
            aria-label="New Purchase Request"
            className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-2xs transition-colors flex items-center justify-center cursor-pointer shrink-0"
          >
            <Plus size={15} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Main PR Table (Approval Status and PO Reference columns removed) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">PR Number</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Date Requested</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Department</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Requested By</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Purpose</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Est. Amount</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {sortedRequests.length > 0 ? (
                sortedRequests.map((pr) => (
                  <tr 
                    key={pr.id} 
                    onClick={() => setSelectedPR(pr)}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                  >
                    {/* PR Number with Hover Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PRCodeLink 
                        pr={pr} 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPR(pr);
                        }} 
                      />
                    </td>

                    {/* Date Requested */}
                    <td className="px-6 py-4 text-slate-700 whitespace-nowrap">
                      {pr.date}
                    </td>

                    {/* Department */}
                    <td className="px-6 py-4 text-slate-800 whitespace-nowrap font-medium">
                      {pr.department}
                    </td>

                    {/* Requested By */}
                    <td className="px-6 py-4 text-slate-700 whitespace-nowrap">
                      {pr.requester}
                    </td>

                    {/* Purpose */}
                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={pr.purpose}>
                      {pr.purpose}
                    </td>

                    {/* Est. Amount */}
                    <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap tabular-nums">
                      ₱{pr.estimatedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Actions: View, Edit, Delete, Issue PO, Reject PR in Pending; ONLY Download in Approved & Rejected */}
                    <td className="px-6 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      {activeTab === 'Pending' ? (
                        <PRActionsMenu
                          pr={pr}
                          onView={() => setSelectedPR(pr)}
                          onEdit={() => setEditingPR(pr)}
                          onDelete={() => setDeletingPRId(pr.id)}
                          onIssuePO={() => setConvertingPR(pr)}
                          onRejectPR={() => setRejectingPR(pr)}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDownloadingPR(pr);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/80 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                          title={`Download ${pr.id}`}
                        >
                          <Download size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-xs">
                    No {activeTab.toLowerCase()} purchase requests found matching '{searchQuery}'.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-white text-xs text-slate-500">
          <span>
            Showing 1 to {sortedRequests.length} of {sortedRequests.length} entries
          </span>

          <div className="flex items-center gap-2">
            <button disabled className="p-1 rounded-md border border-slate-200 bg-white text-slate-300 disabled:cursor-not-allowed">
              <ChevronLeft size={14} />
            </button>
            <span className="font-normal text-slate-700 px-1">
              Page 1 of 1
            </span>
            <button disabled className="p-1 rounded-md border border-slate-200 bg-white text-slate-300 disabled:cursor-not-allowed">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* View PR Details Modal */}
      {selectedPR && (
        <PurchaseRequestDetailsModal 
          pr={selectedPR}
          onClose={() => setSelectedPR(null)}
          onIssuePO={() => {
            const current = selectedPR;
            setSelectedPR(null);
            setConvertingPR(current);
          }}
        />
      )}

      {/* Edit PR Modal */}
      {editingPR && (
        <EditPurchaseRequestModal
          pr={editingPR}
          onClose={() => setEditingPR(null)}
          onSave={(updated) => {
            onEditRequest(updated);
            setEditingPR(null);
          }}
        />
      )}

      {/* Issue PO Modal */}
      {convertingPR && (
        <ConvertToPOModal 
          pr={convertingPR}
          onClose={() => setConvertingPR(null)}
          onConfirm={(supplier, deliveryDate) => {
            onConvertToPO(convertingPR, supplier, deliveryDate);
            setConvertingPR(null);
          }}
        />
      )}

      {/* Create New PR Modal */}
      {isCreateModalOpen && (
        <CreatePurchaseRequestModal 
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={(newPR) => {
            onAddRequest(newPR);
            setIsCreateModalOpen(false);
          }}
        />
      )}

      {/* Delete PR Confirmation Dialog */}
      {deletingPRId && (
        <DeletePRDialog
          prId={deletingPRId}
          onClose={() => setDeletingPRId(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Reject PR Dialog */}
      {rejectingPR && (
        <RejectPRDialog
          pr={rejectingPR}
          onClose={() => setRejectingPR(null)}
          onConfirm={handleConfirmReject}
        />
      )}

      {/* Download PR Dialog */}
      {downloadingPR && (
        <DownloadPRDialog
          pr={downloadingPR}
          onClose={() => setDownloadingPR(null)}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// PRCodeLink with Hover Tooltip Information Card
// -------------------------------------------------------------

function PRCodeLink({ 
  pr, 
  onClick 
}: { 
  pr: PurchaseRequest; 
  onClick: (e: React.MouseEvent) => void;
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
    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      <button
        ref={triggerRef}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-800 transition-colors group cursor-pointer"
      >
        <Link2 size={12} className="text-indigo-400 group-hover:text-indigo-600 transition-colors" />
        <span>{pr.id}</span>
      </button>

      {/* Floating Tooltip Card */}
      {isHovered && (
        <div 
          className="fixed z-50 w-72 bg-white rounded-xl shadow-xl shadow-slate-900/10 border border-slate-200 p-4 text-left pointer-events-none -translate-x-1/2 -translate-y-full animate-in fade-in zoom-in-95 duration-100"
          style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Purchase Request
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${
              pr.status === 'Approved'
                ? 'bg-emerald-50 text-emerald-700'
                : pr.status === 'Rejected'
                ? 'bg-rose-50 text-rose-700'
                : 'bg-amber-50 text-amber-700'
            }`}>
              {pr.status}
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Department:</span>
              <span className="font-semibold text-slate-800 text-right truncate max-w-[150px]">{pr.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Requested By:</span>
              <span className="text-slate-700">{pr.requester}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Items:</span>
              <span className="text-slate-700">{pr.items.length} items</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Purpose:</span>
              <span className="text-slate-600 truncate max-w-[150px]" title={pr.purpose}>{pr.purpose}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-100">
              <span className="text-slate-500 font-medium">Est. Budget:</span>
              <span className="font-bold text-slate-900 tabular-nums">
                ₱{pr.estimatedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>Date: {pr.date}</span>
            <span className="text-indigo-600 font-semibold">Click row to view details →</span>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Dialog: Download / Export Purchase Request Dialog
// -------------------------------------------------------------

function DownloadPRDialog({
  pr,
  onClose
}: {
  pr: PurchaseRequest;
  onClose: () => void;
}) {
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf');
  const [includeSignatures, setIncludeSignatures] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

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
              <p className="text-slate-400 text-xs">Purchase Request ({pr.id})</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {downloadSuccess ? (
          <div className="py-6 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>
            <div className="font-bold text-slate-900 text-sm">Export Completed!</div>
            <div className="text-slate-500 text-xs">Official requisition form {pr.id} downloaded successfully.</div>
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
                  <div className="text-[11px] text-slate-500">Official printable DepEd PR slip</div>
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
                  <div className="text-[11px] text-slate-500">Itemized quotation worksheet</div>
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
                <span>Include digital requisition & BAC approval signatures</span>
              </label>

              <div className="p-3 bg-slate-50 rounded-xl text-slate-600 text-[11px] space-y-0.5">
                <div><strong>Department:</strong> {pr.department}</div>
                <div><strong>Requester:</strong> {pr.requester}</div>
                <div><strong>Estimated Total:</strong> ₱{pr.estimatedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({pr.items.length} items)</div>
                <div><strong>Status:</strong> {pr.status}</div>
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
                <span>Export {pr.id} ({format.toUpperCase()})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Dialog: Delete PR Confirmation Dialog
// -------------------------------------------------------------

function DeletePRDialog({
  prId,
  onClose,
  onConfirm
}: {
  prId: string;
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
            <h3 className="font-bold text-slate-900 text-sm">Delete Purchase Request?</h3>
            <p className="text-slate-500 text-xs">Permanently remove <strong className="text-slate-800">{prId}</strong> from requisitions?</p>
          </div>
        </div>

        <p className="text-slate-500 leading-relaxed text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-100">
          This operation will remove the requisition and its line items. Ensure there are no active procurement bids linked to this request.
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
// Dialog: Reject PR Dialog
// -------------------------------------------------------------

function RejectPRDialog({
  pr,
  onClose,
  onConfirm
}: {
  pr: PurchaseRequest;
  onClose: () => void;
  onConfirm: (prId: string, reason: string) => void;
}) {
  const [reason, setReason] = useState('Exceeds current departmental quarterly MOOE budget ceiling');
  const [remarks, setRemarks] = useState('');

  const standardReasons = [
    'Exceeds current departmental quarterly MOOE budget ceiling',
    'Item requested is non-priority buffer stock',
    'Incomplete technical specifications or lack of brand neutrality',
    'Items already available in central campus stockroom',
    'Requires revised price quotation based on DBM-PS index'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Reject Requisition: {pr.id}</h3>
              <p className="text-slate-400 text-xs">{pr.department} — ₱{pr.estimatedAmount.toLocaleString()}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Official Grounds for Rejection</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-xl bg-white text-slate-800"
            >
              {standardReasons.map((r, i) => (
                <option key={i} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Feedback to Requisitioner</label>
            <textarea
              rows={2}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="State recommendations or instructions for re-submission..."
              className="w-full p-2 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="p-3 bg-rose-50 border border-rose-200/60 rounded-xl text-rose-800 text-[11px]">
            The requisition will be moved to the <strong>Rejected</strong> tab with the stated remarks for audit compliance.
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button onClick={onClose} className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(pr.id, reason)}
            className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-2xs cursor-pointer"
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// PRActionsMenu with View, Edit, Delete, Issue PO, Reject PR
// -------------------------------------------------------------

function PRActionsMenu({
  pr,
  onView,
  onEdit,
  onDelete,
  onIssuePO,
  onRejectPR
}: {
  pr: PurchaseRequest;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onIssuePO: () => void;
  onRejectPR: () => void;
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
          className="fixed w-44 bg-white rounded-xl shadow-xl border border-slate-200/90 z-50 py-1 text-left animate-in fade-in zoom-in-95 duration-100 text-xs"
          style={{ top: `${position.top}px`, right: `${position.right}px` }}
        >
          {/* 1. View */}
          <button
            onClick={() => { setIsOpen(false); onView(); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Eye size={14} className="text-slate-400" />
            <span>View</span>
          </button>

          {/* 2. Edit */}
          <button
            onClick={() => { setIsOpen(false); onEdit(); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Edit3 size={14} className="text-sky-500" />
            <span>Edit</span>
          </button>

          {/* 3. Issue PO */}
          <button
            onClick={() => { setIsOpen(false); onIssuePO(); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
          >
            <ArrowRightCircle size={14} className="text-emerald-500" />
            <span>Issue PO</span>
          </button>

          {/* 4. Reject PR */}
          {pr.status !== 'Rejected' && (
            <button
              onClick={() => { setIsOpen(false); onRejectPR(); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
            >
              <XCircle size={14} className="text-amber-500" />
              <span>Reject PR</span>
            </button>
          )}

          <div className="my-1 border-t border-slate-100"></div>

          {/* 5. Delete */}
          <button
            onClick={() => { setIsOpen(false); onDelete(); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Trash2 size={14} className="text-rose-500" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// PurchaseRequestDetailsModal
// -------------------------------------------------------------

function PurchaseRequestDetailsModal({ 
  pr, 
  onClose,
  onIssuePO
}: { 
  pr: PurchaseRequest; 
  onClose: () => void;
  onIssuePO: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
              PR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">{pr.id}</h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                  pr.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                  pr.status === 'Rejected' ? 'bg-rose-50 text-rose-700' :
                  'bg-amber-50 text-amber-700'
                }`}>
                  {pr.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">Purchase Requisition Summary Document</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Print Requisition"
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="text-slate-400 text-[11px]">Requesting Dept</div>
              <div className="font-semibold text-slate-800 mt-0.5">{pr.department}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Requisitioner</div>
              <div className="font-semibold text-slate-800 mt-0.5">{pr.requester}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Date Submitted</div>
              <div className="font-semibold text-slate-800 mt-0.5">{pr.date}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Urgency Priority</div>
              <div className={`font-semibold mt-0.5 ${pr.urgency === 'Urgent' ? 'text-rose-600' : 'text-slate-800'}`}>
                {pr.urgency}
              </div>
            </div>
          </div>

          <div>
            <div className="text-slate-400 text-[11px] mb-1">Purpose / Operational Justification</div>
            <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl text-slate-700 leading-relaxed">
              {pr.purpose}
            </div>
          </div>

          {/* Line items */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2.5">Requested Line Items</h4>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-500">
                  <tr>
                    <th className="px-4 py-2 font-medium">#</th>
                    <th className="px-4 py-2 font-medium">Item Description</th>
                    <th className="px-4 py-2 font-medium text-center">Qty</th>
                    <th className="px-4 py-2 font-medium text-center">Unit</th>
                    <th className="px-4 py-2 font-medium text-right">Est. Unit Cost</th>
                    <th className="px-4 py-2 font-medium text-right">Total Est. Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {pr.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-800">{item.name}</td>
                      <td className="px-4 py-2.5 text-center text-slate-600">{item.qty}</td>
                      <td className="px-4 py-2.5 text-center text-slate-600">{item.unit}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-slate-600">
                        ₱{item.estUnitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-slate-900">
                        ₱{item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50/70 border-t border-slate-200 font-semibold text-slate-900">
                  <tr>
                    <td colSpan={5} className="px-4 py-2.5 text-right">Estimated Commitment:</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-sm text-indigo-700">
                      ₱{pr.estimatedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-100 bg-white">
          <span className="text-slate-400 text-xs">Procurement Requisition Sheet</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>
            {pr.status !== 'Rejected' && (
              <button
                onClick={onIssuePO}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowRightCircle size={14} />
                <span>Issue Purchase Order</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// EditPurchaseRequestModal
// -------------------------------------------------------------

function EditPurchaseRequestModal({
  pr,
  onClose,
  onSave
}: {
  pr: PurchaseRequest;
  onClose: () => void;
  onSave: (updatedPR: PurchaseRequest) => void;
}) {
  const [department, setDepartment] = useState(pr.department);
  const [requester, setRequester] = useState(pr.requester);
  const [purpose, setPurpose] = useState(pr.purpose);
  const [urgency, setUrgency] = useState(pr.urgency);
  const [status, setStatus] = useState<'Pending' | 'Approved' | 'Rejected'>(pr.status);
  const [items, setItems] = useState([...pr.items]);

  const departments = [
    'IT Infrastructure',
    'Engineering',
    'Operations',
    'Facilities',
    'Finance & Accounting',
    'Human Resources',
    'Procurement',
    'Marketing & Comms',
    'R&D'
  ];

  const handleItemChange = (index: number, field: string, value: any) => {
    setItems(prev => {
      const updated = [...prev];
      const item = { ...updated[index], [field]: value };
      if (field === 'qty' || field === 'estUnitPrice') {
        item.total = (Number(item.qty) || 0) * (Number(item.estUnitPrice) || 0);
      }
      updated[index] = item;
      return updated;
    });
  };

  const addItemRow = () => {
    setItems(prev => [...prev, { name: '', qty: 1, unit: 'pcs', estUnitPrice: 0, total: 0 }]);
  };

  const removeItemRow = (index: number) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const grandTotal = items.reduce((acc, curr) => acc + curr.total, 0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!purpose.trim()) {
      setErrorMessage('Please provide a purpose / justification.');
      return;
    }
    const validItems = items.filter(it => it.name.trim().length > 0);
    if (validItems.length === 0) {
      setErrorMessage('Please include at least one valid line item.');
      return;
    }

    const updatedPR: PurchaseRequest = {
      ...pr,
      department,
      requester,
      purpose,
      urgency,
      status,
      estimatedAmount: grandTotal,
      items: validItems
    };

    onSave(updatedPR);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Edit3 size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Edit Purchase Request: {pr.id}</h3>
              <p className="text-xs text-slate-500">Update line items, department, or justification</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2">
              <XCircle size={16} className="shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">Requester</label>
              <input
                type="text"
                value={requester}
                onChange={(e) => setRequester(e.target.value)}
                required
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Urgency Priority</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">Total Estimated Amount</label>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 tabular-nums">
                ₱{grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-800 block mb-1">Purpose / Justification</label>
            <textarea
              rows={2}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-slate-800">Requisition Items</label>
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
                    placeholder="Item description"
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
                    placeholder="Unit Cost"
                    value={it.estUnitPrice || ''}
                    onChange={(e) => handleItemChange(idx, 'estUnitPrice', parseFloat(e.target.value) || 0)}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// ConvertToPOModal (Issue PO)
// -------------------------------------------------------------

function ConvertToPOModal({
  pr,
  onClose,
  onConfirm
}: {
  pr: PurchaseRequest;
  onClose: () => void;
  onConfirm: (supplier: string, deliveryDate: string) => void;
}) {
  const [supplier, setSupplier] = useState('TechCorp Industries');
  const [deliveryDate, setDeliveryDate] = useState('Oct 28, 2026');

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileCheck2 size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Issue PO for {pr.id}</h3>
              <p className="text-xs text-slate-500">Allocate vendor and generate official Purchase Order</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-800 block mb-1">Awarded Vendor / Supplier</label>
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
            <label className="font-semibold text-slate-800 block mb-1">Fulfillment Delivery Date</label>
            <input
              type="text"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              placeholder="e.g. Oct 28, 2026"
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-1 text-emerald-950">
            <div className="font-semibold">Requisition Details:</div>
            <div>Total Line Items: {pr.items.length}</div>
            <div>Committed Amount: ₱{pr.estimatedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <div className="text-[11px] text-emerald-700 pt-1">
              Issuing this order will create an official PO record in Purchase Order Management.
            </div>
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
            onClick={() => onConfirm(supplier, deliveryDate)}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <FileCheck2 size={14} />
            <span>Generate & Issue PO</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// CreatePurchaseRequestModal
// -------------------------------------------------------------

function CreatePurchaseRequestModal({
  onClose,
  onSubmit
}: {
  onClose: () => void;
  onSubmit: (pr: PurchaseRequest) => void;
}) {
  const [department, setDepartment] = useState('IT Infrastructure');
  const [requester, setRequester] = useState('John Doe');
  const [purpose, setPurpose] = useState('');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent' | 'Low'>('Normal');
  const [items, setItems] = useState<Array<{ name: string; qty: number; unit: string; estUnitPrice: number; total: number }>>([
    { name: '', qty: 1, unit: 'pcs', estUnitPrice: 0, total: 0 }
  ]);

  const departments = [
    'IT Infrastructure',
    'Engineering',
    'Operations',
    'Facilities',
    'Finance & Accounting',
    'Human Resources',
    'Procurement',
    'Marketing & Comms',
    'R&D'
  ];

  const handleItemChange = (index: number, field: string, value: any) => {
    setItems(prev => {
      const updated = [...prev];
      const item = { ...updated[index], [field]: value };
      if (field === 'qty' || field === 'estUnitPrice') {
        item.total = (Number(item.qty) || 0) * (Number(item.estUnitPrice) || 0);
      }
      updated[index] = item;
      return updated;
    });
  };

  const addItemRow = () => {
    setItems(prev => [...prev, { name: '', qty: 1, unit: 'pcs', estUnitPrice: 0, total: 0 }]);
  };

  const removeItemRow = (index: number) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const grandTotal = items.reduce((acc, curr) => acc + curr.total, 0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!purpose.trim()) {
      setErrorMessage('Please provide an operational purpose or technical justification.');
      return;
    }
    const validItems = items.filter(it => it.name.trim().length > 0);
    if (validItems.length === 0) {
      setErrorMessage('Please include at least one item with a valid description.');
      return;
    }

    const randomSuffix = Math.floor(Math.random() * 800 + 100);
    const newPR: PurchaseRequest = {
      id: `PR-2026-${randomSuffix}`,
      date: 'Oct 05, 2026',
      department,
      requester,
      purpose,
      estimatedAmount: grandTotal,
      status: 'Pending',
      poRef: null,
      urgency,
      items: validItems
    };

    onSubmit(newPR);
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
              <h3 className="font-bold text-slate-900 text-sm">New Purchase Request</h3>
              <p className="text-xs text-slate-500">Initiate internal requisition for departmental procurement</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2">
              <XCircle size={16} className="shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Requesting Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">Requester Name</label>
              <input
                type="text"
                value={requester}
                onChange={(e) => setRequester(e.target.value)}
                required
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Urgency Priority</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="Normal">Normal Priority</option>
                <option value="Urgent">Urgent / Mission Critical</option>
                <option value="Low">Low / Routine Buffer</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">Estimated Budget</label>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 tabular-nums">
                ₱{grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-800 block mb-1">Purpose / Technical Justification</label>
            <textarea
              rows={2}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="State the departmental need, project objective, or operational purpose..."
              required
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Line items section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-slate-800">Requisitioned Items</label>
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
                    placeholder="Item name / specification"
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
                    placeholder="Est Unit Cost"
                    value={it.estUnitPrice || ''}
                    onChange={(e) => handleItemChange(idx, 'estUnitPrice', parseFloat(e.target.value) || 0)}
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
              Submit Requisition
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
