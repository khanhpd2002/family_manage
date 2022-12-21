package com.example.btl.controller;

import com.example.btl.entity.Account;
import com.example.btl.entity.User;
import com.example.btl.repository.UserRepository;
import com.example.btl.response.ResponseLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserApi {
    @Autowired
    private UserRepository userRepository;

    @GetMapping()
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/login")
    public ResponseLogin responseLogin(@RequestBody Account loginAccount) {
        System.out.println(loginAccount.getUsername());
        System.out.println(loginAccount.getPassword());
        User newUser = userRepository.findUserByUsernameAndPassword(loginAccount.getUsername(), loginAccount.getPassword());
        ResponseLogin newReponseLogin = new ResponseLogin();
        if (newUser != null)
            newReponseLogin.setStatus(200);
        else
            newReponseLogin.setStatus(404);
        return newReponseLogin;
    }

    @PostMapping("/sign-up")
    public ResponseLogin responseLogin(@RequestBody User signupUser) {
        System.out.println(signupUser.getUsername());
        System.out.println(signupUser.getPassword());
        User newUsername = userRepository.findUserByUsername(signupUser.getUsername());
        ResponseLogin newReponseLogin = new ResponseLogin();
        if (newUsername == null) {
            newReponseLogin.setStatus(200);
            userRepository.save(signupUser);
        }
        else
            newReponseLogin.setStatus(404);
        return newReponseLogin;
    }

}
