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
public class CashFlow {
	
	private String month;
	private Double incoming;
	private Double outgoing;
	
	
	@Override
	  public String toString() {
    	return new GsonBuilder().setPrettyPrinting().create().toJson(this);
	}
	
}
