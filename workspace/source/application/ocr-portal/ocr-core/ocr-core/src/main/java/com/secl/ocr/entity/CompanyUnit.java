package com.secl.ocr.entity;

import java.sql.Timestamp;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonDeserialize
@JsonSerialize
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyUnit {
	
	private @Getter String oid;
    private @Getter String name;
    private @Getter String status;
    private @Getter Timestamp createdOn;
    private @Getter String createdBy;
    private @Getter Timestamp editedOn;
    private @Getter String editedBy;
 
    
}
