package com.secl.ocr.util;

import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.google.gson.JsonElement;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component("gsonUtil")
public class GsonUtil {
	
	private Gson gson = new Gson();
	
    @SuppressWarnings({ "finally", "rawtypes", "unchecked" })
	public synchronized Object parseObject(String json, Class clazz) {
        Object obj = null;
        try {
            obj = gson.fromJson(json, clazz);
        } catch(Exception e) {
           log.error("An Exception occured while parse Object : {}", e);
        } finally {
            return obj;
        }
    }
	
	public synchronized String getJson(Object obj) {
        String jsonString = null;
        try {
            jsonString = gson.toJson(obj);
        } catch(Exception e) {
            log.error("An Exception occured while get JSON String from any Object : {}", e);
        }
        return jsonString;
    }
	
	public synchronized JsonElement toJsonTree(Object obj) {
        JsonElement jsonString = null;
        try {
            jsonString = gson.toJsonTree(obj);
        } catch(Exception e) {
           log.error("An Exception occured while get JSON Element from any Object : {}", e);
        }
        return jsonString;
    }
    	
}
