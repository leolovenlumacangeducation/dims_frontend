import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertTriangle, 
  Boxes,
  Plus,
  Edit3,
  Trash2,
  X,
  Check,
  RotateCcw
} from 'lucide-react';

export interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  inStock: number;
  minBuffer: number;
  location: string;
  unit: string;
  lastRestocked: string;
}

const defaultInventory: InventoryItem[] = [
  { sku: 'SKU-SRV-42U', name: 'Server Rack Mount 42U Enclosure', category: 'IT Infrastructure', inStock: 3, minBuffer: 2, location: 'Bay A-04', unit: 'units', lastRestocked: 'Oct 05, 2026' },
  { sku: 'SKU-CAB-CAT6', name: 'Cat6 Ethernet Spool (1000ft, UTP)', category: 'IT Infrastructure', inStock: 14, minBuffer: 5, location: 'Bay A-12', unit: 'spools', lastRestocked: 'Sep 28, 2026' },
  { sku: 'SKU-CON-RJ45', name: 'RJ45 Modular Connectors (Pack of 100)', category: 'IT Infrastructure', inStock: 45, minBuffer: 20, location: 'Bin C-01', unit: 'packs', lastRestocked: 'Sep 25, 2026' },
  { sku: 'SKU-PLT-HEAVY', name: 'Heavy Duty Industrial Storage Pallets', category: 'Operations', inStock: 80, minBuffer: 30, location: 'Warehouse Yard', unit: 'units', lastRestocked: 'Sep 24, 2026' },
  { sku: 'SKU-FLM-STRCH', name: 'Industrial Stretch Film Wrap Rolls', category: 'Operations', inStock: 62, minBuffer: 25, location: 'Shelf B-02', unit: 'rolls', lastRestocked: 'Sep 20, 2026' },
  { sku: 'SKU-SWT-24P', name: 'Managed Enterprise Switch 24-Port', category: 'IT Infrastructure', inStock: 2, minBuffer: 4, location: 'Vault E-01', unit: 'units', lastRestocked: 'Sep 12, 2026' },
  { sku: 'SKU-BAT-100AH', name: '12V 100Ah Deep-Cycle Sealed Lead Acid', category: 'Facilities', inStock: 1, minBuffer: 4, location: 'Power Room 1', unit: 'units', lastRestocked: 'Aug 30, 2026' },
  { sku: 'SKU-FLT-MERV13', name: 'Commercial MERV 13 Air Filter 24x24x2', category: 'Facilities', inStock: 48, minBuffer: 20, location: 'Mezzanine F', unit: 'pcs', lastRestocked: 'Aug 22, 2026' },
];

