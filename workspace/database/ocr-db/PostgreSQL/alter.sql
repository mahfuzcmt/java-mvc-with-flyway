drop view if exists vCashFlowByFPDashboard;
ALTER TABLE Login ADD COLUMN reportJson text;
ALTER TABLE ExpenseDetail ADD COLUMN imagePath text;
ALTER TABLE ExpenseDetailLog ADD COLUMN imagePath text;
truncate table MetaProperty;

-- MetaProperty
insert into MetaProperty (OID, valueJSON, description) values ('EmployeeSettings', '{"sourceOfHire":[{"displayText":"Direct","value":"Direct"},{"displayText":"Referral","value":"Referral"},{"displayText":"Web","value":"Web"},{"displayText":"Newspaper","value":"Newspaper"}],"status":[{"displayText":"Active","value":"Active"},{"displayText":"Terminated","value":"Terminated"},{"displayText":"Deceased","value":"Deceased"},{"displayText":"Resigned","value":"Resigned"}],"peopleTypeList":[{"displayText":"Customer","value":"Customer"},{"displayText":"Employee","value":"Employee"},{"displayText":"Supplier","value":"Supplier"}],"gender":[{"displayText":"Male","value":"Male"},{"displayText":"Female","value":"Female"},{"displayText":"Other","value":"Other"}],"maritalStatus":[{"displayText":"Single","value":"Single"},{"displayText":"Married","value":"Married"}],"employeeType":[{"displayText":"Permanent","value":"Permanent"},{"displayText":"On Contact","value":"On Contact"},{"displayText":"Temporary","value":"Temporary"},{"displayText":"Trainee","value":"Trainee"}],"employeeJobRole":[{"displayText":"Admin","value":"Admin"},{"displayText":"Team Member","value":"Team Member"},{"displayText":"Manager","value":"Manager"},{"displayText":"Director","value":"Director"},{"displayText":"Team Incharge","value":"Team Incharge"}]}', 'Employee Settings');
insert into MetaProperty (OID, valueJSON, description) values ('Company_ChartOfAccount_Features', '[{"enable":true,"name":"Asset","code":"01","children":[{"enable":true,"name":"Current Assets","children":[{"enable":true,"name":"Cash","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Accounts Receivables","ledgerBalance":"0.00","children":[]}]},{"enable":true,"name":"Fixed Assets","children":[{"enable":true,"name":"Office Furnitures","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Office Equipment","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Office Stationery","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Inventory","ledgerBalance":"0.00","children":[]}]}]},{"enable":true,"name":"Liabilites","code":"02","children":[{"enable":true,"name":"Current Liabilites","children":[{"enable":true,"name":"Advance","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Short term Loan","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Accounts Payables","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Tax Payable","ledgerBalance":"0.00","children":[]}]}]},{"enable":true,"name":"Equity","code":"03","children":[{"enable":true,"name":"BOD Investments","children":[{"enable":true,"name":"BOD Investment","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Retained Earning","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Discount Earned","ledgerBalance":"0.00","children":[]}]}]},{"enable":true,"name":"Revenue","code":"04","children":[{"enable":true,"name":"Revenue from Business","children":[{"enable":true,"name":"Sales Revenue Software","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Revenue from Business","ledgerBalance":"0.00","children":[]}]},{"enable":true,"name":"Revenue from Investment","children":[{"enable":true,"name":"Revenue from Investment","ledgerBalance":"0.00","children":[]}]}]},{"enable":true,"name":"Expense","code":"05","children":[{"enable":true,"name":"Expenses for Cost of goods sold (COGS) or Cost of services","children":[{"enable":true,"name":"Direct materials for manufactured goods","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Direct costs of service delivery","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Purchase of finished goods inventory","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Overhead Expense","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Tax Expense","ledgerBalance":"0.00","children":[]}]},{"enable":true,"name":"Operating Expenses - Operations","children":[{"enable":true,"name":"Production side rental","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Production side maintenance","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Production Executives salaries","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Production Executives commissions and incentives","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Production Executives Festival Bonus","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Consultancy Expense","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Discount Expense","ledgerBalance":"0.00","children":[]}]},{"enable":true,"name":"Operating Expenses - General & Administrative","children":[{"enable":true,"name":"Office Rental","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Office Maintenance","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Executives Salaries","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Executives Commissions","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Costs of travel and training","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Depreciation Expense","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Other Expense","ledgerBalance":"0.00","children":[]}]},{"enable":true,"name":"Operating Expenses - Selling","children":[{"enable":true,"name":"Store/shop rental","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Store/shop maintenance","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Sales Salaries","ledgerBalance":"0.00","children":[]},{"enable":true,"name":"Sales Commissions","ledgerBalance":"0.00","children":[]}]}]}]', 'New Company Chart Of Account Features');
insert into MetaProperty (OID, valueJSON, description) values ('AdminUserDefaultMenu', '[{"id":"orgdashboard"},{"id":"pims","children":[{"id":"peoples"}]},{"id":"settings","children":[{"id":"companies"},{"id":"departments"},{"id":"designations"}]}]', 'Admin User Default Menu');
insert into MetaProperty (OID, valueJSON, description) values ('ReportMenu', '[{"id":"businessoverview","url":"businessoverview","text":"Business Overview","enable":false,"children":[{"id":"profitloss","url":"profitloss","text":"Profit and Loss","enable":false},{"id":"cashflowstatement","url":"cashflowstatement","text":"Cash Flow Statement","enable":false},{"id":"balancesheet","url":"balancesheet","text":"Balance Sheet","enable":false}]},{"id":"accountantreport","url":"accountantreport","text":"Accountant","enable":false,"children":[{"id":"accounttransactions","url":"accounttransactions","text":"Account Transactions","enable":false},{"id":"generalledger","url":"generalledger","text":"General Ledger","enable":false},{"id":"journalreport","url":"journalreport","text":"Journal Report","enable":false},{"id":"trialbalance","url":"trialbalance","text":"Trial Balance","enable":false},{"id":"banktransactionreport","url":"banktransactionreport","text":"Bank Transaction","enable":false},{"id":"cashbookreport","url":"cashbookreport","text":"Cash Book","enable":false}]},{"id":"inventoryreport","url":"inventoryreport","text":"Inventory","enable":false,"children":[{"id":"productstockbybatch","url":"productstockbybatch","text":"Product Stock by Batch","enable":false},{"id":"inventorydetails","url":"inventorydetails","text":"Inventory Details","enable":false}]},{"id":"purchasereport","url":"purchasereport","text":"Purchases","enable":false,"children":[{"id":"purchaseorderhisrtoryreport","url":"purchaseorderhisrtoryreport","text":"Purchase Order History","enable":false},{"id":"purchasesbydate","url":"purchasesbydate","text":"Purchases by Date","enable":false},{"id":"purchasebyvendorreport","url":"purchasebyvendorreport","text":"Purchase by Vendor","enable":false},{"id":"purchasesbyitemreport","url":"purchasesbyitemreport","text":"Purchases by Item","enable":false},{"id":"billdetailsreport","url":"billdetailsreport","text":"Bill Details","enable":false},{"id":"paymentsmadereport","url":"paymentsmadereport","text":"Payments Made","enable":false},{"id":"vendorbalancereport","url":"vendorbalancereport","text":"Vendor Balance","enable":false}]},{"id":"sales","url":"sales","text":"Sales","enable":false,"children":[{"id":"salesbycustomerreport","url":"salesbycustomerreport","text":"Sales by Customer","enable":false},{"id":"salesbyitemreport","url":"salesbyitemreport","text":"Sales by Item","enable":false},{"id":"salesbydatereport","url":"salesbydatereport","text":"Daily Sales","enable":false},{"id":"invoicehistoryreport","url":"invoicehistoryreport","text":"Invoice History","enable":false},{"id":"paymentsreceivedreport","url":"paymentsreceivedreport","text":"Payments Received","enable":false}]},{"id":"expenses","url":"expenses","text":"Expenses","enable":false,"children":[{"id":"expensedetailsreport","url":"expensedetailsreport","text":"Expense Details","enable":false},{"id":"expensesbycategoryreport","url":"expensesbycategoryreport","text":"Expenses by Category","enable":false},{"id":"expensesbycustomerreport","url":"expensesbycustomerreport","text":"Expenses by Customer","enable":false}]},{"id":"activityreport","url":"activityreport","text":"Activity","enable":false,"children":[{"id":"activitylogsreport","url":"activitylogsreport","text":"Activity Logs","enable":false}]}]', 'Report Menu');
insert into MetaProperty (OID, valueJSON, description) values ('MC_Feature', '[{"id":"dashboard","url":"dashboard","text":"Dashboard","class":"fa fa-dashboard","enable":false},{"id":"settings","url":"settings","text":"Settings","class":"fa fa-cog","enable":false,"children":[{"id":"banks","url":"banks","text":"Banks","class":"","enable":false},{"id":"taxes","url":"taxes","text":"Taxes","class":"","enable":false}]},{"id":"smartinventory","url":"smartinventory","text":"Inventory","class":"fa fa-cart-plus","enable":false,"children":[{"id":"warehouses","url":"warehouses","text":"Warehouses","enable":false,"class":""},{"id":"productunits","url":"productunits","text":"Product Units","enable":false,"class":""},{"id":"productcategories","url":"productcategories","text":"Product Categories","enable":false,"class":""},{"id":"products","url":"products","text":"Products","enable":false,"class":""}]},{"id":"purchase","url":"purchase","text":"Expense","class":"fa fa-sign-out","enable":false,"children":[{"id":"purchaserequisitions","url":"purchaserequisitions","text":"Requisitions","enable":false,"workflow":true,"class":""},{"id":"purchaseorders","url":"purchaseorders","text":"Purchase Orders","enable":false,"workflow":true,"class":""},{"id":"bills","url":"bills","text":"Bills","enable":false,"workflow":true,"class":""},{"id":"expenses","url":"expenses","text":"Expenses","enable":false,"workflow":true,"class":""},{"id":"paymentsmade","url":"paymentsmade","text":"Payments","enable":false,"workflow":true,"class":""},{"id":"debitvouchers","url":"debitvouchers","text":"Vouchers","enable":false,"class":""}]},{"id":"sales","url":"sales","text":"Income","class":"fa fa-dollar","enable":false,"children":[{"id":"estimates","url":"estimates","text":"Estimates","enable":false,"class":""},{"id":"salesorders","url":"salesorders","text":"Sales Orders","enable":false,"class":""},{"id":"invoices","url":"invoices","text":"Invoices","enable":false,"class":""},{"id":"paymentsreceived","url":"paymentsreceived","text":"Payments Received","enable":false,"class":""}]},{"id":"smartaccounting","url":"smartaccounting","text":"Smart Accounting","class":"fa fa-money","enable":false,"children":[{"id":"financialperiod","url":"financialperiod","text":"Financial Period","enable":false,"class":""},{"id":"chartofaccounts","url":"chartofaccounts","text":"Chart of Accounts","enable":false,"class":""},{"id":"ledgersubgroup","url":"ledgersubgroup","text":"Ledger Subgroup","enable":false,"class":""},{"id":"ledgersetting","url":"ledgersetting","text":"Ledger Setting","enable":false,"class":""},{"id":"journals","url":"journals","text":"Manual Journal","enable":false,"class":""},{"id":"cashbooks","url":"cashbooks","text":"Cash Book","enable":false,"class":""}]},{"id":"reports","url":"reports","text":"Report","class":"fa fa-bar-chart-o","enable":false}]', 'All MC Feature Menu');
insert into MetaProperty (OID, valueJSON, description) values ('DefaultMenu', '[{"id":"orgdashboard","url":"orgdashboard","text":"Dashboard","class":"fa fa-dashboard","enable":false},{"id":"pims","url":"pims","text":"PIMS","class":"fa fa-users","enable":false,"children":[{"id":"peoples","url":"peoples","text":"People","class":"","enable":false}]},{"id":"settings","url":"settings","text":"Settings","class":"fa fa-cog","enable":false,"children":[{"id":"companies","url":"companies","text":"Companies","class":"","enable":false},{"id":"departments","url":"departments","text":"Departments","class":"","enable":false},{"id":"designations","url":"designations","text":"Designations","class":"","enable":false}]}]', 'Admin User Default Menu');
commit;

