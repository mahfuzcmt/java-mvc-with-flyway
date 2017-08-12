package com.secl.ocr.websocket.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.gson.GsonBuilder;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonSerialize
@JsonDeserialize
@AllArgsConstructor
public class WebSocketDataBean {

	private String key;
	private Object value;

	@Override
    public String toString() {
    	return new GsonBuilder().setPrettyPrinting().create().toJson(this);
    }

}
