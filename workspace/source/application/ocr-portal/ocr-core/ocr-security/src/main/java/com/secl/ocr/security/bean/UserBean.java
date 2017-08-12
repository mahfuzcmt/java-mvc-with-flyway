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
public class UserBean extends AbstractBean {
	
	private String loginID;
	private String password;
	private String oldPassword;
	private String newPassword;
	private String confirmPassword;
	private String roleID;
	private String roleDescription;
	private String googleID;
	private String name;
	private String userName;
	private String imagePath;
	private String gcLogoPath;
	private String logoPath;
	private String userImagePath;
	private String status;
	private String featureJSON;
	private String sessionId;
	private LoginBean loginBean;
	private String purpose;
	private String phoneNo;
	private String email;
	private String groupOfCompanyName;
	private String companyName;
	private String loggedInFor;
	private String mnemonic;
	private String peopleOID;
	private Boolean isOriginalMenuJsonAvail;
	private String groupOfCompanyOID;
	
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
