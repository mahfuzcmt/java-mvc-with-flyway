package com.secl.ocr.security.manager.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.secl.ocr.manager.impl.ManagerImpl;
import com.secl.ocr.security.manager.RoleManager;
import com.secl.ocr.security.manager.SecurityQueryManager;

@Service("roleManager")
public class RoleManagerImpl extends ManagerImpl implements RoleManager {
	
	private @Autowired @Qualifier("securityQueryManager") SecurityQueryManager queryManager;

	
}
