import React from 'react';
import { PurchaseRequest, SystemSettings } from '../types/procurement';

interface Appendix60PRPreviewProps {
  pr: PurchaseRequest;
  settings?: SystemSettings;
  includeSignatures?: boolean;
}

export function Appendix60PRPreview({
  pr,
  settings,
  includeSignatures = true
}: Appendix60PRPreviewProps) {
  const entityName = pr.entityName || settings?.school?.schoolName || 'Pagadian City National Comprehensive High School';
  const fundCluster = pr.fundCluster || settings?.school?.defaultFundCluster || '01 - Regular Agency Fund';
  const responsibilityCode = pr.responsibilityCenterCode || settings?.school?.responsibilityCenterCode || '07-04-0303906';
  const requestedByName = pr.requester || 'Mr. John Doe';
  const requestedByDesignation = pr.requestedByDesignation || 'Requisitioning Officer';
  const approvedByName = pr.approvedBy || settings?.school?.schoolHead || 'Dr. Evelyn R. Mendoza';
  const approvedByDesignation = pr.approvedByDesignation || settings?.school?.headTitle || 'Secondary School Principal IV / HoPE';

  const grandTotal = pr.items.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);

  // Minimum 10 rows to look like the official blank ledger form
  const emptyRowCount = Math.max(0, 10 - pr.items.length);

  return (
    <div className="bg-white text-black p-6 sm:p-8 font-serif max-w-[850px] mx-auto text-xs leading-normal border border-slate-300 shadow-sm print:border-none print:shadow-none print:p-0">
      {/* Top right Appendix reference */}
      <div className="text-right italic text-[11px] mb-1 font-sans">
        Appendix 60
      </div>

      {/* Main Form Title */}
      <div className="text-center font-bold text-base sm:text-lg tracking-wide uppercase mb-4">
        PURCHASE REQUEST
      </div>

      {/* Header Info Lines */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-sans text-xs">
        <div className="flex items-baseline gap-1.5 flex-1 min-w-[280px]">
          <span className="font-semibold whitespace-nowrap">Entity Name :</span>
          <span className="border-b border-black flex-1 font-serif px-1 font-medium">{entityName}</span>
        </div>
        <div className="flex items-baseline gap-1.5 min-w-[220px]">
          <span className="font-semibold whitespace-nowrap">Fund Cluster :</span>
          <span className="border-b border-black flex-1 font-serif px-1 font-medium">{fundCluster}</span>
        </div>
      </div>

      {/* Main Official Boxed Form Container */}
      <div className="border-2 border-black overflow-hidden font-sans">
        {/* Office / Section & PR No. Row */}
        <div className="grid grid-cols-12 border-b border-black text-xs">
          <div className="col-span-4 p-1.5 border-r border-black flex flex-col justify-center">
            <span className="text-[10px] text-slate-600 uppercase font-semibold">Office/Section :</span>
            <span className="font-bold text-slate-900 mt-0.5 font-serif">{pr.department}</span>
          </div>
          <div className="col-span-5 p-1.5 border-r border-black flex flex-col justify-center">
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] text-slate-600 uppercase font-semibold">PR No. :</span>
              <span className="font-bold font-mono text-slate-900">{pr.id}</span>
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-[9px] text-slate-500 uppercase">Resp. Center Code :</span>
              <span className="font-mono text-slate-800 text-[11px]">{responsibilityCode}</span>
            </div>
          </div>
          <div className="col-span-3 p-1.5 flex flex-col justify-center">
            <span className="text-[10px] text-slate-600 uppercase font-semibold">Date :</span>
            <span className="font-bold font-serif text-slate-900 mt-0.5">{pr.date}</span>
          </div>
        </div>

        {/* Requisition Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black text-center font-bold text-[11px] bg-slate-50/50">
              <th className="py-2 px-2 border-r border-black w-24">Stock / Property No.</th>
              <th className="py-2 px-2 border-r border-black w-14">Unit</th>
              <th className="py-2 px-3 border-r border-black">Item Description</th>
              <th className="py-2 px-2 border-r border-black w-16">Quantity</th>
              <th className="py-2 px-2 border-r border-black w-24 text-right">Unit Cost</th>
              <th className="py-2 px-2 w-28 text-right">Total Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/30 font-serif text-xs">
            {pr.items.map((item, idx) => (
              <tr key={idx} className="min-h-[26px]">
                <td className="py-1 px-2 border-r border-black font-mono text-[11px] text-center text-slate-700">
                  {item.stockNo || `STK-${String(idx + 1).padStart(3, '0')}`}
                </td>
                <td className="py-1 px-2 border-r border-black text-center text-slate-800">
                  {item.unit}
                </td>
                <td className="py-1 px-3 border-r border-black text-slate-900">
                  <div className="font-medium">{item.name}</div>
                </td>
                <td className="py-1 px-2 border-r border-black text-center font-mono font-medium">
                  {item.qty}
                </td>
                <td className="py-1 px-2 border-r border-black text-right tabular-nums text-slate-800">
                  ₱{Number(item.estUnitPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-1 px-2 text-right tabular-nums font-semibold text-slate-900">
                  ₱{Number(item.total || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            ))}

            {/* Empty ledger spacer rows to match official Appendix 60 height */}
            {Array.from({ length: emptyRowCount }).map((_, i) => (
              <tr key={`empty-${i}`} className="h-6">
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td></td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="border-t-2 border-black font-bold font-sans bg-slate-50/40">
              <td colSpan={5} className="py-1.5 px-3 border-r border-black text-right uppercase text-[11px]">
                Total Estimated Amount :
              </td>
              <td className="py-1.5 px-2 text-right tabular-nums text-sm font-serif">
                ₱{grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Purpose Section */}
        <div className="border-t border-black p-2.5 bg-white font-sans text-xs">
          <div className="flex items-start gap-2">
            <span className="font-bold uppercase text-[11px] whitespace-nowrap">Purpose :</span>
            <div className="font-serif italic text-slate-900 flex-1 leading-relaxed border-b border-black pb-1">
              {pr.purpose}
            </div>
          </div>
        </div>

        {/* Signatures Bottom Box */}
        <div className="border-t-2 border-black grid grid-cols-2 divide-x divide-black text-xs font-sans">
          {/* Requested By */}
          <div className="p-3 space-y-2">
            <div className="font-semibold text-slate-700 uppercase text-[10px]">Requested by:</div>
            
            <div className="pt-6 text-center">
              {includeSignatures ? (
                <div className="font-serif italic text-indigo-900 text-sm font-bold tracking-wider -mb-1">
                  {requestedByName}
                </div>
              ) : (
                <div className="h-4"></div>
              )}
              <div className="border-b border-black mx-4 mt-1"></div>
              <div className="font-bold text-slate-900 mt-1 uppercase text-xs">{requestedByName}</div>
              <div className="text-[11px] text-slate-600">{requestedByDesignation}</div>
            </div>
          </div>

          {/* Approved By */}
          <div className="p-3 space-y-2">
            <div className="font-semibold text-slate-700 uppercase text-[10px]">Approved by:</div>
            
            <div className="pt-6 text-center">
              {includeSignatures ? (
                <div className="font-serif italic text-indigo-900 text-sm font-bold tracking-wider -mb-1">
                  {approvedByName}
                </div>
              ) : (
                <div className="h-4"></div>
              )}
              <div className="border-b border-black mx-4 mt-1"></div>
              <div className="font-bold text-slate-900 mt-1 uppercase text-xs">{approvedByName}</div>
              <div className="text-[11px] text-slate-600">{approvedByDesignation}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 text-[10px] text-slate-400 font-sans flex justify-between">
        <span>PCNCHS Logistics & Inventory Management System</span>
        <span>Standard Requisition Form - Appendix 60</span>
      </div>
    </div>
  );
}
