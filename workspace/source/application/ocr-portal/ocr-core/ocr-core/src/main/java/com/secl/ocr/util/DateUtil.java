package com.secl.ocr.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Component;

@Component("dateUtil")
public class DateUtil {
	 
	public static Date convertStringToDate(String datePattern, String givenDate) {
		Date date = null;
		if(givenDate == null){
			return date;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(datePattern);
		try {
			date = sdf.parse(givenDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
}
