package com.secl.ocr.security.bean;

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
public class RoleBean extends AbstractBean {
	
	private String roleID;
	private String roleDescription;
	private String menuJSON;
	private String valueJson; 
	private LoginBean loginBean;
	private String featureJSON;
	private String roleType;
	private String status;
	private String category;
	private String groupOfCompanyOID;
	private String companyOID;
	
	
	
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
