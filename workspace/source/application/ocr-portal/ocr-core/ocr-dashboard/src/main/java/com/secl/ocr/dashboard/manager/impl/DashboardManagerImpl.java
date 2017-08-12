package com.secl.ocr.dashboard.manager.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.secl.ocr.dashboard.manager.DashboardManager;
import com.secl.ocr.dashboard.manager.DashboardQueryManager;
import com.secl.ocr.manager.impl.ManagerImpl;

@Service("dashboardManager")
public class DashboardManagerImpl extends ManagerImpl implements DashboardManager {
	 
	private @Autowired @Qualifier("dashboardQueryManager") DashboardQueryManager queryManager;


}
