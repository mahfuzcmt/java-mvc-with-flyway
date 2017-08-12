package com.secl.ocr.security.manager;

import com.secl.ocr.bean.LoginBean;

public interface SessionManager {
	
	public void setUserInSession(LoginBean model);
	
	public LoginBean getUserInSession(LoginBean model);

	public void clearSession(LoginBean model);
	
	public boolean isValid(LoginBean model);

}
