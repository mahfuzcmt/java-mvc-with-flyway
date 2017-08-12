package com.secl.ocr.manager.impl;

import org.springframework.stereotype.Component;

import com.secl.ocr.manager.QueryManager;
import com.secl.ocr.util.Constant;
import com.secl.ocr.util.Table;

@Component("queryManager")
public class SqlQueryManagerImpl implements QueryManager {

	public String getTextDateColumn(String colName, String alias) {
		return "to_char(" + colName + ", '" + Constant.POSTGRES_SQL_DATE_FORMAT + "') as " + alias;
	}
	
	@Override
	public String insertActivityLog() {
		String sql = "Insert into "+Table.ACTIVITY_LOG+" (OID, groupOfCompanyOID, companyOID, moduleName, "
				+ " featureName, tableName, parentOID, activityDetails, description, shortdescription, employeeOID, contactOID,"
				+ " status, rowimageBefore, rowimageAfter, createdOn, createdBy) "
				+ " values (?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?)";
		return sql;
	}

	@Override
	public String getMetaDataByOid() {
		String sql = "Select valueJson from " + Table.META_PROPERTY + " where 1 = 1 and oid = ?";
		return sql;
	}

}
