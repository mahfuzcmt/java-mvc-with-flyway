package com.secl.ocr.security.manager;

import javax.servlet.http.HttpServletRequest;

import com.secl.ocr.bean.LoginBean;
import com.secl.ocr.bean.ResponseBean;
import com.secl.ocr.manager.Manager;

public interface AuthenticationManager extends Manager {
	
	public ResponseBean doLogin(HttpServletRequest request, ResponseBean response, LoginBean model);
	
	public ResponseBean doLogout(HttpServletRequest request, ResponseBean response, LoginBean model);

	public ResponseBean changePassword(ResponseBean response, LoginBean model);


}
