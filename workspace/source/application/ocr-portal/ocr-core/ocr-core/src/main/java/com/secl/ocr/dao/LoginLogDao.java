package com.secl.ocr.dao;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.secl.ocr.entity.LoginLog;
import com.secl.ocr.util.ParamUtil;
import com.secl.ocr.util.Table;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository("loginLogDao")
public class LoginLogDao extends BaseDao {
	
	private @Autowired @Qualifier("paramUtil") ParamUtil paramUtil;
	
	public boolean saveLoginLog(LoginLog entity) {
		log.trace("Saving Login Log : {}", entity);
		int rowsInserted = super.saveObject(entity, Table.LOGIN_LOG);
		boolean isSave = false;
		if(rowsInserted == 1){
			isSave = true;
			log.debug("Successfully Login Log : {}", entity);
		} else {
			log.debug("Failed to save Login Log : {} ", entity);
		}
		return isSave;
	}
	
	@SuppressWarnings("static-access")
	public boolean updateLogoutLog(String sql, String loginStatus, String sessionId){
		log.trace("Updating Login Log for Session ID : {}", sessionId);
		Object[] params = paramUtil.getParamsWithoutObject(loginStatus, new Timestamp(System.currentTimeMillis()), sessionId);
		int rowsUpdated = super.updateObject(sql, params);
		boolean isUpdate = false;
		if(rowsUpdated == 1){
			isUpdate = true;
			log.debug("Successfully Update Logout : {}", sessionId);
		} else {
			log.debug("Failed to update Logout : {} ", sessionId);
		}
		return isUpdate;
	}
	
}
