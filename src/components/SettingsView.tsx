import React, { useState } from 'react';
import { 
  School, 
  Users, 
  FileText, 
  Scale, 
  DollarSign, 
  MapPin, 
  Truck, 
  Layers, 
  Ruler, 
  Save, 
  RotateCcw, 
  CheckCircle, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  X, 
  Check, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  SystemSettings, 
  SchoolOfficial, 
  CampusLocation, 
  SupplierRecord, 
  CatalogItem, 
  UnitOfMeasurement 
} from '../types/procurement';

interface SettingsViewProps {
  settings: SystemSettings;
  onSaveSettings: (newSettings: SystemSettings) => void;
  onResetSettings: () => void;
}

export function SettingsView({
  settings: initialSettings,
  onSaveSettings,
  onResetSettings
}: SettingsViewProps) {
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState<
    'school' | 'officials' | 'forms' | 'rules' | 'finance' | 'locations' | 'suppliers' | 'catalog' | 'units'
  >('school');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Settings saved successfully!');

  // Search queries for list tabs
  const [officialSearch, setOfficialSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [supplierSearch, setSupplierSearch] = useState('');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [unitSearch, setUnitSearch] = useState('');

  // Add/Edit Modals state
  const [isOfficialModalOpen, setIsOfficialModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);

  // New official form state
  const [newOfficial, setNewOfficial] = useState<SchoolOfficial>({
    id: '',
    name: '',
    position: '',
    committeeRole: 'BAC Member',
    email: '',
    contact: '',
    active: true
  });

  // New location form state
  const [newLocation, setNewLocation] = useState<CampusLocation>({
    id: '',
    code: '',
    name: '',
    building: '',
    custodian: '',
    contactNumber: '',
    status: 'Active'
  });

  // New supplier form state
  const [newSupplier, setNewSupplier] = useState<SupplierRecord>({
    id: '',
    name: '',
    tin: '',
    philgepsNumber: '',
    category: 'General Supplies',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    rating: 5.0,
    status: 'Active'
  });

  // New catalog item state
  const [newCatalogItem, setNewCatalogItem] = useState<CatalogItem>({
    id: '',
    code: '',
    name: '',
    category: 'Office Supplies',
    unit: 'pcs',
    referencePrice: 0,
    specification: '',
    status: 'Standard Stock'
  });

  // New unit state
  const [newUnit, setNewUnit] = useState<UnitOfMeasurement>({
    id: '',
    code: '',
    name: '',
    category: 'Count',
    description: ''
  });

  // Confirmation dialog states
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: string; name: string } | null>(null);

  // Edit item states for modals
  const [editingOfficial, setEditingOfficial] = useState<SchoolOfficial | null>(null);
  const [editingLocation, setEditingLocation] = useState<CampusLocation | null>(null);
  const [editingSupplier, setEditingSupplier] = useState<SupplierRecord | null>(null);
  const [editingCatalogItem, setEditingCatalogItem] = useState<CatalogItem | null>(null);
  const [editingUnit, setEditingUnit] = useState<UnitOfMeasurement | null>(null);

  // Save changes
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSaveSettings(settings);
    setToastMessage('System settings and configuration saved successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleConfirmReset = () => {
    onResetSettings();
    setIsResetConfirmOpen(false);
    setToastMessage('Settings reset to system defaults!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleConfirmDeleteItem = () => {
    if (!itemToDelete) return;
    const { type, id } = itemToDelete;
    if (type === 'official') {
      setSettings(prev => ({ ...prev, officials: prev.officials.filter(o => o.id !== id) }));
    } else if (type === 'location') {
      setSettings(prev => ({ ...prev, locations: prev.locations.filter(l => l.id !== id) }));
    } else if (type === 'supplier') {
      setSettings(prev => ({ ...prev, suppliers: prev.suppliers.filter(s => s.id !== id) }));
    } else if (type === 'catalog') {
      setSettings(prev => ({ ...prev, catalog: prev.catalog.filter(c => c.id !== id) }));
    } else if (type === 'unit') {
      setSettings(prev => ({ ...prev, units: prev.units.filter(u => u.id !== id) }));
    }
    setItemToDelete(null);
  };

  const handleUpdateOfficial = (updated: SchoolOfficial) => {
    setSettings(prev => ({
      ...prev,
      officials: prev.officials.map(o => o.id === updated.id ? updated : o)
    }));
    setEditingOfficial(null);
  };

  const handleUpdateLocation = (updated: CampusLocation) => {
    setSettings(prev => ({
      ...prev,
      locations: prev.locations.map(l => l.id === updated.id ? updated : l)
    }));
    setEditingLocation(null);
  };

  const handleUpdateSupplier = (updated: SupplierRecord) => {
    setSettings(prev => ({
      ...prev,
      suppliers: prev.suppliers.map(s => s.id === updated.id ? updated : s)
    }));
    setEditingSupplier(null);
  };

  const handleUpdateCatalogItem = (updated: CatalogItem) => {
    setSettings(prev => ({
      ...prev,
      catalog: prev.catalog.map(c => c.id === updated.id ? updated : c)
    }));
    setEditingCatalogItem(null);
  };

  const handleUpdateUnit = (updated: UnitOfMeasurement) => {
    setSettings(prev => ({
      ...prev,
      units: prev.units.map(u => u.id === updated.id ? updated : u)
    }));
    setEditingUnit(null);
  };

  const tabs = [
    { id: 'school', label: 'School', icon: School },
    { id: 'officials', label: 'Officials', icon: Users },
    { id: 'forms', label: 'Forms', icon: FileText },
    { id: 'rules', label: 'Rules', icon: Scale },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'suppliers', label: 'Suppliers', icon: Truck },
    { id: 'catalog', label: 'Catalog', icon: Layers },
    { id: 'units', label: 'Units', icon: Ruler },
  ] as const;

  return (
    <div className="space-y-4">
      {/* Subtitle */}
      <div>
        <p className="text-xs text-slate-500 font-normal">
          Manage school identity, procurement committees, numbering forms, thresholds, chart of accounts, campus depots, accredited suppliers, catalog prices, and measurement units.
        </p>
      </div>

      {/* 9 Tabs Navigation Bar */}
      <div className="flex items-center overflow-x-auto border-b border-slate-200/90 gap-1 pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Form Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs p-6 space-y-6 text-xs">
        
        {/* ========================================================= */}
        {/* TAB 1: SCHOOL */}
        {/* ========================================================= */}
        {activeTab === 'school' && (
          <div className="space-y-5 animate-in fade-in duration-100">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Institutional School Profile</h3>
                <p className="text-slate-400 text-xs">Official academic entity details appearing on Purchase Orders, Canvass Forms, and IARs.</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                DepEd Verified Entity
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official School Name</label>
                <input
                  type="text"
                  value={settings.school.schoolName}
                  onChange={(e) => setSettings({ ...settings, school: { ...settings.school, schoolName: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">School ID / Division Code</label>
                <input
                  type="text"
                  value={settings.school.schoolId}
                  onChange={(e) => setSettings({ ...settings, school: { ...settings.school, schoolId: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Division & Region</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={settings.school.divisionCode}
                    onChange={(e) => setSettings({ ...settings, school: { ...settings.school, divisionCode: e.target.value } })}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={settings.school.region}
                    onChange={(e) => setSettings({ ...settings, school: { ...settings.school, region: e.target.value } })}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Head of Procuring Entity (HoPE) / Principal</label>
                <input
                  type="text"
                  value={settings.school.schoolHead}
                  onChange={(e) => setSettings({ ...settings, school: { ...settings.school, schoolHead: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Institutional Email</label>
                <input
                  type="email"
                  value={settings.school.email}
                  onChange={(e) => setSettings({ ...settings, school: { ...settings.school, email: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Landline / Contact Number</label>
                <input
                  type="text"
                  value={settings.school.contactNumber}
                  onChange={(e) => setSettings({ ...settings, school: { ...settings.school, contactNumber: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Taxpayer Identification Number (TIN)</label>
                <input
                  type="text"
                  value={settings.school.tinNumber}
                  onChange={(e) => setSettings({ ...settings, school: { ...settings.school, tinNumber: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Classification / Accreditation</label>
                <input
                  type="text"
                  value={settings.school.classification}
                  onChange={(e) => setSettings({ ...settings, school: { ...settings.school, classification: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Physical Campus Address</label>
              <textarea
                rows={2}
                value={settings.school.address}
                onChange={(e) => setSettings({ ...settings, school: { ...settings.school, address: e.target.value } })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: OFFICIALS */}
        {/* ========================================================= */}
        {activeTab === 'officials' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Bids & Awards Committee (BAC) & Procurement Officials</h3>
                <p className="text-slate-400 text-xs">Official signatories designated for Requisition approval, Canvassing, and Inspection.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOfficialModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-2xs"
              >
                <Plus size={14} />
                <span>Add Official</span>
              </button>
            </div>

            {/* Search */}
            <div className="relative w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, position or committee role..."
                value={officialSearch}
                onChange={(e) => setOfficialSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            {/* Officials Table */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Name</th>
                    <th className="px-4 py-2.5 font-medium">Position</th>
                    <th className="px-4 py-2.5 font-medium">BAC / Procurement Role</th>
                    <th className="px-4 py-2.5 font-medium">Email</th>
                    <th className="px-4 py-2.5 font-medium">Contact</th>
                    <th className="px-4 py-2.5 font-medium text-center">Status</th>
                    <th className="px-4 py-2.5 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {settings.officials
                    .filter(o => 
                      o.name.toLowerCase().includes(officialSearch.toLowerCase()) ||
                      o.position.toLowerCase().includes(officialSearch.toLowerCase()) ||
                      o.committeeRole.toLowerCase().includes(officialSearch.toLowerCase())
                    )
                    .map((off) => (
                      <tr key={off.id} className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-semibold text-slate-900">{off.name}</td>
                        <td className="px-4 py-3 text-slate-700">{off.position}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex px-2 py-0.5 rounded-md font-medium text-[11px] bg-indigo-50 text-indigo-700 border border-indigo-200/50">
                            {off.committeeRole}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 font-mono text-[11px]">{off.email}</td>
                        <td className="px-4 py-3 text-slate-600">{off.contact}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                            Active
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setEditingOfficial(off)}
                              className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                              title="Edit Official"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setItemToDelete({ type: 'official', id: off.id, name: off.name })}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Remove Official"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: FORMS */}
        {/* ========================================================= */}
        {activeTab === 'forms' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Procurement Documents & Numbering Sequence</h3>
              <p className="text-slate-400 text-xs">Configure reference serial codes, printing paper size, and standard contractual clauses.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <label className="font-semibold text-slate-800 block">Purchase Request (PR)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={settings.forms.prPrefix}
                    onChange={(e) => setSettings({ ...settings, forms: { ...settings.forms, prPrefix: e.target.value } })}
                    className="p-2 rounded-lg border border-slate-200 bg-white font-mono text-xs w-28"
                  />
                  <input
                    type="number"
                    value={settings.forms.prNextSequence}
                    onChange={(e) => setSettings({ ...settings, forms: { ...settings.forms, prNextSequence: Number(e.target.value) } })}
                    className="p-2 rounded-lg border border-slate-200 bg-white font-mono text-xs w-20 text-center"
                  />
                </div>
                <div className="text-[10px] text-slate-400">Preview: {settings.forms.prPrefix}{String(settings.forms.prNextSequence).padStart(3, '0')}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <label className="font-semibold text-slate-800 block">Purchase Order (PO)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={settings.forms.poPrefix}
                    onChange={(e) => setSettings({ ...settings, forms: { ...settings.forms, poPrefix: e.target.value } })}
                    className="p-2 rounded-lg border border-slate-200 bg-white font-mono text-xs w-28"
                  />
                  <input
                    type="number"
                    value={settings.forms.poNextSequence}
                    onChange={(e) => setSettings({ ...settings, forms: { ...settings.forms, poNextSequence: Number(e.target.value) } })}
                    className="p-2 rounded-lg border border-slate-200 bg-white font-mono text-xs w-20 text-center"
                  />
                </div>
                <div className="text-[10px] text-slate-400">Preview: {settings.forms.poPrefix}{String(settings.forms.poNextSequence).padStart(3, '0')}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <label className="font-semibold text-slate-800 block">Inspection Report (IAR)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={settings.forms.iarPrefix}
                    onChange={(e) => setSettings({ ...settings, forms: { ...settings.forms, iarPrefix: e.target.value } })}
                    className="p-2 rounded-lg border border-slate-200 bg-white font-mono text-xs w-28"
                  />
                  <input
                    type="number"
                    value={settings.forms.iarNextSequence}
                    onChange={(e) => setSettings({ ...settings, forms: { ...settings.forms, iarNextSequence: Number(e.target.value) } })}
                    className="p-2 rounded-lg border border-slate-200 bg-white font-mono text-xs w-20 text-center"
                  />
                </div>
                <div className="text-[10px] text-slate-400">Preview: {settings.forms.iarPrefix}{String(settings.forms.iarNextSequence).padStart(3, '0')}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <label className="font-semibold text-slate-800 block">Paper Size & Letterhead</label>
                <select
                  value={settings.forms.defaultPaperSize}
                  onChange={(e) => setSettings({ ...settings, forms: { ...settings.forms, defaultPaperSize: e.target.value as any } })}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs"
                >
                  <option value="A4">A4 (210 x 297 mm)</option>
                  <option value="Letter">Letter (8.5 x 11 in)</option>
                  <option value="Legal">Legal (8.5 x 14 in)</option>
                </select>
                <label className="flex items-center gap-2 text-[11px] text-slate-600 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.forms.printLetterhead}
                    onChange={(e) => setSettings({ ...settings, forms: { ...settings.forms, printLetterhead: e.target.checked } })}
                    className="rounded text-indigo-600"
                  />
                  <span>Include Official Header Seal</span>
                </label>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Standard Purchase Order Boilerplate Terms & Conditions</label>
              <textarea
                rows={3}
                value={settings.forms.termsAndConditionsText}
                onChange={(e) => setSettings({ ...settings, forms: { ...settings.forms, termsAndConditionsText: e.target.value } })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: RULES */}
        {/* ========================================================= */}
        {activeTab === 'rules' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Procurement Thresholds & Statutory Rules</h3>
              <p className="text-slate-400 text-xs">Configure ceilings for Small Value Procurement (SVP), canvass rules, and delay penalties.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800">Small Value Procurement (SVP) Ceiling</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-600">₱</span>
                    <input
                      type="number"
                      value={settings.rules.smallValueThreshold}
                      onChange={(e) => setSettings({ ...settings, rules: { ...settings.rules, smallValueThreshold: Number(e.target.value) } })}
                      className="w-28 p-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-right tabular-nums"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">Maximum threshold for alternative mode of procurement without public bidding.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800">Minimum Canvass Price Quotations</span>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={settings.rules.minCanvassQuotations}
                    onChange={(e) => setSettings({ ...settings, rules: { ...settings.rules, minCanvassQuotations: Number(e.target.value) } })}
                    className="w-20 p-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-center"
                  />
                </div>
                <p className="text-[11px] text-slate-500">Minimum number of supplier quotations required before BAC evaluation award.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800">Standard Fulfillment SLA (Calendar Days)</span>
                  <input
                    type="number"
                    value={settings.rules.defaultDeliveryPeriodDays}
                    onChange={(e) => setSettings({ ...settings, rules: { ...settings.rules, defaultDeliveryPeriodDays: Number(e.target.value) } })}
                    className="w-20 p-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-center"
                  />
                </div>
                <p className="text-[11px] text-slate-500">Standard lead time given to suppliers from Notice to Proceed (NTP).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800">Liquidated Damages Rate</span>
                  <input
                    type="text"
                    value={settings.rules.liquidatedDamageRate}
                    onChange={(e) => setSettings({ ...settings, rules: { ...settings.rules, liquidatedDamageRate: e.target.value } })}
                    className="w-44 p-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-xs"
                  />
                </div>
                <p className="text-[11px] text-slate-500">Deduction rate applied per calendar day of delay past contractual deadline.</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: FINANCE */}
        {/* ========================================================= */}
        {activeTab === 'finance' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Fund Allocations, Accounting & Tax Withholding</h3>
              <p className="text-slate-400 text-xs">Track school operational budget balances and statutory government tax deductions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="font-semibold text-slate-800">School MOOE Fund Allocation</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">
                  ₱{settings.finance.mooeBalance.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ ₱{settings.finance.mooeBudget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full" 
                    style={{ width: `${Math.round((settings.finance.mooeBalance / settings.finance.mooeBudget) * 100)}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500">Maintenance & Other Operating Expenses</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="font-semibold text-slate-800">Special Education Fund (SEF)</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">
                  ₱{settings.finance.sefBalance.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ ₱{settings.finance.sefBudget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full" 
                    style={{ width: `${Math.round((settings.finance.sefBalance / settings.finance.sefBudget) * 100)}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500">LGU Special Education Allocation</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="font-semibold text-slate-800">Capital Outlay (CO)</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">
                  ₱{settings.finance.capitalOutlayBalance.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ ₱{settings.finance.capitalOutlayBudget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-sky-600 h-full rounded-full" 
                    style={{ width: `${Math.round((settings.finance.capitalOutlayBalance / settings.finance.capitalOutlayBudget) * 100)}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500">Equipment, Furniture & Building Improvement</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="font-semibold text-slate-800">Statutory Government Tax Withholding Rates</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] text-slate-600 block mb-1">Withholding Tax on Goods (1%)</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.5"
                      value={settings.finance.withholdingTaxGoods}
                      onChange={(e) => setSettings({ ...settings, finance: { ...settings.finance, withholdingTaxGoods: Number(e.target.value) } })}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-center w-20"
                    />
                    <span className="font-bold text-slate-600">%</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-600 block mb-1">Withholding Tax on Services (2%)</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.5"
                      value={settings.finance.withholdingTaxServices}
                      onChange={(e) => setSettings({ ...settings, finance: { ...settings.finance, withholdingTaxServices: Number(e.target.value) } })}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-center w-20"
                    />
                    <span className="font-bold text-slate-600">%</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-600 block mb-1">Final Government VAT Withholding (5%)</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.5"
                      value={settings.finance.finalVatRate}
                      onChange={(e) => setSettings({ ...settings, finance: { ...settings.finance, finalVatRate: Number(e.target.value) } })}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-center w-20"
                    />
                    <span className="font-bold text-slate-600">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: LOCATIONS */}
        {/* ========================================================= */}
        {activeTab === 'locations' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Campus Facilities & Storage Depots</h3>
                <p className="text-slate-400 text-xs">Official drop-off locations and departmental warehouse custody units.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-2xs"
              >
                <Plus size={14} />
                <span>Add Location</span>
              </button>
            </div>

            <div className="relative w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search storage bay, custodian or building..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Code</th>
                    <th className="px-4 py-2.5 font-medium">Location Name</th>
                    <th className="px-4 py-2.5 font-medium">Building / Wing</th>
                    <th className="px-4 py-2.5 font-medium">Custodian Officer</th>
                    <th className="px-4 py-2.5 font-medium">Internal Contact</th>
                    <th className="px-4 py-2.5 font-medium text-center">Status</th>
                    <th className="px-4 py-2.5 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {settings.locations
                    .filter(loc => 
                      loc.code.toLowerCase().includes(locationSearch.toLowerCase()) ||
                      loc.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
                      loc.custodian.toLowerCase().includes(locationSearch.toLowerCase())
                    )
                    .map((loc) => (
                      <tr key={loc.id} className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-mono font-semibold text-slate-900">{loc.code}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{loc.name}</td>
                        <td className="px-4 py-3 text-slate-600">{loc.building}</td>
                        <td className="px-4 py-3 text-slate-700">{loc.custodian}</td>
                        <td className="px-4 py-3 text-slate-600 font-mono text-[11px]">{loc.contactNumber}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                            {loc.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setEditingLocation(loc)}
                              className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                              title="Edit Location"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setItemToDelete({ type: 'location', id: loc.id, name: loc.name })}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Remove Location"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: SUPPLIERS */}
        {/* ========================================================= */}
        {activeTab === 'suppliers' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Accredited Supplier & Vendor Registry</h3>
                <p className="text-slate-400 text-xs">Directory of suppliers with verified PhilGEPS registrations and tax clearances.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsSupplierModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-2xs"
              >
                <Plus size={14} />
                <span>Register Supplier</span>
              </button>
            </div>

            <div className="relative w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search vendor name, category, or PhilGEPS..."
                value={supplierSearch}
                onChange={(e) => setSupplierSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Supplier / Company</th>
                    <th className="px-4 py-2.5 font-medium">Category</th>
                    <th className="px-4 py-2.5 font-medium">PhilGEPS Number</th>
                    <th className="px-4 py-2.5 font-medium">Contact Person</th>
                    <th className="px-4 py-2.5 font-medium">Phone / Email</th>
                    <th className="px-4 py-2.5 font-medium text-center">Status</th>
                    <th className="px-4 py-2.5 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {settings.suppliers
                    .filter(s => 
                      s.name.toLowerCase().includes(supplierSearch.toLowerCase()) ||
                      s.category.toLowerCase().includes(supplierSearch.toLowerCase()) ||
                      s.philgepsNumber.toLowerCase().includes(supplierSearch.toLowerCase())
                    )
                    .map((sup) => (
                      <tr key={sup.id} className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-semibold text-slate-900">{sup.name}</td>
                        <td className="px-4 py-3 text-slate-700">{sup.category}</td>
                        <td className="px-4 py-3 font-mono text-[11px] text-indigo-700">{sup.philgepsNumber}</td>
                        <td className="px-4 py-3 text-slate-700">{sup.contactPerson}</td>
                        <td className="px-4 py-3 text-slate-600 text-[11px]">
                          <div>{sup.phone}</div>
                          <div className="text-slate-400">{sup.email}</div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                            {sup.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setEditingSupplier(sup)}
                              className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                              title="Edit Supplier"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setItemToDelete({ type: 'supplier', id: sup.id, name: sup.name })}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Remove Supplier"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 8: CATALOG */}
        {/* ========================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Standard School Supplies Catalog & DBM Reference Prices</h3>
                <p className="text-slate-400 text-xs">Standard item descriptions, units, and approved price schedules used for auto-filling PRs.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCatalogModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-2xs"
              >
                <Plus size={14} />
                <span>Add Item</span>
              </button>
            </div>

            <div className="relative w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search catalog code, item or category..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Item Code</th>
                    <th className="px-4 py-2.5 font-medium">Description</th>
                    <th className="px-4 py-2.5 font-medium">Category</th>
                    <th className="px-4 py-2.5 font-medium text-center">Unit</th>
                    <th className="px-4 py-2.5 font-medium text-right">Reference Price</th>
                    <th className="px-4 py-2.5 font-medium">Specification</th>
                    <th className="px-4 py-2.5 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {settings.catalog
                    .filter(c => 
                      c.code.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                      c.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                      c.category.toLowerCase().includes(catalogSearch.toLowerCase())
                    )
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-mono font-semibold text-slate-900">{item.code}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                        <td className="px-4 py-3 text-slate-600">{item.category}</td>
                        <td className="px-4 py-3 text-center text-slate-700">{item.unit}</td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-900 tabular-nums">
                          ₱{item.referencePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-[11px] truncate max-w-xs">{item.specification}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setEditingCatalogItem(item)}
                              className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                              title="Edit Catalog Item"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setItemToDelete({ type: 'catalog', id: item.id, name: item.name })}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Remove Item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 9: UNITS */}
        {/* ========================================================= */}
        {activeTab === 'units' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Units of Measurement (UOM) Standard Registry</h3>
                <p className="text-slate-400 text-xs">Standard units used across Purchase Requests, Purchase Orders, and Inventory balances.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsUnitModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-2xs"
              >
                <Plus size={14} />
                <span>Add Unit</span>
              </button>
            </div>

            <div className="relative w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search unit code or name..."
                value={unitSearch}
                onChange={(e) => setUnitSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Unit Code</th>
                    <th className="px-4 py-2.5 font-medium">Formal Name</th>
                    <th className="px-4 py-2.5 font-medium">Category</th>
                    <th className="px-4 py-2.5 font-medium">Usage Description</th>
                    <th className="px-4 py-2.5 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {settings.units
                    .filter(u => 
                      u.code.toLowerCase().includes(unitSearch.toLowerCase()) ||
                      u.name.toLowerCase().includes(unitSearch.toLowerCase()) ||
                      u.category.toLowerCase().includes(unitSearch.toLowerCase())
                    )
                    .map((unit) => (
                      <tr key={unit.id} className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-mono font-semibold text-indigo-700">{unit.code}</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">{unit.name}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-700">
                            {unit.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{unit.description}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setEditingUnit(unit)}
                              className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                              title="Edit Unit"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setItemToDelete({ type: 'unit', id: unit.id, name: `${unit.code} (${unit.name})` })}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Remove Unit"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Global Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Reset All Modules</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Save size={14} />
            <span>Save All Configurations</span>
          </button>
        </div>
      </div>

      {/* Floating Save Toast */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle size={15} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal: Add Official */}
      {isOfficialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add Procurement Official</h3>
              <button onClick={() => setIsOfficialModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Roberto Diaz"
                  value={newOfficial.name}
                  onChange={(e) => setNewOfficial({ ...newOfficial, name: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Academic / Civil Service Position</label>
                <input
                  type="text"
                  placeholder="e.g. Master Teacher I / Admin Officer"
                  value={newOfficial.position}
                  onChange={(e) => setNewOfficial({ ...newOfficial, position: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Committee Designation</label>
                <select
                  value={newOfficial.committeeRole}
                  onChange={(e) => setNewOfficial({ ...newOfficial, committeeRole: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                >
                  <option value="BAC Chairperson">BAC Chairperson</option>
                  <option value="BAC Vice-Chairperson">BAC Vice-Chairperson</option>
                  <option value="BAC Member">BAC Member</option>
                  <option value="BAC Secretariat Head">BAC Secretariat Head</option>
                  <option value="Supply & Property Officer">Supply & Property Officer</option>
                  <option value="Inspection & Acceptance (IAC) Member">Inspection & Acceptance (IAC) Member</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="name@school.edu.ph"
                  value={newOfficial.email}
                  onChange={(e) => setNewOfficial({ ...newOfficial, email: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Contact Phone</label>
                <input
                  type="text"
                  placeholder="0917-..."
                  value={newOfficial.contact}
                  onChange={(e) => setNewOfficial({ ...newOfficial, contact: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setIsOfficialModalOpen(false)} className="px-3 py-1.5 border rounded-lg text-slate-600">Cancel</button>
              <button 
                onClick={() => {
                  if (!newOfficial.name) return;
                  setSettings({
                    ...settings,
                    officials: [...settings.officials, { ...newOfficial, id: `OFF-0${settings.officials.length + 1}` }]
                  });
                  setIsOfficialModalOpen(false);
                }}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
              >
                Add Official
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Location */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add Campus Storage Bay</h3>
              <button onClick={() => setIsLocationModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Location Code</label>
                <input
                  type="text"
                  placeholder="e.g. WH-ANNEX"
                  value={newLocation.code}
                  onChange={(e) => setNewLocation({ ...newLocation, code: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg font-mono uppercase"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Facility Name</label>
                <input
                  type="text"
                  placeholder="e.g. Audio-Visual Center Supply Room"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Building Location</label>
                <input
                  type="text"
                  placeholder="e.g. Learning Resource Center 2F"
                  value={newLocation.building}
                  onChange={(e) => setNewLocation({ ...newLocation, building: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Custodian In-Charge</label>
                <input
                  type="text"
                  placeholder="e.g. Ms. Patricia Santos"
                  value={newLocation.custodian}
                  onChange={(e) => setNewLocation({ ...newLocation, custodian: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setIsLocationModalOpen(false)} className="px-3 py-1.5 border rounded-lg text-slate-600">Cancel</button>
              <button 
                onClick={() => {
                  if (!newLocation.name) return;
                  setSettings({
                    ...settings,
                    locations: [...settings.locations, { ...newLocation, id: `LOC-0${settings.locations.length + 1}` }]
                  });
                  setIsLocationModalOpen(false);
                }}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
              >
                Add Location
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Supplier */}
      {isSupplierModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Register Accredited Supplier</h3>
              <button onClick={() => setIsSupplierModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Supplier Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Scientific Equipments Corp"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">PhilGEPS No.</label>
                  <input
                    type="text"
                    placeholder="PHILGEPS-PLAT-..."
                    value={newSupplier.philgepsNumber}
                    onChange={(e) => setNewSupplier({ ...newSupplier, philgepsNumber: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Science Apparatus"
                    value={newSupplier.category}
                    onChange={(e) => setNewSupplier({ ...newSupplier, category: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={newSupplier.contactPerson}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setIsSupplierModalOpen(false)} className="px-3 py-1.5 border rounded-lg text-slate-600">Cancel</button>
              <button 
                onClick={() => {
                  if (!newSupplier.name) return;
                  setSettings({
                    ...settings,
                    suppliers: [...settings.suppliers, { ...newSupplier, id: `SUP-0${settings.suppliers.length + 1}` }]
                  });
                  setIsSupplierModalOpen(false);
                }}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Catalog Item */}
      {isCatalogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add Standard Catalog Supply</h3>
              <button onClick={() => setIsCatalogModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Item Code</label>
                  <input
                    type="text"
                    placeholder="PRD-..."
                    value={newCatalogItem.code}
                    onChange={(e) => setNewCatalogItem({ ...newCatalogItem, code: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Default Unit</label>
                  <select
                    value={newCatalogItem.unit}
                    onChange={(e) => setNewCatalogItem({ ...newCatalogItem, unit: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  >
                    {settings.units.map(u => (
                      <option key={u.code} value={u.code}>{u.code} ({u.name})</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Item Description</label>
                <input
                  type="text"
                  placeholder="e.g. High-definition Digital Microscope 1000x"
                  value={newCatalogItem.name}
                  onChange={(e) => setNewCatalogItem({ ...newCatalogItem, name: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Science / Lab"
                    value={newCatalogItem.category}
                    onChange={(e) => setNewCatalogItem({ ...newCatalogItem, category: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Reference Price (₱)</label>
                  <input
                    type="number"
                    value={newCatalogItem.referencePrice || ''}
                    onChange={(e) => setNewCatalogItem({ ...newCatalogItem, referencePrice: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setIsCatalogModalOpen(false)} className="px-3 py-1.5 border rounded-lg text-slate-600">Cancel</button>
              <button 
                onClick={() => {
                  if (!newCatalogItem.name) return;
                  setSettings({
                    ...settings,
                    catalog: [...settings.catalog, { ...newCatalogItem, id: `CAT-0${settings.catalog.length + 1}` }]
                  });
                  setIsCatalogModalOpen(false);
                }}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
              >
                Add to Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Unit */}
      {isUnitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add Unit of Measurement</h3>
              <button onClick={() => setIsUnitModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Unit Code</label>
                  <input
                    type="text"
                    placeholder="e.g. gal, kg, meter"
                    value={newUnit.code}
                    onChange={(e) => setNewUnit({ ...newUnit, code: e.target.value.toLowerCase() })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono lowercase"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newUnit.category}
                    onChange={(e) => setNewUnit({ ...newUnit, category: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  >
                    <option value="Count">Count</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Volume/Liquid">Volume/Liquid</option>
                    <option value="Weight/Mass">Weight/Mass</option>
                    <option value="Length/Area">Length/Area</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Formal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Gallon / Kilogram"
                  value={newUnit.name}
                  onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Standard 3.785-liter container"
                  value={newUnit.description}
                  onChange={(e) => setNewUnit({ ...newUnit, description: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setIsUnitModalOpen(false)} className="px-3 py-1.5 border rounded-lg text-slate-600">Cancel</button>
              <button 
                onClick={() => {
                  if (!newUnit.code || !newUnit.name) return;
                  setSettings({
                    ...settings,
                    units: [...settings.units, { ...newUnit, id: `UOM-0${settings.units.length + 1}` }]
                  });
                  setIsUnitModalOpen(false);
                }}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
              >
                Register Unit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIALOG: Edit Official Modal */}
      {/* ========================================================= */}
      {editingOfficial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Edit3 size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Edit Procurement Official</h3>
                  <p className="text-slate-400 text-xs">Update role and contact details</p>
                </div>
              </div>
              <button onClick={() => setEditingOfficial(null)} className="text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingOfficial.name}
                  onChange={(e) => setEditingOfficial({ ...editingOfficial, name: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Academic / Civil Service Position</label>
                <input
                  type="text"
                  value={editingOfficial.position}
                  onChange={(e) => setEditingOfficial({ ...editingOfficial, position: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Committee Designation</label>
                <select
                  value={editingOfficial.committeeRole}
                  onChange={(e) => setEditingOfficial({ ...editingOfficial, committeeRole: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="BAC Chairperson">BAC Chairperson</option>
                  <option value="BAC Vice-Chairperson">BAC Vice-Chairperson</option>
                  <option value="BAC Member">BAC Member</option>
                  <option value="BAC Secretariat Head">BAC Secretariat Head</option>
                  <option value="Supply & Property Officer">Supply & Property Officer</option>
                  <option value="Inspection & Acceptance (IAC) Member">Inspection & Acceptance (IAC) Member</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Email</label>
                <input
                  type="email"
                  value={editingOfficial.email}
                  onChange={(e) => setEditingOfficial({ ...editingOfficial, email: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={editingOfficial.contact}
                  onChange={(e) => setEditingOfficial({ ...editingOfficial, contact: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setEditingOfficial(null)} className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50">Cancel</button>
              <button 
                onClick={() => handleUpdateOfficial(editingOfficial)}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIALOG: Edit Location Modal */}
      {/* ========================================================= */}
      {editingLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Edit3 size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Edit Campus Facility</h3>
                  <p className="text-slate-400 text-xs">Update depot code, name, and custodian</p>
                </div>
              </div>
              <button onClick={() => setEditingLocation(null)} className="text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Location Code</label>
                <input
                  type="text"
                  value={editingLocation.code}
                  onChange={(e) => setEditingLocation({ ...editingLocation, code: e.target.value.toUpperCase() })}
                  className="w-full p-2 border border-slate-200 rounded-lg font-mono uppercase"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Facility Name</label>
                <input
                  type="text"
                  value={editingLocation.name}
                  onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Building Location</label>
                <input
                  type="text"
                  value={editingLocation.building}
                  onChange={(e) => setEditingLocation({ ...editingLocation, building: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Custodian In-Charge</label>
                <input
                  type="text"
                  value={editingLocation.custodian}
                  onChange={(e) => setEditingLocation({ ...editingLocation, custodian: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Status</label>
                <select
                  value={editingLocation.status}
                  onChange={(e) => setEditingLocation({ ...editingLocation, status: e.target.value as any })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setEditingLocation(null)} className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50">Cancel</button>
              <button 
                onClick={() => handleUpdateLocation(editingLocation)}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIALOG: Edit Supplier Modal */}
      {/* ========================================================= */}
      {editingSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Edit3 size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Edit Accredited Supplier</h3>
                  <p className="text-slate-400 text-xs">Update vendor details and PhilGEPS registration</p>
                </div>
              </div>
              <button onClick={() => setEditingSupplier(null)} className="text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company / Trade Name</label>
                <input
                  type="text"
                  value={editingSupplier.name}
                  onChange={(e) => setEditingSupplier({ ...editingSupplier, name: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">PhilGEPS Number</label>
                  <input
                    type="text"
                    value={editingSupplier.philgepsNumber}
                    onChange={(e) => setEditingSupplier({ ...editingSupplier, philgepsNumber: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    value={editingSupplier.category}
                    onChange={(e) => setEditingSupplier({ ...editingSupplier, category: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={editingSupplier.contactPerson}
                    onChange={(e) => setEditingSupplier({ ...editingSupplier, contactPerson: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingSupplier.phone}
                    onChange={(e) => setEditingSupplier({ ...editingSupplier, phone: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={editingSupplier.email}
                  onChange={(e) => setEditingSupplier({ ...editingSupplier, email: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setEditingSupplier(null)} className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50">Cancel</button>
              <button 
                onClick={() => handleUpdateSupplier(editingSupplier)}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIALOG: Edit Catalog Item Modal */}
      {/* ========================================================= */}
      {editingCatalogItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Edit3 size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Edit Catalog Item</h3>
                  <p className="text-slate-400 text-xs">Update item reference price and specification</p>
                </div>
              </div>
              <button onClick={() => setEditingCatalogItem(null)} className="text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Item Code</label>
                  <input
                    type="text"
                    value={editingCatalogItem.code}
                    onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, code: e.target.value.toUpperCase() })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Unit of Measure</label>
                  <select
                    value={editingCatalogItem.unit}
                    onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, unit: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  >
                    {settings.units.map(u => (
                      <option key={u.code} value={u.code}>{u.code} ({u.name})</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Item Name</label>
                <input
                  type="text"
                  value={editingCatalogItem.name}
                  onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, name: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    value={editingCatalogItem.category}
                    onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, category: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Reference Price (₱)</label>
                  <input
                    type="number"
                    value={editingCatalogItem.referencePrice}
                    onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, referencePrice: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Technical Specification</label>
                <textarea
                  rows={2}
                  value={editingCatalogItem.specification}
                  onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, specification: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setEditingCatalogItem(null)} className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50">Cancel</button>
              <button 
                onClick={() => handleUpdateCatalogItem(editingCatalogItem)}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIALOG: Edit Unit Modal */}
      {/* ========================================================= */}
      {editingUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Edit3 size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Edit Unit of Measurement</h3>
                  <p className="text-slate-400 text-xs">Update unit code, name, and classification</p>
                </div>
              </div>
              <button onClick={() => setEditingUnit(null)} className="text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Unit Code</label>
                  <input
                    type="text"
                    value={editingUnit.code}
                    onChange={(e) => setEditingUnit({ ...editingUnit, code: e.target.value.toLowerCase() })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono lowercase"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={editingUnit.category}
                    onChange={(e) => setEditingUnit({ ...editingUnit, category: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  >
                    <option value="Count">Count</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Volume/Liquid">Volume/Liquid</option>
                    <option value="Weight/Mass">Weight/Mass</option>
                    <option value="Length/Area">Length/Area</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Formal Name</label>
                <input
                  type="text"
                  value={editingUnit.name}
                  onChange={(e) => setEditingUnit({ ...editingUnit, name: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <input
                  type="text"
                  value={editingUnit.description}
                  onChange={(e) => setEditingUnit({ ...editingUnit, description: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setEditingUnit(null)} className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50">Cancel</button>
              <button 
                onClick={() => handleUpdateUnit(editingUnit)}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIALOG: Universal Delete Item Confirmation Dialog */}
      {/* ========================================================= */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Remove Record?</h3>
                <p className="text-slate-500 text-xs">
                  Delete <strong className="text-slate-800">{itemToDelete.name}</strong> from {itemToDelete.type}s?
                </p>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-100">
              This item will be permanently removed from this configuration register and unlinked from associated procurement templates.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeleteItem}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-2xs cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIALOG: Reset All Modules Confirmation Dialog */}
      {/* ========================================================= */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <RotateCcw size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Reset All Configurations?</h3>
                <p className="text-slate-500 text-xs">Restore DepEd institutional defaults</p>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-100">
              This will restore all 9 procurement modules—including School profile, BAC officials, numbering forms, thresholds, chart of accounts, campus depots, and supplier directories—back to their factory default values.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3.5 py-1.5 border rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-2xs cursor-pointer"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
