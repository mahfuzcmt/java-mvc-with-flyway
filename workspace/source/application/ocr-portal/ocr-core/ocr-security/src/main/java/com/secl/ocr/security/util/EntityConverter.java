package com.secl.ocr.security.util;

import java.sql.Timestamp;

import javax.servlet.http.HttpServletRequest;

import com.secl.ocr.bean.LoginBean;
import com.secl.ocr.entity.LoginLog;
import com.secl.ocr.util.Constant;

public class EntityConverter {
	
	public static LoginLog getLoginLogEntity(HttpServletRequest request, LoginBean model) {
		LoginLog entity = LoginLog.builder()
			.oid(model.getSessionId())
		    .loginID(model.getLoginID())
		    .roleID(model.getRoleID())
		    .ipAddress(request.getRemoteHost())
		    .loginTime(new Timestamp(System.currentTimeMillis()))
		    .loginStatus(Constant.LOGIN)
		    .ipAddress(request.getRemoteHost())
		    .build();
		return entity;
	}

}
