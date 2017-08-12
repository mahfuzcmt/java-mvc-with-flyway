package com.secl.ocr.security.resource;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.secl.ocr.bean.LoginBean;
import com.secl.ocr.bean.ResponseBean;
import com.secl.ocr.security.manager.AuthenticationManager;
import com.secl.ocr.util.Constant;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("security")
@Component("authenticationService")
public class AuthenticationService {
	
	private @Context ServletContext servletContext;
	private @Context HttpServletRequest request;
	private @Autowired @Qualifier("authenticationManager") AuthenticationManager authenticationManager;
	
	@GET
	@Path("get/{name}")
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public String getName(@PathParam("name") String name) {
		String response = String.format("Hello %s, from Authentication Service", name);
		log.info("{}", response);
		return response;
	}
	
	@POST
	@Path("post")
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public ResponseBean postObject(LoginBean model) {
		log.debug("----------------------- Authentication Service --------------------------");
		log.debug("Request Received : {}", model);
		ResponseBean response = new ResponseBean();
		if(model.getOperation().equalsIgnoreCase(Constant.LOGIN)){
			response = authenticationManager.doLogin(request, response, model);
		} else if(model.getOperation().equalsIgnoreCase(Constant.LOGOUT)){
			response = authenticationManager.doLogout(request, response, model);
		} else if (model.getOperation().equalsIgnoreCase(Constant.CHANGE_PASSWORD)){
			response = authenticationManager.changePassword(response, model);
		}
		log.debug("Response Send : {}", response);
		return response;
	}

}


