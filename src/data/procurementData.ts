import { PurchaseOrder, PurchaseRequest, SystemSettings } from '../types/procurement';

export const initialPurchaseOrdersData: PurchaseOrder[] = [
  { 
    id: 'PO-2026-001', 
    prRef: 'PR-2026-001', 
    iarRef: null, 
    date: 'Oct 05, 2026', 
    supplier: 'TechCorp Industries', 
    amount: '₱14,500.00', 
    amountNumber: 14500,
    status: 'Pending', 
    itemsCount: 4, 
    department: 'IT Infrastructure', 
    requester: 'John Doe',
    deliveryDate: 'Oct 20, 2026',
    items: [
      { name: 'Server Rack Mount 42U', qty: 1, unit: 'unit', unitPrice: 7000, total: 7000 },
      { name: 'Cat6 Ethernet Spool (1000ft)', qty: 2, unit: 'spool', unitPrice: 2500, total: 5000 },
      { name: 'RJ45 Connectors (Pack of 100)', qty: 5, unit: 'pack', unitPrice: 300, total: 1500 },
      { name: 'Patch Cable Management Panel', qty: 2, unit: 'pcs', unitPrice: 500, total: 1000 },
    ]
  },
  { 
    id: 'PO-2026-005', 
    prRef: 'PR-2026-005', 
    iarRef: null, 
    date: 'Sep 25, 2026', 
    supplier: 'Initech Solutions', 
    amount: '₱6,400.00', 
    amountNumber: 6400,
    status: 'Pending', 
    itemsCount: 3, 
    department: 'Engineering', 
    requester: 'Michael Brown',
    deliveryDate: 'Oct 15, 2026',
    items: [
      { name: 'Mechanical Ergonomic Keyboard', qty: 4, unit: 'pcs', unitPrice: 900, total: 3600 },
      { name: 'Precision Wireless Mouse', qty: 4, unit: 'pcs', unitPrice: 500, total: 2000 },
      { name: 'Desk Anti-Static Mat', qty: 4, unit: 'pcs', unitPrice: 200, total: 800 },
    ]
  },
  { 
    id: 'PO-2026-006', 
    prRef: 'PR-2026-006', 
    iarRef: null, 
    date: 'Sep 24, 2026', 
    supplier: 'Prime Logistics', 
    amount: '₱12,100.00', 
    amountNumber: 12100,
    status: 'Pending', 
    itemsCount: 8, 
    department: 'Operations', 
    requester: 'Sarah Wilson',
    deliveryDate: 'Oct 12, 2026',
    items: [
      { name: 'Heavy Duty Storage Pallets', qty: 10, unit: 'units', unitPrice: 800, total: 8000 },
      { name: 'Industrial Stretch Film Wrap', qty: 12, unit: 'rolls', unitPrice: 250, total: 3000 },
      { name: 'Carton Sealing Tape Dispenser', qty: 5, unit: 'pcs', unitPrice: 220, total: 1100 },
    ]
  },
  { 
    id: 'PO-2026-009', 
    prRef: 'PR-2026-009', 
    iarRef: null, 
    date: 'Sep 18, 2026', 
    supplier: 'Delta Tech', 
    amount: '₱3,100.00', 
    amountNumber: 3100,
    status: 'Pending', 
    itemsCount: 1, 
    department: 'R&D', 
    requester: 'Kevin Thomas',
    deliveryDate: 'Oct 08, 2026',
    items: [
      { name: 'Digital Multimeter & Oscilloscope Kit', qty: 1, unit: 'kit', unitPrice: 3100, total: 3100 },
    ]
  },
  { 
    id: 'PO-2026-011', 
    prRef: 'PR-2026-011', 
    iarRef: null, 
    date: 'Sep 12, 2026', 
    supplier: 'Vertex Global', 
    amount: '₱15,000.00', 
    amountNumber: 15000,
    status: 'Pending', 
    itemsCount: 10, 
    department: 'IT Infrastructure', 
    requester: 'Brian Taylor',
    deliveryDate: 'Oct 02, 2026',
    items: [
      { name: 'Enterprise Managed Gigabit Switch 24-Port', qty: 2, unit: 'units', unitPrice: 6000, total: 12000 },
      { name: 'SFP+ Fiber Transceiver Module', qty: 4, unit: 'pcs', unitPrice: 750, total: 3000 },
    ]
  },
  { 
    id: 'PO-2026-014', 
    prRef: 'PR-2026-014', 
    iarRef: null, 
    date: 'Sep 05, 2026', 
    supplier: 'Pioneer Hardware', 
    amount: '₱1,900.00', 
    amountNumber: 1900,
    status: 'Pending', 
    itemsCount: 2, 
    department: 'Facilities', 
    requester: 'Laura Clark',
    deliveryDate: 'Sep 25, 2026',
    items: [
      { name: 'Cordless Drill Driver 18V', qty: 1, unit: 'set', unitPrice: 1400, total: 1400 },
      { name: 'Cobalt Drill Bit Assortment (29-pc)', qty: 1, unit: 'set', unitPrice: 500, total: 500 },
    ]
  },
  { 
    id: 'PO-2026-016', 
    prRef: 'PR-2026-016', 
    iarRef: null, 
    date: 'Aug 30, 2026', 
    supplier: 'Pacific Traders', 
    amount: '₱11,200.00', 
    amountNumber: 11200,
    status: 'Pending', 
    itemsCount: 7, 
    department: 'Operations', 
    requester: 'Megan Robinson',
    deliveryDate: 'Sep 20, 2026',
    items: [
      { name: 'Forklift Safety Warning Beacon & Alarms', qty: 4, unit: 'units', unitPrice: 1800, total: 7200 },
      { name: 'Reflective Safety Vest High-Vis', qty: 20, unit: 'pcs', unitPrice: 200, total: 4000 },
    ]
  },
  { 
    id: 'PO-2026-019', 
    prRef: 'PR-2026-019', 
    iarRef: null, 
    date: 'Aug 22, 2026', 
    supplier: 'Alliance Supplies', 
    amount: '₱3,400.00', 
    amountNumber: 3400,
    status: 'Pending', 
    itemsCount: 2, 
    department: 'Procurement', 
    requester: 'Matthew Hall',
    deliveryDate: 'Sep 10, 2026',
    items: [
      { name: 'High-Volume Laminating Machine', qty: 1, unit: 'unit', unitPrice: 2400, total: 2400 },
      { name: 'Thermal Laminating Pouches (Letter, 200pk)', qty: 2, unit: 'packs', unitPrice: 500, total: 1000 },
    ]
  },
  { 
    id: 'PO-2026-021', 
    prRef: 'PR-2026-021', 
    iarRef: null, 
    date: 'Aug 18, 2026', 
    supplier: 'NextGen Systems', 
    amount: '₱2,100.00', 
    amountNumber: 2100,
    status: 'Pending', 
    itemsCount: 1, 
    department: 'Finance', 
    requester: 'Rachel Wright',
    deliveryDate: 'Sep 05, 2026',
    items: [
      { name: 'Heavy Duty Thermal Receipt & Voucher Printer', qty: 1, unit: 'unit', unitPrice: 2100, total: 2100 },
    ]
  },
  // Delivered items
  { 
    id: 'PO-2026-002', 
    prRef: 'PR-2026-002', 
    iarRef: 'IAR-2026-042', 
    date: 'Oct 04, 2026', 
    supplier: 'Office Supplies Inc', 
    amount: '₱850.00', 
    amountNumber: 850,
    status: 'Delivered', 
    itemsCount: 2, 
    department: 'Admin Services', 
    requester: 'Jane Smith',
    deliveryDate: 'Oct 08, 2026',
    items: [
      { name: 'A4 Copy Paper 80gsm (Box of 5 reams)', qty: 2, unit: 'boxes', unitPrice: 425, total: 850 }
    ]
  },
  { 
    id: 'PO-2026-004', 
    prRef: 'PR-2026-004', 
    iarRef: 'IAR-2026-045', 
    date: 'Sep 28, 2026', 
    supplier: 'Acme Corp', 
    amount: '₱1,200.00', 
    amountNumber: 1200,
    status: 'Delivered', 
    itemsCount: 1, 
    department: 'Facilities', 
    requester: 'Emily Davis',
    deliveryDate: 'Oct 01, 2026',
    items: [
      { name: 'LED High-Bay Industrial Fixture', qty: 2, unit: 'pcs', unitPrice: 600, total: 1200 }
    ]
  },
  { 
    id: 'PO-2026-007', 
    prRef: 'PR-2026-007', 
    iarRef: 'IAR-2026-049', 
    date: 'Sep 22, 2026', 
    supplier: 'Alpha Systems', 
    amount: '₱4,500.00', 
    amountNumber: 4500,
    status: 'Delivered', 
    itemsCount: 2, 
    department: 'IT Infrastructure', 
    requester: 'David Miller',
    deliveryDate: 'Sep 27, 2026',
    items: [
      { name: '1000VA Smart UPS Battery Backup', qty: 3, unit: 'pcs', unitPrice: 1500, total: 4500 }
    ]
  },
  // Partially Delivered items
  { 
    id: 'PO-2026-003', 
    prRef: 'PR-2026-003', 
    iarRef: 'IAR-2026-043', 
    date: 'Oct 01, 2026', 
    supplier: 'Global Logistics', 
    amount: '₱3,200.00', 
    amountNumber: 3200,
    status: 'Partially Delivered', 
    itemsCount: 5, 
    department: 'Logistics', 
    requester: 'Robert Fox',
    deliveryDate: 'Oct 06, 2026',
    items: [
      { name: 'Barcode Scanners 2D Wireless', qty: 4, unit: 'units', unitPrice: 800, total: 3200 }
    ]
  },
  { 
    id: 'PO-2026-008', 
    prRef: 'PR-2026-008', 
    iarRef: 'IAR-2026-050', 
    date: 'Sep 20, 2026', 
    supplier: 'Beta Corp', 
    amount: '₱9,800.00', 
    amountNumber: 9800,
    status: 'Partially Delivered', 
    itemsCount: 6, 
    department: 'Procurement', 
    requester: 'Lisa Anderson',
    deliveryDate: 'Sep 26, 2026',
    items: [
      { name: 'Steel Modular Shelving Units', qty: 7, unit: 'units', unitPrice: 1400, total: 9800 }
    ]
  }
];

