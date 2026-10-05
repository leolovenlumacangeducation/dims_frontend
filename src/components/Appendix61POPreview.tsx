import React from 'react';
import { PurchaseOrder, SystemSettings } from '../types/procurement';
import { convertAmountToWords } from '../utils/formFormatters';

interface Appendix61POPreviewProps {
  po: PurchaseOrder;
  settings?: SystemSettings;
  includeSignatures?: boolean;
}

export function Appendix61POPreview({
  po,
  settings,
  includeSignatures = true
}: Appendix61POPreviewProps) {
  const entityName = po.entityName || settings?.school?.schoolName || 'Pagadian City National Comprehensive High School';
  const supplierAddress = po.supplierAddress || 'Tech Plaza, Ortigas Center, Pasig City';
  const supplierTin = po.supplierTin || '102-482-190-000';
  const modeOfProcurement = po.modeOfProcurement || 'Small Value Procurement (RA 12009 Sec. 33)';
  const placeOfDelivery = po.placeOfDelivery || settings?.locations?.[0]?.name || 'Central Property & Supply Stockroom (WH-MAIN)';
  const deliveryTerm = po.deliveryTerm || `${settings?.rules?.defaultDeliveryPeriodDays || 15} Calendar Days`;
  const paymentTerm = po.paymentTerm || 'Within 30 calendar days upon complete inspection & acceptance';
  const fundCluster = po.fundCluster || settings?.school?.defaultFundCluster || '01 - Regular Agency Fund';
  const authorizedOfficial = po.authorizedOfficial || settings?.school?.schoolHead || 'Dr. Evelyn R. Mendoza';
  const authorizedDesignation = po.authorizedOfficialDesignation || settings?.school?.headTitle || 'Secondary School Principal IV / HoPE';
  const chiefAccountant = po.chiefAccountant || 'Ms. Rachel Wright';
  const accountantDesignation = 'Senior Bookkeeper / Head of Accounting Unit';
  const orsBursNo = po.orsBursNo || `ORS-2026-04-${po.id.replace('PO-2026-', '')}`;
  const orsDate = po.orsBursDate || po.date;

  const totalAmountNumber = po.amountNumber || po.items.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
  const totalAmountWords = po.totalAmountInWords || convertAmountToWords(totalAmountNumber);

  // Minimum 8 rows to give the official ledger paper appearance
  const emptyRowCount = Math.max(0, 8 - po.items.length);

  return (
    <div className="bg-white text-black p-6 sm:p-8 font-serif max-w-[850px] mx-auto text-xs leading-normal border border-slate-300 shadow-sm print:border-none print:shadow-none print:p-0">
      {/* Top right Appendix reference */}
      <div className="text-right italic text-[11px] mb-1 font-sans">
        Appendix 61
      </div>

      {/* Header */}
      <div className="text-center mb-3">
        <h2 className="font-bold text-base sm:text-lg tracking-wide uppercase font-sans">
          PURCHASE ORDER
        </h2>
        <div className="border-b border-black w-72 mx-auto mt-1 mb-1"></div>
        <div className="font-semibold text-xs font-sans uppercase tracking-tight text-slate-800">
          {entityName}
        </div>
      </div>

      {/* Main Official Boxed Form */}
      <div className="border-2 border-black overflow-hidden font-sans">
        {/* Top Header Box (Supplier info vs PO info) */}
        <div className="grid grid-cols-12 border-b border-black text-xs">
          {/* Left Column: Supplier, Address, TIN */}
          <div className="col-span-7 p-2 border-r border-black space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-20 text-[11px]">Supplier :</span>
              <span className="font-serif font-bold text-slate-900 border-b border-black flex-1 px-1">
                {po.supplier}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-20 text-[11px]">Address :</span>
              <span className="font-serif text-slate-800 border-b border-black flex-1 px-1 truncate">
                {supplierAddress}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-20 text-[11px]">TIN :</span>
              <span className="font-mono text-slate-800 border-b border-black flex-1 px-1">
                {supplierTin}
              </span>
            </div>
          </div>

          {/* Right Column: P.O. No., Date, Mode of Procurement */}
          <div className="col-span-5 p-2 space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-36 text-[11px]">P.O. No. :</span>
              <span className="font-mono font-bold text-slate-900 border-b border-black flex-1 px-1">
                {po.id}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-36 text-[11px]">Date :</span>
              <span className="font-serif text-slate-800 border-b border-black flex-1 px-1">
                {po.date}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-36 text-[11px]">Mode of Procurement :</span>
              <span className="font-serif text-[11px] text-slate-800 border-b border-black flex-1 px-1 truncate">
                {modeOfProcurement}
              </span>
            </div>
          </div>
        </div>

        {/* Gentlemen clause */}
        <div className="border-b border-black px-3 py-1.5 text-[11px] bg-slate-50/30">
          <span className="font-semibold">Gentlemen:</span>
          <p className="indent-6 mt-0.5">
            Please furnish this Office the following articles subject to the terms and conditions contained herein:
          </p>
        </div>

        {/* Place & Date of Delivery, Delivery & Payment Term */}
        <div className="grid grid-cols-12 border-b border-black text-xs">
          <div className="col-span-7 p-2 border-r border-black space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-32 text-[11px]">Place of Delivery :</span>
              <span className="font-serif text-slate-800 border-b border-black flex-1 px-1 truncate">
                {placeOfDelivery}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-32 text-[11px]">Date of Delivery :</span>
              <span className="font-serif font-medium text-slate-800 border-b border-black flex-1 px-1">
                {po.deliveryDate}
              </span>
            </div>
          </div>

          <div className="col-span-5 p-2 space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-28 text-[11px]">Delivery Term :</span>
              <span className="font-serif text-slate-800 border-b border-black flex-1 px-1">
                {deliveryTerm}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-28 text-[11px]">Payment Term :</span>
              <span className="font-serif text-slate-800 border-b border-black flex-1 px-1 truncate">
                {paymentTerm}
              </span>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black text-center font-bold text-[11px] bg-slate-50/50">
              <th className="py-2 px-2 border-r border-black w-24">Stock / Property No.</th>
              <th className="py-2 px-2 border-r border-black w-14">Unit</th>
              <th className="py-2 px-3 border-r border-black">Description</th>
              <th className="py-2 px-2 border-r border-black w-16">Quantity</th>
              <th className="py-2 px-2 border-r border-black w-24 text-right">Unit Cost</th>
              <th className="py-2 px-2 w-28 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/30 font-serif text-xs">
            {po.items.map((item, idx) => (
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
                  ₱{Number(item.unitPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-1 px-2 text-right tabular-nums font-semibold text-slate-900">
                  ₱{Number(item.total || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            ))}

            {/* Empty ledger spacer rows */}
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

            {/* Total Amount in Words */}
            <tr className="border-t-2 border-black font-sans bg-slate-50/30">
              <td colSpan={6} className="p-2 border-b border-black">
                <span className="font-bold text-[11px]">(Total Amount in Words) :</span>
                <span className="font-serif italic font-semibold text-slate-900 ml-2">
                  {totalAmountWords}
                </span>
                <span className="float-right font-serif font-bold text-sm">
                  ₱{totalAmountNumber.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Penalty Clause */}
        <div className="border-b border-black p-2.5 text-[10px] text-slate-700 leading-snug bg-white font-sans">
          In case of failure to make the full delivery within the time specified above, a penalty of one-tenth (1/10) of one percent for every day of delay shall be imposed on the undelivered item/s.
        </div>

        {/* Conforme & Very Truly Yours Split Box */}
        <div className="grid grid-cols-2 divide-x divide-black border-b border-black text-xs font-sans">
          {/* Conforme (Supplier) */}
          <div className="p-3 space-y-2">
            <div className="font-semibold text-slate-700 uppercase text-[10px]">Conforme:</div>
            <div className="pt-6 text-center">
              {includeSignatures ? (
                <div className="font-serif italic text-indigo-900 text-sm font-bold tracking-wider -mb-1">
                  Authorized Representative
                </div>
              ) : (
                <div className="h-4"></div>
              )}
              <div className="border-b border-black mx-6 mt-1"></div>
              <div className="text-[11px] font-semibold text-slate-800 mt-1">Signature over Printed Name of Supplier</div>
              <div className="border-b border-black w-32 mx-auto mt-3"></div>
              <div className="text-[10px] text-slate-500 mt-0.5">Date</div>
            </div>
          </div>

          {/* Very Truly Yours (Authorized Official) */}
          <div className="p-3 space-y-2">
            <div className="font-semibold text-slate-700 uppercase text-[10px]">Very truly yours,</div>
            <div className="pt-6 text-center">
              {includeSignatures ? (
                <div className="font-serif italic text-indigo-900 text-sm font-bold tracking-wider -mb-1">
                  {authorizedOfficial}
                </div>
              ) : (
                <div className="h-4"></div>
              )}
              <div className="border-b border-black mx-6 mt-1"></div>
              <div className="font-bold text-slate-900 text-xs mt-1 uppercase">{authorizedOfficial}</div>
              <div className="text-[11px] text-slate-600">{authorizedDesignation}</div>
            </div>
          </div>
        </div>

        {/* Bottom Accounting & Funding Box */}
        <div className="grid grid-cols-12 divide-x divide-black text-xs font-sans">
          {/* Left: Fund Cluster & Funds Available */}
          <div className="col-span-7 p-2.5 space-y-1.5">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-28 text-[11px]">Fund Cluster :</span>
              <span className="font-serif font-bold text-slate-900 border-b border-black flex-1 px-1">
                {fundCluster}
              </span>
            </div>
            <div>
              <span className="font-semibold text-[11px]">Funds Available :</span>
              <div className="pt-4 text-center">
                {includeSignatures ? (
                  <div className="font-serif italic text-indigo-900 text-xs font-bold -mb-1">
                    {chiefAccountant}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
                <div className="border-b border-black mx-4 mt-1"></div>
                <div className="font-bold text-slate-900 text-[11px] mt-0.5 uppercase">{chiefAccountant}</div>
                <div className="text-[10px] text-slate-600">{accountantDesignation}</div>
              </div>
            </div>
          </div>

          {/* Right: ORS/BURS No., Date, Amount */}
          <div className="col-span-5 p-2.5 space-y-1.5">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-28 text-[11px]">ORS/BURS No. :</span>
              <span className="font-mono text-slate-900 border-b border-black flex-1 px-1">
                {orsBursNo}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-28 text-[11px]">Date of ORS/BURS :</span>
              <span className="font-serif text-slate-800 border-b border-black flex-1 px-1">
                {orsDate}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold w-28 text-[11px]">Amount :</span>
              <span className="font-serif font-bold text-slate-900 border-b border-black flex-1 px-1">
                ₱{totalAmountNumber.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 text-[10px] text-slate-400 font-sans flex justify-between">
        <span>DepEd Division of Pagadian City - PCNCHS Procurement System</span>
        <span>Standard Purchase Order - Appendix 61</span>
      </div>
    </div>
  );
}
