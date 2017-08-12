package com.secl.ocr.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component("emailUtil")
public class EmailUtil {
	
	private @Autowired @Qualifier("mailSender") JavaMailSender mailSender;
	private @Autowired @Qualifier("simpleMailMessage") SimpleMailMessage simpleMailMessage;
	
	public boolean sendMailForFeedBack(String subject, String content, String emailTosent) {
		boolean isSent = false;
		simpleMailMessage.setSubject(subject);
		simpleMailMessage.setText(content);		
		simpleMailMessage.setTo(emailTosent);
		try {
			mailSender.send(simpleMailMessage);
			isSent = true;
			log.info("Successfully sent mail");
		} catch(Exception m){
			log.error("An Exception occured while send mail : ", m);
		}
		return isSent;
	}
	
}
