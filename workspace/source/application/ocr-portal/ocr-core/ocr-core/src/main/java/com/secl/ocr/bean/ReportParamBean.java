package com.secl.ocr.bean;

import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonDeserialize
@JsonSerialize
@NoArgsConstructor
@Getter 
@Setter
public class ReportParamBean {
	
	public LoginBean loginBean;
	public String reportName;
	public String destinationFolder;
	public String fromDateStr;
	public String toDateStr;
	public Date fromDate;
	public Date toDate;
	public String transactionType;
	public String oid;
	public String stateOID;
	public String[] oids;

}