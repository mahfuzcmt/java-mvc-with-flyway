package com.secl.ocr.dashboard.bean;
 
import java.util.List;

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
public class DashboardBean extends AbstractBean {
	
	private PayableProgress payableProgress;
	private ReceivableProgress receivableProgress;
	private List<CashFlow> cashFlows;
	private CashFlowByFP cashFlowByFP;
	private List<BankBean> bankAccounts;
	private LoginBean loginBean;
	

	@Override
	public String getOperation() {
		return operation;
	}

	@Override
	public void setOperation(String operation) {
		this.operation = operation;
	}

	@Override
	public String getOid() {
		return oid;
	}

	@Override
	public void setOid(String oid) {
		this.oid = oid;
	}
	 
	@Override
	  public String toString() {
    	return new GsonBuilder().setPrettyPrinting().create().toJson(this);
	}
	
}
