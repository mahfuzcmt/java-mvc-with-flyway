package com.secl.ocr.bean;

public enum Code {
	

	// Bank
	BANK_SS001,     // Successfully save bank
	BANK_US001,     // Unable to save bank
	BANK_SU002,     // Successfully update bank
	BANK_UU002,     // Unable to update Company Unit
	BANK_SLB01,		// Successfully loaded bank information by oid
	BANK_ULB01,		// Unable to load bank information by oid

	BANK_SLAB02,	// Successfully loaded all bank information
	BANK_ULAB02,	// Unable to load all bank information
	BANK_NDF1000,	// No Data Found of bank information
	BANK_T_SS003,    // Successfully save bank transaction
	BANK_T_US003,    // Unable to save bank transaction
	BANK_T_SGBN1000, // Successfully Generate Bank Transaction No
	BANK_T_UGBN1000, // Unable to Generate Bank Transaction No
	
	// Company Unit
	SSBU001,    // Successfully save Company Unit
	SSBU002,    // Successfully update Company Unit
	SLABU1001,	// Successfully loaded list of Company unit
	SLABU1002,	// Successfully loaded data of Company unit
	ULABU1001,	// Unable to load list of Company unit
	ULABU1002,	// Unable to load data of Company unit
	USBU001,    // Unable to save Company Unit
	USBU002,    // Unable to update Company Unit
	
	// Login
	Su1001,		// Successfully Update Password
	Us1000,		// Unable to Save
	Up1000,		// Unable to Update
	Sd1000,		// Successfully Delete
	Ud1000,		// Unable to Delete
	Ed1000,		// Already Exist
	Nd1000,		// No Data Found
	Nl1000,		// No Login ID Found
	Pw1000,		// Password does not match
	Ia1000,		// Status Inactive Login ID
	Un1003,
	
	Sc1001,		// Successfully Save User
	Us1002,    	// Unable to save user
	Su1004,		// Successfully Update User
	Uu1003,    	// Unable to update user
	Su1002,		// Successfully Load User
	Su1003,		// Successfully Load Role
	SCP001,		// Successfully Changed Password
	UCP002,		// Unable to Change Password
	INVP003,	// Invalid Old Password
	Df1000,
	Su1000,		// Successfully Update
	SLAU1002,	// Successfully loaded all user
	ULAU1001,	// Unable to load all user
	SLU1003,	// Successfully loaded user by loginid
	ULU1002,	// Unable to load user by loginid
	SUUS1000,	// Successfully Update User Status
	UUUS1000,	// Unable to Update User Status
	SUUP1001,	// Successfully Update User Password
	UUUP1002,	// Unable to Update User Password
	
	// Company
	COM_IS01,	// Successfully save Company
	COM_IF01,	// Unable to save Company
	COM_US01,	// Successfully Update Company
	COM_UF01,	// Unable to Update Company
	COM_DS01,	// Successfully Delete Company
	COM_DF01,	// Unable to Delete Company
	COM_LF01,	// Unable to load list of Company
	COM_LN01,	// No data found for Company List
	COM_LS01,	// Company list found
	COM_UC01,	// Unable to load Company By Oid
	COM_LC01,	// Successfully loaded Company By Oid
	
	
	//Department
	DEP_ULD01,	// Unable to load list of Department
	DEP_NDF02,	// No data found for Department List
	DEP_DLF03,	// Department list found
	DEP_SSD04,	// Successfully save Department
	DEP_USD04,	// Unable to Save Department
	DEP_SUD05,	// Successfully Update Department
	DEP_UUD06,	// Unable to Update Department
	DEP_SDD07,	// Successfully Delete Department
	DEP_UDD08,	// Unable to Delete Department
	DEP_ULD08,	// Unable to load Department By Oid
	DEP_sld08,	// Successfully loaded Department By Oid
	
	// Group Of Company
	SSGROUP001,		// Successfully saved Group Of Company
	USGROUP001,		// Unable to save Group Of Company
	GOC_NDF1000,	// No Data Found Group Of Company
	UGROUP1000,		// Update Group Of Company
	SDROUP1000,		// Successfully Delete Group Of Company
	UDROUP1001,		// Unable to Delete Group Of Company
	GOC_ULA1001,	// Unable to load list of Group Of Company
	GOC_UL1001,		// Unable to load Group Of Company By Oid
	GOC_SLA1001,	// Successfully loaded list of Group Of Company
	GOC_SL1001,		// Successfully loaded Group Of Company By Oid
	GOC_SL1002,		// Successfully loaded Group Of Company
	GOC_UL1002,		// Unable to load Group Of Company
	REF_ERROR,		// violates foreign key constraint
	