update Role set menuJSON = '[{"id":"topSettings","url":"topsettings","text":"Users","class":"fa fa-cog","enable":false}]' where oid = 'DA-MC';
update Role set menuJSON = '[{"id":"orgdashboard","url":"orgdashboard","text":"Dashboard","class":"fa fa-dashboard","enable":false},{"id":"pims","url":"pims","text":"PIMS","class":"fa fa-users","enable":false,"children":[{"id":"peoples","url":"peoples","text":"People","class":"","enable":false}]},{"id":"settings","url":"settings","text":"Settings","class":"fa fa-cog","enable":false,"children":[{"id":"companies","url":"companies","text":"Companies","class":"","enable":false},{"id":"departments","url":"departments","text":"Departments","class":"","enable":false},{"id":"designations","url":"designations","text":"Designations","class":"","enable":false}]}]' where oid = 'TA';
update Role set menuJSON = '[{"id":"orgdashboard","url":"orgdashboard","text":"Dashboard","class":"fa fa-dashboard","enable":false},{"id":"pims","url":"pims","text":"PIMS","class":"fa fa-users","enable":false,"children":[{"id":"peoples","url":"peoples","text":"People","class":"","enable":false}]},{"id":"settings","url":"settings","text":"Settings","class":"fa fa-cog","enable":false,"children":[{"id":"companies","url":"companies","text":"Companies","class":"","enable":false},{"id":"departments","url":"departments","text":"Departments","class":"","enable":false},{"id":"designations","url":"designations","text":"Designations","class":"","enable":false}]}]' where oid = 'GU';
commit;

