import React from 'react';
import { PurchaseOrder, SystemSettings } from '../types/procurement';

interface Appendix62IARPreviewProps {
  po: PurchaseOrder;
  settings?: SystemSettings;
  iarNo?: string;
  iarDate?: string;
  invoiceNo?: string;
  invoiceDate?: string;
  isPartial?: boolean;
  inspectionOfficer?: string;
  propertyCustodian?: string;
  includeSignatures?: boolean;
}

export function Appendix62IARPreview({
  po,
  settings,
  iarNo,
  iarDate,
  invoiceNo = 'INV-2026-981',
  invoiceDate,
  isPartial = false,
  inspectionOfficer,
  propertyCustodian,
  includeSignatures = true
}: Appendix62IARPreviewProps) {
  const entityName = po.entityName || settings?.school?.schoolName || 'Pagadian City National Comprehensive High School';
  const fundCluster = po.fundCluster || settings?.school?.defaultFundCluster || '01 - Regular Agency Fund';
  const responsibilityCode = settings?.school?.responsibilityCenterCode || '07-04-0303906';
  const effectiveIARNo = iarNo || po.iarRef || 'IAR-2026-070';
  const effectiveIARDate = iarDate || po.date;
  const effectiveInvoiceDate = invoiceDate || po.date;

  const inspector = inspectionOfficer || 'Mr. Michael Brown';
  const custodian = propertyCustodian || 'Mr. John Doe';

  // Minimum 10 rows to look like the official document ledger
  const emptyRowCount = Math.max(0, 10 - po.items.length);

  return (
    <div className="bg-white text-black p-6 sm:p-8 font-serif max-w-[850px] mx-auto text-xs leading-normal border border-slate-300 shadow-sm print:border-none print:shadow-none print:p-0">
      {/* Top right Appendix reference */}
      <div className="text-right italic text-[11px] mb-1 font-sans">
        Appendix 62
      </div>

      {/* Main Form Title */}
      <div className="text-center font-bold text-base sm:text-lg tracking-wide uppercase mb-3 font-sans">
        INSPECTION AND ACCEPTANCE REPORT
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

      {/* Main Boxed Form */}
      <div className="border-2 border-black overflow-hidden font-sans">
        {/* Top Header Box (Supplier & Order vs IAR & Invoice) */}
        <div className="grid grid-cols-12 border-b border-black text-xs">
          {/* Left Column: Supplier, PO No./Date, Requisitioning Office, Resp. Center Code */}
          <div className="col-span-7 p-2 border-r border-black space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-40 text-[11px]">Supplier :</span>
              <span className="font-serif font-bold text-slate-900 border-b border-black flex-1 px-1">
                {po.supplier}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-40 text-[11px]">PO No./Date :</span>
              <span className="font-serif text-slate-800 border-b border-black flex-1 px-1 font-mono">
                {po.id} / {po.date}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-40 text-[11px]">Requisitioning Office/Dept. :</span>
              <span className="font-serif text-slate-800 border-b border-black flex-1 px-1 truncate">
                {po.department}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-40 text-[11px]">Responsibility Center Code :</span>
              <span className="font-mono text-slate-800 border-b border-black flex-1 px-1">
                {responsibilityCode}
              </span>
            </div>
          </div>

          {/* Right Column: IAR No., Date, Invoice No., Date */}
          <div className="col-span-5 p-2 space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-24 text-[11px]">IAR No. :</span>
              <span className="font-mono font-bold text-slate-900 border-b border-black flex-1 px-1">
                {effectiveIARNo}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-24 text-[11px]">Date :</span>
              <span className="font-serif text-slate-800 border-b border-black flex-1 px-1">
                {effectiveIARDate}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-24 text-[11px]">Invoice No. :</span>
              <span className="font-mono text-slate-800 border-b border-black flex-1 px-1">
                {invoiceNo}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-24 text-[11px]">Date :</span>
              <span className="font-serif text-slate-800 border-b border-black flex-1 px-1">
                {effectiveInvoiceDate}
              </span>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black text-center font-bold text-[11px] bg-slate-50/50">
              <th className="py-2 px-2 border-r border-black w-32">Stock / Property No.</th>
              <th className="py-2 px-3 border-r border-black">Description</th>
              <th className="py-2 px-2 border-r border-black w-24">Unit</th>
              <th className="py-2 px-2 w-28">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/30 font-serif text-xs">
            {po.items.map((item, idx) => (
              <tr key={idx} className="min-h-[26px]">
                <td className="py-1 px-2 border-r border-black font-mono text-[11px] text-center text-slate-700">
                  {item.stockNo || `STK-${String(idx + 1).padStart(3, '0')}`}
                </td>
                <td className="py-1 px-3 border-r border-black text-slate-900">
                  <div className="font-medium">{item.name}</div>
                </td>
                <td className="py-1 px-2 border-r border-black text-center text-slate-800">
                  {item.unit}
                </td>
                <td className="py-1 px-2 text-center font-mono font-bold text-slate-900">
                  {item.qty}
                </td>
              </tr>
            ))}

            {/* Empty ledger spacer rows to match official Appendix 62 ledger sheet */}
            {Array.from({ length: emptyRowCount }).map((_, i) => (
              <tr key={`empty-${i}`} className="h-6">
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bottom Split Box: INSPECTION vs ACCEPTANCE */}
        <div className="border-t-2 border-black grid grid-cols-2 divide-x divide-black text-xs font-sans">
          {/* Left Column: INSPECTION */}
          <div className="p-3 flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="font-bold text-slate-900 uppercase text-xs tracking-wider text-center border-b border-black pb-1 mb-2">
                INSPECTION
              </div>
              <div className="flex items-baseline gap-1 text-[11px]">
                <span className="font-semibold">Date Inspected :</span>
                <span className="border-b border-black flex-1 font-serif px-1">{effectiveIARDate}</span>
              </div>
              
              <div className="flex items-start gap-2 mt-3 text-[11px] leading-tight">
                <div className="w-4 h-4 border border-black flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <span>Inspected, verified and found in order as to quantity and specifications</span>
              </div>
            </div>

            <div className="pt-6 text-center mt-4">
              {includeSignatures ? (
                <div className="font-serif italic text-indigo-900 text-sm font-bold tracking-wider -mb-1">
                  {inspector}
                </div>
              ) : (
                <div className="h-4"></div>
              )}
              <div className="border-b border-black mx-4 mt-1"></div>
              <div className="font-bold text-slate-900 text-xs mt-1 uppercase">{inspector}</div>
              <div className="text-[10px] text-slate-600">Inspection Officer / Inspection Committee Chair</div>
            </div>
          </div>

          {/* Right Column: ACCEPTANCE */}
          <div className="p-3 flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="font-bold text-slate-900 uppercase text-xs tracking-wider text-center border-b border-black pb-1 mb-2">
                ACCEPTANCE
              </div>
              <div className="flex items-baseline gap-1 text-[11px]">
                <span className="font-semibold">Date Received :</span>
                <span className="border-b border-black flex-1 font-serif px-1">{effectiveIARDate}</span>
              </div>

              <div className="space-y-1.5 mt-3 text-[11px]">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 border border-black flex items-center justify-center shrink-0 ${!isPartial ? 'font-bold' : ''}`}>
                    {!isPartial ? '✓' : ''}
                  </div>
                  <span>Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 border border-black flex items-center justify-center shrink-0 ${isPartial ? 'font-bold' : ''}`}>
                    {isPartial ? '✓' : ''}
                  </div>
                  <span>Partial (pls. specify quantity)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 text-center mt-4">
              {includeSignatures ? (
                <div className="font-serif italic text-indigo-900 text-sm font-bold tracking-wider -mb-1">
                  {custodian}
                </div>
              ) : (
                <div className="h-4"></div>
              )}
              <div className="border-b border-black mx-4 mt-1"></div>
              <div className="font-bold text-slate-900 text-xs mt-1 uppercase">{custodian}</div>
              <div className="text-[10px] text-slate-600">Supply and/or Property Custodian</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 text-[10px] text-slate-400 font-sans flex justify-between">
        <span>PCNCHS Inspection & Quality Acceptance Depot</span>
        <span>Standard Inspection Report - Appendix 62</span>
      </div>
    </div>
  );
}
