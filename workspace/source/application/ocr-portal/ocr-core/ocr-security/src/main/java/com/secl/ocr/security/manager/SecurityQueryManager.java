package com.secl.ocr.security.manager;

import com.secl.ocr.manager.QueryManager;

public interface SecurityQueryManager extends QueryManager {
	
	public String getLoginSql();
	
	public String getGoogleLoginSql();
	//public String insertLoginLog();
	
	public String updateLoginLog();
	
	public String getAllLoginSql();
	
	public String getLoginByLoginIDSql();
	
	public String updateLoginPasswordSql();

	public String insertLoginSql();
	
	public String updateLoginWithChildSql();
	
	public String deleteLoginSql();
	
	public String getLoginID(String loginID);

	public String updateUser(String name, String phoneNo, String email, String roleID, String status, String imagePath);

	public String changePassword();

	public String getOldPassword(String loginID);

	public String getAllRoleSql();

	public String getAllUsers();

	public String getUserByLoginID();

	public String getMenuJSONByRole();

	public String getMenuJSONFromRole();

	public String saveRoleSql();

	public String getRoleList();

}




