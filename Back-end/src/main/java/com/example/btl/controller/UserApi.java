package com.example.btl.controller;

import com.example.btl.entity.Account;
import com.example.btl.entity.AuthRequest;
import com.example.btl.entity.AuthResponse;
import com.example.btl.entity.Role;
import com.example.btl.entity.User;
import com.example.btl.jwt.JwtTokenUtil;
import com.example.btl.repository.RoleRepository;
import com.example.btl.repository.UserRepository;
import com.example.btl.response.ResponseLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserApi {
	@Autowired RoleRepository roleRepository;
    @Autowired UserRepository userRepository;
    @Autowired AuthenticationManager authManager;
    @Autowired JwtTokenUtil jwtUtil;
    @Autowired PasswordEncoder passwordEncoder;

    @GetMapping()
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
        try {        	
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getusername(), request.getPassword())
            );
            User user = (User) authentication.getPrincipal();
            String accessToken = jwtUtil.generateAccessToken(user);
            AuthResponse response = new AuthResponse(user.getUsername(), accessToken);
            return ResponseEntity.ok().body(response);
             
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/sign-up")
    public ResponseLogin responseLogin(@RequestBody User signupUser) {
        System.out.println(signupUser.getUsername());
        System.out.println(signupUser.getPassword());
        signupUser.setPassword(passwordEncoder.encode(signupUser.getPassword()));
        Optional<User> newUsername = userRepository.findUserByUsername(signupUser.getUsername());
        ResponseLogin newReponseLogin = new ResponseLogin();
        if (!newUsername.isPresent()) {
            newReponseLogin.setStatus(200);
            Set<Role> roles = new HashSet<Role>();
            Optional<Role> role = roleRepository.findById(2);
            roles.add(role.get());
            signupUser.setRoles(roles);
            userRepository.save(signupUser);
        }
        else
            newReponseLogin.setStatus(404);
        return newReponseLogin;
    }

//    public static String getMd5(String input) {
//        try {
//
//            // Static getInstance method is called with hashing MD5
//            MessageDigest md = MessageDigest.getInstance("MD5");
//
//            // digest() method is called to calculate message digest
//            // of an input digest() return array of byte
//            byte[] messageDigest = md.digest(input.getBytes());
//
//            // Convert byte array into signum representation
//            BigInteger no = new BigInteger(1, messageDigest);
//
//            // Convert message digest into hex value
//            String hashtext = no.toString(16);
//            while (hashtext.length() < 32) {
//                hashtext = "0" + hashtext;
//            }
//            return hashtext;
//        }
//
//        // For specifying wrong message digest algorithms
//        catch (NoSuchAlgorithmException e) {
//            throw new RuntimeException(e);
//        }
//    }
}


