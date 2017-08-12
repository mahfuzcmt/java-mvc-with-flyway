package com.secl.ocr.bean;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.gson.GsonBuilder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonDeserialize
@JsonSerialize
@NoArgsConstructor
@AllArgsConstructor
@Getter 
@Setter
@Builder
public class ActivityLogBean {
	
	private String oid;
	private String moduleName;
	private String featureName;
	private String tableName;
	private String parentOID;
	private String employeeOID;
	private String contactOID;
	private String activityDetails;
	private String description;
	private String shortDescription;
	private String status;
	private String groupOfCompanyOID;
	private String companyOID;
	private String rowimageBefore;
	private String rowimageAfter;
	private LoginBean loginBean;

	@Override
	 public String toString() {
    	return new GsonBuilder().setPrettyPrinting().create().toJson(this);
	}

}
