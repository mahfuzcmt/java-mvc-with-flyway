package com.secl.ocr.dashboard.bean;
 
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
public class ReceivableProgress {
	
	private String ledgerName;
	private Double currentReceivable;
	private Double overDue;
	private Double total;
	
		@Override
	public String toString() {
    	return new GsonBuilder().setPrettyPrinting().create().toJson(this);
	}
	
}
