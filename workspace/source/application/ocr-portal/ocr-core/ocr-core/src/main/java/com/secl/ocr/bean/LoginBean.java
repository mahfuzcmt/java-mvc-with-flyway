package com.secl.ocr.bean;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.gson.GsonBuilder;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@JsonSerialize
@JsonDeserialize
@NoArgsConstructor
public class LoginBean extends AbstractBean {
	
	private String loginID, password, roleID, googleID, roleDescription, name;
	private String status, sessionId, featureJSON, defaultJSON, roleIdJSON, roleJSON, reportJSON, imagePath, menuJSON;
	private String oldPassword, newPassword, primaryRole, secondaryRole;
	private String groupOfCompanyOID, groupOfCompanyName, companyOID, companyName;
	private String userLevel, loggedInFor, employeeOID, employeeID, employeeName;
	private Boolean isOriginalMenuJsonAvailable;
	private int ledgerDataByCompanyOid;
	private String peopleType;
	
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
