package com.data.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OtpService {
    @Autowired
    private JavaMailSender mailSender;

    // Temporary storage for verification
    private Map<String, String> otpCache = new HashMap<>();

    public void sendOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpCache.put(email, otp); // Store code against email
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("BeatFlow Verification");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);
    }

    public boolean validateOtp(String email, String otp) {
        return otp.equals(otpCache.get(email));
    }
}