package com.secl.ocr.manager.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.secl.ocr.dao.BaseDao;
import com.secl.ocr.util.Constant;
import com.secl.ocr.util.Table;

import lombok.Synchronized;

@Component("idGenerator")
public class IdGenerator {
	
	private final int NUM_CHARS = 15;
	private String chars = "abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	private Random r = new Random();
	private SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd-HHmmss");
	private SimpleDateFormat dfLedger = new SimpleDateFormat("yyyyMMddHHmmssSSS");

	private SimpleDateFormat dateForOID = new SimpleDateFormat("yyyyMMddHHmmss");
	private SimpleDateFormat dateForVoucherNo = new SimpleDateFormat("yyyyMMdd");
	private SimpleDateFormat dateForVoucher = new SimpleDateFormat("yyyy");

    
	@Synchronized
	public String generateId() {
		Date today = new Date();      
        String todayAsString = df.format(today);
        return todayAsString + "-" + getRandomWord();
    }
	
	@Synchronized
	private String getRandomWord() {
        char[] buf = new char[NUM_CHARS];
        for (int i = 0; i < buf.length; i++) {
            buf[i] = chars.charAt(r.nextInt(chars.length()));
        }
        return new String(buf);
    }
	
	@Synchronized
	public String getSessionId() {
		return UUID.randomUUID().toString();
	}
	
	@Synchronized
	public String getReportFileName(final String prefix, final String fileType) {
		Date today = new Date();
        return prefix + "_" + df.format(today) + "." + fileType;
    }
	
	public String getPassword() {
	    Random r = new Random(System.currentTimeMillis());
	    return String.valueOf((1 + r.nextInt(2)) * 10000 + r.nextInt(10000));
	}
	
	@Synchronized
	public String generateLedgerId() {
		Date today = new Date();      
        String todayAsString = dfLedger.format(today);
        return todayAsString;
    }

	@Synchronized
	public String generateLedgerGroupId() {
		Date today = new Date();      
        String todayAsString = dfLedger.format(today);
        return todayAsString;
    }
	
	@Synchronized
	public String generateLedgerSubGroupId() {
		Date today = new Date();      
        String todayAsString = dfLedger.format(today);
        return todayAsString;
    }

	@Synchronized
	public String generateBankTransactionOID() {
		Date today = new Date();      
        String todayAsString = "BANKT-"+dateForOID.format(today);
        return todayAsString;
	}

	@Synchronized
	public String generateJournalOID() {
		return "JNRl-"+generateId();
    }

	@Synchronized
	public String generateExpenseOID() {
		return "EXP-"+generateId();
    }

	@Synchronized
	public String generateRecurringExpenseOID() {
		return "REC-EXP-"+generateId();
    }
	
	@Synchronized
	public String generateRequisitionOID() {
		return "REQ-"+generateId();
	}

	@Synchronized
	public String generateLoanRequestOID() {
		return "LR-"+generateId();
	}
	
	@Synchronized
	public String generatePurchaseOrderOID() {
		return "PO-"+generateId();
	}

	@Synchronized
	public String generateSalesOrderOID() {
		return "SO-"+generateId();
	}

	@Synchronized
	public String generatePaymentsReceivedOID() {
		return "PR-"+generateId();
	}

	@Synchronized
	public String generatePaymentsReceivedInvoiceOID() {
		return "PRI-"+generateId();
	}

	@Synchronized
	public String generateEstimateOID() {
        return "EST-"+generateId();
	}

	@Synchronized
	public String generateBillInformationOID() {
        return "BILL-"+generateId();
	}

	@Synchronized
	public String generateBatchInformationOID() {
        return "BCH-"+generateId();
	}

	@Synchronized
	public String generateStockDetailOID() {
        return "STK-"+generateId();
	}

	@Synchronized
	public String generatePaymentMadeOID() {
        return "PM-"+generateId();
	}

	@Synchronized
	public String generatePaymentReceivedOID() {
        return "PR-"+generateId();
	}

	@Synchronized
	public String generateInvoiceOID() {
        return "INV-"+generateId();
	}
	
	@Synchronized
	public String generateVendorCreditOID() {
		return "VC-"+generateId();
	}
	
	@Synchronized
	public String getNextCode(BaseDao dao, String prefix, String companyOid, String tableName, String colName) throws Exception {
		String sql = "select concat('"+prefix+"', LPAD((CAST(coalesce(max(substring("+colName+" FROM '[0-9]+')), '0')"
			+ " AS INTEGER)+1)::text, "+Constant.PREFIX_NUMBER_LENGTH+", '0')) as code"
			+ " from "+tableName
			+ " where 1 = 1 and companyoid = ?";
		return (String) dao.getPrimitive(sql, new Object[]{companyOid}, String.class);
	}
	
	@Synchronized
	public String getNextCodeVoucherNo(BaseDao dao, String prefix, String companyOid, String tableName, String colName) throws Exception {
		Date today = new Date();      
        String todayAsString = "-"+dateForVoucherNo.format(today);
		String sql = "select concat((select mnemonic from "+Table.COMPANY+" where oid = ?),"+todayAsString+",(select count(*)+1 from "+Table.DEBIT_VOUCHER+" where voucherDate::text LIKE  '"+dateForVoucher.format(today)+"%' and companyOid = ?)) from "+Table.PEOPLE+" limit 1";
		return (String) dao.getPrimitive(sql, new Object[]{companyOid,companyOid}, String.class);
	}
	
	@Synchronized
	public String getNextContactID(BaseDao dao, String prefix, String peopleType, String tableName, String colName) throws Exception {
		String sql = "select concat('"+prefix+"', LPAD((CAST(coalesce(max(substring("+colName+" FROM '[0-9]+')), '0')"
			+ " AS INTEGER)+1)::text, "+Constant.PREFIX_NUMBER_LENGTH+", '0')) as code"
			+ " from "+tableName
			+ " where 1 = 1 and peopleType = ?";
		return (String) dao.getPrimitive(sql, new Object[]{ peopleType}, String.class);
	}

	public String generatePaymentDisbursementOID() {
		return "PD-"+generateId();
	}
}




