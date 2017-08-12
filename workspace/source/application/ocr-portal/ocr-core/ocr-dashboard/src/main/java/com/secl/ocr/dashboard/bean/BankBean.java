package com.secl.ocr.dashboard.bean;
 
import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.gson.GsonBuilder;
import com.secl.ocr.bean.AbstractBean;
import com.secl.ocr.bean.LoginBean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonDeserialize
@JsonSerialize
@NoArgsConstructor
@Getter
@Setter
public class BankBean extends AbstractBean {
	
	private String name;	
	private String mnemonic;				
	private String accountName;			
	private String accountNumber;	
	private Double accountBalance;	
	private String creditCardNumber;	
	private String address;			
	private String email; 
	private String website;
	private String contactNumber;
	private String accountType;
	private String status;
	private int sortOrder;
	private LoginBean loginBean;
	
	private String ledgerOID;		
	private String subLedgerOID;	
	private String ledgerCode;	
	
	// Bank Transaction
	private String groupOfCompanyOID; 
	private String companyOID;
	private String transactionNo;
	private Date transactionDate;
	private String transactionType;
	private Double transactionAmount;
	private Double ledgerBalance;
	private String bankOID;
	
	private String bankLedgerOID;		
	private String cashLedgerOID;	
	private String bankSubLedgerOID;	
	
	private String debitLedgerOID;		
	private String creditLedgerOID;	
	private String debitSubLedgerOID;	
	private String creditSubLedgerOID;	
	
	private String withdrawChequeNo;
	private String depositBy;
	private String depositTo;
	private String withdrawBy;
	private String withdrawFor;
	private String referenceNo;
	private String notes;
	private String depositType;
	private String depositorBankName;
	private String depositorAccountName;
	private String depositorAccountNo;
	private String depositorChequeNo;	
	private String paymentMode;		

	@Override
	public String getOid() {
		return oid;
	}

	@Override
	public void setOid(String oid) {
		this.oid = oid;
	}

	@Override
	public String getOperation() {
		return operation;
	}

	@Override
	public void setOperation(String operation) {
		this.operation = operation;
	}

	@Override
    public String toString() {
    	return new GsonBuilder().setPrettyPrinting().create().toJson(this);
    }
	
}
