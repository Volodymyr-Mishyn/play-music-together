package com.vhive.hackaton;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    private final Set<String> users = Collections.synchronizedSet(new HashSet<>());

    public boolean addUser(String user) {
        return users.add(user);
    }

    public boolean removeUser(String user) {
        return users.remove(user);
    }

    public Set<String> getUsers() {
        return new HashSet<>(users);
    }
}
