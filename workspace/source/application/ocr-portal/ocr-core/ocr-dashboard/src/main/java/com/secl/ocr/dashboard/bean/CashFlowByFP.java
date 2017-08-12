package com.secl.ocr.dashboard.bean;
 
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
public class CashFlowByFP {
	
	private Double openingBalance;
	private Double incoming;
	private Double outgoing;
	private Double ledgerBalance;
	private String periodStartDate;
	private String periodEndDate;
	
	@Override
	  public String toString() {
    	return new GsonBuilder().setPrettyPrinting().create().toJson(this);
	}
	
}
