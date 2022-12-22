package com.example.btl.controller;

import com.example.btl.entity.Account;
import com.example.btl.entity.User;
import com.example.btl.repository.UserRepository;
import com.example.btl.response.ResponseLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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
        User newUser = userRepository.findUserByUsernameAndPassword(loginAccount.getUsername(), getMd5(loginAccount.getPassword()));
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
        signupUser.setPassword(getMd5(signupUser.getPassword()));
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

    public static String getMd5(String input) {
        try {

            // Static getInstance method is called with hashing MD5
            MessageDigest md = MessageDigest.getInstance("MD5");

            // digest() method is called to calculate message digest
            // of an input digest() return array of byte
            byte[] messageDigest = md.digest(input.getBytes());

            // Convert byte array into signum representation
            BigInteger no = new BigInteger(1, messageDigest);

            // Convert message digest into hex value
            String hashtext = no.toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        }

        // For specifying wrong message digest algorithms
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}


