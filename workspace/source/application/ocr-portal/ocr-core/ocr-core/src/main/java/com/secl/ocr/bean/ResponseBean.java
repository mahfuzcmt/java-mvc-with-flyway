package com.secl.ocr.bean;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.gson.GsonBuilder;

import lombok.Getter;
import lombok.Setter;

@JsonDeserialize
@JsonSerialize
@Getter
@Setter
public class ResponseBean {
	
	private boolean success;
	private Code code;
	private String message;
	private Object data;
	
	public ResponseBean() {
		this.success = false;
		this.data = null;
	}
	
	public ResponseBean(boolean isSuccess, Object data, Code code) {
		this.success = isSuccess;
		this.data = data;
		this.code = code;
	}

	@Override
    public String toString() {
    	return new GsonBuilder().setPrettyPrinting().create().toJson(this);
    }

}
