package com.secl.ocr.websocket.impl;

import javax.annotation.PostConstruct;
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.server.standard.SpringConfigurator;

import com.secl.ocr.websocket.ClientRepository;
import com.secl.ocr.websocket.WebSocketHandler;
import com.secl.ocr.websocket.domain.Client;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component("webSocketHandler")
@ServerEndpoint(value = "/websocketservice", configurator = SpringConfigurator.class)
public class DomsWebSocketHandler implements WebSocketHandler {
	
	private @Autowired @Qualifier("clientRepository") ClientRepository clientRepository;
	
	@PostConstruct
	public void init(){
		System.out.println("");
		System.out.println("╔╦╗╔═╗╔╦╗╔═╗   ╔╦╗╔═╗");
		System.out.println(" ║║║ ║║║║╚═╗───║║║║  ");
		System.out.println("═╩╝╚═╝╩ ╩╚═╝   ╩ ╩╚═╝");
		System.out.println("");
	}
	
	@OnOpen
	public void onOpen(Session session) {
		Client client = new Client(session);
		this.clientRepository.add(client);
		log.info("Add new client in web socket server");
	}
	
	@OnClose
	public void onClose(CloseReason reason, Session session) {
		this.clientRepository.remove(new Client(session));
	}

	
}