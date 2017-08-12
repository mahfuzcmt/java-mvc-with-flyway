package com.secl.ocr.util;

import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.quartz.CronExpression;
import org.quartz.CronScheduleBuilder;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerKey;
import org.springframework.stereotype.Component;

import lombok.Synchronized;

@Component("schedularUtil")
public class SchedularUtil {
    
    @Synchronized
    public String getCronExpression(Date scheduleStartDate, String repeat) {
    	if(scheduleStartDate == null){
    		return null;
    	}
    	Calendar startDate = Calendar.getInstance();
		startDate.setTime(scheduleStartDate);
		startDate.set(Calendar.HOUR_OF_DAY, 0);
		startDate.set(Calendar.MINUTE, 0);
		startDate.set(Calendar.SECOND, 0);
		startDate.set(Calendar.MILLISECOND, 0);
		
		String cronExpression = "0 5 1 ";
		cronExpression += String.valueOf(startDate.get(Calendar.DAY_OF_MONTH));
		
		if(repeat.equalsIgnoreCase("Week")){
			cronExpression += "/7 * ?";
		} else if(repeat.equalsIgnoreCase("2 Weeks")){
			cronExpression += "/14 * ?";
		} else if(repeat.equalsIgnoreCase("Month")){
			cronExpression += " * ?";
		} else if(repeat.equalsIgnoreCase("2 Months")){
			cronExpression += " 1/2 ?";
		} else if(repeat.equalsIgnoreCase("3 Months")){
			cronExpression += " 1/3 ?";
		} else if(repeat.equalsIgnoreCase("6 Months")){
			cronExpression += " 1/6 ?";
		} else if(repeat.equalsIgnoreCase("Year")){
			cronExpression += String.valueOf(startDate.get(Calendar.DAY_OF_MONTH)) + " ? *";
		} else if(repeat.equalsIgnoreCase("2 Years")){
			cronExpression += String.valueOf(startDate.get(Calendar.DAY_OF_MONTH)) + " ? " + String.valueOf(startDate.get(Calendar.YEAR) + "/2");
		} else if(repeat.equalsIgnoreCase("3 Years")){
			cronExpression += String.valueOf(startDate.get(Calendar.DAY_OF_MONTH)) + " ? " + String.valueOf(startDate.get(Calendar.YEAR) + "/3");
		}
		if(StringUtils.isBlank(cronExpression) || !CronExpression.isValidExpression(cronExpression)){
			return null;
		}
		return cronExpression;
    }
    
    @Synchronized
    public Trigger getTrigger(JobKey jobKey, String cronExpression, TriggerKey triggerKey, Date startDate, Date endDate) {
    	Calendar sDate = Calendar.getInstance();
    	if(startDate != null){
    		sDate.setTime(startDate);
    	    sDate.set(Calendar.HOUR_OF_DAY, 0);
    	    sDate.set(Calendar.MINUTE, 0);
    	    sDate.set(Calendar.SECOND, 0);
    	    sDate.set(Calendar.MILLISECOND, 0);
    	}
		Calendar eDate = Calendar.getInstance();
    	if(endDate != null){
    		eDate.setTime(endDate);
    	    eDate.set(Calendar.HOUR_OF_DAY, 23);
    	    eDate.set(Calendar.MINUTE, 59);
    	    eDate.set(Calendar.SECOND, 59);
    	    eDate.set(Calendar.MILLISECOND, 0);
    	}
    	Trigger trigger = TriggerBuilder
			.newTrigger()
			.withIdentity(triggerKey)
			.forJob(jobKey)
			.startAt(startDate != null ? sDate.getTime() : null)
			.endAt(endDate != null ? eDate.getTime() : null)
			.withSchedule(CronScheduleBuilder.cronSchedule(cronExpression))
			.build();
		return trigger;
	}
    
    @Synchronized
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public JobDetail getJobDetail(JobDataMap map, Class clazz, JobKey jobKey) {
    	JobDetail job = JobBuilder
			.newJob(clazz)
			.storeDurably(true)
			.withIdentity(jobKey)
			.setJobData(map)
			.build();
		return job;
	}
    
    @Synchronized
	public JobKey getJobKey(String oid, String group) {
    	return new JobKey(oid+"_Job", group);
	}
    
    @Synchronized
	public TriggerKey getTriggerKey(String oid, String group) {
    	return new TriggerKey(oid+"_Trigger", group);
	}
    
    
    
}
