package com.secl.ocr.bean;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.gson.GsonBuilder;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonDeserialize
@JsonSerialize
@NoArgsConstructor
@Getter
@Setter
public class MetaPropertyBean extends AbstractBean {
	
	private String valueJson;
	private String description;
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
