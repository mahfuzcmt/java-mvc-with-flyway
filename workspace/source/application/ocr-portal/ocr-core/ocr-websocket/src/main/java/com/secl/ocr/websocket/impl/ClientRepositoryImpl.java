package com.secl.ocr.websocket.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Consumer;

import org.springframework.stereotype.Component;

import com.secl.ocr.websocket.ClientRepository;
import com.secl.ocr.websocket.domain.Client;

@Component("clientRepository")
public class ClientRepositoryImpl implements ClientRepository {
	
	private List<Client> clients = new LinkedList<Client>();
	
	@Override
	public void add(Client session) {
		synchronized (this.clients) {
			this.clients.add(session);
		}
	}
	
	@Override
	public void remove(Client session) {
		synchronized (this.clients) {
			this.clients.remove(session);
		}
	}
	
	@Override
	public void forEach(Consumer<Client> clientConsume) {
		synchronized (this.clients) {
			this.clients.forEach(clientConsume);
		}
	}

	@Override
	public List<Client> getAll() {
		return new LinkedList<>(this.clients);
	}

}