export const initialPurchaseRequestsData: PurchaseRequest[] = [
  {
    id: 'PR-2026-001',
    date: 'Oct 01, 2026',
    department: 'IT Infrastructure',
    requester: 'John Doe',
    purpose: 'Data center rack reinforcement & cabling expansion',
    estimatedAmount: 14500,
    status: 'Approved',
    poRef: 'PO-2026-001',
    urgency: 'Normal',
    items: [
      { name: 'Server Rack Mount 42U', qty: 1, unit: 'unit', estUnitPrice: 7000, total: 7000 },
      { name: 'Cat6 Ethernet Spool (1000ft)', qty: 2, unit: 'spool', estUnitPrice: 2500, total: 5000 },
      { name: 'RJ45 Connectors (Pack of 100)', qty: 5, unit: 'pack', estUnitPrice: 300, total: 1500 },
      { name: 'Patch Cable Management Panel', qty: 2, unit: 'pcs', estUnitPrice: 500, total: 1000 },
    ]
  },
  {
    id: 'PR-2026-005',
    date: 'Sep 20, 2026',
    department: 'Engineering',
    requester: 'Michael Brown',
    purpose: 'Developer ergonomic workstation hardware upgrades',
    estimatedAmount: 6400,
    status: 'Approved',
    poRef: 'PO-2026-005',
    urgency: 'Normal',
    items: [
      { name: 'Mechanical Ergonomic Keyboard', qty: 4, unit: 'pcs', estUnitPrice: 900, total: 3600 },
      { name: 'Precision Wireless Mouse', qty: 4, unit: 'pcs', estUnitPrice: 500, total: 2000 },
      { name: 'Desk Anti-Static Mat', qty: 4, unit: 'pcs', estUnitPrice: 200, total: 800 },
    ]
  },
  {
    id: 'PR-2026-006',
    date: 'Sep 19, 2026',
    department: 'Operations',
    requester: 'Sarah Wilson',
    purpose: 'Warehouse bulk packaging & storage pallets',
    estimatedAmount: 12100,
    status: 'Approved',
    poRef: 'PO-2026-006',
    urgency: 'Urgent',
    items: [
      { name: 'Heavy Duty Storage Pallets', qty: 10, unit: 'units', estUnitPrice: 800, total: 8000 },
      { name: 'Industrial Stretch Film Wrap', qty: 12, unit: 'rolls', estUnitPrice: 250, total: 3000 },
      { name: 'Carton Sealing Tape Dispenser', qty: 5, unit: 'pcs', estUnitPrice: 220, total: 1100 },
    ]
  },
  {
    id: 'PR-2026-009',
    date: 'Sep 15, 2026',
    department: 'R&D',
    requester: 'Kevin Thomas',
    purpose: 'Laboratory testing and signal measurement kit',
    estimatedAmount: 3100,
    status: 'Approved',
    poRef: 'PO-2026-009',
    urgency: 'Normal',
    items: [
      { name: 'Digital Multimeter & Oscilloscope Kit', qty: 1, unit: 'kit', estUnitPrice: 3100, total: 3100 },
    ]
  },
  {
    id: 'PR-2026-011',
    date: 'Sep 08, 2026',
    department: 'IT Infrastructure',
    requester: 'Brian Taylor',
    purpose: 'High-speed network switch replacements for server room',
    estimatedAmount: 15000,
    status: 'Approved',
    poRef: 'PO-2026-011',
    urgency: 'Urgent',
    items: [
      { name: 'Enterprise Managed Gigabit Switch 24-Port', qty: 2, unit: 'units', estUnitPrice: 6000, total: 12000 },
      { name: 'SFP+ Fiber Transceiver Module', qty: 4, unit: 'pcs', estUnitPrice: 750, total: 3000 },
    ]
  },
  {
    id: 'PR-2026-022',
    date: 'Oct 04, 2026',
    department: 'Marketing & Comms',
    requester: 'Alicia Keyser',
    purpose: 'Q4 trade expo booth collateral and high-definition backdrop prints',
    estimatedAmount: 8900,
    status: 'Approved',
    poRef: null,
    urgency: 'Urgent',
    items: [
      { name: 'Custom Tension Fabric Display Banner 10ft', qty: 2, unit: 'sets', estUnitPrice: 3200, total: 6400 },
      { name: 'Retractable Roll-Up Floor Banners', qty: 4, unit: 'pcs', estUnitPrice: 625, total: 2500 }
    ]
  },
  {
    id: 'PR-2026-023',
    date: 'Oct 03, 2026',
    department: 'IT Infrastructure',
    requester: 'John Doe',
    purpose: 'Emergency replacement of backup power batteries for UPS Bank 2',
    estimatedAmount: 11500,
    status: 'Pending',
    poRef: null,
    urgency: 'Urgent',
    items: [
      { name: '12V 100Ah Sealed Lead Acid Deep-Cycle Battery', qty: 4, unit: 'units', estUnitPrice: 2500, total: 10000 },
      { name: 'Heavy-gauge interconnect cables & terminal boots', qty: 1, unit: 'set', estUnitPrice: 1500, total: 1500 }
    ]
  },
  {
    id: 'PR-2026-024',
    date: 'Oct 02, 2026',
    department: 'Human Resources',
    requester: 'Carla Gomez',
    purpose: 'New hire onboarding welcome kits & biometric access cards',
    estimatedAmount: 4300,
    status: 'Pending',
    poRef: null,
    urgency: 'Normal',
    items: [
      { name: 'RFID Proximity Smart Cards (Pack of 50)', qty: 2, unit: 'packs', estUnitPrice: 950, total: 1900 },
      { name: 'Corporate Branded Laptop Sleeves & Lanyards', qty: 30, unit: 'sets', estUnitPrice: 80, total: 2400 }
    ]
  },
  {
    id: 'PR-2026-025',
    date: 'Oct 01, 2026',
    department: 'Facilities',
    requester: 'Laura Clark',
    purpose: 'Annual HVAC filter cycle replacement for Headquarters Floors 2-5',
    estimatedAmount: 7800,
    status: 'Approved',
    poRef: null,
    urgency: 'Normal',
    items: [
      { name: 'Commercial MERV 13 Air Filter 24x24x2', qty: 24, unit: 'pcs', estUnitPrice: 250, total: 6000 },
      { name: 'HEPA Auxiliary Pre-filter rolls', qty: 3, unit: 'rolls', estUnitPrice: 600, total: 1800 }
    ]
  },
  {
    id: 'PR-2026-026',
    date: 'Sep 29, 2026',
    department: 'Finance & Accounting',
    requester: 'Rachel Wright',
    purpose: 'Archival heavy-duty fireproof filing boxes and document binding',
    estimatedAmount: 2600,
    status: 'Pending',
    poRef: null,
    urgency: 'Low',
    items: [
      { name: 'Fire-Resistant Document Storage Cases', qty: 2, unit: 'cases', estUnitPrice: 1000, total: 2000 },
      { name: 'Thermal Binding Spine Covers (Assorted)', qty: 3, unit: 'boxes', estUnitPrice: 200, total: 600 }
    ]
  },
  {
    id: 'PR-2026-027',
    date: 'Sep 28, 2026',
    department: 'Operations',
    requester: 'David Vance',
    purpose: 'Commercial espresso machine & custom branded ceramic drinkware',
    estimatedAmount: 18500,
    status: 'Rejected',
    poRef: null,
    urgency: 'Low',
    items: [
      { name: 'Commercial Bean-to-Cup Espresso Machine', qty: 1, unit: 'unit', estUnitPrice: 16000, total: 16000 },
      { name: 'Branded Ceramic Espresso Cups & Saucers (Set of 24)', qty: 1, unit: 'set', estUnitPrice: 2500, total: 2500 }
    ]
  }
];

