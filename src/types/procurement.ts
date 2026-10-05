export interface PurchaseOrderItem {
  stockNo?: string;
  name: string;
  qty: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface PurchaseOrder {
  id: string; // P.O. No.
  prRef: string;
  iarRef: string | null;
  date: string;
  supplier: string;
  supplierAddress?: string;
  supplierTin?: string;
  modeOfProcurement?: string;
  placeOfDelivery?: string;
  deliveryDate: string;
  deliveryTerm?: string;
  paymentTerm?: string;
  amount: string;
  amountNumber: number;
  totalAmountInWords?: string;
  status: 'Pending' | 'Delivered' | 'Partially Delivered' | 'Cancelled';
  itemsCount: number;
  department: string;
  requester: string;
  entityName?: string;
  fundCluster?: string;
  authorizedOfficial?: string;
  authorizedOfficialDesignation?: string;
  chiefAccountant?: string;
  orsBursNo?: string;
  orsBursDate?: string;
  items: PurchaseOrderItem[];
}

export interface PurchaseRequest {
  id: string; // PR No.
  entityName?: string;
  fundCluster?: string;
  department: string; // Office/Section
  responsibilityCenterCode?: string;
  date: string;
  requester: string;
  requestedByDesignation?: string;
  approvedBy?: string;
  approvedByDesignation?: string;
  purpose: string;
  estimatedAmount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  poRef: string | null;
  urgency: 'Low' | 'Normal' | 'Urgent';
  items: Array<{
    stockNo?: string;
    name: string;
    qty: number;
    unit: string;
    estUnitPrice: number;
    total: number;
  }>;
}

export interface InspectionReportData {
  iarNo: string;
  date: string;
  entityName: string;
  fundCluster: string;
  supplier: string;
  poNo: string;
  poDate: string;
  requisitioningOffice: string;
  responsibilityCenterCode: string;
  invoiceNo: string;
  invoiceDate: string;
  dateInspected: string;
  isInspectedAndVerified: boolean;
  inspectionOfficer: string;
  inspectionOfficerDesignation: string;
  dateReceived: string;
  acceptanceType: 'Complete' | 'Partial';
  partialQuantityDetail?: string;
  propertyCustodian: string;
  propertyCustodianDesignation: string;
  items: Array<{
    stockNo?: string;
    description: string;
    unit: string;
    quantity: number;
  }>;
}

// -------------------------------------------------------------
// PCNCHS Inventory & Procurement System Settings Types
// 10 Canonical Modules
// -------------------------------------------------------------

export interface SchoolProfile {
  agency: string; // Department of Education
  schoolName: string; // Pagadian City National Comprehensive High School
  schoolId: string; // 303906
  region: string; // Region IX – Zamboanga Peninsula
  division: string; // Division of Pagadian City
  divisionCode?: string; // e.g. Division of Pagadian City
  district: string; // District IV / Cluster Central
  entityCode: string; // 07 001 0000000
  responsibilityCenterCode: string; // 07-04-0303906
  address: string; // Banale, Pagadian City, Zamboanga del Sur 7016
  contactNumber: string; // (062) 214-1234
  email: string; // 303906@deped.gov.ph
  schoolHead: string; // Secondary School Principal IV
  headTitle: string; // Head of Procuring Entity (HoPE)
  currency: string; // PHP
  fiscalYear: string; // 2026
  defaultFundCluster: string; // 01 - Regular Agency Fund (MOOE / Capital Outlay)
  classification: string; // Secondary Mega School (Implementing Unit)
  tinNumber: string; // 000-845-123-000
  auditTrail: string;
}

export interface DepartmentOffice {
  id: string;
  code: string;
  name: string;
  parentOffice: string;
  headOfOffice: string;
  headPosition: string;
  stationType: 'Academic Department' | 'Administrative Unit' | 'Laboratory Depot' | 'Executive Office';
  status: 'Active' | 'Inactive' | 'Needs Verification';
  effectiveDate: string;
  auditTrail: string;
}

export interface CampusLocation {
  id: string;
  code: string;
  name: string;
  officeId: string;
  accountableOffice: string;
  building: string;
  floor: string;
  room: string;
  binRackStockroom: string;
  custodian: string;
  contactNumber: string;
  status: 'Active' | 'Inactive' | 'Under Maintenance';
  effectiveDate: string;
  auditTrail: string;
}

export interface PersonnelSignatory {
  id: string;
  empId: string;
  name: string;
  position: string;
  office: string;
  officialFunction: string;
  committeeRole: string; // e.g. HoPE / Principal, BAC Chairperson, BAC Vice-Chairperson, BAC Member, BAC Secretariat Head, Supply Officer, Inspection Officer
  signatoryRoles: string[]; // e.g. ['PR Approval', 'PO Execution', 'IAR Acceptance', 'ICS Custody', 'PAR Accountability']
  documentScope: string; // e.g. PR, PO, IAR, RIS, ICS, PAR, PTR
  delegatedAuthorityLimit: number; // e.g. 200000, 2000000, or 999999999
  appointmentDate: string;
  status: 'Active' | 'Inactive' | 'Needs Verification';
  isHistorical: boolean;
  notes?: string;
  auditTrail: string;
}

// Backward-compat alias for components referencing SchoolOfficial
export type SchoolOfficial = PersonnelSignatory;

export interface ItemClassification {
  id: string;
  stockNumber: string;
  name: string;
  category: string;
  subcategory: string;
  unit: string;
  classification: 'Consumable' | 'Semi-Expendable (< ₱50k)' | 'PPE (₱50k and above)';
  uacsCode: string;
  uacsTitle: string;
  referencePrice: number;
  propertyTagFormat: string;
  usefulLifeYears: number;
  warrantyMonths: number;
  condition: 'Serviceable / Good' | 'Fair' | 'Needing Repair' | 'Unserviceable';
  assetStatus: 'In Stock' | 'Assigned' | 'For Inspection' | 'For Repair' | 'Unserviceable' | 'Disposed';
  status: 'Active' | 'Inactive' | 'Needs Verification';
  specification: string;
  auditTrail: string;
}

// Backward-compat alias
export type CatalogItem = ItemClassification;

export interface FundClusterRecord {
  id: string;
  code: string; // 01, 02, 03, 07
  name: string; // Regular Agency Fund (General Appropriations)
  fundingSource: string; // MOOE Sub-ARO, Capital Outlay, SEF, Canteen Fund
  subAroNumber: string;
  appropriationAmount: number;
  allottedAmount: number;
  committedAmount: number;
  balance: number;
  coaGamReference: string; // GAM Vol. I Ch. 3
  status: 'Active' | 'Inactive' | 'Needs Verification';
  effectiveYear: string;
  auditTrail: string;
}

export interface UACSObjectCode {
  id: string;
  uacsCode: string; // e.g. 50203010-00, 10605030-00
  accountTitle: string;
  expenseCategory: 'MOOE' | 'Capital Outlay (PPE)' | 'Semi-Expendable Inventory' | 'Personnel Services';
  normalBalance: 'Debit' | 'Credit';
  coaReference: string; // GAM Vol. III Chart of Accounts
  responsibilityCenter: string;
  status: 'Active' | 'Inactive';
  auditTrail: string;
}

export interface SupplierRecord {
  id: string;
  name: string;
  tin: string;
  tinVerified: boolean;
  philgepsNumber: string;
  philgepsStatus: 'Platinum Accredited' | 'Red Registered' | 'Needs Verification';
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  validationStatus: 'Accredited' | 'Needs Verification' | 'Expired' | 'Blacklisted';
  expiryDate: string;
  rating: number;
  status: 'Active' | 'Inactive' | 'Under Review' | 'Blacklisted';
  notes?: string;
  auditTrail: string;
}

export interface AcquisitionMode {
  id: string;
  code: string;
  name: string;
  thresholdLimit: number;
  legalBasis: string; // RA 12009 / NGPA Sec. 32, NGPA Sec. 33
  versionDate: string; // July 2024 / RA 12009 NGPA
  minCanvassQuotations: number;
  description: string;
  status: 'Active' | 'Inactive' | 'Needs Verification';
  auditTrail: string;
}

export interface UnitOfMeasurement {
  id: string;
  code: string; // pc, unit, pair, set, box, pack, ream, roll, btl, m, bdl, dz, sys
  name: string; // piece, unit, pair, set, box, pack, ream, roll, bottle, meter, bundle, dozen, system
  category: 'Count' | 'Packaging' | 'Volume/Liquid' | 'Length/Area' | 'Compound';
  description: string;
  status: 'Active' | 'Inactive';
  auditTrail: string;
}

export interface DocumentRegistry {
  id: string;
  docType: 'PR' | 'PO' | 'Delivery' | 'IAR' | 'RIS' | 'ICS' | 'PAR' | 'PTR' | 'RPCI' | 'RPCPPE';
  docName: string;
  currentFormVersion: string;
  prefix: string;
  format: string; // [PREFIX]-[YEAR]-[SEQ]
  nextSequence: number;
  fiscalYearReset: boolean;
  issuingOffice: string;
  governingCategory: 'GPPB Procurement Form' | 'COA Property/Accounting Form';
  legalSourceReference: string; // GPPB RA 12009, COA GAM App 69 (ICS), App 72 (IAR), App 81 (PAR)
  retentionYears: number; // 10 years
  status: 'Active' | 'Superseded' | 'Needs Verification';
  effectiveDate: string;
  auditTrail: string;
}

export interface UserPermission {
  id: string;
  username: string;
  fullName: string;
  assignedRole: 'Super Admin' | 'HoPE / Principal' | 'BAC Chairperson' | 'BAC Secretariat' | 'Property Custodian' | 'Inspection Officer' | 'Department Head';
  permittedPages: string[];
  approvalAuthorityLimit: number;
  recordScope: 'All PCNCHS Campus' | 'Property & Depot Records' | 'Departmental Requisitions';
  active: boolean;
  lastLogin: string;
  authRequirement: string;
  auditTrail: string;
}

export interface SystemSecurityConfig {
  defaultCurrency: string;
  fiscalYear: string;
  coaCapitalizationThreshold: number; // 50000 (COA Circular 2022-004: PPE ₱50k and above)
  ngpaDirectAcquisitionThreshold: number; // 200000 (RA 12009 Sec. 32)
  ngpaSmallValueThreshold: number; // 2000000 (RA 12009 Sec. 33)
  softDeletePolicy: string;
  auditLogRetentionYears: number;
  backupSchedule: string;
  maxAttachmentSizeMB: number;
  allowedAttachmentTypes: string[];
  auditLogs: Array<{
    id: string;
    timestamp: string;
    user: string;
    module: string;
    action: string;
    details: string;
  }>;
}

export interface SystemSettings {
  school: SchoolProfile;
  organization: {
    offices: DepartmentOffice[];
    locations: CampusLocation[];
  };
  personnel: PersonnelSignatory[];
  catalog: ItemClassification[];
  finance: {
    fiscalYear: string;
    currency: string;
    fundClusters: FundClusterRecord[];
    uacsCodes: UACSObjectCode[];
    taxWithholdingGoods: number;
    taxWithholdingServices: number;
    finalVatRate: number;
    mooeBudget?: number;
    mooeBalance?: number;
  };
  suppliers: SupplierRecord[];
  reference: {
    acquisitionModes: AcquisitionMode[];
    units: UnitOfMeasurement[];
    assetStatuses: Array<{ code: string; label: string; type: 'Lifecycle' | 'Condition'; description: string; status: 'Active' }>;
    disposalReasons: string[];
    inspectionOutcomes: string[];
  };
  documents: DocumentRegistry[];
  users: UserPermission[];
  system: SystemSecurityConfig;

  // Backward-compat aliases
  officials?: PersonnelSignatory[];
  locations?: CampusLocation[];
  units?: UnitOfMeasurement[];
  forms?: any;
  rules?: any;
}
