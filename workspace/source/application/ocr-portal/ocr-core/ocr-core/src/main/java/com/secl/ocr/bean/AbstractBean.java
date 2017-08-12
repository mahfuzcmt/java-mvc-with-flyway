package com.secl.ocr.bean;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonDeserialize
@JsonSerialize
public abstract class AbstractBean {

	protected String operation;
	protected String oid;	
	
	abstract public String getOperation();
	abstract public void setOperation(String operation);
	
	abstract public String getOid();
	abstract public void setOid(String oid);
	
}
