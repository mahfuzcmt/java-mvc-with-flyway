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
public class LoginLog {
	
	private @Getter String oid;
	private @Getter String loginID;
    private @Getter String roleID;
    private @Getter String ipAddress;
    private @Getter Double lat;
    private @Getter Double lng;
    private @Getter Timestamp loginTime;
    private @Getter Timestamp logoutTime;
    private @Getter String loginStatus;
    
}
