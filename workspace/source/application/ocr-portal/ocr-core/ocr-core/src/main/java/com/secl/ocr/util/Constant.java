package com.secl.ocr.util;

public abstract class Constant {
	
	
	/********************* Used ****************************/	
	public static final String TABLE_DIR = "table";
	
	public static final String LOGIN = "Login";
	public static final String GOOGLE_LOGIN = "GoogleLogin";
	public static final String LOGOUT = "Logout";	
	public static final String CHANGE_PASSWORD = "ChangePassword";
	public static final String GET_DATA_BY_OID = "GetDataByOID"; 
	public static final String GET_PROFILE_DATA_BY_OID = "GetProfileDataByOID";
	public static final String GET_SALES_ORDER_DATA = "GetAllSaleOrder";
	public static final String GET_ESTIMATE_DATA = "GetEstimateAllData";
	public static final String GET_INVOICE_DATA = "GetAllINVOICEData";
	public static final String GET_NEXT_CODE = "GetNextCode"; 
	public static final String GET_COMPANY_BY_PEOPLE_OID = "GetCompanyByPeopleOID"; 
	
	// Prefix
	public static final int PREFIX_NUMBER_LENGTH = 10;
	public static final String PREFIX_EXPENSE = "Exp-";
	public static final String PREFIX_REQUISITION = "Req-";
	public static final String PREFIX_PURCHASE_ORDER = "PO-";
	public static final String PREFIX_BILL = "Bill-";
	public static final String PREFIX_PAYMENT_MADE = "PM-";
	public static final String PREFIX_DEBIT_VOUCHER = "DV-";
	public static final String PREFIX_VENDOR_CREDIT = "VC-";
	public static final String PREFIX_ESTIMATE = "Est-";
	public static final String PREFIX_SALES_ORDER = "SO-";
	public static final String PREFIX_INVOICE = "Inv-";
	public static final String PREFIX_PAYMENT_RECEIVED = "PR-";
	public static final String PREFIX_BANK_TRANSACTION = "BT-";
	public static final String PREFIX_LOAN_REQUEST = "LR-";
	public static final String CUSTOMER_ID = "Cus-";
	public static final String SUPPLIER_ID = "Sup-";
	public static final String EMPLOYEE_ID = "Emp-";
	public static final String TAX_PERCENT = "taxPercent";
	public static final String REJECT_WORKFLOW_OID = "WF-005";
	public static final String TRANSACTION_ID= "Tnx-";
	
	public static final String GET_ALL_DISTRICT_LIST = "getAllDistrict";
	public static final String GET_THANA = "getAllThana";
	public static final String GET_DIVISION = "getAllDivision";
	public static final String GET_ALL_GROUP_OF_COMPANY = "getAllGroupOfCompany";
	public static final String GET_GROUP_OF_COMPANY = "GetGroupOfCompany";
	public static final String GET_ALL_DEPARTMENT_LIST = "getAllDepartmentList"; 
	public static final String GET_ALL_POST_OFFICE = "getAllPostOffice"; 
	public static final String GET_ALL_EMPLOYEE_LIST = "getAllEmployeeList";
	public static final String GET_EMPLOYEE_BY_OID = "getEmployeeByOid";   
	public static final String GET_GRADE_BY_OID = "getGradeByOid";  
	public static final String GET_ALL_REQUISITION = "getAllRequisition";
	public static final String GET_ALL_PURCHASE_ORDER = "getAllPurchaseOrder";
	public static final String GET_ALL_SALES_ORDER = "getAllSalesOrder";
	public static final String GET_ALL_BILL = "getAllBill";
	public static final String GET_ALL_VENDORCREDIT = "getAllVendorCredit";
	public static final String GET_ALL_EXPENSE = "getAllExpense";
	public static final String GET_ACCESS_PERMISSION_DATA = "GetAccessPermissionData";
	public static final String GET_REJECTION_WORKFLOW = "GetRejectionWorkFlow";
	public static final String GET_ONLY_APPROVED_WORKFLOW = "GetOnlyApprovedWorkFlow";
	public static final String GET_WORKFLOW_LIST_BY_COMPANY_FEATURE = "GetWorkFlowListByCompanyFeature";
	public static final String GET_WORKFLOW_LIST = "GetWorkFlowList";
	public static final String GET_DRAFT_PEOPLE = "GetDraftPeople";
	public static final String SWITCH_ROLE = "switchrole";
	public static final String REPORT = "jasperreports";
	public static final String SYSTEM_USER = "systemUser";
	public static final String GROUP_OF_COMPANY_USER = "groupOfCompanyUser";
	public static final String COMPANY_USER = "companyUser";
	public static final String GET_ALL = "GetAll";
	public static final String GET_ALL_UNPOSTED_BILL = "GetAllUnPostedBill";
	public static final String GET_ALL_UNPOSTED_BILL_BY_OID = "GetAllUnPostedBillByOid";
	public static final String GET_ALL_LEDGER_SUB_GROUP = "GetAllLedgerSubGroup";
	public static final String GET_LEDGER_BALANCE = "GetLedgerBalance";
	public static final String GET_ALLOPENEDCLOSEDFP = "GetAllOpenedClosedFP";
	public static final String CLOSE_PERIOD = "CloseFinancialPeriod";
	public static final String GET_JOURNAL_SUMMARY_BY_JOURNAL_MANNER = "GetJournalSummaryByJournalManner"; 
	
