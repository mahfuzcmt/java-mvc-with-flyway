package com.secl.ocr.manager.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.secl.ocr.bean.ActivityLogBean;
import com.secl.ocr.bean.MetaPropertyBean;
import com.secl.ocr.bean.ResponseBean;
import com.secl.ocr.dao.BaseDao;
import com.secl.ocr.manager.Manager;
import com.secl.ocr.manager.QueryManager;
import com.secl.ocr.util.DateUtil;
import com.secl.ocr.util.ParamUtil;
import com.secl.ocr.util.SchedularUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("manager")
public class ManagerImpl implements Manager {

	protected @Autowired @Qualifier("schedularUtil") SchedularUtil schedularUtil;
	private @Autowired @Qualifier("queryManager") QueryManager queryManager;
	protected @Autowired @Qualifier("idGenerator") IdGenerator idGenerator;
	protected @Autowired @Qualifier("paramUtil") ParamUtil paramUtil;
	protected @Autowired @Qualifier("dateUtil") DateUtil dateUtil;
	protected @Autowired @Qualifier("baseDao") BaseDao baseDao;
	
	@Override
	public void saveActivity(ActivityLogBean activityLogBean) {
		try {
			log.debug("Activity Log saving...");
			Object[] param = ParamUtil.getParamsWithoutObject(idGenerator.generateId(),
				activityLogBean.getLoginBean().getGroupOfCompanyOID(), 
				activityLogBean.getLoginBean().getCompanyOID(),activityLogBean.getModuleName(),activityLogBean.getFeatureName(), 
				activityLogBean.getTableName(),
				activityLogBean.getParentOID(), activityLogBean.getActivityDetails(), activityLogBean.getDescription(),
				activityLogBean.getShortDescription(), activityLogBean.getEmployeeOID(), activityLogBean.getContactOID(),
				activityLogBean.getStatus(), activityLogBean.getRowimageBefore(), activityLogBean.getRowimageAfter(),
				new Date(), activityLogBean.getLoginBean().getLoginID());
			baseDao.saveObject(queryManager.insertActivityLog(), param);
			log.debug("Successfully saved Activity Log by : {}", activityLogBean.getLoginBean().getLoginID());
		} catch (Exception e) {
			log.error("An exception occurred while saving Activity Log : ", e);
		}
	}

	@Override
	public ResponseBean getMetaDataByOid(ResponseBean response, MetaPropertyBean model) {
		log.debug("Getting meta data by oid");
		MetaPropertyBean data = null;
		try {
			 data = (MetaPropertyBean) baseDao.getObject(queryManager.getMetaDataByOid(),
				new Object[] { model.getOid() }, MetaPropertyBean.class);
		} catch (Exception e) {
			log.error("An exception occurred while getting meta property by oid : ", e);
			return response;
		}
		response.setData(data);
		response.setSuccess(true);
		log.debug("Successfully loaded meta property by oid : {}", model.getOid());
		return response;
	}
	

}
