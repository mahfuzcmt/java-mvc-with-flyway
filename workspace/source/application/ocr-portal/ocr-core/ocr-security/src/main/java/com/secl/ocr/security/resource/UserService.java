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
import com.secl.ocr.security.bean.UserBean;
import com.secl.ocr.security.manager.UserManager;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component("userService")
@Path("/user")
public class UserService {

	private @Autowired @Qualifier("userManager") UserManager userManager;
	
	@GET
	@Path("get/{name}")
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public String getName(@PathParam("name") String name) {
		String response = String.format("Hello %s, from User Service", name);
		log.info("{}", response);
		return response;
	}
	
	@POST
	@Path("/post")
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public ResponseBean postObject(UserBean model) {
		log.debug("---------------------- User Service --------------------------");
		log.debug("Request Received : {}", model);
		ResponseBean response = new ResponseBean();
		log.debug("Response Send : {}", response);
		return response;
	}
	
}


