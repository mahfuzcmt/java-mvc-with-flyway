package com.secl.ocr.dao;

import org.springframework.stereotype.Repository;

import com.secl.ocr.entity.CompanyUnit;
import com.secl.ocr.util.Table;

import lombok.extern.slf4j.Slf4j;

@Repository("businessUnitDao")
@Slf4j
public class CompanyUnitDao extends BaseDao {
	
	public boolean saveBusinessUnit(CompanyUnit entity) {
		log.trace("Saving Business Unit : {}", entity);
		int rowsInserted = super.saveObject(entity, Table.COMPANY_UNIT);
		boolean isSave = false;
		if(rowsInserted == 1){
			isSave = true;
			log.debug("Successfully Business Unit : {}", entity);
		} else {
			log.debug("Failed to save Business Unit : {} ", entity);
		}
		return isSave;
	}

}