	// Company
	SSCOM001,		// Successfully saved Group Of Company
	USCOM001,		// Unable to save Group Of Company
	
	// Employee
	EMP_SS1001,		// Successfully Save Employee
	EMP_US1002,    	// Unable to save Employee
	EMP_SD1003,		// Successfully Delete Employee
	EMP_UD1004,		// Unable to Delete Employee
	EMP_US1000,		// Successfully Update Employee
	EMP_UU1001,		// Unable to Update Employee
	EMP_SLA1001,	// Successfully loaded list of Employee
	EMP_NDF1000,	// No Data Found of Employee
	EMP_UL1001,		// Unable to load Employee By Oid
	EMP_SL1001,		// Successfully loaded Employee By Oid
	
	//Contact
	CON_UL1001,		// Unable to load Contact By Oid
	CON_SL1001,		//Successfully loaded Contact By Oid
	
	// Division
	DIV_ULD01,	// Unable to load list of District
	DIV_NDF02,	// No data found for District List
	DIV_DLF03,	// District list found
	DIST_SSD04,	// Successfully save District
	DIST_US001,    // Unable to save District
	DIST_SUD05,	// Successfully Update District
	DIST_UUD06,	// Unable to Update District
	DIST_SDD07,	// Successfully Delete District
	DIST_UDD08,	// Unable to Delete District
	DIST_ULD08,	// Unable to load District By Oid
	DIST_sld08,	// Successfully loaded District By Oid	
	// Division
	DIST_ULD01,	// Unable to load list of Division
	DIST_NDF02,	// No data found for Divi
	DIST_DLF03,	// Division list found
	// Thana
	THANA_ULD01,	// Unable to load list of Thana
	THANA_NDF02,	// No data found for Thana List
	THANA_DLF03,	// Thana list foundsion List
	// Post Office
	PO_ULD01,	// Unable to load list of Post Office
	PO_NDF02,	// No data found for Post Office List
	PO_DLF03,	// Post Office list found
	
	// Grade
	GRADE_SSD001,	// Successfully save Grade
	GRADE_US002,    // Unable to save Grade
	GRADE_SUD03,	// Successfully Update Grade
	GRADE_UUD04,	// Unable to Update Grade
	GRADE_SDD05,	// Successfully Delete Grade
	GRADE_UDD06,	// Unable to Delete Grade
	GRADE_ULD07,	// Unable to load Grade By Oid
	GRADE_sld08,	// Successfully loaded Grade By Oid
	
	// Grid Information
	GRID_IS01,	// Successfully save Grid Information
	GRID_IF01,	// Unable to save Grid Information
	GRID_LF01,	// Unable to load list of Grid Information
	GRID_LN01,	// No data found for Grid Information List
	GRID_LS01,	// Grid Information list found
	
	// Warehouse
	WHE_SS1001,		// Successfully Save Warehouse
	WHE_US1002,    	// Unable to save Warehouse
	WHE_SD1003,		// Successfully Delete Warehouse
	WHE_UD1004,		// Unable to Delete Warehouse
	WHE_US1000,		// Successfully Update Warehouse
	WHE_UU1001,		// Unable to Update Warehouse
	WHE_UL1001,		// Unable to load Warehouse By Oid
	WHE_SL1001,		// Successfully loaded Warehouse By Oid
	WHE_Nd1000,		// No Data Found
	WHE_INVP003,	// Invalid Old Password
	WHE_ULD01,		// Unable to load list of Warehouse
	WHE_sld01,		// Successfully loaded list of Warehouse
	WHE_NDF03,		// No data found for Warehouse List
	