export function InventoryView() {
  const [inventory, setInventory] = useState<InventoryItem[]>(defaultInventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Dialog states
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [adjustingItem, setAdjustingItem] = useState<InventoryItem | null>(null);
  const [deletingSku, setDeletingSku] = useState<string | null>(null);

  const filteredItems = inventory.filter(item => {
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;
    return matchesCat && (
      item.sku.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q)
    );
  });

  const handleAddStock = (newItem: InventoryItem) => {
    setInventory(prev => [newItem, ...prev]);
    setIsAddStockOpen(false);
  };

  const handleAdjustStock = (sku: string, newQty: number, newLocation: string) => {
    setInventory(prev => prev.map(item => {
      if (item.sku === sku) {
        return {
          ...item,
          inStock: newQty,
          location: newLocation,
          lastRestocked: 'Oct 05, 2026'
        };
      }
      return item;
    }));
    setAdjustingItem(null);
  };

  const handleDeleteItem = (sku: string) => {
    setInventory(prev => prev.filter(item => item.sku !== sku));
    setDeletingSku(null);
  };

  return (
    <div className="space-y-4">
      {/* Subtitle and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500 font-normal">
            Physical warehouse inventory, buffer thresholds, and accepted shipments from verified IAR deliveries.
          </p>
        </div>
        <button
          onClick={() => setIsAddStockOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-2xs"
        >
          <Plus size={14} />
          <span>Add Stock Item</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="inline-flex items-center bg-[#ECEFF3] p-1 rounded-xl">
          {['All', 'IT Infrastructure', 'Operations', 'Facilities'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SKU, item name or storage bay..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 shadow-2xs"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">SKU Code</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Item Description</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Category</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Location</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500 text-center">In Stock</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500 text-center">Min Buffer</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500">Stock Status</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500 text-right">Last Received</th>
                <th className="px-6 py-3.5 text-xs font-medium text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredItems.map(item => {
                const isLow = item.inStock <= item.minBuffer;
                return (
                  <tr key={item.sku} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-slate-800">{item.sku}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                    <td className="px-6 py-4 text-slate-600">{item.category}</td>
                    <td className="px-6 py-4 text-slate-600">{item.location}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-900 tabular-nums">
                      {item.inStock} {item.unit}
                    </td>
                    <td className="px-6 py-4 text-center text-slate-500 tabular-nums">
                      {item.minBuffer} {item.unit}
                    </td>
                    <td className="px-6 py-4">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700">
                          <AlertTriangle size={11} />
                          <span>Low Stock</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                          <CheckCircle2 size={11} />
                          <span>Optimal</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-600">{item.lastRestocked}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setAdjustingItem(item)}
                          className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                          title="Adjust Stock Level"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => setDeletingSku(item.sku)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Remove Item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DIALOG: Add Stock Item Modal */}
      {isAddStockOpen && (
        <AddStockModal
          onClose={() => setIsAddStockOpen(false)}
          onSubmit={handleAddStock}
        />
      )}

      {/* DIALOG: Adjust Stock Modal */}
      {adjustingItem && (
        <AdjustStockModal
          item={adjustingItem}
          onClose={() => setAdjustingItem(null)}
          onSave={handleAdjustStock}
        />
      )}

      {/* DIALOG: Delete Inventory Item Modal */}
      {deletingSku && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Remove Stock Item?</h3>
                <p className="text-slate-500 text-xs">SKU: <strong className="text-slate-800">{deletingSku}</strong></p>
              </div>
            </div>
            <p className="text-slate-500 text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-100">
              Are you sure you want to remove this SKU from warehouse inventory records?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingSku(null)}
                className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteItem(deletingSku)}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-2xs cursor-pointer"
              >
                Remove Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddStockModal({
  onClose,
  onSubmit
}: {
  onClose: () => void;
  onSubmit: (item: InventoryItem) => void;
}) {
  const [sku, setSku] = useState(`SKU-${Math.floor(Math.random() * 900 + 100)}`);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('IT Infrastructure');
  const [location, setLocation] = useState('Bay A-01');
  const [inStock, setInStock] = useState(10);
  const [minBuffer, setMinBuffer] = useState(5);
  const [unit, setUnit] = useState('units');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      sku: sku.trim().toUpperCase(),
      name: name.trim(),
      category,
      location,
      inStock,
      minBuffer,
      unit,
      lastRestocked: 'Oct 05, 2026'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Plus size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Add Warehouse Item</h3>
              <p className="text-slate-400 text-xs">Register new inventory SKU in buffer stock</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">SKU Code</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
                className="w-full p-2 border border-slate-200 rounded-lg font-mono uppercase"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              >
                <option value="IT Infrastructure">IT Infrastructure</option>
                <option value="Operations">Operations</option>
                <option value="Facilities">Facilities</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Item Description</label>
            <input
              type="text"
              placeholder="e.g. Optical Fiber Patch Cable 10m"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Location Bay</label>
              <input
                type="text"
                placeholder="e.g. Bay B-04"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Unit</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Initial Stock</label>
              <input
                type="number"
                min={0}
                value={inStock}
                onChange={(e) => setInStock(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg font-bold"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Minimum Buffer</label>
              <input
                type="number"
                min={0}
                value={minBuffer}
                onChange={(e) => setMinBuffer(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg font-bold"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
            >
              Register Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdjustStockModal({
  item,
  onClose,
  onSave
}: {
  item: InventoryItem;
  onClose: () => void;
  onSave: (sku: string, qty: number, location: string) => void;
}) {
  const [qty, setQty] = useState(item.inStock);
  const [location, setLocation] = useState(item.location);
  const [reason, setReason] = useState('Physical count audit reconciliation');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(item.sku, qty, location);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Boxes size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Adjust Stock: {item.sku}</h3>
              <p className="text-slate-400 text-xs">{item.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <span className="text-slate-600">Current On-Hand Quantity:</span>
            <span className="font-bold text-slate-900">{item.inStock} {item.unit}</span>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Updated Physical Count</label>
            <input
              type="number"
              min={0}
              value={qty}
              onChange={(e) => setQty(Math.max(0, Number(e.target.value)))}
              className="w-full p-2.5 border border-slate-200 rounded-xl font-bold text-slate-900 text-sm"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Storage Facility Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-800"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Adjustment Reason / Notes</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-xl bg-white text-slate-800"
            >
              <option value="Physical count audit reconciliation">Physical count audit reconciliation</option>
              <option value="Incoming shipment accepted under IAR">Incoming shipment accepted under IAR</option>
              <option value="Transfer to secondary department depot">Transfer to secondary department depot</option>
              <option value="Damaged or expired inventory write-off">Damaged or expired inventory write-off</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
            >
              Update Balance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