	/******************** OID ************************/
	public static final String FEATURE_REQUISITION_OID = "purchaserequisitions";
	public static final String FEATURE_PURCHASEORDER_OID = "purchaseorders";
	public static final String FEATURE_BILL_OID = "bills";
	public static final String FEATURE_EXPENSE_OID = "expenses";
	public static final String FEATURE_PAYMENTS_MADE_OID = "paymentsmade";
	public static final String FEATURE_LOAN_REQUEST_OID = "loanrequisitions";
	public static final String FEATURE_ESTIMATE_OID = "estimates";
	public static final String FEATURE_SALESORDER_OID = "salesorders";

	/******************** WorkFLow ************************/
	public static final String DRAFT = "Draft";
	public static final String TOP = "Top";
	public static final String MIDDLE = "Middle";
	public static final String LAST = "Last";
	public static final String EXPENSE = "Expense";
	public static final String BILL = "Bill";

	
	/******************* Accounting ***********************/
	public static final String GET_ALL_LEDGERSUBGROUP_LIST = "getAllLedgerSubGroupList";
	public static final String GET_ALL_LEDGER_BY_OID = "getLedgerByOid";
	public static final String GET_LEDGERSETTING_BY_OID = "GetDataByOID";
	public static final String GET_ALL_LEDGER_BY_SUBGROUPOID = "getLedgerBySubGroupOid";   
	public static final String GET_CHART_OF_ACCOUNT = "GetChartOfAccount";  
	public static final String PAYMENT = "Payment";   
	
	public static final String CASH_IN = "Cash In";   
	public static final String CASH_OUT = "Cash Out";   

	/******************* Inventory ***********************/
	public static final String MARK_AS_SENT_OR_ACCEPTED = "MarkAsSentOrAccepted";
	public static final String CONVERT_TO_SEND = "ConvertToSend";
	public static final String CONVERT_TO_OPEN = "ConvertToOpen";
	public static final String UPDATE_STATUS = "UpdateStatus";
	public static final String GET_BY_PARAM = "GetByParam";
	public static final String UPDATE_INVOICE = "UpdateInvoice"; 
	public static final String DELETE_INVOICE = "DeleteInvoice";
	public static final String GET_INVOICE_DATA_BY_OID = "GetInvoiceDataByOID";
	public static final String GET_DUE_INVOICE_DATA_BY_CUSTOMEROID = "GetDueInvoiceDataByCustomerOID";
	public static final String GET_DUE_BILL_DATA_BY_SUPPLIER_OID = "GetDueBillDataBySupplierOID";
	public static final String GET_DUE_INVOICE_DATA_BY_CUSTOMER_OID = "GetDueInvoiceDataByCustomerOID";
	public static final String SAVE_BILL_PAYMENT = "SaveBillPayment"; 
	public static final String PAID = "Paid";
	public static final String PARTIAL_PAID = "Partially Paid";
	public static final String GET_BATCH_DETAIL_BY_OID = "GetWareHouseByProductOid"; 
	public static final String GET_BATCH_INFO_BY_PW_OID = "GetBatchInfoByProductWarehouseOid"; 
	public static final String GET_BATCH_DETAIL_BY_PWB_OID = "GetBatchDetailByProductWarehouseBatchOid"; 
	public static final String SAVE_INVOICE_PAYMENT_RECEIVED = "SaveInvoicePaymentReceived";
	public static final String INVOICE_PAYMENT_RECEIVED = "GetAllPaymentReceived";
	public static final String GET_DISBURSEMENT_BY_PAYMENT_MADE_OID = "GetDisbursementByPaymentMadeOid";
	public static final String GET_ALL_PAYMENT_DISBURSEMENT = "GetAllPaymentDisbursement";
	
	
	
	/****************** Not Found ************************/
	public static final String ADMIN = "Admin";
	public static final String UTIL_DATE_FORMAT = "dd/MM/yyyy"; 
	public static final String POSTGRES_SQL_DATE_FORMAT = "yyyy-MM-dd";
	public static final String YES_SHORT = "Y";
	public static final String NO_SHORT = "N";
	public static final String DELETE = "Delete";
	public static final String SAVE = "Save";
	public static final String SAVE_PEOPLE = "SavePeople";
	public static final String UPDATE_PEOPLE = "UpdatePeople";
	
	
	public static final String SAVE_USER = "SaveUser";
	public static final String UPDATE = "Update"; 
	
	public static final String ACTIVE_STATUS = "A";
	public static final String INACTIVE_STATUS = "I";
	
	public static final String GET_META_DATA_BY_OID = "GetMetaDataByOID";
	public static final String PDF = "pdf";
	public static final String CSV = "csv";
	public static final String JAVA_BEAN = "javabean";
	

	
	

	
	
	
	
	
	
	
	
}