	//Product Category
	PRODC_ULD01,	// Unable to load list of Product Category
	PRODC_NDF02,	// No data found for Product Category List
	PRODC_Sld03,	// Product Category list found
	PRODC_SSD04,	// Successfully save Product Category
	PRODC_US001,    // Unable to save Product Category
	PRODC_SUD05,	// Successfully Update Product Category
	PRODC_UUD06,	// Unable to Update Product Category
	PRODC_SDD07,	// Successfully Delete Product Category
	PRODC_UDD08,	// Unable to Delete Product Category
	PRODC_ULD08,	// Unable to load Product Category By Oid
	PRODC_sld08,	// Successfully loaded Product Category By Oid
	//Product Unit
	PRODU_ULD01,	// Unable to load list of Product Unit
	PRODU_sld01,	// Successfully loaded list of Product Unit
	PRODU_DLF03,	// No data found for Product Unit List
	PROD_SSF03,		// Product Unit list found
	PRODU_SSD04,	// Successfully save Product Unit
	PRODU_US001,    // Unable to save Product Unit
	PRODU_SUD05,	// Successfully Update Product Unit
	PRODU_UUD06,	// Unable to Update Product Unit
	PRODU_SDD07,	// Successfully Delete Product Unit
	PRODU_UDD08,	// Unable to Delete Product Unit
	PRODU_ULD08,	// Unable to load Product Unit By Oid
	PRODU_sld08,	// Successfully loaded Product Unit By Oid
	//Product
	PROD_SSD01,		// Successfully save Product
	PROD_US002,    	// Unable to save Product
	PROD_SUD03,		// Successfully Update Product
	PROD_UUD04,		// Unable to Update Product
	PROD_SDD05,		// Successfully Delete Product
	PROD_UDD06,		// Unable to Delete Product
	PROD_ULD07,		// Unable to load Product By Oid
	PROD_sld08,		// Successfully loaded Product By Oid
	PROD_ULD01,		// Unable to load list of Warehouse
	PROD_sld01,		// Successfully loaded list of Warehouse
	PROD_NDF03,		// No data found for Warehouse List
	// tax Rate
	TR_SSD001,	// Successfully saved tax rate by 
	TR_US002,    // An exception occurred while save tax rate
	TR_SUD03,	// Successfully updated tax rate
	TR_UUD04,	// An exception occurred while updating tax rate
	TR_SDD05,	// Successfully deleted grade 
	TR_UDD06,	// An exception occurred while deleting tax rate
	TR_ULD07,	// "An exception occured while getting tax rate By Oid
	TR_sld08,	// Successfully loaded tax rate By Oid
	
	// Purchase Order Requisition
	REQ_SS1001,		// Successfully Save purchase Order Requisition
	REQ_US1002,    	// Unable to save  Purchase Order Requisition
	REQ_SD1003,		// Successfully Delete  Purchase Order Requisition
	REQ_UD1004,		// Unable to Delete  Purchase Order Requisition
	REQ_US1000,		// Successfully Update  Purchase Order Requisition
	REQ_UU1001,		// Unable to Update  Purchase Order Requisition
	REQ_SLA1001,	// Successfully loaded list of  Purchase Order Requisition
	REQ_NDF1000,	// No Data Found of  Purchase Order Requisition
	REQ_UL1001,		// Unable to load  Purchase Order Requisition By Oid
	REQ_SL1001,		// Successfully loaded  Purchase Order Requisition By Oid
	REQ_GNC1001,	// Successfully Generate Next  Requisition No
	REQ_UGNC1001,	// Unable to Generate Next  Requisition No
	REQ_SSCS1000,	// Successfully Convert To Send Purchase Order Requisition
	REQ_USCS1000,	// Unable to Convert Send Purchase Order Requisition
	REQ_UL1002,		// Unable to load Purchase Requisition List
	REQ_NDFWAM01,	// No Data Found of Work flow Access Permission
	REQ_SLWAM01,	// Successfully loaded Work flow Access Permission by people Oid
	
	// Purchase Order
	POR_SSD001,		// Successfully saved purchaseOrder by 
	POR_US002,  	// An exception occurred while saving purchaseOrder
	POR_SUD03,		// Successfully update purchase order
	POR_UUD04,		// An exception occurred while update purchase order
	POR_SDD05,		// Successfully deleted grade 
	POR_UDD06,		// An exception occurred while deleting tax rate
	POR_ULD07,		// An exception occured while getting Purchase Order By Oid
	POR_sld08,		// Successfully loaded Purchase Order by oid
	POR_UL1001,		// Query for Purchase Order BY Oid
	POR_SSCO1000,	// Successfully Convert To Send Sales Order
	POR_USCO1000,	// Unable to Convert Send Sales Order
	
