package com.secl.ocr.security.manager.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.secl.ocr.manager.impl.ManagerImpl;
import com.secl.ocr.security.manager.UserManager;
import com.secl.ocr.security.manager.UserQueryManager;

@Service("userManager")
public class UserManagerImpl extends ManagerImpl implements UserManager {
	
	private @Autowired @Qualifier("userQueryManager") UserQueryManager queryManager;


	
}
