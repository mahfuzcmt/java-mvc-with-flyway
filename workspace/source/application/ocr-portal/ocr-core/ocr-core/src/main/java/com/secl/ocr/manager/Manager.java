package com.secl.ocr.manager;

import com.secl.ocr.bean.ActivityLogBean;
import com.secl.ocr.bean.MetaPropertyBean;
import com.secl.ocr.bean.ResponseBean;

public interface Manager {
	
	public void saveActivity(ActivityLogBean activityLogBean);

	public ResponseBean getMetaDataByOid(ResponseBean response, MetaPropertyBean model);

}