	// purchase Order Requisition
	SOEST_SS1001,		// Successfully Save  purchase Order Requisition
	SOEST_US1002,    	// Unable to save  Sales Order Estimate
	SOEST_SD1003,		// Successfully Delete  Sales Order Estimate
	SOEST_UD1004,		// Unable to Delete  Sales Order Estimate
	SOEST_US1000,		// Successfully Update  Sales Order Estimate
	SOEST_UU1001,		// Unable to Update  Sales Order Estimate
	SOEST_SLA1001,		// Successfully loaded list of  Sales Order Estimate
	SOEST_NDF1000,		// No Data Found of  Sales Order Estimate
	SOEST_UL1001,		// Unable to load  Sales Order Estimate By Oid
	SOEST_SL1001,		// Successfully loaded  Sales Order Estimate By Oid
	SOEST_SGSOEN1000,	// Successfully Generate Sales Order Estimate No
	SOEST_UGSOEN1000,	// Unable to Generate Sales Order Estimate No

	// Bill
	BILL_SS1001,		// Successfully Save  Bill Information
	BILL_US1002,    	// Unable to save  Bill Information
	BILL_SD1003,		// Successfully Delete  Bill Information
	BILL_UD1004,		// Unable to Delete  Bill Information
	BILL_US1000,		// Successfully Update  Bill Information
	BILL_UU1001,		// Unable to Update  Bill Information
	BILL_SLA1001,		// Successfully loaded list of Bill Information
	BILL_NDF1000,		// No Data Found of  Bill Information
	BILL_UL1002,		// Unable to load Bill Information 
	BILL_UL1001,		// Unable to load Bill Information By Oid
	BILL_SL1001,		// Successfully loaded  Bill Information By Oid
	BILL_SLADUE1001,	// Successfully loaded list of Due Bill Information
	BILL_NDFDUE1000,	// No Data Found of Due Bill Information
	BILL_SSCS1000,		// Successfully Update Bill Information Status
	BILL_USCS1000,		// Unable to Update Bill Information Status
	BILL_SGBN1000,		// Successfully Generate Bill No
	BILL_UGBN1000,		// Unable to Generate Bill No
	

	// Payment Made
	PAY_M_SS1001,		// Successfully Save Payment Made
	PAY_M_US1002,    	// Unable to save  Payment Made
	PAY_M_SD1003,		// Successfully Delete  Payment Made
	PAY_M_UD1004,		// Unable to Delete  Payment Made
	PAY_M_US1000,		// Successfully Update  Payment Made
	PAY_M_UU1001,		// Unable to Update  Payment Made
	PAY_M_SLA1001,		// Successfully loaded list of  Payment Made
	PAY_M_NDF1000,		// No Data Found of Payment Made
	PAY_M_UL1001,		// Unable to load  Payment Made By Oid
	PAY_M_SL1001,		// Successfully loaded  Payment Made By Oid
	PAY_M_SGPMN1000,	// Successfully Generate Payment Made No
	PAY_M_UGPMN1000,	// Unable to Generate Payment Made No
	PAY_M_SSPMS1000,	// Successfully Update Payment Made Status
	PAY_M_USPMS1000,	// Unable to Update Payment Made Status
	PAY_M_UL1000,		// Unable to load  Payment Made
	
	// Payment Made
	DV_SS1001,		// Successfully Save Debit Voucher
	DV_US1002,    	// Unable to save  Debit Voucher
	DV_SD1003,		// Successfully Delete  Debit Voucher
	DV_UD1004,		// Unable to Delete  Debit Voucher
	DV_US1000,		// Successfully Update  Debit Voucher
	DV_UU1001,		// Unable to Update  Debit Voucher
	DV_SLA1001,		// Successfully loaded list of  Debit Voucher
	DV_NDF1000,		// No Data Found of  Debit Voucher
	DV_UL1001,		// Unable to load  Debit Voucher By Oid
	DV_SL1001,		// Successfully loaded  Debit Voucher By Oid
	DV_SGPMN1000,	// Successfully Generate Debit Voucher No
	DV_UGPMN1000,	// Unable to Generate Debit Voucher No
	DV_SSPMS1000,	// Successfully Update Debit Voucher Status
	DV_USPMS1000,	// Unable to Update PDebit Voucher Status

