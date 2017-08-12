package com.secl.ocr.mapper;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Provider
public class JsonProcessingExceptionMapper implements ExceptionMapper<JsonProcessingException> {

    @Override
    public Response toResponse(JsonProcessingException exception) {
        
    	if (exception instanceof JsonGenerationException) {
            log.warn("Error generating JSON : ", exception);
            return Response.serverError().build();
        }
        final String message = exception.getOriginalMessage();

        if (message.startsWith("No suitable constructor found")) {
            log.error("Unable to deserialize the specific type : ", exception);
            return Response.serverError().build();
        }

        log.error("Unable to process JSON : {}", message);
        return Response.status(Response.Status.BAD_REQUEST).type(MediaType.APPLICATION_JSON_TYPE).entity(message).build();
        
    }

}