update Login set featureJSON = '{}', defaultJSON = '[{"id":"topSettings"}]', reportJSON = '{}', workFlowJSON = '{}' where loginID = 'mc';
update Login set featureJSON = '{"20170622-120335-qUxJAgU38EVTYhj":[{"id":"dashboard"},{"id":"settings","children":[{"id":"banks","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"taxes","iscreate":true,"isdelete":true,"isedit":true,"isview":true}]},{"id":"smartinventory","children":[{"id":"warehouses","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"productunits","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"productcategories","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"products","iscreate":true,"isdelete":true,"isedit":true,"isview":true}]},{"id":"purchase","children":[{"id":"purchaserequisitions","iscreate":true,"isdelete":true,"isedit":true,"isview":true,"workFlows":["WF-001","WF-002","WF-003","WF-004"]},{"id":"purchaseorders","iscreate":true,"isdelete":true,"isedit":true,"isview":true,"workFlows":["WF-001","WF-002","WF-003","WF-004"]},{"id":"bills","iscreate":true,"isdelete":true,"isedit":true,"isview":true,"workFlows":["WF-001","WF-002","WF-003","WF-004"]},{"id":"expenses","iscreate":true,"isdelete":true,"isedit":true,"isview":true,"workFlows":["WF-001","WF-002","WF-003","WF-004"]},{"id":"paymentsmade","iscreate":true,"isdelete":true,"isedit":true,"isview":true,"workFlows":["WF-001","WF-002","WF-003","WF-004"]},{"id":"debitvouchers","iscreate":true,"isdelete":true,"isedit":true,"isview":true}]},{"id":"sales","children":[{"id":"estimates","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"salesorders","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"invoices","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"paymentsreceived","iscreate":true,"isdelete":true,"isedit":true,"isview":true}]},{"id":"smartaccounting","children":[{"id":"financialperiod","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"chartofaccounts","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"ledgersubgroup","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"ledgersetting","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"journals","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"cashbooks","iscreate":true,"isdelete":true,"isedit":true,"isview":true}]}],"20170702-074913-SNzlFC4hG9BGbDM":[{"id":"dashboard"},{"id":"settings","children":[{"id":"banks","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"taxes","iscreate":true,"isdelete":true,"isedit":true,"isview":true}]},{"id":"smartinventory","children":[{"id":"warehouses","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"productunits","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"productcategories","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"products","iscreate":true,"isdelete":true,"isedit":true,"isview":true}]},{"id":"purchase","children":[{"id":"purchaserequisitions","iscreate":true,"isdelete":true,"isedit":true,"isview":true,"workFlows":["WF-001","WF-002","WF-003","WF-004"]},{"id":"purchaseorders","iscreate":true,"isdelete":true,"isedit":true,"isview":true,"workFlows":["WF-001","WF-002","WF-003","WF-004"]},{"id":"bills","iscreate":true,"isdelete":true,"isedit":true,"isview":true,"workFlows":["WF-001","WF-002","WF-003","WF-004"]},{"id":"expenses","iscreate":true,"isdelete":true,"isedit":true,"isview":true,"workFlows":["WF-001","WF-002","WF-003","WF-004"]},{"id":"paymentsmade","iscreate":true,"isdelete":true,"isedit":true,"isview":true,"workFlows":["WF-001","WF-002","WF-003","WF-004"]},{"id":"debitvouchers","iscreate":true,"isdelete":true,"isedit":true,"isview":true}]},{"id":"sales","children":[{"id":"estimates","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"salesorders","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"invoices","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"paymentsreceived","iscreate":true,"isdelete":true,"isedit":true,"isview":true}]},{"id":"smartaccounting","children":[{"id":"financialperiod","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"chartofaccounts","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"ledgersubgroup","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"ledgersetting","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"journals","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"cashbooks","iscreate":true,"isdelete":true,"isedit":true,"isview":true}]}],"20170702-075114-cBxtxzJM1B5OnJX":[],"20170710-054525-A8S9apiU2rYTa9a":[]}', defaultJSON = '[{"id":"orgdashboard"},{"id":"pims","children":[{"id":"peoples","iscreate":true,"isdelete":true,"isedit":true,"isview":true}]},{"id":"settings","children":[{"id":"companies","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"departments","iscreate":true,"isdelete":true,"isedit":true,"isview":true},{"id":"designations","iscreate":true,"isdelete":true,"isedit":true,"isview":true}]}]', reportJSON = '{"20170622-120335-qUxJAgU38EVTYhj":[{"id":"businessoverview"},{"id":"accountantreport"},{"id":"inventoryreport"},{"id":"purchasereport"},{"id":"sales"},{"id":"expenses"},{"id":"activityreport"}],"20170702-074913-SNzlFC4hG9BGbDM":[{"id":"businessoverview"},{"id":"accountantreport"},{"id":"inventoryreport"},{"id":"purchasereport"},{"id":"sales"},{"id":"expenses"},{"id":"activityreport"}],"20170702-075114-cBxtxzJM1B5OnJX":[],"20170710-054525-A8S9apiU2rYTa9a":[]}', workFlowJSON = '{}' where loginID = 'emran';
update Login set featureJSON = '{}', defaultJSON = '[]', reportJSON = '{}', workFlowJSON = '{}' where loginID not in ('mc', 'emran');
commit;

