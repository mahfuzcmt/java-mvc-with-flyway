package com.secl.ocr.security.resource;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.springframework.stereotype.Component;

import com.google.common.base.Strings;
import com.secl.ocr.bean.ResponseBean;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("/fileupload") 
@Component("fileService")
public class FileService {
	
	private @Context ServletContext servletContext;
	
	@GET
	@Path("/get/{name}")
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public String getName(@PathParam("name") String name) {
		String response = String.format("Hello %s, from File Service", name);
		log.info("{}", response);
		return response;
	}
	
	@POST
	@Path("/upload") 
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public ResponseBean uploadFile(@FormDataParam("file") InputStream is,	
			@FormDataParam("file") FormDataContentDisposition formData, 
			@QueryParam("folderName") String folderName) {
		ResponseBean response = new ResponseBean();
		String rootPath = servletContext.getRealPath("");
		File file = new File(rootPath + File.separator + folderName);
		try {
			saveFile(is, file, folderName, formData);
			response.setSuccess(true);
			String filePath =  "";
			response.setData(filePath);
			log.info("Uploaded file : {}", filePath);
		} catch (IOException e) {
			log.error("An Exception occured when file upload : ", e);
		}
		return response;
	}
	
	@GET
	@Path("/delete") 
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public ResponseBean deleteFile(@QueryParam("fileName") String fileName) {
		ResponseBean response = new ResponseBean();
		if(Strings.isNullOrEmpty(fileName)){
			return response;
		}
		String rootPath = servletContext.getRealPath(fileName);
		File file = new File(rootPath);
		try {
			if(deleteFile(file)){
				response.setMessage("Successfully deleted file : "+fileName);
				log.info("Deleted file : {}", file.getAbsoluteFile());
				response.setSuccess(true);
				return response;
			};
		} catch (IOException e) {
			log.error("An exception occurred when file deleting : ", e);
			response.setMessage("Unable to delete file : "+fileName);
		}
		return response;
	}
 
	private String saveFile(InputStream is, File file, String folderName, FormDataContentDisposition formData) throws IOException {
		if(!file.exists()){
			file.mkdir();
		}
		String fileLocation = file.getAbsolutePath()+ File.separator + formData.getFileName();		
		OutputStream os = new FileOutputStream(new File(fileLocation));
		byte[] buffer = new byte[256];
	    int bytes = 0;
	    while ((bytes = is.read(buffer)) != -1) {
	        os.write(buffer, 0, bytes);
	    }
	    os.close();
	    
	    String ext = FilenameUtils.getExtension(fileLocation);		
		File oldfile = new File(fileLocation);
		File newfile = new File(file.getAbsolutePath()+ File.separator + UUID.randomUUID().toString()+"."+ext);
		oldfile.renameTo(newfile);
		
		File localFile = new File(File.separator + folderName + File.separator + newfile.getName());
		FileUtils.copyFile(newfile, localFile);
		return newfile.getName();
	}
	
	private boolean deleteFile(File file) throws IOException {
		try {
			FileUtils.deleteQuietly(file);
		} catch (Exception e) {
		}
		return true;
	}
	
}
 





