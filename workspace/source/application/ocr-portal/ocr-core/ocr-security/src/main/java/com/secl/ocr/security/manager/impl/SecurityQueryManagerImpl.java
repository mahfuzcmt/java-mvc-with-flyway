package com.secl.ocr.security.manager.impl;

import org.springframework.stereotype.Component;

import com.secl.ocr.manager.impl.SqlQueryManagerImpl;
import com.secl.ocr.security.manager.SecurityQueryManager;
import com.secl.ocr.util.Table;

@Component("securityQueryManager")
public class SecurityQueryManagerImpl extends SqlQueryManagerImpl implements SecurityQueryManager {
	
	@Override
	public String getLoginSql() {
		String sql = "SELECT l.loginID, l.password, l.roleID, l.name as name, l.status,  l.featurejson as menuJSON, "
				+" r.featureJSON as roleJSON FROM "+Table.LOGIN+" l, "+Table.ROLE+" r "
				+ " WHERE l.roleID = r.roleID AND l.loginID = ? " ;
		return sql;
	}
	
	@Override
	public String getGoogleLoginSql() {
		return null;
	};

	@Override
	public String updateLoginLog() {
		String sql = "update "+Table.LOGIN_LOG+" set loginStatus = ?, logoutTime = ? where oid = ?";
		return sql;
	}

	@Override
	public String getAllLoginSql() {
		String sql = "SELECT l.loginID, l.password, l.roleID, l.status, r.roleDescription "
			+ "FROM "+Table.LOGIN+" l, "+Table.ROLE+" r WHERE l.roleID = r.roleID order by l.createdOn desc";
		return sql;
	}

	@Override
	public String getLoginByLoginIDSql() {
		String sql = "Select loginID, password, roleID from Login where loginID = ?";
		return sql;
	}

	@Override
	public String updateLoginPasswordSql() {
		String sql = "update "+Table.LOGIN+" set password = ?, editedOn = ?, editedBy = ? where loginID = ?";
		return sql;
	}

	@Override
	public String insertLoginSql() {
		String sql = "insert into "+Table.LOGIN+" (loginID, roleID, password, status, name, imagePath,"
			+ "createdBy, createdOn) values (?, ?, ?, ?, ?, ?, ?, ?)";
		return sql;
	}
	
	@Override
	public String updateLoginWithChildSql() {
		String sql = "update "+Table.LOGIN+" set loginID = ?, name = ?, editedOn = ?, editedBy = ? where loginID = ?";
		return sql;
	}
	
	@Override
	public String deleteLoginSql() {
		String sql = "delete from "+Table.LOGIN+" where loginID = ?";
		return sql;
	}

	@Override
	public String getLoginID(String loginID) {
		String sql = "Select loginID from "+Table.LOGIN+" where UPPER(loginID)  = '"+loginID+"' ";
		return sql;
	}

	@Override
	public String updateUser(String name, String phoneNo, String email, String roleID, String status, String imagePath) {
		return "update "+Table.LOGIN+"  set name = '"+name+"',"
			+ " roleID = '"+roleID+"', status = '"+status+"', editedby = ?, editedOn = ?, imagePath = '"+imagePath+"'  where loginID = ? ";
	}

	@Override
	public String changePassword() {
		String sql = "update "+Table.LOGIN+" set password = ? , editedOn = ? , editedby = ? where loginid = ? ";
		return sql;
	}

	@Override
	public String getOldPassword(String loginID) {
		String sql = "SELECT password FROM login WHERE loginid = '"+loginID+"'";
		return sql;
	}

	@Override
	public String getAllRoleSql() {
		String sql = "SELECT r.roleID, r.roleDescription FROM "+Table.ROLE+" r ";
		return sql;
	}

	@Override
	public String getAllUsers() {
		return "SELECT l.loginID, l.imagePath, l.roleID, l.name, l.status, r.roleDescription "
			+ "FROM "+Table.LOGIN+" l, "+Table.ROLE+" r WHERE l.roleID = r.roleID order by l.createdOn desc";
	}

	@Override
	public String getUserByLoginID() {
		String sql = "SELECT l.loginID, l.password, l.roleID, l.name as name, l.imagePath, l.status, r.defaultJSON "
			+ "FROM "+Table.LOGIN+" l, "+Table.ROLE+" r WHERE l.roleID = r.roleID AND l.loginID = ?";
		return sql;
	}

	@Override
	public String getMenuJSONByRole() {
		String sql = "select defaultJSON from "+Table.ROLE+" where roleid = ?";
        return sql;
	}

	@Override
	public String getMenuJSONFromRole() {
        return null;
	}

	@Override
	public String saveRoleSql() {
		String sql = "Insert into " + Table.ROLE
			+ " (roleid, groupOfCompanyOID, companyOID, roleDescription, defaultJSON, category, status, createdOn, createdBy)"
			+ " values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
		return sql;
	}

	@Override
	public String getRoleList() {
		String sql = "select roleid, groupOfCompanyOID, companyOID, roleDescription, defaultJSON, category, status, createdOn, createdBy from "+Table.ROLE+" where 1 = 1";
        return sql;
	}
}
