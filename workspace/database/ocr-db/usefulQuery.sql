
-- All Table Select
SELECT 'select * from ' || table_name || ';' as "select_command"
FROM information_schema.tables
WHERE table_schema = 'public' AND table_type='BASE TABLE';

-- All Table Row Count
SELECT 'select ''' || table_name || ''' as table_name, count(*) as total_row from ' || table_name || ' union all' as "select_command"
FROM information_schema.tables
WHERE table_schema = 'public' AND table_type='BASE TABLE';

-- Trial Balance
select ledgerName, ledgerCode,  ledgerType, ledgerBalance from ledger order by ledgerType DESC;

-- Balance Sheet
select lgr.ledgerGroupName, lsgr.ledgerSubgroupName, lg.ledgerName, lg.ledgerCode,  lg.ledgerType, lg.ledgerBalance
from ledger lg, ledgerGroup lgr, LedgerSubGroup lsgr
Where lg.ledgerSubGroupOID in (select oid from LedgerSubGroup where ledgerGroupOid in(select oid from LedgerGroup where ledgerGroupCode in ('01','02','03')))
and
lg.ledgerSubGroupOid=lsgr.oid
and
lsgr.ledgerGroupOid=lgr.oid
;

-- Profit & Loss
select lgr.ledgerGroupName, lsgr.ledgerSubgroupName, lg.ledgerName, lg.ledgerCode,  lg.ledgerType, lg.ledgerBalance
from ledger lg, ledgerGroup lgr, LedgerSubGroup lsgr
Where lg.ledgerSubGroupOID in (select oid from LedgerSubGroup where ledgerGroupOid in(select oid from LedgerGroup where ledgerGroupCode in ('04','05')))
and
lg.ledgerSubGroupOid=lsgr.oid
and
lsgr.ledgerGroupOid=lgr.oid
;

-- Profit and loss
select
(select sum(ledgerBalance) from ledger where ledgerCode like '04%')
-(select sum(ledgerBalance) from ledger where ledgerCode like '05%') as profit from ledger group by profit;

-- Account Receivable Dashboard
select lg.ledgerName,
COALESCE (sum (j.creditedamount),0) CurrentRcv,
lg.ledgerBalance OverDue,
(COALESCE (sum (j.creditedamount),0)+lg.ledgerBalance) Total
from ledger lg, journal j
where lg.oid = j.ledgerOid
and lg.ledgerCode = '0101002'
group by lg.ledgerName, lg.ledgerBalance;

-- Account Payable Dashboard
select lg.ledgerName,
COALESCE (sum (j.debitedamount),0) Currentpbl,
lg.ledgerBalance OverDue,
(COALESCE (sum (j.debitedamount),0)+lg.ledgerBalance) Total
from ledger lg, journal j
where lg.oid = j.ledgerOid
and lg.ledgerCode = '0201003'
group by lg.ledgerName, lg.ledgerBalance
order by 1;

-- CashFlow Statment
select lg.ledgerName,
(select COALESCE(sum(cashInJournal.creditedamount),0) from journal cashInJournal where cashInJournal.journalsummaryoid in (select journalsummaryoid from journal where ledgercode ='0101001') and  cashInJournal.ledgerCode != '0101001') cashIn,
(select COALESCE(sum(cashOutJournal.debitedamount),0) from journal cashOutJournal where cashOutJournal.journalsummaryoid in (select journalsummaryoid from journal where ledgercode ='0101001') and  cashOutJournal.ledgerCode != '0101001')  cashout
from journal j, ledger lg
where lg.oid = j.ledgerOid
and j.ledgerCode != '0101001'
group by lg.ledgerName
order by 1;

--SCP Command for file transfer
scp -i /Users/sharafat/Sharafat/TICL_AWS_PrivateKey.pem web-app.war ec2-user@52.206.218.70:/home/ec2-user
