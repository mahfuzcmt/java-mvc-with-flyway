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
public class Filter {
	
	private String column;
	private String dataType;
	private String criteria;
	private String operator;
	private boolean showTextValue;
	private boolean showSelectValue;
	private boolean showNumberValue;
	private boolean showDateValue;
	private boolean showBetweenNumberValue;
	private boolean showBetweenDateValue;
	private String fromNumberValue;
	private String toNumberValue;
	private String numberValue;
	private String fromDateValue;
	private String toDateValue;
	private String dateValue;
	private String textValue;
	private String selectValue;
	private String[] inValue;

	@Override
    public String toString() {
    	return new GsonBuilder().setPrettyPrinting().create().toJson(this);
    }


}
