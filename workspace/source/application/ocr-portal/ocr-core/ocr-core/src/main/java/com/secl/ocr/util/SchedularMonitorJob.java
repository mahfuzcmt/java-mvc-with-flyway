package com.secl.ocr.util;

import java.util.ArrayList;
import java.util.List;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobKey;
import org.quartz.SchedulerException;
import org.quartz.impl.matchers.GroupMatcher;
import org.quartz.utils.Key;
import org.springframework.scheduling.quartz.QuartzJobBean;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SchedularMonitorJob extends QuartzJobBean {
	
	private class Group {
		
		String groupName;
		int jobs;
		Group(String groupName){
			this.groupName = groupName;
		}
		
	}

	@Override
	protected void executeInternal(JobExecutionContext ctx) throws JobExecutionException {
		if (isJobRunning(ctx)) {
			log.debug("Existing job is running...");
			return;
		}
		monitor(ctx);
	}

	@SuppressWarnings({ "unused" })
	private void monitor(JobExecutionContext ctx){
		try {
			List<Group> groups = new ArrayList<Group>();
			for (String groupName : ctx.getScheduler().getJobGroupNames()) {
				if(groupName.equalsIgnoreCase("Monitor") || groupName.equalsIgnoreCase(Key.DEFAULT_GROUP)){
					continue;
				}
				Group g = new Group(groupName);
				int i = 0;
				for (JobKey jobKey : ctx.getScheduler().getJobKeys(GroupMatcher.jobGroupEquals(groupName))) {
					i++;
				}
				g.jobs = i;
				groups.add(g);
			}
			for(Group g : groups){
				log.info("Running Jobs : {}, Group : {}", g.jobs, g.groupName);
			}
			
		} catch (SchedulerException e) {
			log.error("Unable to get all job information for context : ", e);
		}
	}

	private boolean isJobRunning(JobExecutionContext ctx) {
		try {
			List<JobExecutionContext> currentJobs = ctx.getScheduler().getCurrentlyExecutingJobs();
			for (JobExecutionContext jobCtx : currentJobs) {
				String thisJobName = jobCtx.getJobDetail().getKey().getName();
				String thisGroupName = jobCtx.getJobDetail().getKey().getGroup();
				if (ctx.getJobDetail().getKey().getName().equalsIgnoreCase(thisJobName)
						&& ctx.getJobDetail().getKey().getGroup().equalsIgnoreCase(thisGroupName)
						&& !jobCtx.getFireTime().equals(ctx.getFireTime())) {
					return true;
				}
			}
		} catch (SchedulerException e) {
			log.error("Unable to get all job information for context : ", e);
		}
		return false;
	}
	
}
