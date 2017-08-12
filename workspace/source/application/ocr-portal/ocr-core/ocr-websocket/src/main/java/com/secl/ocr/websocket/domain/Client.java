package com.secl.ocr.websocket.domain;

import java.io.IOException;

import javax.websocket.Session;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Getter;

@JsonSerialize
@JsonDeserialize
public class Client {
	
	private final @Getter String id;
	private final Session session;
	
	public Client(Session session) {
		this.id = this.toString();
		this.session = session;
	}
	
	public void sendText(String text) throws IOException {
		this.session.getBasicRemote().sendText(text);
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((session == null) ? 0 : session.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Client other = (Client) obj;
		if (session == null) {
			if (other.session != null)
				return false;
		} else if (!session.equals(other.session))
			return false;
		return true;
	}

}
