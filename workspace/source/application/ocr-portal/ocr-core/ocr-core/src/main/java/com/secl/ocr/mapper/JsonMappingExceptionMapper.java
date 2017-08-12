package com.secl.ocr.mapper;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.fasterxml.jackson.databind.JsonMappingException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Provider
public class JsonMappingExceptionMapper implements ExceptionMapper<JsonMappingException>{

    @Override
    public Response toResponse(JsonMappingException exception) {
        log.error("Unable to deserialize the specific type : ", exception);
        return Response.status(Response.Status.BAD_REQUEST)
                .entity("This is an invalid json. The request can not be parsed")
                .type( MediaType.APPLICATION_JSON)
                .build();
    }
    
}