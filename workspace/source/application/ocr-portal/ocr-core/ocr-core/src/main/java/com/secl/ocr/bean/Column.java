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
public class Column  {
	
	private String displayColumn;
	private String encodedColumn;
	private String alignement;
	private boolean visible;
	private String dataType;
	private int sortOrder;

	@Override
    public String toString() {
    	return new GsonBuilder().setPrettyPrinting().create().toJson(this);
    }

}
