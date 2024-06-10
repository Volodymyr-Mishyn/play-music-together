package com.vhive.hackaton;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class WebSocketMessageHandler extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());
    private final UserService userService;

    public WebSocketMessageHandler(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        sendUserList(session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        for (WebSocketSession webSocketSession : sessions) {
            if (webSocketSession.isOpen() && !webSocketSession.getId().equals(session.getId())) {
                webSocketSession.sendMessage(message);
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
        String user = session.getAttributes().get("user").toString();
        if (userService.removeUser(user)) {
            broadcastUserList();
        }
    }

    public void broadcastUserList() {
        String users = userService.getUsers().stream()
                .map(user -> "\"" + user + "\"")
                .collect(Collectors.joining(", ", "[", "]"));;
        String userListMessage = "{\"type\":\"users\",\"message\":{\"users\":" + users + "}}";
        TextMessage message = new TextMessage(userListMessage);
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                try {
                    session.sendMessage(message);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private void sendUserList(WebSocketSession session) {
        String users = userService.getUsers().stream()
                .map(user -> "\"" + user + "\"")
                .collect(Collectors.joining(", ", "[", "]"));;
        String userListMessage = "{\"type\":\"users\",\"message\":{\"users\":" + users + "}}";
        TextMessage message = new TextMessage(userListMessage);
        try {
            session.sendMessage(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
