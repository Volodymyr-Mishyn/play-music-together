package com.vhive.hackaton;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocket
public class WebsocketConfig implements WebSocketConfigurer {

    private final WebSocketMessageHandler webSocketMessageHandler;

    public WebsocketConfig(WebSocketMessageHandler webSocketMessageHandler) {
        this.webSocketMessageHandler = webSocketMessageHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketMessageHandler, "/ws")
                .addInterceptors(new HttpSessionHandshakeInterceptor() {
                    @Override
                    public boolean beforeHandshake(org.springframework.http.server.ServerHttpRequest request,
                                                   org.springframework.http.server.ServerHttpResponse response,
                                                   org.springframework.web.socket.WebSocketHandler wsHandler,
                                                   java.util.Map<String, Object> attributes) throws Exception {
                        // Extract user parameter from the request URI
                        String uri = request.getURI().toString();
                        String user = getUserFromUri(uri);
                        if (user != null) {
                            attributes.put("user", user);
                        }
                        return super.beforeHandshake(request, response, wsHandler, attributes);
                    }

                    private String getUserFromUri(String uri) {
                        if (uri.contains("user=")) {
                            return uri.substring(uri.indexOf("user=") + 5);
                        }
                        return null;
                    }
                })
                .setAllowedOrigins("*");
    }
}
