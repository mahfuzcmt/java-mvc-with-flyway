package com.secl.ocr.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.collections4.ListUtils;
import org.springframework.stereotype.Component;

import com.google.common.base.Joiner;
import com.google.common.collect.Iterables;
import com.secl.ocr.bean.Filter;

import lombok.Synchronized;

@Component("paramUtil")
public class ParamUtil {
    
    @SuppressWarnings("rawtypes")
    @Synchronized
    public Object[] getParams(Object obj) throws Exception {
        List<Object> params = new ArrayList<Object>();
        for (Field f : obj.getClass().getDeclaredFields()) {
            f.setAccessible(true);
            Class type = f.getType();
            Object value = f.get(obj);
            if(!type.isPrimitive() && value == null) {
                continue;
            } else if(type.isPrimitive() && type == boolean.class && Boolean.FALSE.equals(value)) {
                continue;
            } else if(type.isPrimitive() && type == Number.class &&((Number) value).doubleValue() == 0) {
                continue;
            }
            params.add(value);
        }
        return params.toArray();
    }
    
    @SuppressWarnings("rawtypes")
    @Synchronized
    public Object[] getParamsWithAdditional(Object obj, String extValue) throws Exception {
        List<Object> params = new ArrayList<Object>();
        for (Field f : obj.getClass().getDeclaredFields()) {
            f.setAccessible(true);
            Class type = f.getType();
            Object value = f.get(obj);
            if(!type.isPrimitive() && value == null) {
                continue;
            } else if(type.isPrimitive() && type == boolean.class && Boolean.FALSE.equals(value)) {
                continue;
            } else if(type.isPrimitive() && type == Number.class &&((Number) value).doubleValue() == 0) {
                continue;
            }
            params.add(value);
        }
        params.add(extValue);
        return params.toArray();
    }
    
    @Synchronized
    public static Object[] getParamsWithoutObject(Object...obj) {
        return obj;
    }
    
    @Synchronized
    public String getOids(String[] oids) {
        StringBuffer oid = new StringBuffer();
        oid.append("'");
        oid.append(Joiner.on("','").join(oids));
        oid.append("'");
        return oid.toString();
    }
    
    @Synchronized
    public static List<Object> getParam(List<Object> param, List<Filter> filters){
    	if(param == null){
    		param = new ArrayList<Object>();
    	}
		filters = ListUtils.emptyIfNull(filters);
		if(Iterables.isEmpty(filters)){
			return param;
		}
		int i = 0;
		for(Filter filter : filters){
			param = getFieldWithCriteria(i, param, filter);
			i++;
		}
		return param;
	}
	
    @Synchronized
    private static List<Object> getFieldWithCriteria(int i, List<Object> param, Filter filter){
		String strColumn = filter.getColumn();
		if(i != 0){
			strColumn = filter.getOperator() +" "+ strColumn;
		}		
		if(filter.getCriteria().equalsIgnoreCase("in")){
			param.addAll(Arrays.asList(filter.getInValue()));
			return param;
		} else if(filter.getCriteria().equalsIgnoreCase("Starts with")){
			param.add(filter.getTextValue()+"%");
			return param;
		} else if(filter.getCriteria().equalsIgnoreCase("Ends with")){
			param.add("%"+filter.getTextValue());
			return param;
		} else if(filter.getCriteria().equalsIgnoreCase("Contain")){
			param.add("%"+filter.getTextValue()+"%");
			return param;
		} else if(filter.getCriteria().equalsIgnoreCase("Not Contain")){
			param.add("%"+filter.getTextValue()+"%");
			return param;
		} else if(filter.getCriteria().equalsIgnoreCase("Between")){
			if(filter.isShowBetweenDateValue()){
				if(filter.getCriteria().equals("Between")){
					param.add(filter.getFromDateValue());
					param.add(filter.getToDateValue());
					return param;
				}
			} else if(filter.isShowBetweenNumberValue()){
				if(filter.getCriteria().equals("Between")){
					param.add(filter.getFromNumberValue());
					param.add(filter.getToNumberValue());
					return param;
				}
			}
		} else if(filter.getCriteria().equalsIgnoreCase("=") 
			|| filter.getCriteria().equalsIgnoreCase("!=")
			|| filter.getCriteria().equalsIgnoreCase(">")
			|| filter.getCriteria().equalsIgnoreCase("<")
			|| filter.getCriteria().equalsIgnoreCase(">=")
			|| filter.getCriteria().equalsIgnoreCase(">=")){
			if(filter.isShowTextValue()){
				param.add(filter.getTextValue());
			} else if(filter.isShowSelectValue()){
				param.add(filter.getSelectValue());
			} else if(filter.isShowNumberValue()){
				param.add(filter.getNumberValue());
			} else if(filter.isShowDateValue()){
				param.add(filter.getDateValue());
			}
			return param;
		}
		return param;
	}
    
}