export const defaultSystemSettingsData: SystemSettings = {
  school: {
    agency: 'Department of Education',
    schoolName: 'Pagadian City National Comprehensive High School',
    schoolId: '303906',
    region: 'Region IX – Zamboanga Peninsula',
    division: 'Division of Pagadian City',
    divisionCode: 'Division of Pagadian City',
    district: 'District IV / Cluster Central',
    entityCode: '07 001 0000000',
    responsibilityCenterCode: '07-04-0303906',
    address: 'Banale, Pagadian City, Zamboanga del Sur 7016',
    contactNumber: '(062) 214-1234',
    email: '303906@deped.gov.ph',
    schoolHead: 'Secondary School Principal IV',
    headTitle: 'Head of Procuring Entity (HoPE)',
    currency: 'PHP',
    fiscalYear: '2026',
    defaultFundCluster: '01 - Regular Agency Fund (General Appropriations / MOOE)',
    classification: 'Secondary Mega School (Implementing Unit)',
    tinNumber: '000-845-123-000',
    auditTrail: 'DepEd Division of Pagadian City Official Masterlist FY 2026'
  },
  organization: {
    offices: [
      { id: 'OFF-ADM', code: 'ADM-EXEC', name: 'Office of the Principal / Executive Unit', parentOffice: 'Division of Pagadian City', headOfOffice: 'Principal IV', headPosition: 'School Principal IV', stationType: 'Executive Office', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'DepEd Central Plantilla' },
      { id: 'OFF-BAC', code: 'BAC-SEC', name: 'Bids and Awards Committee Secretariat', parentOffice: 'Office of the Principal', headOfOffice: 'Needs Verification', headPosition: 'BAC Secretariat Head', stationType: 'Administrative Unit', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'School BAC Special Order No. 01' },
      { id: 'OFF-PROP', code: 'PROP-SUP', name: 'Supply and Property Custodianship Unit', parentOffice: 'Office of the Principal', headOfOffice: 'Supply Officer II', headPosition: 'School Property Custodian', stationType: 'Administrative Unit', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'COA Property Guidelines 2026' },
      { id: 'OFF-SCI', code: 'DEPT-SCI', name: 'Science & Technology Academic Department', parentOffice: 'Academic Affairs', headOfOffice: 'Head Teacher VI (Science)', headPosition: 'Department Head', stationType: 'Academic Department', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'Academic Department Order' },
      { id: 'OFF-ICT', code: 'DEPT-ICT', name: 'Information & Communications Technology (ICT) Depot', parentOffice: 'Academic Affairs', headOfOffice: 'School ICT Coordinator', headPosition: 'Master Teacher I', stationType: 'Laboratory Depot', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'DepEd ICT Special Order' },
      { id: 'OFF-TVL', code: 'DEPT-TVL', name: 'Technical-Vocational-Livelihood (TVL) Workshops', parentOffice: 'Academic Affairs', headOfOffice: 'Master Teacher II (Industrial Arts)', headPosition: 'TVL Coordinator', stationType: 'Laboratory Depot', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'TVL Workshop Designation' }
    ],
    locations: [
      { id: 'LOC-01', code: 'WH-MAIN', name: 'Central Property & Supply Stockroom', officeId: 'OFF-PROP', accountableOffice: 'Supply and Property Unit', building: 'Administrative Complex, Ground Floor', floor: '1st Floor', room: 'Room 102', binRackStockroom: 'Storage Bays A1 to C4', custodian: 'School Property Custodian', contactNumber: '(062) 214-1234 Loc. 104', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'Stockroom Audit Log 2026' },
      { id: 'LOC-02', code: 'DEPOT-IT', name: 'Central Server Room & ICT Hardware Depot', officeId: 'OFF-ICT', accountableOffice: 'ICT Department', building: 'DCP Technology Center', floor: '2nd Floor', room: 'Room 205', binRackStockroom: 'Rack R-01 to R-08', custodian: 'School ICT Coordinator', contactNumber: '(062) 214-1234 Loc. 108', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'DCP Inventory Ver. 2.1' },
      { id: 'LOC-03', code: 'SCI-LAB', name: 'Integrated Science Laboratory Stockroom', officeId: 'OFF-SCI', accountableOffice: 'Science Department', building: 'Science Academic Building', floor: '3rd Floor', room: 'Lab Prep Room B', binRackStockroom: 'Chemical & Glassware Cabinets S1-S6', custodian: 'Science Lab Custodian', contactNumber: '(062) 214-1234 Loc. 112', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'Laboratory Chemical Safety Log' },
      { id: 'LOC-04', code: 'TVL-WKP', name: 'TVL Industrial Arts Machinery Stockyard', officeId: 'OFF-TVL', accountableOffice: 'TVL Department', building: 'TVL Engineering Wing', floor: 'Ground Floor', room: 'Tool Room 101', binRackStockroom: 'Power Tool Lockers T1-T4', custodian: 'Needs Verification', contactNumber: '(062) 214-1234 Loc. 120', status: 'Needs Verification', effectiveDate: '2026-01-01', auditTrail: 'Designation Pending Verification' },
      { id: 'LOC-05', code: 'ADM-ARCH', name: 'Administrative Records & Archives Depository', officeId: 'OFF-ADM', accountableOffice: 'Executive Unit', building: 'Administrative Complex', floor: '2nd Floor', room: 'Archive Room 201', binRackStockroom: 'Fireproof Filing Compactor C-1', custodian: 'Records Officer', contactNumber: '(062) 214-1234 Loc. 102', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'NAP Records Compliance' }
    ]
  },
  personnel: [
    { id: 'PER-01', empId: 'DEPED-303906-001', name: 'Dr. Evelyn R. Mendoza', position: 'Secondary School Principal IV', office: 'Office of the Principal', officialFunction: 'Head of Procuring Entity (HoPE)', committeeRole: 'Head of Procuring Entity (HoPE)', signatoryRoles: ['PR Approval', 'PO Execution', 'Contract Approval', 'PAR Accountability'], documentScope: 'PR, PO, PAR, Contract', delegatedAuthorityLimit: 2000000, appointmentDate: '2024-08-15', status: 'Active', isHistorical: false, auditTrail: 'DepEd Region IX Regional Order 2024-118' },
    { id: 'PER-02', empId: 'DEPED-303906-002', name: 'Engr. Alberto S. Torres', position: 'Master Teacher II', office: 'TVL Department', officialFunction: 'BAC Chairperson', committeeRole: 'BAC Chairperson', signatoryRoles: ['Abstract of Canvass', 'Resolution to Award', 'Notice of Award'], documentScope: 'RFQ, AOC, NOA, BAC Reso', delegatedAuthorityLimit: 2000000, appointmentDate: '2025-01-10', status: 'Active', isHistorical: false, auditTrail: 'PCNCHS School Memorandum No. 04 s. 2025' },
    { id: 'PER-03', empId: 'DEPED-303906-003', name: 'Prof. Maria C. Santos', position: 'Head Teacher III (Science)', office: 'Science Department', officialFunction: 'BAC Vice-Chairperson', committeeRole: 'BAC Vice-Chairperson', signatoryRoles: ['Abstract of Canvass', 'BAC Evaluation'], documentScope: 'RFQ, AOC, BAC Reso', delegatedAuthorityLimit: 1000000, appointmentDate: '2025-01-10', status: 'Active', isHistorical: false, auditTrail: 'PCNCHS School Memorandum No. 04 s. 2025' },
    { id: 'PER-04', empId: 'DEPED-303906-004', name: 'Atty. Francis D. Cruz', position: 'Administrative Officer V', office: 'BAC Secretariat', officialFunction: 'BAC Secretariat Head', committeeRole: 'BAC Secretariat Head', signatoryRoles: ['Canvass Posting', 'Minutes of Opening', 'Purchase Order Verification'], documentScope: 'RFQ, Minutes, PO Check', delegatedAuthorityLimit: 500000, appointmentDate: '2025-01-10', status: 'Active', isHistorical: false, auditTrail: 'PCNCHS School Memorandum No. 04 s. 2025' },
    { id: 'PER-05', empId: 'DEPED-303906-005', name: 'Mr. John Doe', position: 'Supply Officer II', office: 'Property & Supply Unit', officialFunction: 'School Property Custodian', committeeRole: 'Supply & Property Custodian', signatoryRoles: ['Delivery Receipt', 'IAR Acceptance', 'ICS Custody', 'PAR Issuance', 'RIS Release'], documentScope: 'DR, IAR, ICS, PAR, RIS', delegatedAuthorityLimit: 500000, appointmentDate: '2023-03-01', status: 'Active', isHistorical: false, auditTrail: 'Civil Service Plantilla Item 2023' },
    { id: 'PER-06', empId: 'DEPED-303906-006', name: 'Ms. Rachel Wright', position: 'Senior Bookkeeper', office: 'Finance & Accounting', officialFunction: 'School Accountant / Budget Officer', committeeRole: 'School Accountant', signatoryRoles: ['Fund Certification', 'CAF Approval', 'DV Processing'], documentScope: 'CAF, DV, ORS, BURS', delegatedAuthorityLimit: 2000000, appointmentDate: '2023-06-15', status: 'Active', isHistorical: false, auditTrail: 'Finance Assignment Order 2023' },
    { id: 'PER-07', empId: 'DEPED-303906-007', name: 'Mr. Michael Brown', position: 'Senior Science Teacher', office: 'Science Department', officialFunction: 'Inspection Committee Chair', committeeRole: 'Inspection & Acceptance Chair (IAC)', signatoryRoles: ['IAR Inspection Certificate', 'Technical Verification'], documentScope: 'IAR, Inspection Checklist', delegatedAuthorityLimit: 2000000, appointmentDate: '2025-01-10', status: 'Active', isHistorical: false, auditTrail: 'IAC Committee Designation Order' },
    { id: 'PER-08', empId: 'DEPED-303906-008', name: 'Pending Verification Official', position: 'Designation Under Review', office: 'Needs Verification', officialFunction: 'Signatory Records Review', committeeRole: 'Needs Verification', signatoryRoles: ['Needs Verification'], documentScope: 'Under Official Audit', delegatedAuthorityLimit: 0, appointmentDate: '2026-01-01', status: 'Needs Verification', isHistorical: false, notes: 'Awaiting updated division plantilla assignment papers', auditTrail: 'System Verification Flag' }
  ],
  catalog: [
    { id: 'CAT-01', stockNumber: '5020301000-001', name: 'A4 Multi-purpose Copy Paper 80gsm (Box of 5 Reams)', category: 'Office Supplies', subcategory: 'Paper Products', unit: 'box', classification: 'Consumable', uacsCode: '50203010-00', uacsTitle: 'Office Supplies Expenses', referencePrice: 850, propertyTagFormat: 'N/A (Consumable)', usefulLifeYears: 1, warrantyMonths: 0, condition: 'Serviceable / Good', assetStatus: 'In Stock', status: 'Active', specification: 'A4 (210 x 297 mm), 80gsm, 500 sheets/ream, pure white acid-free', auditTrail: 'DBM-PS Reference Catalogue 2026' },
    { id: 'CAT-02', stockNumber: '5020321000-001', name: '24-Port Managed Gigabit Ethernet Switch L2+', category: 'ICT Equipment', subcategory: 'Network Infrastructure', unit: 'unit', classification: 'Semi-Expendable (< ₱50k)', uacsCode: '50203210-00', uacsTitle: 'Semi-Expendable Machinery and Equipment (< ₱50,000)', referencePrice: 6000, propertyTagFormat: 'PCNCHS-SE-ICT-2026-[SEQ]', usefulLifeYears: 5, warrantyMonths: 24, condition: 'Serviceable / Good', assetStatus: 'In Stock', status: 'Active', specification: '24 GbE ports + 4 10G SFP+ uplinks, managed 802.1Q VLAN support (COA Circular 2022-004 Semi-Expendable)', auditTrail: 'Inventory Valuation FY 2026' },
    { id: 'CAT-03', stockNumber: '5020321000-002', name: 'Server Rack Cabinet 42U Perforated Enclosure', category: 'ICT Infrastructure', subcategory: 'Storage Enclosures', unit: 'unit', classification: 'Semi-Expendable (< ₱50k)', uacsCode: '50203210-00', uacsTitle: 'Semi-Expendable Machinery and Equipment (< ₱50,000)', referencePrice: 7000, propertyTagFormat: 'PCNCHS-SE-ICT-2026-[SEQ]', usefulLifeYears: 5, warrantyMonths: 12, condition: 'Serviceable / Good', assetStatus: 'In Stock', status: 'Active', specification: 'Cold-rolled steel 19-inch mounting, vented doors, lockable', auditTrail: 'Inventory Valuation FY 2026' },
    { id: 'CAT-04', stockNumber: '5020301000-002', name: 'Cat6 UTP Solid Pure Copper Cable 305m (1000ft)', category: 'IT Infrastructure', subcategory: 'Cabling & Wiring', unit: 'spool', classification: 'Consumable', uacsCode: '50203010-00', uacsTitle: 'Office Supplies Expenses', referencePrice: 2500, propertyTagFormat: 'N/A (Consumable)', usefulLifeYears: 1, warrantyMonths: 12, condition: 'Serviceable / Good', assetStatus: 'In Stock', status: 'Active', specification: '23AWG pure bare copper, 550MHz UL certified CMR rated', auditTrail: 'DBM-PS Reference Catalogue 2026' },
    { id: 'CAT-05', stockNumber: '5020301000-003', name: 'RJ45 Cat6 Unshielded Modular Plugs (Jar of 100)', category: 'IT Infrastructure', subcategory: 'Connectors', unit: 'pack', classification: 'Consumable', uacsCode: '50203010-00', uacsTitle: 'Office Supplies Expenses', referencePrice: 300, propertyTagFormat: 'N/A (Consumable)', usefulLifeYears: 1, warrantyMonths: 6, condition: 'Serviceable / Good', assetStatus: 'In Stock', status: 'Active', specification: '50-micron gold-plated contacts, 3-prong for solid/stranded wire', auditTrail: 'DBM-PS Reference Catalogue 2026' },
    { id: 'CAT-06', stockNumber: '1060503000-001', name: 'Heavy-Duty Industrial Central Data Server System', category: 'ICT Equipment', subcategory: 'High-Value Computing', unit: 'system', classification: 'PPE (₱50k and above)', uacsCode: '10605030-00', uacsTitle: 'Information and Communications Technology Equipment (PPE)', referencePrice: 185000, propertyTagFormat: 'PCNCHS-PPE-ICT-2026-[SEQ]', usefulLifeYears: 7, warrantyMonths: 36, condition: 'Serviceable / Good', assetStatus: 'In Stock', status: 'Active', specification: 'Dual Intel Xeon processors, 128GB ECC RAM, RAID-10 enterprise SSDs, Redundant PSU. Capitalized under COA Circular 2022-004 (₱50,000 threshold)', auditTrail: 'COA Capitalization Registry 2026' },
    { id: 'CAT-07', stockNumber: '1060502000-001', name: 'High-Volume Commercial Riso/Digital Duplicator Machine', category: 'Office Equipment', subcategory: 'Reprographics', unit: 'unit', classification: 'PPE (₱50k and above)', uacsCode: '10605020-00', uacsTitle: 'Office Equipment (PPE)', referencePrice: 95000, propertyTagFormat: 'PCNCHS-PPE-OFF-2026-[SEQ]', usefulLifeYears: 7, warrantyMonths: 24, condition: 'Serviceable / Good', assetStatus: 'In Stock', status: 'Active', specification: '130ppm high-speed automated digital duplicator for test papers and learning modules (COA PPE >= ₱50k)', auditTrail: 'COA Capitalization Registry 2026' },
    { id: 'CAT-08', stockNumber: '5020321000-003', name: 'Commercial Cordless Brushless Hammer Drill 18V Kit', category: 'Workshop Tools', subcategory: 'Industrial Arts Machinery', unit: 'set', classification: 'Semi-Expendable (< ₱50k)', uacsCode: '50203210-00', uacsTitle: 'Semi-Expendable Machinery and Equipment (< ₱50,000)', referencePrice: 1400, propertyTagFormat: 'PCNCHS-SE-TVL-2026-[SEQ]', usefulLifeYears: 3, warrantyMonths: 12, condition: 'Serviceable / Good', assetStatus: 'In Stock', status: 'Active', specification: 'Brushless motor with 2x 4.0Ah batteries, rapid charger & heavy duty carry case', auditTrail: 'Inventory Valuation FY 2026' }
  ],
  finance: {
    fiscalYear: 'FY 2026',
    currency: 'PHP (₱)',
    fundClusters: [
      { id: 'FC-01', code: '01', name: 'Regular Agency Fund', fundingSource: 'General Appropriations Act (GAA) - School MOOE', subAroNumber: 'SUB-ARO-ROIX-2026-0418', appropriationAmount: 3200000, allottedAmount: 3200000, committedAmount: 1519550, balance: 1680450, coaGamReference: 'GAM Vol. I Chapter 3 Fund Clusters', status: 'Active', effectiveYear: '2026', auditTrail: 'DBM Allotment Release Order FY 2026' },
      { id: 'FC-02', code: '03', name: 'Special Account - Loc. Gov / SEF', fundingSource: 'Special Education Fund (City of Pagadian)', subAroNumber: 'SEF-PAG-2026-0092', appropriationAmount: 1500000, allottedAmount: 1200000, committedAmount: 360000, balance: 840000, coaGamReference: 'Local Government Code Sec. 272', status: 'Active', effectiveYear: '2026', auditTrail: 'Local School Board Resolution 2026-02' },
      { id: 'FC-03', code: '07', name: 'Trust Receipts / Canteen Operations', fundingSource: 'School Canteen Operations & Miscellaneous Trust', subAroNumber: 'TRUST-PCNCHS-2026-01', appropriationAmount: 600000, allottedAmount: 600000, committedAmount: 180000, balance: 420000, coaGamReference: 'DepEd Order No. 8 s. 2007 (Canteen Trust)', status: 'Active', effectiveYear: '2026', auditTrail: 'Canteen Fund Audit Q1 2026' },
      { id: 'FC-04', code: '01-CO', name: 'Capital Outlay Allotment', fundingSource: 'GAA Capital Outlay Sub-Allotment (Infrastructure & Equipment)', subAroNumber: 'SUB-ARO-ROIX-CO-2026-011', appropriationAmount: 3500000, allottedAmount: 3500000, committedAmount: 1050000, balance: 2450000, coaGamReference: 'COA Circular 2022-004 Capitalization Guidelines', status: 'Active', effectiveYear: '2026', auditTrail: 'DepEd Central Office CO Release 2026' }
    ],
    uacsCodes: [
      { id: 'UACS-01', uacsCode: '50203010-00', accountTitle: 'Office Supplies Expenses', expenseCategory: 'MOOE', normalBalance: 'Debit', coaReference: 'GAM Vol. III Chart of Accounts', responsibilityCenter: '07-04-0303906', status: 'Active', auditTrail: 'COA Revised Chart of Accounts' },
      { id: 'UACS-02', uacsCode: '50203210-00', accountTitle: 'Semi-Expendable Machinery and Equipment Expenses (< ₱50,000)', expenseCategory: 'Semi-Expendable Inventory', normalBalance: 'Debit', coaReference: 'COA Circular 2022-004 / GAM Vol. III', responsibilityCenter: '07-04-0303906', status: 'Active', auditTrail: 'COA Revised Chart of Accounts' },
      { id: 'UACS-03', uacsCode: '50203220-00', accountTitle: 'Semi-Expendable Furniture, Fixtures and Books (< ₱50,000)', expenseCategory: 'Semi-Expendable Inventory', normalBalance: 'Debit', coaReference: 'COA Circular 2022-004 / GAM Vol. III', responsibilityCenter: '07-04-0303906', status: 'Active', auditTrail: 'COA Revised Chart of Accounts' },
      { id: 'UACS-04', uacsCode: '10605020-00', accountTitle: 'Office Equipment (PPE >= ₱50,000)', expenseCategory: 'Capital Outlay (PPE)', normalBalance: 'Debit', coaReference: 'GAM Vol. III / COA Circular 2022-004', responsibilityCenter: '07-04-0303906', status: 'Active', auditTrail: 'COA Capitalization Threshold ₱50k' },
      { id: 'UACS-05', uacsCode: '10605030-00', accountTitle: 'Information and Communications Technology Equipment (PPE >= ₱50,000)', expenseCategory: 'Capital Outlay (PPE)', normalBalance: 'Debit', coaReference: 'GAM Vol. III / COA Circular 2022-004', responsibilityCenter: '07-04-0303906', status: 'Active', auditTrail: 'COA Capitalization Threshold ₱50k' }
    ],
    taxWithholdingGoods: 1.0,
    taxWithholdingServices: 2.0,
    finalVatRate: 5.0,
    withholdingTaxGoods: 1.0,
    withholdingTaxServices: 2.0,
    mooeBudget: 3200000,
    mooeBalance: 1680450,
    sefBudget: 1200000,
    sefBalance: 840000,
    capitalOutlayBudget: 3500000,
    capitalOutlayBalance: 2450000
  },
  suppliers: [
    { id: 'SUP-01', name: 'TechCorp Industries', tin: '102-482-190-000', tinVerified: true, philgepsNumber: 'PHILGEPS-PLAT-2026-9901', philgepsStatus: 'Platinum Accredited', category: 'IT Hardware & Networking', contactPerson: 'Arvin Ramos', phone: '0917-882-9900', email: 'sales@techcorp.ph', address: 'Tech Plaza, Ortigas Center, Pasig City', validationStatus: 'Accredited', expiryDate: '2026-12-31', rating: 4.9, status: 'Active', auditTrail: 'Verified via PhilGEPS Registry Q1 2026' },
    { id: 'SUP-02', name: 'Initech Solutions', tin: '210-948-281-000', tinVerified: true, philgepsNumber: 'PHILGEPS-PLAT-2026-3810', philgepsStatus: 'Platinum Accredited', category: 'Ergonomics & Workstations', contactPerson: 'Liza Dizon', phone: '0918-294-1188', email: 'contracts@initech.com', address: 'BGC Corporate Tower, Taguig City', validationStatus: 'Accredited', expiryDate: '2026-11-15', rating: 4.8, status: 'Active', auditTrail: 'Verified via PhilGEPS Registry Q1 2026' },
    { id: 'SUP-03', name: 'Prime Logistics', tin: '401-294-192-000', tinVerified: true, philgepsNumber: 'PHILGEPS-RED-2026-1049', philgepsStatus: 'Red Registered', category: 'Warehousing & Packaging', contactPerson: 'Ramon Santos', phone: '0922-831-9041', email: 'orders@primelogistics.ph', address: 'Pier 4, North Harbor, Manila', validationStatus: 'Accredited', expiryDate: '2026-09-30', rating: 4.7, status: 'Active', auditTrail: 'Verified Tax Clearance 2026' },
    { id: 'SUP-04', name: 'Delta Tech', tin: '302-194-819-000', tinVerified: true, philgepsNumber: 'PHILGEPS-PLAT-2026-4402', philgepsStatus: 'Platinum Accredited', category: 'Laboratory & Electronics', contactPerson: 'Victor Lim', phone: '0917-402-9912', email: 'info@deltatech.ph', address: 'Paseo de Roxas, Makati City', validationStatus: 'Accredited', expiryDate: '2026-10-20', rating: 4.9, status: 'Active', auditTrail: 'Verified via PhilGEPS Registry Q1 2026' },
    { id: 'SUP-05', name: 'Vertex Global', tin: '501-839-281-000', tinVerified: true, philgepsNumber: 'PHILGEPS-PLAT-2026-7811', philgepsStatus: 'Platinum Accredited', category: 'Network Infrastructure', contactPerson: 'Claire Tan', phone: '0919-823-1100', email: 'gov@vertexglobal.com', address: 'Eastwood City Cyberpark, Quezon City', validationStatus: 'Accredited', expiryDate: '2027-01-15', rating: 5.0, status: 'Active', auditTrail: 'Verified via PhilGEPS Registry Q1 2026' },
    { id: 'SUP-06', name: 'Pioneer Hardware', tin: '601-928-112-000', tinVerified: true, philgepsNumber: 'PHILGEPS-RED-2026-8812', philgepsStatus: 'Red Registered', category: 'Tools & Facilities Repair', contactPerson: 'Gary Co', phone: '0920-551-2299', email: 'sales@pioneerhardware.ph', address: 'Aurora Blvd, Quezon City', validationStatus: 'Accredited', expiryDate: '2026-08-30', rating: 4.6, status: 'Active', auditTrail: 'Verified Tax Clearance 2026' },
    { id: 'SUP-07', name: 'Office Supplies Inc', tin: '112-849-201-000', tinVerified: true, philgepsNumber: 'PHILGEPS-PLAT-2026-0044', philgepsStatus: 'Platinum Accredited', category: 'Stationery & Paper Supplies', contactPerson: 'Gina Beltran', phone: '0917-331-4401', email: 'gov_orders@officesupplies.ph', address: 'Espana Blvd, Sampaloc, Manila', validationStatus: 'Accredited', expiryDate: '2026-12-15', rating: 4.8, status: 'Active', auditTrail: 'Verified via PhilGEPS Registry Q1 2026' },
    { id: 'SUP-08', name: 'Zamboanga Provincial Hardware Trading', tin: 'Needs Verification', tinVerified: false, philgepsNumber: 'Needs Verification', philgepsStatus: 'Needs Verification', category: 'Construction & Local Maintenance', contactPerson: 'Needs Verification', phone: '(062) 215-9988', email: 'local_hardware@zamboanga.ph', address: 'Rizal Avenue, Pagadian City, Zamboanga del Sur', validationStatus: 'Needs Verification', expiryDate: 'Needs Verification', rating: 4.2, status: 'Under Review', notes: 'Pending submission of current Mayor Permit & BIR 2303 registration form', auditTrail: 'Supplier Audit Flag 2026-01' }
  ],
  reference: {
    acquisitionModes: [
      { id: 'MOD-01', code: 'SVP', name: 'Small Value Procurement', thresholdLimit: 2000000, legalBasis: 'RA 12009 / NGPA Sec. 33 (Alternative Modes)', versionDate: 'July 2024 / RA 12009', minCanvassQuotations: 3, description: 'Procurement of goods, infrastructure projects, and consulting services not exceeding ₱2,000,000 for National Government Agencies.', status: 'Active', auditTrail: 'RA 12009 NGPA Statutory Baseline' },
      { id: 'MOD-02', code: 'DIRECT', name: 'Direct Acquisition', thresholdLimit: 200000, legalBasis: 'RA 12009 / NGPA Sec. 32 (Direct Retail Purchases)', versionDate: 'July 2024 / RA 12009', minCanvassQuotations: 1, description: 'Direct purchase of readily available off-the-shelf goods from reputable merchants up to ₱200,000 for urgent school operations.', status: 'Active', auditTrail: 'RA 12009 NGPA Direct Acquisition Rule' },
      { id: 'MOD-03', code: 'DEPED-ALLOC', name: 'DepEd Allocation / Issuance', thresholdLimit: 999999999, legalBasis: 'DepEd Order No. 41 s. 2021 (Central Office DCP/Textbook Logistics)', versionDate: 'Official DepEd Circular', minCanvassQuotations: 0, description: 'Central Office and Regional sub-allotment of computer packages, science kits, and instructional materials.', status: 'Active', auditTrail: 'DepEd Central Property System' },
      { id: 'MOD-04', code: 'DONATION', name: 'Donation / Grant', thresholdLimit: 999999999, legalBasis: 'Adopt-a-School Act (RA 8525) & COA GAM Vol. I', versionDate: 'RA 8525 Implementation', minCanvassQuotations: 0, description: 'Assets donated by PTA, alumni, LGUs, and civic foundations subject to Deed of Donation and Inventory Custody.', status: 'Active', auditTrail: 'Adopt-A-School Audit Registry' },
      { id: 'MOD-05', code: 'TRANSFER-IN', name: 'Transfer-In', thresholdLimit: 999999999, legalBasis: 'COA GAM Appendix 76 (Property Transfer Report)', versionDate: 'COA Circular 2020-006', minCanvassQuotations: 0, description: 'Reallocated property transferred from Division Office or other implementing units via approved PTR.', status: 'Active', auditTrail: 'Division Property Transfer Protocol' },
      { id: 'MOD-06', code: 'FABRICATED', name: 'Fabricated / Assembled', thresholdLimit: 500000, legalBasis: 'DepEd TVL In-House Production Guidelines', versionDate: 'TVL Standard Operating Procedure', minCanvassQuotations: 0, description: 'Desks, steel racks, and equipment produced inside PCNCHS TVL workshops with inspection and inventory appraisal.', status: 'Active', auditTrail: 'TVL Production Log' },
      { id: 'MOD-07', code: 'PUBLIC-BID', name: 'Competitive Bidding', thresholdLimit: 999999999, legalBasis: 'RA 12009 / NGPA Title II (Competitive Bidding)', versionDate: 'July 2024 / RA 12009', minCanvassQuotations: 3, description: 'Open competitive public bidding for high-value contracts exceeding SVP ceilings.', status: 'Active', auditTrail: 'GPPB Public Bidding Manual' },
      { id: 'MOD-08', code: 'OTHER', name: 'Other Acquisition Modes', thresholdLimit: 50000, legalBasis: 'COA GAM Vol. I General Principles', versionDate: 'Current COA GAM', minCanvassQuotations: 1, description: 'Miscellaneous verified acquisitions supported by official custody documents.', status: 'Active', auditTrail: 'COA Miscellaneous Rule' }
    ],
    units: [
      { id: 'UOM-01', code: 'pc', name: 'piece', category: 'Count', description: 'Individual discrete standalone unit', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
      { id: 'UOM-02', code: 'unit', name: 'unit', category: 'Count', description: 'Complete machine, device, or appliance', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
      { id: 'UOM-03', code: 'pair', name: 'pair', category: 'Count', description: 'Matched set of two complementary items (e.g. gloves, speakers)', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
      { id: 'UOM-04', code: 'set', name: 'set', category: 'Compound', description: 'Assembled kit or combination of multiple parts', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
      { id: 'UOM-05', code: 'box', name: 'box', category: 'Packaging', description: 'Standard rigid carton container packaging', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
      { id: 'UOM-06', code: 'pack', name: 'pack', category: 'Packaging', description: 'Sealed pouch, bundle, or poly-pack', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
      { id: 'UOM-07', code: 'ream', name: 'ream', category: 'Packaging', description: 'Standard paper ream packaging (500 sheets)', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
      { id: 'UOM-08', code: 'roll', name: 'roll', category: 'Length/Area', description: 'Rolled materials (plastic wrap, wire, tape, filter cloth)', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
      { id: 'UOM-09', code: 'btl', name: 'bottle', category: 'Volume/Liquid', description: 'Sealed bottle container for liquids and reagents', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
      { id: 'UOM-10', code: 'm', name: 'meter', category: 'Length/Area', description: 'Linear length measurement in metric meters', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
      { id: 'UOM-11', code: 'bdl', name: 'bundle', category: 'Packaging', description: 'Tied bundle of lumber, tubing, or folders', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
      { id: 'UOM-12', code: 'dz', name: 'dozen', category: 'Count', description: 'Standard grouping of twelve (12) items', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
      { id: 'UOM-13', code: 'sys', name: 'system', category: 'Compound', description: 'Integrated institutional system or software installation', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' }
    ],
    assetStatuses: [
      { code: 'IN_STOCK', label: 'In Stock', type: 'Lifecycle', description: 'Unissued physical items resting in supply warehouse or depot', status: 'Active' },
      { code: 'ASSIGNED', label: 'Assigned', type: 'Lifecycle', description: 'Issued to an end-user custodian via PAR or ICS', status: 'Active' },
      { code: 'FOR_REPAIR', label: 'For Repair', type: 'Lifecycle', description: 'Defective item scheduled for preventive maintenance or technician service', status: 'Active' },
      { code: 'FOR_INSPECTION', label: 'For Inspection', type: 'Lifecycle', description: 'Pending technical examination by Inspection & Acceptance Committee (IAC)', status: 'Active' },
      { code: 'UNSERVICEABLE', label: 'Unserviceable', type: 'Lifecycle', description: 'Beyond economic repair, ready for appraisal and condemnation', status: 'Active' },
      { code: 'LOST', label: 'Lost', type: 'Lifecycle', description: 'Item missing from physical count; undergoing relief from property accountability', status: 'Active' },
      { code: 'TRANSFERRED', label: 'Transferred', type: 'Lifecycle', description: 'Relocated to another government agency or school via PTR', status: 'Active' },
      { code: 'DISPOSED', label: 'Disposed', type: 'Lifecycle', description: 'Condemned and disposed via public auction, destruction, or recycling', status: 'Active' },
      { code: 'COND_GOOD', label: 'Serviceable / Good', type: 'Condition', description: '100% operational condition with no defects', status: 'Active' },
      { code: 'COND_FAIR', label: 'Fair', type: 'Condition', description: 'Operational with normal signs of cosmetic wear and tear', status: 'Active' },
      { code: 'COND_REPAIR', label: 'Needing Repair', type: 'Condition', description: 'Inoperative but economically restorable through component replacement', status: 'Active' },
      { code: 'COND_OBSOLETE', label: 'Obsolete', type: 'Condition', description: 'Serviceable but outdated technological standard', status: 'Active' },
      { code: 'COND_DAMAGED', label: 'Damaged', type: 'Condition', description: 'Physical damage rendering item unserviceable', status: 'Active' },
      { code: 'COND_CONDEMN', label: 'For Condemnation', type: 'Condition', description: 'Recommended for condemnation by Property Inspector', status: 'Active' }
    ],
    disposalReasons: ['Beyond Economic Repair', 'Obsolete Technology', 'Total Physical Destruction / Wear', 'Lost / Stolen (with Police Blotter)', 'Cannibalized for Spares'],
    inspectionOutcomes: ['Accepted in Full & Compliant', 'Partially Accepted (Deficiencies Noted)', 'Rejected (Non-compliant with Specifications)', 'Subject to Rectification (5-day SLA)']
  },
  documents: [
    { id: 'DOC-01', docType: 'PR', docName: 'Purchase Request', currentFormVersion: 'RA 12009 Standard Form Ver. 2024', prefix: 'PR-2026-', format: 'PR-[YEAR]-[SEQ]', nextSequence: 28, fiscalYearReset: true, issuingOffice: 'Requisitioning Department / Property Office', governingCategory: 'GPPB Procurement Form', legalSourceReference: 'GPPB-TSO RA 12009 Standard Procurement Forms', retentionYears: 10, status: 'Active', effectiveDate: '2024-07-01', auditTrail: 'GPPB Standard Form Advisory 2024-02' },
    { id: 'DOC-02', docType: 'PO', docName: 'Purchase Order', currentFormVersion: 'RA 12009 Standard Form Ver. 2024', prefix: 'PO-2026-', format: 'PO-[YEAR]-[SEQ]', nextSequence: 22, fiscalYearReset: true, issuingOffice: 'Bids & Awards Committee / Supply Office', governingCategory: 'GPPB Procurement Form', legalSourceReference: 'GPPB-TSO RA 12009 Standard Procurement Forms', retentionYears: 10, status: 'Active', effectiveDate: '2024-07-01', auditTrail: 'GPPB Standard Form Advisory 2024-02' },
    { id: 'DOC-03', docType: 'Delivery', docName: 'Delivery Receipt Record', currentFormVersion: 'Commercial / DepEd Standard Receipt Form', prefix: 'DR-2026-', format: 'DR-[YEAR]-[SEQ]', nextSequence: 18, fiscalYearReset: true, issuingOffice: 'Supply & Property Custodian', governingCategory: 'COA Property/Accounting Form', legalSourceReference: 'COA GAM Vol. I Ch. 8 Property Custody', retentionYears: 10, status: 'Active', effectiveDate: '2024-01-01', auditTrail: 'DepEd Delivery Acceptance Rules' },
    { id: 'DOC-04', docType: 'IAR', docName: 'Inspection and Acceptance Report', currentFormVersion: 'COA GAM Appendix 72 Form', prefix: 'IAR-2026-', format: 'IAR-[YEAR]-[SEQ]', nextSequence: 70, fiscalYearReset: true, issuingOffice: 'Inspection & Acceptance Committee (IAC)', governingCategory: 'COA Property/Accounting Form', legalSourceReference: 'COA Government Accounting Manual Appendix 72 (IAR)', retentionYears: 10, status: 'Active', effectiveDate: '2022-05-31', auditTrail: 'COA GAM Published Appendix 72' },
    { id: 'DOC-05', docType: 'ICS', docName: 'Inventory Custodian Slip (< ₱50k Semi-Expendable)', currentFormVersion: 'COA GAM Appendix 69 Form', prefix: 'ICS-2026-', format: 'ICS-[YEAR]-[SEQ]', nextSequence: 105, fiscalYearReset: true, issuingOffice: 'Supply Officer / Property Custodian', governingCategory: 'COA Property/Accounting Form', legalSourceReference: 'COA Government Accounting Manual Appendix 69 (ICS) & Circular 2022-004', retentionYears: 10, status: 'Active', effectiveDate: '2022-05-31', auditTrail: 'COA GAM Appendix 69 (Semi-Expendable < ₱50,000)' },
    { id: 'DOC-06', docType: 'PAR', docName: 'Property Acknowledgment Receipt (>= ₱50k PPE)', currentFormVersion: 'COA GAM Appendix 81 Form', prefix: 'PAR-2026-', format: 'PAR-[YEAR]-[SEQ]', nextSequence: 44, fiscalYearReset: true, issuingOffice: 'Supply Officer / Property Custodian', governingCategory: 'COA Property/Accounting Form', legalSourceReference: 'COA Government Accounting Manual Appendix 81 (PAR) & Circular 2022-004', retentionYears: 10, status: 'Active', effectiveDate: '2022-05-31', auditTrail: 'COA GAM Appendix 81 (PPE Capitalization >= ₱50,000)' },
    { id: 'DOC-07', docType: 'RIS', docName: 'Requisition and Issue Slip (Consumables)', currentFormVersion: 'COA GAM Appendix 63 Form', prefix: 'RIS-2026-', format: 'RIS-[YEAR]-[SEQ]', nextSequence: 132, fiscalYearReset: true, issuingOffice: 'Property Custodian & Requisitioning Office', governingCategory: 'COA Property/Accounting Form', legalSourceReference: 'COA Government Accounting Manual Appendix 63 (RIS)', retentionYears: 10, status: 'Active', effectiveDate: '2022-05-31', auditTrail: 'COA GAM Appendix 63 (Consumables)' },
    { id: 'DOC-08', docType: 'PTR', docName: 'Property Transfer Report', currentFormVersion: 'COA GAM Appendix 76 Form', prefix: 'PTR-2026-', format: 'PTR-[YEAR]-[SEQ]', nextSequence: 12, fiscalYearReset: true, issuingOffice: 'Supply Officer / Property Custodian', governingCategory: 'COA Property/Accounting Form', legalSourceReference: 'COA Government Accounting Manual Appendix 76 (PTR)', retentionYears: 10, status: 'Active', effectiveDate: '2022-05-31', auditTrail: 'COA GAM Appendix 76 (Transfer)' },
    { id: 'DOC-09', docType: 'RPCI', docName: 'Report on Physical Count of Inventories', currentFormVersion: 'COA GAM Appendix 66 Form', prefix: 'RPCI-2026-', format: 'RPCI-[YEAR]-[SEQ]', nextSequence: 4, fiscalYearReset: true, issuingOffice: 'Annual Inventory Committee', governingCategory: 'COA Property/Accounting Form', legalSourceReference: 'COA Government Accounting Manual Appendix 66 (RPCI)', retentionYears: 10, status: 'Active', effectiveDate: '2022-05-31', auditTrail: 'COA GAM Appendix 66' },
    { id: 'DOC-10', docType: 'RPCPPE', docName: 'Report on Physical Count of Property, Plant & Equipment', currentFormVersion: 'COA GAM Appendix 74 Form', prefix: 'RPCPPE-2026-', format: 'RPCPPE-[YEAR]-[SEQ]', nextSequence: 4, fiscalYearReset: true, issuingOffice: 'Annual Inventory Committee', governingCategory: 'COA Property/Accounting Form', legalSourceReference: 'COA Government Accounting Manual Appendix 74 (RPCPPE)', retentionYears: 10, status: 'Active', effectiveDate: '2022-05-31', auditTrail: 'COA GAM Appendix 74' }
  ],
  users: [
    { id: 'USR-01', username: 'principal.mendoza', fullName: 'Dr. Evelyn R. Mendoza', assignedRole: 'HoPE / Principal', permittedPages: ['Dashboard', 'Purchase Requests', 'Purchase Orders', 'Warehouse Inventory', 'System Settings'], approvalAuthorityLimit: 2000000, recordScope: 'All PCNCHS Campus', active: true, lastLogin: 'Oct 05, 2026 09:12 AM', authRequirement: 'Division Two-Factor Authentication', auditTrail: 'Security Admin Enrollment' },
    { id: 'USR-02', username: 'bac.chair.torres', fullName: 'Engr. Alberto S. Torres', assignedRole: 'BAC Chairperson', permittedPages: ['Dashboard', 'Purchase Requests', 'Purchase Orders', 'Warehouse Inventory', 'System Settings'], approvalAuthorityLimit: 2000000, recordScope: 'All PCNCHS Campus', active: true, lastLogin: 'Oct 05, 2026 08:45 AM', authRequirement: 'Division Two-Factor Authentication', auditTrail: 'Security Admin Enrollment' },
    { id: 'USR-03', username: 'secretariat.santos', fullName: 'Dr. M. Santos', assignedRole: 'BAC Secretariat', permittedPages: ['Dashboard', 'Purchase Requests', 'Purchase Orders', 'Warehouse Inventory', 'System Settings'], approvalAuthorityLimit: 500000, recordScope: 'All PCNCHS Campus', active: true, lastLogin: 'Oct 05, 2026 10:24 AM', authRequirement: 'Division Two-Factor Authentication', auditTrail: 'Security Admin Enrollment' },
    { id: 'USR-04', username: 'property.custodian', fullName: 'Mr. John Doe', assignedRole: 'Property Custodian', permittedPages: ['Dashboard', 'Purchase Orders', 'Warehouse Inventory', 'System Settings'], approvalAuthorityLimit: 500000, recordScope: 'Property & Depot Records', active: true, lastLogin: 'Oct 05, 2026 10:05 AM', authRequirement: 'Standard Password + DepEd SSO', auditTrail: 'Security Admin Enrollment' },
    { id: 'USR-05', username: 'iac.inspector', fullName: 'Mr. Michael Brown', assignedRole: 'Inspection Officer', permittedPages: ['Purchase Orders', 'Warehouse Inventory'], approvalAuthorityLimit: 2000000, recordScope: 'Property & Depot Records', active: true, lastLogin: 'Oct 04, 2026 04:30 PM', authRequirement: 'Standard Password + DepEd SSO', auditTrail: 'Security Admin Enrollment' },
    { id: 'USR-06', username: 'sci.head.alicia', fullName: 'Alicia Keyser', assignedRole: 'Department Head', permittedPages: ['Purchase Requests'], approvalAuthorityLimit: 50000, recordScope: 'Departmental Requisitions', active: true, lastLogin: 'Oct 04, 2026 11:20 AM', authRequirement: 'Standard Password + DepEd SSO', auditTrail: 'Security Admin Enrollment' }
  ],
  system: {
    defaultCurrency: 'PHP (₱)',
    fiscalYear: '2026',
    coaCapitalizationThreshold: 50000, // COA Circular No. 2022-004: PPE ₱50k and above
    ngpaDirectAcquisitionThreshold: 200000, // RA 12009 Sec. 32 Direct Retail Acquisition
    ngpaSmallValueThreshold: 2000000, // RA 12009 Sec. 33 Small Value Procurement
    softDeletePolicy: 'Active - records referenced by historical transactions are soft-deleted and flagged Inactive with audit history preserved',
    auditLogRetentionYears: 10,
    backupSchedule: 'Daily Automated Database Snapshots (02:00 AM UTC+8)',
    maxAttachmentSizeMB: 25,
    allowedAttachmentTypes: ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    auditLogs: [
      { id: 'LOG-01', timestamp: '2026-10-05 10:24:12', user: 'bac.secretariat', module: 'System Settings', action: 'Configuration Audit', details: 'Verified canonical PCNCHS school profile: ID 303906, Banale, Pagadian City' },
      { id: 'LOG-02', timestamp: '2026-10-05 10:15:00', user: 'property.custodian', module: 'Catalog & PPE', action: 'Threshold Check', details: 'Enforced COA Circular 2022-004: Semi-Expendable items < ₱50k, PPE ₱50k and above' },
      { id: 'LOG-03', timestamp: '2026-10-05 09:40:22', user: 'bac.chair.torres', module: 'Procurement Rules', action: 'Statutory Update', details: 'Synchronized RA 12009 / NGPA thresholds: SVP ₱2,000,000 & Direct Acquisition ₱200,000' },
      { id: 'LOG-04', timestamp: '2026-10-05 08:30:11', user: 'system', module: 'Database Registry', action: 'Daily Backup', details: 'Automated encrypted database snapshot created successfully' }
    ]
  },

  // Backward-compatibility aliases for existing components
  officials: [
    { id: 'PER-01', empId: 'DEPED-303906-001', name: 'Dr. Evelyn R. Mendoza', position: 'Secondary School Principal IV', office: 'Office of the Principal', officialFunction: 'Head of Procuring Entity (HoPE)', committeeRole: 'Head of Procuring Entity (HoPE)', signatoryRoles: ['PR Approval', 'PO Execution', 'Contract Approval', 'PAR Accountability'], documentScope: 'PR, PO, PAR, Contract', delegatedAuthorityLimit: 2000000, appointmentDate: '2024-08-15', status: 'Active', isHistorical: false, auditTrail: 'DepEd Region IX Regional Order 2024-118' },
    { id: 'PER-02', empId: 'DEPED-303906-002', name: 'Engr. Alberto S. Torres', position: 'Master Teacher II', office: 'TVL Department', officialFunction: 'BAC Chairperson', committeeRole: 'BAC Chairperson', signatoryRoles: ['Abstract of Canvass', 'Resolution to Award', 'Notice of Award'], documentScope: 'RFQ, AOC, NOA, BAC Reso', delegatedAuthorityLimit: 2000000, appointmentDate: '2025-01-10', status: 'Active', isHistorical: false, auditTrail: 'PCNCHS School Memorandum No. 04 s. 2025' },
    { id: 'PER-03', empId: 'DEPED-303906-003', name: 'Prof. Maria C. Santos', position: 'Head Teacher III (Science)', office: 'Science Department', officialFunction: 'BAC Vice-Chairperson', committeeRole: 'BAC Vice-Chairperson', signatoryRoles: ['Abstract of Canvass', 'BAC Evaluation'], documentScope: 'RFQ, AOC, BAC Reso', delegatedAuthorityLimit: 1000000, appointmentDate: '2025-01-10', status: 'Active', isHistorical: false, auditTrail: 'PCNCHS School Memorandum No. 04 s. 2025' },
    { id: 'PER-04', empId: 'DEPED-303906-004', name: 'Atty. Francis D. Cruz', position: 'Administrative Officer V', office: 'BAC Secretariat', officialFunction: 'BAC Secretariat Head', committeeRole: 'BAC Secretariat Head', signatoryRoles: ['Canvass Posting', 'Minutes of Opening', 'Purchase Order Verification'], documentScope: 'RFQ, Minutes, PO Check', delegatedAuthorityLimit: 500000, appointmentDate: '2025-01-10', status: 'Active', isHistorical: false, auditTrail: 'PCNCHS School Memorandum No. 04 s. 2025' },
    { id: 'PER-05', empId: 'DEPED-303906-005', name: 'Mr. John Doe', position: 'Supply Officer II', office: 'Property & Supply Unit', officialFunction: 'School Property Custodian', committeeRole: 'Supply & Property Custodian', signatoryRoles: ['Delivery Receipt', 'IAR Acceptance', 'ICS Custody', 'PAR Issuance', 'RIS Release'], documentScope: 'DR, IAR, ICS, PAR, RIS', delegatedAuthorityLimit: 500000, appointmentDate: '2023-03-01', status: 'Active', isHistorical: false, auditTrail: 'Civil Service Plantilla Item 2023' },
    { id: 'PER-06', empId: 'DEPED-303906-006', name: 'Ms. Rachel Wright', position: 'Senior Bookkeeper', office: 'Finance & Accounting', officialFunction: 'School Accountant / Budget Officer', committeeRole: 'School Accountant', signatoryRoles: ['Fund Certification', 'CAF Approval', 'DV Processing'], documentScope: 'CAF, DV, ORS, BURS', delegatedAuthorityLimit: 2000000, appointmentDate: '2023-06-15', status: 'Active', isHistorical: false, auditTrail: 'Finance Assignment Order 2023' },
    { id: 'PER-07', empId: 'DEPED-303906-007', name: 'Mr. Michael Brown', position: 'Senior Science Teacher', office: 'Science Department', officialFunction: 'Inspection Committee Chair', committeeRole: 'Inspection & Acceptance Chair (IAC)', signatoryRoles: ['IAR Inspection Certificate', 'Technical Verification'], documentScope: 'IAR, Inspection Checklist', delegatedAuthorityLimit: 2000000, appointmentDate: '2025-01-10', status: 'Active', isHistorical: false, auditTrail: 'IAC Committee Designation Order' },
    { id: 'PER-08', empId: 'DEPED-303906-008', name: 'Pending Verification Official', position: 'Designation Under Review', office: 'Needs Verification', officialFunction: 'Signatory Records Review', committeeRole: 'Needs Verification', signatoryRoles: ['Needs Verification'], documentScope: 'Under Official Audit', delegatedAuthorityLimit: 0, appointmentDate: '2026-01-01', status: 'Needs Verification', isHistorical: false, notes: 'Awaiting updated division plantilla assignment papers', auditTrail: 'System Verification Flag' }
  ],
  locations: [
    { id: 'LOC-01', code: 'WH-MAIN', name: 'Central Property & Supply Stockroom', officeId: 'OFF-PROP', accountableOffice: 'Supply and Property Unit', building: 'Administrative Complex, Ground Floor', floor: '1st Floor', room: 'Room 102', binRackStockroom: 'Storage Bays A1 to C4', custodian: 'School Property Custodian', contactNumber: '(062) 214-1234 Loc. 104', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'Stockroom Audit Log 2026' },
    { id: 'LOC-02', code: 'DEPOT-IT', name: 'Central Server Room & ICT Hardware Depot', officeId: 'OFF-ICT', accountableOffice: 'ICT Department', building: 'DCP Technology Center', floor: '2nd Floor', room: 'Room 205', binRackStockroom: 'Rack R-01 to R-08', custodian: 'School ICT Coordinator', contactNumber: '(062) 214-1234 Loc. 108', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'DCP Inventory Ver. 2.1' },
    { id: 'LOC-03', code: 'SCI-LAB', name: 'Integrated Science Laboratory Stockroom', officeId: 'OFF-SCI', accountableOffice: 'Science Department', building: 'Science Academic Building', floor: '3rd Floor', room: 'Lab Prep Room B', binRackStockroom: 'Chemical & Glassware Cabinets S1-S6', custodian: 'Science Lab Custodian', contactNumber: '(062) 214-1234 Loc. 112', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'Laboratory Chemical Safety Log' },
    { id: 'LOC-04', code: 'TVL-WKP', name: 'TVL Industrial Arts Machinery Stockyard', officeId: 'OFF-TVL', accountableOffice: 'TVL Department', building: 'TVL Engineering Wing', floor: 'Ground Floor', room: 'Tool Room 101', binRackStockroom: 'Power Tool Lockers T1-T4', custodian: 'Needs Verification', contactNumber: '(062) 214-1234 Loc. 120', status: 'Needs Verification', effectiveDate: '2026-01-01', auditTrail: 'Designation Pending Verification' },
    { id: 'LOC-05', code: 'ADM-ARCH', name: 'Administrative Records & Archives Depository', officeId: 'OFF-ADM', accountableOffice: 'Executive Unit', building: 'Administrative Complex', floor: '2nd Floor', room: 'Archive Room 201', binRackStockroom: 'Fireproof Filing Compactor C-1', custodian: 'Records Officer', contactNumber: '(062) 214-1234 Loc. 102', status: 'Active', effectiveDate: '2026-01-01', auditTrail: 'NAP Records Compliance' }
  ],
  units: [
    { id: 'UOM-01', code: 'pc', name: 'piece', category: 'Count', description: 'Individual discrete standalone unit', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
    { id: 'UOM-02', code: 'unit', name: 'unit', category: 'Count', description: 'Complete machine, device, or appliance', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
    { id: 'UOM-03', code: 'pair', name: 'pair', category: 'Count', description: 'Matched set of two complementary items (e.g. gloves, speakers)', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
    { id: 'UOM-04', code: 'set', name: 'set', category: 'Compound', description: 'Assembled kit or combination of multiple parts', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
    { id: 'UOM-05', code: 'box', name: 'box', category: 'Packaging', description: 'Standard rigid carton container packaging', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
    { id: 'UOM-06', code: 'pack', name: 'pack', category: 'Packaging', description: 'Sealed pouch, bundle, or poly-pack', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
    { id: 'UOM-07', code: 'ream', name: 'ream', category: 'Packaging', description: 'Standard paper ream packaging (500 sheets)', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
    { id: 'UOM-08', code: 'roll', name: 'roll', category: 'Length/Area', description: 'Rolled materials (plastic wrap, wire, tape, filter cloth)', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
    { id: 'UOM-09', code: 'btl', name: 'bottle', category: 'Volume/Liquid', description: 'Sealed bottle container for liquids and reagents', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
    { id: 'UOM-10', code: 'm', name: 'meter', category: 'Length/Area', description: 'Linear length measurement in metric meters', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
    { id: 'UOM-11', code: 'bdl', name: 'bundle', category: 'Packaging', description: 'Tied bundle of lumber, tubing, or folders', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
    { id: 'UOM-12', code: 'dz', name: 'dozen', category: 'Count', description: 'Standard grouping of twelve (12) items', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' },
    { id: 'UOM-13', code: 'sys', name: 'system', category: 'Compound', description: 'Integrated institutional system or software installation', status: 'Active', auditTrail: 'DepEd Standard UOM Masterlist' }
  ],
  forms: {
    prPrefix: 'PR-2026-',
    prNextSequence: 28,
    poPrefix: 'PO-2026-',
    poNextSequence: 22,
    iarPrefix: 'IAR-2026-',
    iarNextSequence: 70,
    rfqPrefix: 'RFQ-2026-',
    defaultPaperSize: 'A4',
    printLetterhead: true,
    termsAndConditionsText: '1. Delivery must be completed within the stated calendar days.\n2. Subject to formal inspection by the IAC prior to voucher processing (COA GAM App 72).\n3. Goods defective upon arrival must be replaced within five (5) working days.\n4. Subject to RA 12009 (New Government Procurement Act) rules and standard clauses.',
    liquidatedDamagesText: 'A penalty of one-tenth (1/10) of one percent (0.001) of the total unperformed cost shall be deducted per day of delay per RA 12009.'
  },
  rules: {
    smallValueThreshold: 2000000, // RA 12009 Sec. 33 (NGPA) SVP ceiling for NGAs
    directAcquisitionThreshold: 200000, // RA 12009 Sec. 32 Direct Retail Acquisition
    coaCapitalizationThreshold: 50000, // COA Circular 2022-004 (PPE ₱50k and above)
    shoppingEmergencyThreshold: 100000,
    minCanvassQuotations: 3,
    defaultDeliveryPeriodDays: 15,
    liquidatedDamageRate: '0.1% per calendar day of delay (RA 12009)',
    warrantyRetentionRate: 1,
    inspectionGracePeriodDays: 3,
    requirePhilGepsRegistration: true
  }
};
