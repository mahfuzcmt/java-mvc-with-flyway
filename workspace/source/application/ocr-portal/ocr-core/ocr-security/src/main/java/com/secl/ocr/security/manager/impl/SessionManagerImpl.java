package com.secl.ocr.security.manager.impl;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.secl.ocr.bean.LoginBean;
import com.secl.ocr.security.manager.SessionManager;

@Component("sessionManager")
public class SessionManagerImpl implements SessionManager {
	
	private Map<String, Map<String, LoginBean>> session = new ConcurrentHashMap<String, Map<String, LoginBean>>();
	
	@Override
	public void setUserInSession(LoginBean model){
		Map<String, LoginBean> userInfo = null;
		if(!session.containsKey(model.getLoginID())){
			userInfo = new ConcurrentHashMap<String, LoginBean>();
		} else {
			userInfo = session.get(model.getLoginID());
		}
		userInfo.put(model.getSessionId(), model);
		session.put(model.getLoginID(), userInfo);
	}
	
	@Override
	public LoginBean getUserInSession(LoginBean model){
		return session.get(model.getLoginID()).get(model.getSessionId());
	}

	@Override
	public void clearSession(LoginBean model) {
		if(session.containsKey(model.getLoginID())){
			session.get(model.getLoginID()).remove(model.getSessionId());
		}		
	}
	
	@Override
	public boolean isValid(LoginBean model) {
		if(!session.containsKey(model.getLoginID())){
			return false;
		} else if(!session.get(model.getLoginID()).containsKey(model.getSessionId())){
			return false;
		}
		/*Date now = new Date();
		@SuppressWarnings("deprecation")
		Date expire = new Date(2016, 8, 1);
		
		long diff = expire.getTime() - now.getTime();
		long diffDays = diff / (24 * 60 * 60 * 1000);
		if(diffDays <= 0){
			return false;
		}*/
		return true;
	}
	
	

}
