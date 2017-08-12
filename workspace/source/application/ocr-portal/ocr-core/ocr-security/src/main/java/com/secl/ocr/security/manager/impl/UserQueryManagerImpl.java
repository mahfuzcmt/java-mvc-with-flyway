package com.secl.ocr.security.manager.impl;

import org.springframework.stereotype.Component;

import com.secl.ocr.manager.impl.SqlQueryManagerImpl;
import com.secl.ocr.security.manager.UserQueryManager;

@Component("userQueryManager")
public class UserQueryManagerImpl extends SqlQueryManagerImpl implements UserQueryManager {
	
}
