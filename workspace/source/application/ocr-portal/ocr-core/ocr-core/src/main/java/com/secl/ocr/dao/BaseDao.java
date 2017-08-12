package com.secl.ocr.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.beans.BeanMap;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

@Repository("baseDao")
public class BaseDao extends JdbcDaoSupport {

	private @Autowired DataSource dataSource;

	private @Autowired PlatformTransactionManager transactionManager;

	@PostConstruct
	private void initialize() {
		setDataSource(dataSource);
	}

	public int saveObject(Object obj, String tableName) {
		HashMap<String, Object> map = getBeanMap(obj);
		SimpleJdbcInsert simpleInsert = new SimpleJdbcInsert(getJdbcTemplate());
		simpleInsert.setTableName(tableName);
		return simpleInsert.execute(map);
	}
	
	public int saveObject(String sql, Object[] obj) throws Exception {
		try {
			return getJdbcTemplate().update(sql, obj);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Object getObject(String sql, Object[] params, Class clazz) {
		try {
			return getJdbcTemplate().queryForObject(sql, params, new BeanPropertyRowMapper(clazz));
		} catch (EmptyResultDataAccessException er) {
			return null;
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List getObjectList(String sql, Object[] params, Class clazz) {
		try {
			return getJdbcTemplate().query(sql, params, new BeanPropertyRowMapper(clazz));
		} catch (EmptyResultDataAccessException er) {
			return null;
		}
	}

	public List<Map<String, Object>> getObjectList(String sql, Object[] params) {
		try {
			return getJdbcTemplate().queryForList(sql, params);
		} catch (EmptyResultDataAccessException er) {
			return null;
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List getPrimitiveList(String sql, Object[] params, Class clazz) {
		try {
			return getJdbcTemplate().queryForList(sql, params, clazz);
		} catch (EmptyResultDataAccessException er) {
			return null;
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Object getPrimitive(String sql, Object[] params, Class clazz) {
		try {
			return getJdbcTemplate().queryForObject(sql, params, clazz);
		} catch (EmptyResultDataAccessException er) {
			return null;
		}
	}
	
	public int deleteObject(String sql, Object[] obj) {
		try {
			return getJdbcTemplate().update(sql, obj);
		} catch (EmptyResultDataAccessException er) {

		}
		return -1;
	}
	
	public int updateObject(String sql, Object[] obj) {
		try {
			return getJdbcTemplate().update(sql, obj);
		} catch (EmptyResultDataAccessException er) {

		}
		return -1;
	}
	
	public long count(String sql, Object[] params) {
		try {
			return getJdbcTemplate().queryForObject(sql, params, Long.class);
		} catch (EmptyResultDataAccessException er) {
			return 0;
		}
	}
	
	public void executeSql(String sql) {
		getJdbcTemplate().update(sql);
	}
	
	public int getRowCount(String sql) throws Exception {
		return getJdbcTemplate().queryForObject(sql, Integer.class);
	}
	
	public long getMaxValue(String sql) {
		return getJdbcTemplate().queryForObject(sql, Long.class);
	}
	
	public void saveObjectList(String sql, List<Object[]> entityList) {
        getJdbcTemplate().batchUpdate(sql, entityList);
    }
	
	@SuppressWarnings("unchecked")
	private HashMap<String, Object> getBeanMap(Object obj) {
		HashMap<String, Object> map = new HashMap<>();
		map.putAll(BeanMap.create(obj));
		return map;
	}
	
	public int[] saveBatch(String sql, BatchPreparedStatementSetter pss) throws Exception { 
		int[] arr = null;    
		try { 
			arr = getJdbcTemplate().batchUpdate(sql, pss);    
		}       
		catch(Exception e){   
			throw e;       
		}     
		return arr;   
	}

	public PlatformTransactionManager getTransactionManager() {
		return transactionManager;
	}
	
	public TransactionStatus getTransactionStatus() {
		TransactionDefinition transDef = new DefaultTransactionDefinition();
		return this.transactionManager.getTransaction(transDef);
	}
	
	public void commit(TransactionStatus transactionStatus) {
		this.transactionManager.commit(transactionStatus);
	}
	
	public void rollback(TransactionStatus transactionStatus) {
		this.transactionManager.rollback(transactionStatus);
	}

	public void setTransactionManager(PlatformTransactionManager transactionManager) {
		this.transactionManager = transactionManager;
	}
	

}