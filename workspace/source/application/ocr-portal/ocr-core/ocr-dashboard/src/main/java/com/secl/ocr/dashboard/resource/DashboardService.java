package com.secl.ocr.dashboard.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.secl.ocr.bean.ResponseBean;
import com.secl.ocr.dashboard.bean.DashboardBean;
import com.secl.ocr.dashboard.manager.DashboardManager;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("/dashboard")
@Component("dashboardService")
public class DashboardService {
 
	private @Autowired @Qualifier("dashboardManager") DashboardManager dashboardManager;

	@POST
	@Path("/post")
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public ResponseBean getDashboardData(DashboardBean model) {
		log.debug("---------------------- Dashboard Service --------------------------");
		log.debug("Request Received : {}", model);
		ResponseBean response = new ResponseBean();
		log.debug("Response Send : {}", response);
		return response;
	}
	
}


