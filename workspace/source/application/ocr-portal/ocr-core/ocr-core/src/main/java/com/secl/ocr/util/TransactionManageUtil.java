package com.secl.ocr.util;

import org.springframework.transaction.TransactionStatus;

import com.secl.ocr.dao.BaseDao;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TransactionManageUtil {
	
	public static void rollback(BaseDao baseDao, TransactionStatus transStatus){
		if(baseDao != null && transStatus != null){
			baseDao.rollback(transStatus);
			log.debug("Transaction Rollback Successfully.....");
		}
	}
	
	public static void commit(BaseDao baseDao, TransactionStatus transStatus){
		baseDao.commit(transStatus);
		log.debug("Transaction Committed Successfully.....");
	}

}
