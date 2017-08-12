package com.secl.ocr.util;

public abstract class Table {
	
	public static final String ROLE = "Role";
	public static final String LOGIN = "Login";
	public static final String LOGIN_LOG = "LoginLog"; 
	public static final String DIVISION = "Division";
	public static final String DISTRICT = "District";
	public static final String THANA = "Thana";
	public static final String POST_OFFICE = "PostOffice";
	public static final String GRID_INFORMATION = "GridInformation";
	public static final String META_PROPERTY = "MetaProperty";
	public static final String WORK_FLOW = "WorkFlow"; 
	public static final String PEOPLE_WORKFLOW = "PeopleWorkFlow";
	public static final String GROUP_OF_COMPANY = "GroupOfCompany"; 
	public static final String COMPANY = "Company";
	public static final String COMPANY_UNIT = "CompanyUnit";
	public static final String GRADE = "Grade";  
	public static final String DEPARTMENT = "Department";
	public static final String DESIGNATION = "Designation";
	public static final String EMPLOYEE = "Employee"; 
	public static final String CONTACT = "People";
	public static final String PEOPLE_EDUCATION = "PeopleEducation"; 
	public static final String PEOPLE_WORK_EXPERIENCE = "PeopleWorkExperience"; 
	public static final String PEOPLE_DEPENDENT = "PeopleDependent"; 
	public static final String USER_WORK_FLOW_CONFIG = "UserWorkFlowConfig";
	public static final String WAREHOUSE= "Warehouse";
	public static final String PRODUCT_CATEGORY = "ProductCategory";
	public static final String PRODUCT_UNIT = "ProductUnit";
	public static final String PRODUCT = "Product";
	public static final String TAX_RATE = "TaxRate";
	public static final String FEATURE = "Feature";
	public static final String BANK = "Bank";
	public static final String BANK_TRANSACTION = "BankTransaction";
	
	/************* Requisition Information ****************/
	public static final String REQUISITION_INFORMATION = "RequisitionInformation";
	public static final String REQUISITION_STATE = "RequisitionState";
	public static final String REQUISITION_DETAIL = "RequisitionDetail";
	public static final String REQUISITION_EXPENSE = "RequisitionExpense";
	public static final String REQUISITION_LOG = "RequisitionLog";
	public static final String REQUISITION_STATE_LOG = "RequisitionStateLog";
	public static final String REQUISITION_DETAIL_LOG = "RequisitionDetailLog";
	public static final String REQUISITION_EXPENSE_LOG = "RequisitionExpenseLog";
	
	/************* Purchase Order Information ****************/
	public static final String PURCHASE_ORDER_INFORMATION = "PurchaseOrderInformation";
	public static final String PURCHASE_ORDER_STATE = "PurchaseOrderState";
	public static final String PURCHASE_ORDER_DETAIL = "PurchaseOrderDetail";
	public static final String PURCHASE_ORDER_EXPENSE = "PurchaseOrderExpense";
	public static final String PURCHASE_ORDER_LOG = "PurchaseOrderLog";
	public static final String PURCHASE_ORDER_STATE_LOG = "PurchaseOrderStateLog";
	public static final String PURCHASE_ORDER_DETAIL_LOG = "PurchaseOrderDetailLog";
	public static final String PURCHASE_ORDER_EXPENSE_LOG = "PurchaseOrderExpenseLog";
	
	/************* Bill Information ****************/
	public static final String BILL_INFORMATION = "BillInformation";
	public static final String BILL_DETAIL = "BillDetail";
	public static final String BILL_STATE = "BillState";
	public static final String BILL_EXPENSE = "BillExpense";
	public static final String BILL_LOG = "BillLog";
	public static final String BILL_STATE_LOG = "BillStateLog";
	public static final String BILL_DETAIL_LOG = "BillDetailLog";
	public static final String BILL_EXPENSE_LOG = "BillExpenseLog";
	public static final String BATCH_INFORMATION = "BatchInformation";
	public static final String BATCH_DETAIL = "BatchDetail";
	public static final String STOCK_DETAIL = "StockDetail";

	/************* Payment Made with Disbursement ****************/
	public static final String PAYMENT_MADE = "PaymentMade";
	public static final String PAYMENT_MADE_DETAIL = "PaymentMadeDetail";
	public static final String PAYMENT_DISBURSEMENT = "PaymentDisbursement";
	public static final String PAYMENT_DISBURSEMENT_DETAIL = "PaymentDisbursementDetail";
	public static final String PAYMENT_DISBURSEMENT_STATE = "PaymentDisbursementState";
	public static final String PAYMENT_DISBURSEMENT_LOG = "PaymentDisbursementLog";
	public static final String PAYMENT_DISBURSEMENT_STATE_LOG = "PaymentDisbursementStateLog";
	public static final String PAYMENT_DISBURSEMENT_DETAIL_LOG = "PaymentDisbursementDetailLog";
	
	/************* Estimate Information ****************/
	public static final String ESTIMATE_INFORMATION = "EstimateInformation";
	public static final String ESTIMATE_STATE = "EstimateState";
	public static final String ESTIMATE_DETAIL = "EstimateDetail";
	public static final String ESTIMATE_EXPENSE = "EstimateExpense";
	public static final String ESTIMATE_LOG = "EstimateLog";
	public static final String ESTIMATE_STATE_LOG = "EstimateStateLog";
	public static final String ESTIMATE_DETAIL_LOG = "EstimateDetailLog";
	public static final String ESTIMATE_EXPENSE_LOG = "EstimateExpenseLog";
	
