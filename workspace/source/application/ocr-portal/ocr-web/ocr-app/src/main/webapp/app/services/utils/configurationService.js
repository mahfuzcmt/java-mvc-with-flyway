
'use strict';

define(['app'], function (app) {

    var configurationService = function ($rootScope) {
    	
    	this.server = 'localhost';
    	this.port = ':8080';
        this.appname = '/ocr-app/';
        
        // Local Host
        this.apprest = this.appname + 'rest/';
        
        // Cloud Foundry
    	//this.apprest = '/rest/';
        
        this.rootUrl = 'http://' + this.server + this.port + this.appname;
        this.baseUrl = 'http://' + this.server + this.port + this.apprest;
    	this.wsBaseUrl = 'ws://' + this.server + this.port + this.appname;
		this.wsDashboard = this.wsBaseUrl + 'websocketservice';
		this.fileupload = this.apprest + 'fileupload/upload';
		this.filedelete = this.apprest + 'fileupload/delete';
    	this.data = this.apprest + 'data/post';
    	this.role = this.apprest + 'role/post';
		this.dashboard = this.apprest + 'dashboard/post';
		this.dashboardbygroup = this.apprest + 'dashboard/post/bygroup';
		this.login = this.apprest + 'security/post';
		this.user = this.apprest + 'user/post';
		this.companyunit = this.apprest + 'companyunit/post';
		this.grade = this.apprest + 'grade/post';
		this.grid = this.apprest + 'grid/post';
		this.company = this.apprest + 'company/post';
		this.groupofcompany = this.apprest + 'groupofcompany/post';
		this.employee = this.apprest + 'employee/post';
		this.designation = this.apprest + 'designation/post'; 
		this.thana = this.apprest + 'thana/post';
		this.department = this.apprest + 'department/post';
		this.warehouse = this.apprest + 'warehouse/post';
		this.productcategory = this.apprest + 'productcategory/post';
		this.productunit = this.apprest + 'productunit/post';
		this.ledger = this.apprest + 'ledger/post';
		this.ledgerSubGroup = this.apprest + 'ledgerSubGroup/post';
		this.ledgersetting = this.apprest + 'ledgersetting/post';
		this.product = this.apprest + 'product/post';
		this.taxrate = this.apprest + 'taxrate/post'
		this.financialPeriod = this.apprest + 'financialPeriod/post'
		this.journal = this.apprest + 'journal/post';
		this.expense = this.apprest + 'expense/post';
		this.recurringExpense = this.apprest + 'recurringexpense/post';
		this.purchaserequisition = this.apprest + 'purchaserequisition/post';
		this.purchaseorder = this.apprest + 'purchaseorder/post';
		this.bill = this.apprest + 'bill/post';
		this.paymentmade = this.apprest + 'paymentmade/post';
		this.vendorcredit = this.apprest + 'vendorcredit/post';
		this.bank = this.apprest + 'bank/post'; 
		this.contact = this.apprest + 'contact/post'; 
		this.salesorderestimate = this.apprest + 'salesorderestimate/post';
		this.salesorder = this.apprest + 'salesorder/post';
		this.salesinvoice = this.apprest + 'salesinvoice/post';
		this.paymentsreceived = this.apprest + 'paymentsreceived/post';
		this.accountingreport = this.apprest + 'report/accounting/post'; 
		this.reportOftrialBalance = this.apprest + 'report/accounting/trialbalance';
		this.reportOfBalanceSheet = this.apprest + 'report/accounting/balancesheet'; 
		this.reportOfProfitAndLoss = this.apprest + 'report/accounting/profitandloss'; 
		this.reportOfAccountTransactions = this.apprest + 'report/accounting/accounttransactions';
		this.reportOfActivityLog = this.apprest + 'report/core/activitylog';
		this.reportOfBillDetails = this.apprest + 'report/inventory/billdetails';
		this.reportOfpurchaseorderhistory = this.apprest + 'report/inventory/purchaseorderhistory';
		this.reportOfreceivehistory = this.apprest + 'report/inventory/receivehistory';
		this.reportOfpurchasebyvendor = this.apprest + 'report/inventory/purchasebyvendor';
		this.reportOfpurchasesbyitem = this.apprest + 'report/inventory/purchasesbyitem';
		this.reportOfpaymentsmade = this.apprest + 'report/inventory/paymentsmade';
		this.reportOfvendorbalance = this.apprest + 'report/inventory/vendorbalance';
		this.reportOfinventorydetails = this.apprest + 'report/inventory/inventorydetails';
		this.reportOfinvoicehistory = this.apprest + 'report/inventory/invoicehistory';
		this.reportOfsalesbycustomer = this.apprest + 'report/inventory/salesbycustomer';
		this.reportOfsalesbyitem = this.apprest + 'report/inventory/salesbyitem';
		this.reportOfPaymentsReceived = this.apprest + 'report/inventory/paymentsreceived';
		this.reportOfBankTransaction = this.apprest + 'report/inventory/banktransaction';
		this.reportOfPurchasesByDate = this.apprest + 'report/inventory/purchasesbydate';
		this.reportOfProductStockByBatch = this.apprest + 'report/inventory/productstockbybatch';
		this.reportOfCashBook = this.apprest + 'report/inventory/cashbook';
		this.batch = this.apprest + 'salesinvoice/batchinfo';
		this.sendemail = this.apprest + 'notification/sendemail';
		this.meta = this.apprest + 'meta/post';
		this.people = this.apprest + 'people/post';
		this.workflow = this.apprest + 'workflow/post';
		this.saveSugestedLedgerList = this.apprest + 'ledger/post/saveSugestedChartOfAccount';
		this.exportinventoryreport = this.apprest + 'exportinventoryreport/post';
		this.debitVoucher = this.apprest + 'debitvoucher/post';
	//	exportReport
		this.exportPurchasereport = this.apprest + 'exportPurchasereport/post';
		this.exportRequisitionreport = this.apprest + 'exportRequisitionreport/post';
		this.exportBillreport = this.apprest + 'exportBillreport/post';
		this.exportpaymentreport = this.apprest + 'exportpaymentreport/post';
		this.exportExpensereport = this.apprest + 'exportExpensereport/post';
		this.exportDebitVoucherreport = this.apprest + 'exportDebitVoucherreport/post';
		this.exportEstimatereport = this.apprest + 'exportEstimatereport/post';
		this.exportSalesOrderreport = this.apprest + 'exportSalesOrderreport/post';
		this.exportSalesInvoicereport = this.apprest + 'exportSalesInvoicereport/post';
		this.cashbook = this.apprest +'cashbook/post';
		this.loanRequest = this.apprest +'loanRequest/post';
		this.exportSalesreport = this.apprest + 'exportSalesreport/post';
		
    };
    
    app.service('configurationService', ['$rootScope', configurationService]);

});


