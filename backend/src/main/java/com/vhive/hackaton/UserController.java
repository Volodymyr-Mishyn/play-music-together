package com.vhive.hackaton;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final WebSocketMessageHandler webSocketMessageHandler;

    public UserController(UserService userService, WebSocketMessageHandler webSocketMessageHandler) {
        this.userService = userService;
        this.webSocketMessageHandler = webSocketMessageHandler;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @NonNull LoginRequest loginRequest) {
        String user = loginRequest.getUser();
        if (user == null || user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User cannot be empty");
        }


        if (userService.addUser(user)) {
            webSocketMessageHandler.broadcastUserList();
            return ResponseEntity.ok("User added");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
        }
    }
}

class LoginRequest {
    @NonNull
    private String user;

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
