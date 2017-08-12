package com.secl.ocr.websocket.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.secl.ocr.websocket.Broadcaster;
import com.secl.ocr.websocket.ClientRepository;

@Component("broadcaster")
public class BroadcasterImpl implements Broadcaster {
	
	private @Autowired @Qualifier("clientRepository") ClientRepository clientRepository;
	//private ClientRepository clientRepository;
	
	@Override
	public void broadcast(String message) {
		this.clientRepository.forEach(client -> {
			try {
				client.sendText(message);
			} catch (Exception e) {
				e.printStackTrace();
			}
		});
	}

	/*public void setClientRepository(ClientRepository clientRepository) {
		this.clientRepository = clientRepository;
	}*/

}
