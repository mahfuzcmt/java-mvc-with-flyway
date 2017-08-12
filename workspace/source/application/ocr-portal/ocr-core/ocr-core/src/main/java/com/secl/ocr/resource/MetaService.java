package com.secl.ocr.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.secl.ocr.bean.MetaPropertyBean;
import com.secl.ocr.bean.ResponseBean;
import com.secl.ocr.manager.Manager;
import com.secl.ocr.util.Constant;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("/meta")
@Component("metaService")
public class MetaService {
 
	private @Autowired @Qualifier("manager") Manager manager;

	@POST
	@Path("/post")
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public ResponseBean getDashboardData(MetaPropertyBean model) {
		log.debug("---------------------- Meta Service --------------------------");
		log.debug("Request Received : {}", model);
		ResponseBean response = new ResponseBean();
		if(model.getOperation().equalsIgnoreCase(Constant.GET_META_DATA_BY_OID)){
			response = manager.getMetaDataByOid(response, model);
		}
		log.debug("Response Send : {}", response);
		return response;
	}
}


