package com.data.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.data.entity.user;
import com.data.service.UserService;
import com.data.service.OtpService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    @Autowired private OtpService otpService;
   private UserService userService;

    @PostMapping("/send-otp")
    public void send(@RequestBody Map<String, String> request) {
        otpService.sendOtp(request.get("email"));
    }

    @PostMapping("/register")
    public user register(@RequestBody Map<String, String> payload) {
        user u = new user();
        u.setName(payload.get("name"));
        u.setEmail(payload.get("email"));
        u.setPassword(payload.get("password"));
        
        return userService.registerWithOtp(u, payload.get("otp"));
    }
}