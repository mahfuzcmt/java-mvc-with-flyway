package com.secl.ocr.util;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.sql.DataSource;
import javax.ws.rs.core.UriInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.common.base.Strings;
import com.secl.ocr.bean.LoginBean;
import com.secl.ocr.bean.ReportParamBean;

import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;

@Slf4j
@Component("reportUtil")
public class ReportUtil  {

	private @Autowired @Qualifier("gsonUtil") GsonUtil gsonUtil;
	private @Value("${report.folder}") String folderName;
	private @Autowired DataSource dataSource;
	
	@PostConstruct
	private void initialize() {
		folderName = (Strings.isNullOrEmpty(folderName)? "generatereport" : folderName);
	}
	
	public ReportParamBean getReportParamBean(UriInfo info) {
		ReportParamBean model = new ReportParamBean();
		model.reportName = info.getQueryParameters().getFirst("reportName");
		model.destinationFolder = info.getQueryParameters().getFirst("destinationFolder");
		model.fromDateStr = info.getQueryParameters().getFirst("fromDate");
		model.toDateStr = info.getQueryParameters().getFirst("toDate");
		if(info.getQueryParameters().getFirst("transactionType") != null) {
			model.transactionType = info.getQueryParameters().getFirst("transactionType");			
		}
		if(info.getQueryParameters().getFirst("oid") != null) {
			model.oid = info.getQueryParameters().getFirst("oid");			
		}
		if(info.getQueryParameters().getFirst("stateOID") != null) {
			model.stateOID = info.getQueryParameters().getFirst("stateOID");			
		}
		if(info.getQueryParameters().getFirst("oids") != null) {
			model.oids = info.getQueryParameters().getFirst("oids").split(",");			
		}
		model.loginBean = info.getQueryParameters().getFirst("loginBean") == null ? 
				null : (LoginBean) gsonUtil.parseObject(info.getQueryParameters().getFirst("loginBean"), LoginBean.class);
        return model;
    }
	
	public Map<String, Object> getParam(ServletContext context, String personImagePath, String subReportDir){
		Map<String, Object> params = new HashMap<String, Object>();
		if(personImagePath != null && !personImagePath.isEmpty()){
			params.put("imagePath", context.getRealPath(personImagePath));
		}
		if(subReportDir != null && !subReportDir.isEmpty()){
			params.put("SUBREPORT_DIR", subReportDir);
		}
		return params;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String generateReport(ServletContext servletContext, String sourceFileName, String reportFileName, 
			String fileType, Map params, List data, String reportDataSource) throws Exception {
		JasperPrint jasperPrint = null;
		String rootPath = servletContext.getRealPath("");
		File file = new File(rootPath + File.separator + folderName);
		if(!file.exists()){
			file.mkdir();
		} else {
			delete(file);
		}
		String sourceFileDestination = rootPath + File.separator + Constant.REPORT + File.separator + sourceFileName;
		String reportFileDestination = rootPath + File.separator + folderName + File.separator + reportFileName;
		JasperReport jasperReport = (JasperReport) JRLoader.loadObjectFromFile(sourceFileDestination);
		if(reportDataSource.equalsIgnoreCase(Constant.JAVA_BEAN)) {
			jasperPrint = JasperFillManager.fillReport(jasperReport, params, new JRBeanCollectionDataSource(data));
		} else {
			jasperPrint = JasperFillManager.fillReport(jasperReport, params, dataSource.getConnection());
		}
        if(fileType.equalsIgnoreCase(Constant.PDF)){
        	JasperExportManager.exportReportToPdfFile(jasperPrint, reportFileDestination);
        }
        return folderName + "/" + reportFileName;
	}
	

	private void delete(File file) {
		String[] fileList = file.list();
        int size = fileList.length;
        for(int i = 0 ; i < size ; i++) {
            File fileOrFolder = new File(file.getPath()+"/"+fileList[i]);
            fileOrFolder.delete();
        }
        log.trace("Delete generated report files");
	}
	
}