	// Vendor Credit
	VC_SS1001,		// Successfully Save  Vendor Credit
	VC_US1002,    	// Unable to save  Vendor Credit
	VC_SD1003,		// Successfully Delete  Vendor Credit
	VC_UD1004,		// Unable to Delete  Vendor Credit
	VC_US1000,		// Successfully Update  Vendor Credit
	VC_UU1001,		// Unable to Update  Vendor Credit
	VC_SLA1001,		// Successfully loaded list of  Vendor Credit
	VC_NDF1000,		// No Data Found of  Vendor Credit
	VC_UL1001,		// Unable to load  Vendor Credit By Oid
	VC_SL1001,		// Successfully loaded  Vendor Credit By Oid
	VC_SLADUE1001,	// Successfully loaded list of Due Vendor Credit
	VC_NDFDUE1000,	// No Data Found of Due Vendor Credit
	VC_SSCS1000,	// Successfully Update Vendor Credit Status
	VC_USCS1000,	// Unable to Update Vendor Credit Status
	VC_SGVCN1000,	// Successfully Generate Vendor Credit No
	VC_UGVCN1000,	// Unable to Generate Vendor Credit No
	
	// Sales Order
	SO_SS1001,		// Successfully Save  Sales Order
	SO_US1002,    	// Unable to save  Sales Order
	SO_SD1003,		// Successfully Delete  Sales Order
	SO_UD1004,		// Unable to Delete  SO Order
	SO_US1000,		// Successfully Update  Sales Order
	SO_UU1001,		// Unable to Update  Sales Order
	SO_SLA1001,		// Successfully loaded list of  Sales Order
	SO_NDF1000,		// No Data Found of  Sales Order
	SO_UL1001,		// Unable to load  Sales Order By Oid
	SO_SL1001,		// Successfully loaded  Sales Order By Oid
	SO_SSCO1000,	// Successfully Convert To Open Sales Order
	SO_USCO1000,	// Unable to Convert  Open Sales Order
	SO_SGSON1000,	// Successfully Generate Sales Order No
	SO_UGSON1000,	// Unable to Generate Sales Order No
	

	// Purchase Order
	PO_SS1001,		// Successfully Save  Purchase Order
	PO_US1002,    	// Unable to save  Purchase Order
	PO_SD1003,		// Successfully Delete  Purchase Order
	PO_UD1004,		// Unable to Delete  Purchase Order
	PO_US1000,		// Successfully Update  Purchase Order
	PO_UU1001,		// Unable to Update  Purchase Order
	PO_SLA1001,		// Successfully loaded list of  Purchase Order
	PO_NDF1000,		// No Data Found of Purchase Order
	PO_ULD1001,		// Unable to load list of Purchase Order
	PO_UL1001,		// Unable to load  Purchase Order By Oid
	PO_SL1001,		// Successfully loaded  Purchase Order By Oid
	PO_GNC1001,		// Successfully Generate Next Purchase Order No
	PO_UGNC1001,	// Unable to Generate Next Purchase Order No
	PO_SSCS1000,	// Successfully Convert To Send Purchase Order
	PO_USCS1000,	// Unable to Convert Send Purchase Order
	PO_UL1002,		// Unable to load Purchase Order List
	
	// Sales Invoice
	SALESINV_SS1001,		// Successfully Save  Sales Invoice
	SALESINV_US1002,    	// Unable to save  Sales Invoice
	SALESINV_SD1003,		// Successfully Delete  Sales Invoice
	SALESINV_UD1004,		// Unable to Delete  Sales Invoice
	SALESINV_US1000,		// Successfully Update  Sales Invoice
	SALESINV_UU1001,		// Unable to Update  Sales Invoice
	SALESINV_SLA1001,		// Successfully loaded list of  Sales Invoice
	SALESINV_NDF1000,		// No Data Found of  Sales Invoice
	SALESINV_UL1001,		// Unable to load  Sales Invoice By Oid
	SALESINV_SL1001,		// Successfully loaded  Sales Invoice By Oid
	SALESINV_SGSIN1000,	// Successfully Generate Sales Order Estimate No
	SALESINV_UGSIN1000,	// Unable to Generate Sales Order Estimate No
	SALESINV_SLADUE1001,	// Successfully loaded list of Due Invoice Information
	SALESINV_NDFDUE1000,	// No Data Found of Due Invoice Information
	
	
	//BATCH Information
	BATCH_SLWHBP1001,		// Successfully loaded list of Warehouse Information By Product Oid
	BATCH_NDFWHBP1000,		// No Data Found of Warehouse Information By Product Oid
	BATCH_SLBIBW1001,		// Successfully loaded list of Batch Information By Warehouse Oid
	BATCH_NDFBIBW1000,		// No Data Found of Batch Information By Warehouse Oid
	BATCH_SLBDBBP1001,		// Successfully loaded Batch Detail By Batch Information OId, Product Oid
	BATCH_NDFBDBBP1000,		// No Data Found of Batch Detail By Batch Information OId, Product Oid

