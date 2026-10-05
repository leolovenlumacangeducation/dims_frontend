import React from 'react';
import { 
  FileCheck, 
  FileText, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  ArrowRight, 
  Building, 
  CheckCircle2,
  PackageCheck
} from 'lucide-react';
import { PurchaseOrder, PurchaseRequest } from '../types/procurement';

interface DashboardViewProps {
  purchaseOrders: PurchaseOrder[];
  purchaseRequests: PurchaseRequest[];
  onNavigateToPOs: () => void;
  onNavigateToPRs: () => void;
}

export function DashboardView({
  purchaseOrders,
  purchaseRequests,
  onNavigateToPOs,
  onNavigateToPRs
}: DashboardViewProps) {
  const pendingPOs = purchaseOrders.filter(p => p.status === 'Pending');
  const deliveredPOs = purchaseOrders.filter(p => p.status === 'Delivered');
  const pendingPRs = purchaseRequests.filter(p => p.status === 'Pending');

  const totalPendingCommitment = pendingPOs.reduce((sum, p) => sum + p.amountNumber, 0);
  const totalDeliveredSpend = deliveredPOs.reduce((sum, p) => sum + p.amountNumber, 0);

  // Group by department for visual breakdown
  const deptSpend: Record<string, number> = {};
  purchaseOrders.forEach(po => {
    deptSpend[po.department] = (deptSpend[po.department] || 0) + po.amountNumber;
  });

  return (
    <div className="space-y-6">
      {/* Subtitle */}
      <div>
        <p className="text-xs text-slate-500 font-normal">
          Executive procurement intelligence, pending departmental approvals, and supplier fulfillment progress.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Pending PO Commitments</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock size={15} />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 tabular-nums">
            ₱{totalPendingCommitment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
            <span>{pendingPOs.length} active orders pending delivery</span>
            <button onClick={onNavigateToPOs} className="text-indigo-600 font-semibold hover:underline">
              View →
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Awaiting PR Approvals</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <FileText size={15} />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900">
            {pendingPRs.length} Requisitions
          </div>
          <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
            <span>Requires departmental or budget sign-off</span>
            <button onClick={onNavigateToPRs} className="text-indigo-600 font-semibold hover:underline">
              Review →
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Fulfilled & Inspected</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <PackageCheck size={15} />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 tabular-nums">
            ₱{totalDeliveredSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            {deliveredPOs.length} POs closed with issued IARs
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Fulfillment Rate</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp size={15} />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900">
            96.8%
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-medium">
            Within contract SLA (15 working days)
          </div>
        </div>
      </div>

      {/* Two Column Layout: Action Queue & Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Approvals & Actions */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Actionable Procurement Queue</h3>
              <p className="text-[11px] text-slate-400">Requisitions and deliveries requiring immediate attention</p>
            </div>
            <button 
              onClick={onNavigateToPRs}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              See All PRs
            </button>
          </div>

          <div className="space-y-2.5">
            {purchaseRequests.filter(p => p.status === 'Pending').slice(0, 4).map(pr => (
              <div 
                key={pr.id}
                onClick={onNavigateToPRs}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-colors cursor-pointer text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <div>
                    <div className="font-semibold text-slate-800">{pr.id} — {pr.department}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[240px]">{pr.purpose}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-slate-900 tabular-nums">
                    ₱{pr.estimatedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[10px] font-medium text-amber-600">{pr.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Allocation Breakdown */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Committed Spend by Department</h3>
            <p className="text-[11px] text-slate-400">Total Purchase Order allocations per division</p>
          </div>

          <div className="space-y-3 text-xs">
            {Object.entries(deptSpend).map(([dept, amount]) => {
              const maxSpend = 35000;
              const pct = Math.min(100, Math.round((amount / maxSpend) * 100));
              return (
                <div key={dept} className="space-y-1">
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">{dept}</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      ₱{amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
