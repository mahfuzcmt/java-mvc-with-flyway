package com.secl.ocr.mapper;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Provider
public class UnrecognizedPropertyExceptionMapper implements ExceptionMapper<UnrecognizedPropertyException>{

    @Override
    public Response toResponse(UnrecognizedPropertyException exception) {
        log.error("Unrecognized Property : ", exception);
        return Response.status(Response.Status.BAD_REQUEST)
                .entity("This is an invalid request. The field " + exception.getPropertyName() + " is not recognized by the system.")
                .type( MediaType.TEXT_PLAIN)
                .build();
    }
    
}
