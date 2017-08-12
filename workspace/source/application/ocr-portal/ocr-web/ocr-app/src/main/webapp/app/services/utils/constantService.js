
'use strict';

define(['app'], function (app) {

    var constantService = function ($rootScope, $cookieStore, $location, localStorageService) {
    	
    	this.isNullOrEmpty = function (string) {
    	    return angular.isUndefined(string) || string === null || string === ""  || string === "null"  || string === "undefined"; 
    	};
    	
    	this.removeNullIn = function(prop, obj) {
    		var pr = obj[prop];
    		if(angular.isUndefinedOrNull(pr) || pr.length === 0){ 
    			delete obj[prop]; 
    		} else if(angular.isObject(pr)){ 
    			for (var i in pr){
    				this.removeNullIn(i, pr);
    			}
    		}
    	};

    	this.removeNull = function(obj) {
    	    for (var i in obj) {
    	        this.removeNullIn(i, obj);
    	    }
    	    return obj;
    	};
    	
        this.getAppLayout = function () {
            var layout = {
                header: { location: 'app/views/layout/app/Header.html', isVisible: true },
                leftPanel: { location: 'app/views/layout/app/LeftPanel.html', isVisible: true},
            };
            return layout;
        };

        this.getWebLayout = function () {
            var layout = {
                header: { location: 'app/views/layout/web/Header.html', isVisible: false },
                leftPanel: { location: 'app/views/layout/web/LeftPanel.html', isVisible: false },
            };
            return layout;
        };
        
        this.getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        
        
        this.CashInBank = 'CashInBank'; 
        this.gridLocation = 'app/views/util/grid.html'; 
        this.SystemUser = 'systemUser';
        this.GroupOfCompanyUser = 'groupOfCompanyUser';
        this.CompanyUser = 'companyUser';
        
        this.userInfoCookieStoreKey = 'user.info.cookie.store.key';
        this.defaultMenuInfoCookieStoreKey = 'user.default.menu.cookie.store.key';
        this.featureMenuInfoCookieStoreKey = 'user.feature.menu.cookie.store.key';
        this.selectMenuInfoCookieStoreKey = 'user.select.menu.cookie.store.key';
        this.roleMenuCookieStoreKey = 'user.role.menu.cookie.store.key';        
        this.reportMenuCookieStoreKey = 'user.report.menu.cookie.store.key';        

        this.metaWorkFlowsCookieStoreKey = 'meta.work.flow.cookie.store.key';
        this.metaDefaultMenuCookieStoreKey = 'meta.default.menu.cookie.store.key';
        this.metaFeatureMenuCookieStoreKey = 'meta.feature.menu.cookie.store.key';
        this.metaReportMenuCookieStoreKey = 'meta.report.menu.cookie.store.key';
        this.metaEmployeeSettingCookieStoreKey = 'meta.employee.setting.cookie.store.key'; 
        
        this.AlertMessage = 'AlertMessage';
        this.Login = 'Login';
        this.GoogleLogin = 'GoogleLogin';
        this.Logout = 'Logout';
        this.ChangePassword = 'ChangePassword';
        this.DateFormat = 'DD-MM-YYYY';
        this.FORMAT_AS_YYYY_MM_DD = 'YYYY-MM-DD';
        
        this.Active = 'Active';
        this.Inactive = 'Inactive';
        this.EmployeeSettings = 'EmployeeSettings'; 
        
        this.Save = 'Save';
        this.SaveUser = 'SaveUser';
        this.SaveBillPayment = 'SaveBillPayment';
        this.SaveInvoice = 'SaveInvoice';
        this.SaveWithInvoices = 'SaveWithInvoices';
        this.SaveBankTransaction = 'SaveBankTransaction';
        this.Update = 'Update';
        this.Delete = 'Delete';
        this.GetAll = 'GetAll';
        this.GetAllUnPostedBill = 'GetAllUnPostedBill';
        this.GetAllLedgerSubGroup = 'GetAllLedgerSubGroup';
        this.GetAllOpenedClosed = 'GetAllOpenedClosedFP';
        this.GetLedgerBalance = 'GetLedgerBalance';
        this.CloseFinancialPeriod = 'CloseFinancialPeriod';
        this.GetDataByOID = 'GetDataByOID';
        this.GetEstimateAllData = 'GetEstimateAllData';
        this.GetAllData = 'GetAllData';
        this.GetAllPaymentReceived = 'GetAllPaymentReceived';
        this.GetAllINVOICEData = 'GetAllINVOICEData';
        this.GetAllSalesOrder = 'GetAllSalesOrder';
        this.GetDataByCode = 'GetDataByCode';
        this.GetNextCode = 'GetNextCode';
        this.GetAllRole = 'GetAllRole';
        this.GetUserByLoginID = 'GetUserByLoginID';
        this.GetAllUsers = 'GetAllUsers';
        this.GetAllCompanyUnits = "getAllCompanyUnits";
        this.ChangePassword = 'ChangePassword';
        this.ResetPassword = 'ResetPassword';
        this.GetDataForGrid = "GetDataForGrid";
        this.GetCompanyByPeopleOID = "GetCompanyByPeopleOID";
        this.GetAllGrade = "getAllGrade";
        this.GetGroupOfCompanyByOid = "getGroupOfCompanyByOid";
        this.GetGroupOfCompany = "GetGroupOfCompany";
        this.GetAllCompanybyOid = "getCompanyByOid";
        this.GetDepartmentByOid = "getDepartmentByOid";        
        this.GetAllDesignationList = "getAllDesignationList";  
        this.GetAllRequisitionList = "getAllRequisition";
        this.GetEstimateAllData = "GetEstimateAllData";
        this.GetAllPurchaseOrder = "getAllPurchaseOrder";
        this.GetAllExpense = "getAllExpense";
        this.GetAllBill = "getAllBill";
        this.GetAllVendorCredit = "getAllVendorCredit";
        this.GetAllDivision = "getAllDivision";
        this.GetAllThana = "getAllThana";
        this.GetAllPostOffice = "getAllPostOffice";
        this.GetAllEmployeeList = "getAllEmployeeList"; 
        this.GetEmployeeByOid = "getEmployeeByOid"; 
        this.GetExpenseSummaryByOid = "getExpenseSummaryByOid";
		this.GetGradeByOid = 'getGradeByOid'; 
        this.GetAllProductCategoryList = "getAllProductCategoryList"; 
		this.GetProductCategoryByOid = 'getProductCategoryByOid';
        this.GetAllProductUnitList = "getAllProductUnitList"; 
		this.GetProductUnitByOid = 'getProductUnitByOid'; 
		this.GetAllLedgerSubGroupList = "getAllLedgerSubGroupList";
		this.GetLedgerByOid = "getLedgerByOid"; 
		this.GetFinancialPeriodByOid = "getFinancialPeriodByOid"; 
		this.GetBankByOid = "getBankByOid";
		this.GetContactByOid = "getContactByOid";
		this.GetLedgerBySubGroupOid = "getLedgerBySubGroupOid";
		this.GetChartOfAccount = "GetChartOfAccount"; 
        this.GetAllpurchaseorderList = "GetAllpurchaseorderList";
        this.GetAllbillList = "GetAllbillList";
        this.GetByOID = "GetByOID";
        this.GetInvoiceDataByOID = "GetInvoiceDataByOID";
        this.UpdateInvoice = "UpdateInvoice";
        this.GetDueInvoiceDataByCustomerOID = "GetDueInvoiceDataByCustomerOID";
        this.GetDueBillDataBySupplierOID = "GetDueBillDataBySupplierOID";
        this.MarkAsSentOrAccepted = "MarkAsSentOrAccepted";
        this.ConvertToOpen = "ConvertToOpen";
        this.ConvertToSend = "ConvertToSend";
        this.UpdateStatus = "UpdateStatus";
        this.GetWareHouseByProductOid = "GetWareHouseByProductOid";
        this.GetBatchInfoByProductWarehouseOid = "GetBatchInfoByProductWarehouseOid";
        this.GetBatchDetailByProductWarehouseBatchOid = "GetBatchDetailByProductWarehouseBatchOid";
        this.SaveInvoicePaymentReceived = "SaveInvoicePaymentReceived";
        this.GetDueInvoiceDataByCustomerOID = "GetDueInvoiceDataByCustomerOID";
        this.GetRejectionWorkFlow = "GetRejectionWorkFlow";
        this.GetOnlyApprovedWorkFlow = "GetOnlyApprovedWorkFlow";
        this.GetWorkFlowListByCompanyFeature = "GetWorkFlowListByCompanyFeature";
        this.GetDraftPeople = "GetDraftPeople";
        this.GetDetailByOID = "GetDetailByOID";
        this.GetMetaDataByOID ="GetMetaDataByOID";
        this.GetProfileDataByOID = "GetProfileDataByOID";
        this.GetAccessPermissionData ="GetAccessPermissionData";
        this.GetPeopleByType ="GetPeopleByType";
        this.PeopleTypeEmployee = "Employee";
        this.PeopleTypeCustomer = "Customer";
        this.PeopleTypeSupplier = "Supplier";
        this.GetPeopleObjectByTabID = 'GetPeopleObjectByTabID';
        this.GetWorkFlowList ="GetWorkFlowList";
        this.GetPeopleDataByOid = 'GetPeopleDataByOid';
        this.GetAllWorkflow ="getAllWorkflow";
    	this.FEATURE_REQUISITION_OID = "purchaserequisitions";
    	this.FEATURE_PURCHASEORDER_OID = "purchaseorders";
    	this.FEATURE_SALESORDER_OID = "salesorders";
    	this.FEATURE_BILL_OID = "bills";
    	this.FEATURE_PAYMENTS_MADE_OID = "paymentsmade";
    	this.FEATURE_EXPENSE_OID = "expenses";
    	this.FEATURE_ESTIMATE_OID = "estimates";
    	this.GetJournalSummaryByJournalManner = "GetJournalSummaryByJournalManner";
        
        //Reports
        this.GeneralLedger = "GeneralLedger";
        this.TrialBalance = "TrialBalance";
        this.BalanceSheet = "BalanceSheet";
        this.ProfitAndLoss = "ProfitAndLoss";
        this.ActivityLog = "ActivityLog";
        this.IndividualActivityLog = "IndividualActivityLog";
        this.GetByParam = "GetByParam";
        
        this.MetaReportMenuOID = "ReportMenu";
        this.MetaMCFeature = "MC_Feature";
        this.MetaDefaultMenu = "DefaultMenu";
        this.MetaEmployeeSetting = "EmployeeSettings";
        
		this.Danger = 'danger';
        this.Success = 'success';
        this.Info = 'info';
        this.Warning = 'warning';
        this.SYSTEM_TEST_MESSAGE = 'Hello There !, This is System Test Message'; 
        this.UpdateEmployeeSettingsDataOfMetaProperty = 'updateEmployeeSettingsDataOfMetaProperty';
        this.GetDesignationByOid = 'getDesignationByOid';
        this.GetMenuJSONFromRoleD = 'getMenuJSONFromRole';
        
        this.All = 'All';
        this.Employees = 'Employee';
        this.Contacts = 'Contacts';
        this.Suppliers = 'Supplier';
        this.Customers = 'Customer';
        
        this.Employee = 'Employee';
        this.GetByStatus = 'GetByStatus';
        this.LoadWorkFlowModel = 'loadWorkFlowModel';
        
        this.CashJV = 'Cash JV';
        this.JV = 'JV';
        
        //Report Name
        this.SALES_ORDER_BY_DATE_REPORT = "SalesOrderByDate";
        this.SALES_ORDER_BY_OID_REPORT = "SalesOrderByOID";
        this.BILL_BY_OID_REPORT = "BillByOID";
        this.PURCHASE_ORDER_BY_OID_REPORT = "PurchaseOrderByOID";
        this.SALES_INVOICE_BY_OID_REPORT = "SalesInvoiceByOID";
        this.SALES_ESTIMATE_BY_OID_REPORT = "SalesEstimateByOID";
        this.PURCHASE_REQUISITION_BY_OID_REPORT = "PurchaseRequisitionByOID";
        this.DEBIT_VOUCHER_BY_OID_REPORT = "DebitVoucherByOID";
        this.EXPENSES_BY_OID_REPORT = "ExpensesByOID";
        this.PAYMENT_DISBURSEMENT_BY_OID_REPORT = "PaymentDisbursementByOID";
        //PDF Report
        this.VOUCHER_DETAILS_BY_OID_REPORT = "VoucherDetailsByOID";
        this.BANK_TRANSACTION_BY_OID_REPORT = "BankTransactionByOID";
        this.PURCHASES_BY_DATE_REPORT = "PurchasesByDate";
        this.PURCHASE_BY_VENDOR_REPORT = "PurchaseByVendor";
        this.BILL_DETAILS_REPORT = "BillDetails";
        this.PURCHASE_ORDER_HISTORY_REPORT = "PurchaseOrderHistory";
        this.PAYMENTS_MADE_REPORT = "PaymentsMade";
        this.CASH_BOOK_REPORT = "CashBook";
        
        
        // Dashboard
        this.DashboardData = 'DashboardData';
        this.DashboardAccountPayable = 'AP';
        this.GetAllUnPostedBillByOid = 'GetAllUnPostedBillByOid';
        this.GetHistory = 'GetHistory';
        this.GetDisbursementByPaymentMadeOid = 'GetDisbursementByPaymentMadeOid';
        
        this.itemsPerPageData = [	{"value"	: "15"}, {"value"	: "30"}, {"value"	: "60"}, {"value"	: "100"} ];
        
        this.getPageItemText = function(pageDataBegin, pageDataEnd, pageDataTotal, recordTypeText, language) {
        	var pageItemText = "Showing "+pageDataBegin+
			" to "+pageDataEnd+
			" of "+pageDataTotal+
			" total "+recordTypeText;
			return pageItemText;       	
        };
		
        this.getGridMessage = function(begin, end, total, text) {
        	if(total == 0){
        		return "No "+text+" found";
        	}
        	return "Showing "+begin+ " to "+end+ " of "+total+ " total "+text;			
        };

		this.getNumber = function (numValue) {
			var newValue = 0;
			if(!isNaN(numValue)){
 				if(angular.isNumber(numValue)){
 					newValue = numValue;
 				}
 				if(angular.isString(numValue) && numValue.trim().length > 0){
 					newValue = parseFloat(numValue);
 				}
			}
			return newValue;
		};
        
        this.getPageMenu = function (menu) {
        	var childMenu ;
        	var pageID = $location.path();
        	var currentPageID = pageID.slice(1); // to remove '/'
			var newArrayForChild = [];
			for(var i=0; i< menu.length; i++){
				if(menu[i].id == currentPageID && menu[i].enable == true){
					for(var j=0; j< menu[i].children.length; j++){
						if(menu[i].children[j].enable == true){
            				newArrayForChild.push(menu[i].children[j]);
            				 childMenu = newArrayForChild;
            			}
					}
				}
			}
			return childMenu
        };
        
    };
    
    app.service('constantService', ['$rootScope', '$cookieStore',  '$location', 'localStorageService', constantService]);

});
