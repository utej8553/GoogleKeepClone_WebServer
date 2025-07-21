package com.utej.googlekeepclone.service;

import com.utej.googlekeepclone.model.User;
import com.utej.googlekeepclone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public boolean registerUser(User user){
        if(userRepository.existsByEmail(user.getEmail())){
            return false;
        }
        userRepository.save(user);
        return true;
    }
    public boolean loginUser(User user){
        User found = userRepository.findByEmail(user.getEmail());
        return found != null && found.getPassword().equals(user.getPassword());
    }
    public void deleteUser(String email){
        User found = userRepository.findByEmail(email);
        if(found != null){
            userRepository.delete(found);
        }
    }
}
