/*
------------------------------------------------------------------------------
A L T E R   O B J E C T S   T A B L E S
------------------------------------------------------------------------------
*/

/*
BankTransaction
OID								: Primary key
groupOfCompanyOID				: Group of Company ID
companyOID						: Company ID`
*/
create table 					BankTransaction
(
OID								varchar(64)							not null,
groupOfCompanyOID				varchar(64),
companyOID						varchar(64),
transactionNo					varchar(64),
transactionDate				    date 								not null,
transactionType					varchar(64),
transactionAmount				numeric(64,2)						not null,
bankOID							varchar(128)						not null,
debitLedgerOID					varchar(128),
creditLedgerOID					varchar(128),
debitSubLedgerOID				varchar(128),
creditSubLedgerOID				varchar(128),
withdrawChequeNo				varchar(64),
depositBy						varchar(128),
depositTo						varchar(128),
withdrawBy						varchar(64),
withdrawFor						varchar(64),
referenceNo 					varchar(64),
notes							text,
depositType						varchar(64),
depositorBankName				varchar(128),
depositorAccountName			varchar(128),
depositorAccountNo				varchar(64),
depositorChequeNo				varchar(64),
status							varchar(8),
sortOrder						int,
-- Audit
createdOn						timestamp 							not null		default		current_timestamp,
createdBy						varchar(64)							not null		default 	user,
editedOn						timestamp,
editedBy						varchar(64),
constraint						fk_companyID_BankTransaction		foreign key 	(companyOID)
																	references 		Company(OID),
constraint						pk_BankTransaction					primary key		(OID)
);

ALTER TABLE journalSummary ADD journalManner varchar(16);
-- By Mahfuz 18-07-2017 @ 21:50
ALTER TABLE expensedetail  ADD imagePath varchar(256);
ALTER TABLE expensedetaillog  ADD imagePath varchar(256);