drop table if exists CashBook;
/*
------------------------------------------------------------------------------
C A S H   B O O K   T A B L E S
------------------------------------------------------------------------------
*/
/*
CashBook
OID								: Primary key
groupOfCompanyOID				: Group of Company OID
companyOID						: Company OID
transactionType					: Payments/Receipts/CashIn/CashOut/CashInByBank
*/
create table 					CashBook
(
OID 							varchar(64),
cashTransIdNo					varchar(64)					not null,
bankOid							varchar(64),
accountNo						varchar(64),
chequeNo						varchar(64),
transactionDate					date						not null,
transactionType 				varchar(32) 				not null,
amount 							numeric(10, 2) 				not null 			default '0',
priviousbalance 				numeric(10, 2) 				not null 			default '0',
currentbalance 					numeric(10, 2) 				not null 			default '0',
-- Other
referenceNo 					varchar(64),
particulars						text,
peopleOid						varchar(64),
companyOID						varchar(64) 				not null,
groupOfCompanyOID				varchar(64)					not null,
-- Audit
createdOn						timestamp 					not null		default			current_timestamp,
createdBy						varchar(64)					not null		default 		user,
editedOn						timestamp,
editedBy						varchar(64),
constraint						pk_CashBook								primary key			(OID),
constraint 						fk_CashBook_People						foreign key			(peopleOid)
																		references			People(OID),
constraint 						fk_CashBook_Company						foreign key		    (companyOID)
																		references 		    Company(OID),
constraint 						fk_CashBook_GroupOfCompany				foreign key 		(groupOfCompanyOID)
																		references 			GroupOfCompany(OID)
);