	// Payment Received Information
	PAYR_SS1001,		// Successfully Save Payment Received Information
	PAYR_US1002,    	// Unable to save  Payment Received Information
	PAYR_SD1003,		// Successfully Delete  Payment Received Information
	PAYR_UD1004,		// Unable to Delete  Payment Received Information
	PAYR_US1000,		// Successfully Update  Payment Received Information
	PAYR_UU1001,		// Unable to Update  Payment Received Information
	PAYR_SLA1001,		// Successfully loaded list of  Payment Received Information
	PAYR_NDF1000,		// No Data Found of  Payment Received Information
	PAYR_UL1001,		// Unable to load  Payment Received Information By Oid
	PAYR_SL1001,		// Successfully loaded  Payment Received Information By Oid
	PAYR_SGPRN1000,		// Successfully Generate Payment Received No
	PAYR_UGPRN1000,		// Unable to Generate Payment Received No
	
	
	
	
	
	
	//Ledger
	// Company
	LGER_IS01,	// Successfully save Ledger
	LGER_IF01,	// Unable to save Ledger
	LGER_US01,	// Successfully Update Ledger
	LGER_UF01,	// Unable to Update Ledger
	LGER_DS01,	// Successfully Delete Ledger
	LGER_DF01,	// Unable to Delete Ledger
	LGER_LF01,	// Unable to load list of Ledger
	LGER_LN01,	// No data found for Ledger List
	LGER_LS01,	// Company list found
	LGER_UC01,	// Unable to load  By Oid
	LGER_LC01,	// Successfully loaded  By Oid
	LGER_SSD01,		// Successfully save Ledger
	LGER_SSD02,		
	LGER_US001,    	// Unable to save Ledger
	LGER_SL01,	// Successfully load Ledger balance
	LGER_UL01,	// Unable to load Ledger balance
	
	//Ledger
	LGERSETTING_SSD01,		// Successfully save Ledgersetting
	LGERSETTING_SLA1001,	/// Successfully loaded list of  Payment Received Information
	LGERSETTING_USLA1001,	/// unable loaded list of  Payment Received Information
	LGERSETTING_US001,    	// Unable to save Ledger
	
	// Role
	UTSR_001,		// Unable to switch role!
	
	// Financial Period
	FP_IS01,		// Successfully save Financial Period
	FP_IF01,		// Unable to save Financial Period
	FP_AE01,		// Unable to save Financial Period
	
	
	// Journal
	JR_IS01,		// Successfully save Journal
	JR_IF01,		// Unable to save Journal

	// Journal Summary
	JRS_SL1001,		// Successfully loaded Journal Summary By Journal Manner
	JRS_UL1002,		// Unable to load Journal Summary By Journal Manner
	
	// Expense
	EXP_IS01,		// Successfully save Expense
	EXP_IF01,		// Unable to save Expense
	EXP_US01,	    // Successfully Update Expense
	EXP_UF01,	    // Unable to Update Expense
	EXP_UL1001,		// Unable to load Expense Summary By Oid
	EXP_SL1001,		// Successfully loaded Expense Summary By Oid
	EXP_UL1002,		// Unable to load Expense Detail By Oid
	EXP_SL1002,		// Successfully loaded Expense Detail By Oid
	EXP_SLA1001,	// Successfully loaded list of Expense
	EXP_NDF1000,	// No Data Found of Expense
	EXP_ULD01,		// Unable to load list of Expense
	
	// Accounting Report
	AR_GLULD01,		// Unable to load General Ledger Report Data
	AR_SLATD01,		// Successfully load Account Transactions Report Data
	AR_ULATD01,		// Unable to load Account Transactions Report Data
	CASH_TNX_000, 	// Successfully Generate Cash Transaction ID
	CASH_TNX_001, 	// Unable to  Generate Cash Transaction ID
	
	// Accounting Report
	IR_SLPRD01,		// Successfully load Payment Received Report Data
	IR_ULPRD01,		// Unable to load Payment Received Report Data
	
	NO_DATA,		// No Data Available
	
	// People
	PEOPLE_SS1001,		// Successfully save people
	PEOPLE_US1002,    	// Unable to save people
	DUPLICATE,			// DUPLICATE
	
	
}
