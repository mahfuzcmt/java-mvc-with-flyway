package com.secl.ocr.websocket;

import java.util.List;
import java.util.function.Consumer;

import com.secl.ocr.websocket.domain.Client;

public interface ClientRepository {

	public void add(Client type);
	
	public void remove(Client type);
	
	public void forEach(Consumer<Client> typeConsumer);
	
	public List<Client> getAll();
	
}