	/************* Inventory ****************/
	public static final String ACTIVITY_LOG = "ActivityLog";
	public static final String SALES_ORDER_INFORMATION = "SalesOrderInformation";
	public static final String SALES_ORDER_DETAIL = "SalesOrderDetail";
	public static final String SALES_ORDER_LOG = "SalesOrderLog";
	public static final String SALES_INVOICE_INFORMATION = "SalesInvoiceInformation";
	public static final String SALES_INVOICE_DETAIL = "SalesInvoiceDetail";
	public static final String SALES_INVOICE_BATCH_DETAIL = "SalesInvoiceBatchDetail";
	public static final String SALES_ORDER_STATE = "SalesOrderState";
	public static final String SALES_ORDER_EXPENSE = "SalesOrderExpense";
	public static final String SALES_ORDER_STATE_LOG = "SalesOrderStateLog";
	public static final String SALES_ORDER_DETAIL_LOG = "SalesOrderDetailLog";
	public static final String SALES_ORDER_EXPENSE_LOG = "SalesOrderExpenseLog";
	
	
	public static final String PAYMENT_RECEIVED_INFORMATION = "PaymentReceivedInformation";
	public static final String PAYMENT_RECEIVED_INVOICE = "PaymentReceivedInvoice";
	public static final String PAYMENT_RECEIVED_LOG = "PaymentReceivedLog";
	
	public static final String DEBIT_VOUCHER = "DebitVoucher";
	public static final String BILL_PAYMENT_MADE = "BillPaymentMade";
	public static final String DEBIT_VOUCHER_DETAIL = "DebitVoucherDetail";
	public static final String VENDOR_CREDIT = "VendorCredit";
	public static final String VENDOR_CREDIT_DETAIL = "VendorCreditDetail";
	public static final String VENDOR_CREDIT_BILL_DETAIL = "VendorCreditBillDetail";
	
	
	
	
	/************* Accounting ****************/
	public static final String LEDGERGROUP = "LedgerGroup";
	public static final String LEDGERSUBGROUP = "LedgerSubGroup";
	public static final String LEDGER = "Ledger";
	public static final String LEDGER_SETTING = "LedgerSetting";
	public static final String LEDGERSETTING = "LedgerSetting";
	public static final String SUBLEDGER = "Subledger";
	public static final String FINANCIAL = "FinancialPeriod";
	public static final String JOURNAL_SUMMARY = "JournalSummary";
	public static final String JOURNAL = "Journal";
	public static final String EXPENSE_SUMMARY = "ExpenseSummary";
	public static final String EXPENSE_DETAIL = "ExpenseDetail";
	public static final String EXPENSE_STATE = "ExpenseState";
	public static final String EXPENSE_SUMMARY_LOG = "ExpenseSummaryLog";
	public static final String EXPENSE_STATE_LOG = "ExpenseStateLog";
	public static final String EXPENSE_DETAIL_LOG = "ExpenseDetailLog";
	public static final String CASH_BOOK = "Cashbook";
	
	public static final String RECURRING_EXPENSE_SUMMARY = "RecurringExpenseSummary";
	public static final String RECURRING_EXPENSE_DETAIL = "RecurringExpenseDetail";
	public static final String RECURRING_EXPENSE_SUMMARY_LOG = "RecurringExpenseSummaryLog";
	public static final String RECURRING_EXPENSE_DETAIL_LOG = "RecurringExpenseDetailLog";
	
	/************* Loan Request ****************/
	public static final String LOAN_REQUEST = "LoanRequest";
	public static final String LOAN_REQUEST_STATE = "LoanRequestState";
	public static final String LOAN_REQUEST_LOG = "LoanRequestLog";
	public static final String LOAN_REQUEST_STATE_LOG = "LoanRequestStateLog";
	
	/*************Reports****************/
	/************* Accounting Reports****************/
	public static final String VCURRENTGENERALLEDGER = "vCurrentGeneralLedger";
	public static final String VPREVIOUSGENERALLEDGER = "vPreviousGeneralLedger";
	public static final String VCURRENTTRIALBALANCE = "vCurrentFPTrialBalance";
	public static final String VPREVIOUSTRIALBALANCE = "vPreviousFPTrialBalance";
	public static final String VCURRENTBALANCESHEET = "vCurrentFPBalanceSheet";
	public static final String VPREVIOUSBALANCESHEET = "vPreviousFPBalanceSheet";
	public static final String VCURRENTFPPROFITANDLOSS = "vCurrentFPProfitAndLoss";
	public static final String VPREVIOUSPROFITANDLOSS = "vPreviousFPProfitAndLoss";
	public static final String VGROSSPROFITBYCOMPANY = "vGrossProfitByCompany";
	public static final String VLEDGERSUBGROUPLEDGER = "vLedgerSubGroupLedger";
	
	// Dashboard
	public static final String VACCOUNTRECEIVABLEDASHBOARD = "vAccountReceivableDashboard";
	public static final String VACCOUNTPAYABLEDASHBOARD = "vAccountPayableDashboard";
	public static final String VCASHFLOWDASHBOARD = "vCashFlowDashboard";
	public static final String VCASHFLOWByFPDASHBOARD = "vCashFlowByFpDashboard";
	
	public static final String VACCOUNTRECEIVABLEDASHBOARDGROUP = "vAccountReceivableDashboardGroup";
	public static final String VACCOUNTPAYABLEDASHBOARDGROUP = "vAccountPayableDashboardGroup";
	public static final String VCASHFLOWDASHBOARDGROUP = "vCashFlowDashboardGroup";
	public static final String VCASHFLOWByFPDASHBOARDGROUP = "vCashFlowByFpDashboardGroup";
	
	//People
	public static final String PEOPLE = "People";
	 
	
	

}
