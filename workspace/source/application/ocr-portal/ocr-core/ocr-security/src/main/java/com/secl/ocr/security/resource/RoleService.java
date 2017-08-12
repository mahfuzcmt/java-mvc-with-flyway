package com.secl.ocr.security.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.secl.ocr.bean.ResponseBean;
import com.secl.ocr.security.bean.RoleBean;
import com.secl.ocr.security.manager.RoleManager;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component("roleService")
@Path("/role")
public class RoleService {

	private @Autowired @Qualifier("roleManager") RoleManager roleManager;
	
	@GET
	@Path("get/{name}")
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public String getName(@PathParam("name") String name) {
		String response = String.format("Hello %s, from Role Service", name);
		log.info("{}", response);
		return response;
	}
	
	@POST
	@Path("/post")
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public ResponseBean postObject(RoleBean model) {
		log.debug("---------------------- Role Service --------------------------");
		log.info("Request Receive : {}", model);
		ResponseBean response = new ResponseBean();
		log.info("Response Send : {}", response);
		return response;
	}
	
}


