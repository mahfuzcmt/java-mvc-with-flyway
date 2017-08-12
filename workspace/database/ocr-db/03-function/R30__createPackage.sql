/* function proc_closing_period() is for copying Ledgerbyperiod,BranchLedgerByPeriod and SubledgerByPeriod
 when a period is closed. This function will call by java program when a period will be closed successfully */
create or replace function proc_closing_period (pid varchar(64),groupOid varchar(64),companyid varchar(64)) returns void AS $proc_closing_period$

	declare			
		ledCoursor CURSOR FOR SELECT * FROM Ledger where companyOid=companyid;
		subledCursor CURSOR FOR SELECT * FROM subledger where companyOid=companyid;
		journalCoursor CURSOR FOR SELECT * FROM Journal where companyOid=companyid;
		i integer;
				
	BEGIN	
		i := 0;
		for led in ledCoursor loop
			i := i+1;
			INSERT INTO ledgerbyfinancialperiod
			(oid, ledgerOid,ledgercode, ledgername, mnemonic, ledgertype,ledgerSubGroupCode, openingbalance, 
			ledgerbalance, closingbalance, status, isbalancesheetitem,
			ledgersubgroupOid, financialperiodoid,groupOfCompanyOID,companyOID, editedBy)
			
			VALUES(CONCAT(now(), i), led.OID, led.ledgercode,led.ledgerName, led.mnemonic,  led.ledgerType, led.ledgerSubGroupCode,led.openingbalance,
			led.ledgerbalance, led.closingbalance, led.status,  led.isbalancesheetitem,
			led.ledgersubgroupOid, pid, groupOid,companyid, led.editedBy);			
		end loop; 					
		i := 0;

		for sled in subledCursor loop
			i := i+1;
			INSERT INTO SubledgerByFinancialPeriod (oid, subledgerOid,subledgerCode, subledgername, mnemonic, subledgertype, openingbalance, subledgerbalance,
			closingbalance, status, ledgerOid, ledgerCode,financialperiodoid, groupOfCompanyOID,companyOID, editedBy)
			VALUES (CONCAT(now(), i), sled.oid,  sled.subledgerCode, sled.subledgername, sled.mnemonic, sled.subledgertype, sled.openingbalance, sled.subledgerbalance,
			sled.closingbalance, sled.status,  sled.ledgeroid, sled.ledgerCode, pid, groupOid, companyid, sled.editedBy);
			
		end loop;			
		i := 0;	
		
		for jrnl in journalCoursor loop
			i := i+1;
			INSERT INTO JournalByFinancialPeriod
			(oid, journalOid, journalsummaryoid, journalentrydate, journalentryno, contacttag, referenceno, description, debitedamount, creditedamount, 
			ledgeroid, ledgercode, ledgerbalance, subledgeroid, subledgercode, subledgerbalance, financialperiodoid, groupofcompanyoid, companyoid, versionid, status, createdon, createdby, editedon, editedby)
			VALUES(CONCAT(now(), i), jrnl.oid, jrnl.journalsummaryoid, jrnl.journalentrydate, jrnl.journalentryno, jrnl.contacttag, 
			jrnl.referenceno, jrnl.description, jrnl.debitedamount, jrnl.creditedamount, jrnl.ledgeroid, 
			jrnl.ledgercode, jrnl.ledgerbalance, jrnl.subledgeroid, jrnl.subledgercode, jrnl.subledgerbalance, jrnl.financialperiodoid, jrnl.groupofcompanyoid, 
			jrnl.companyoid, jrnl.versionid, jrnl.status, jrnl.createdon, jrnl.createdby, jrnl.editedon, jrnl.editedby);
		end loop;			
		i := 0;	
		UPDATE FinancialPeriod set status = 'Closed' where oid = pid and companyOid=companyid;
		UPDATE Ledger set ledgerbalance = (select "GrossProfit" from vgrossprofitbycompany where vgrossprofitbycompany.companyOid = companyid) where oid = (select LedgerSetting.ledgerOid from LedgerSetting where LedgerSetting.ledgerKey='RetainedEarning' and LedgerSetting.companyOid = companyid);
		UPDATE Ledger set openingbalance = ledgerbalance, ledgerbalance = 0.00,	closingbalance = ledgerbalance	where ledgercode like '4%' or ledgercode like '5%' and companyOid=companyid;
		UPDATE Subledger set openingbalance = subledgerbalance, subledgerbalance = 0.00,	closingbalance = subledgerbalance	where ledgercode like '4%' or ledgercode like '5%' and companyOid=companyid;
		DELETE from Journal where companyOid=companyid;				
	END;
	
$proc_closing_period$ language plpgsql;

-- Insert Ledger Setting Data 
create or replace function insertLedgerSettingData (groupid varchar(64),companyid varchar(64)) returns void AS $insertLedgerSettingData$
	declare			
			i 									integer;
	BEGIN
		i := 1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'Cash', 'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'CashInBank',  'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'ACReceivable', 'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'Inventory', 'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'ACPayable', 'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'TaxPayable', 'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'SalesRevenue', 'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'CostOfGoodsSold', 'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'TaxExpense',  'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'DiscountEarned', 'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'DiscountExpense', 'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'RetainedEarning',  'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'ShippingExpense',  'Active');
		i := i+1;
		insert into LedgerSetting (OID, groupOfCompanyOID, companyOID, ledgerKey, status) values (CONCAT(now(), i), groupid, companyid,  'OwnersEquity',  'Active');
	
	END;	
$insertLedgerSettingData$ language plpgsql;