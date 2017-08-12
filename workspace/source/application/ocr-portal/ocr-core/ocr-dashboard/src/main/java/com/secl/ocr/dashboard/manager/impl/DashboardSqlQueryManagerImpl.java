package com.secl.ocr.dashboard.manager.impl;

import org.springframework.stereotype.Component;

import com.secl.ocr.dashboard.manager.DashboardQueryManager;
import com.secl.ocr.manager.impl.SqlQueryManagerImpl;
 
@Component("dashboardQueryManager")
public class DashboardSqlQueryManagerImpl extends SqlQueryManagerImpl implements DashboardQueryManager {
	
}


