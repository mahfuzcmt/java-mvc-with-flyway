package com.secl.ocr.security.manager.impl;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.secl.ocr.bean.Code;
import com.secl.ocr.bean.LoginBean;
import com.secl.ocr.bean.ResponseBean;
import com.secl.ocr.dao.LoginLogDao;
import com.secl.ocr.manager.impl.ManagerImpl;
import com.secl.ocr.security.manager.AuthenticationManager;
import com.secl.ocr.security.manager.SecurityQueryManager;
import com.secl.ocr.security.manager.SessionManager;
import com.secl.ocr.security.util.PasswordCipher;
import com.secl.ocr.util.Constant;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("authenticationManager")
public class AuthenticationManagerImpl extends ManagerImpl implements AuthenticationManager {
	
	private @Autowired @Qualifier("securityQueryManager") SecurityQueryManager queryManager;
	private @Autowired @Qualifier("sessionManager") SessionManager sessionManager;
	private @Autowired LoginLogDao loginLogDao;
	
	@Override
	public ResponseBean doLogin(HttpServletRequest request, ResponseBean response, LoginBean model) {
		LoginBean loginBean = null;
		try {
			loginBean = (LoginBean) baseDao.getObject(queryManager.getLoginSql(), 
					new Object[]{model.getLoginID()}, LoginBean.class);
		} catch (Exception e){			
			log.error("An Exception occured while try to Login : {}", e);
		}
		if(loginBean == null){
			log.warn("No found Login ID : {}", model.getLoginID());
			response.setCode(Code.Nl1000);
			return response;
		} else if(!loginBean.getStatus().equalsIgnoreCase(Constant.ACTIVE_STATUS)){
			log.warn("Inactive Login ID : {}", model.getLoginID());
			response.setCode(Code.Ia1000);
			return response;
		} else if(!loginBean.getPassword().equals(PasswordCipher.encrypt(model.getPassword()))){
			log.warn("Password not match Login ID : {} and Password : {}", model.getLoginID(), model.getPassword());
			response.setCode(Code.Pw1000);
			return response;
		}
		loginBean.setSessionId(idGenerator.getSessionId());
		loginBean.setPassword(null);
		response.setData(loginBean);
		response.setSuccess(true);
		sessionManager.setUserInSession(loginBean);
		log.warn("Successfully Login : {}", model.getLoginID());
		return response;
	}
	
	public ResponseBean doLogout(HttpServletRequest request, ResponseBean response, LoginBean model) {
		boolean isUpdate = false;
		try {
			isUpdate = loginLogDao.updateLogoutLog(queryManager.updateLoginLog(), Constant.LOGOUT, model.getSessionId());
		} catch (Exception e) {
			log.error("An exception occured while Logout for {} : ", model.getLoginID(), e);
		}
		if(isUpdate){
			response.setSuccess(true);
			sessionManager.clearSession(model);
			log.info("Successfully Logout : {}", model.getLoginID());
		} else {
			log.warn("Unable to Logout : {}", model.getLoginID());
		}
		return response;
	}

	@Override
	public ResponseBean changePassword(ResponseBean response, LoginBean model) {
		log.debug("Request received for changing password {} ", model.getLoginID());
		try{
			if(isOldPasswordValid(model)){
				loginLogDao.updateObject(queryManager.changePassword(), new Object []{PasswordCipher.encrypt(model.getNewPassword()), new Date(), 
				model.getLoginID(), model.getLoginID()});
				
				response.setSuccess(true);
				response.setCode(Code.SCP001);
				log.info("Successfully changed password for : "+model.getLoginID());
			} else {
				log.error("Sorry, Invalid old password");
				response.setCode(Code.INVP003);
				response.setSuccess(false);
			}
		} catch(Exception e) {
			response.setSuccess(false);
			response.setCode(Code.UCP002);
			log.error("An exception occured while trying to change password : ", e);
		}
		return response;
	}

	private boolean isOldPasswordValid(LoginBean model) throws Exception {
		try{
			LoginBean userInfo = (LoginBean) loginLogDao.getObject(queryManager.getOldPassword(model.getLoginID()), null, LoginBean.class);
			if(userInfo.getPassword().equalsIgnoreCase(PasswordCipher.encrypt(model.getOldPassword()))){
				return true;
			}
		}
		catch(Exception e){
			log.error("An exception occured while trying to change password for : {}", model.getLoginID());
		}
		return false;
	}

}
