package com.data.service;


import com.data.entity.user;
import com.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    private OtpService otpService;

    public user registerWithOtp(user u, String otp) {
        if (otpService.validateOtp(u.getEmail(), otp)) {
            return userRepository.save(u); // Saved to MySQL
        } else {
            throw new RuntimeException("Invalid OTP Code");
        }
    }
    // ✅ Register new user
    public user registerUser(user u) {
        u.setId(null); // ✅ Force insert, not update
        return userRepository.save(u);
    }

    // ✅ Login check
    public boolean loginUser(String email, String password) {
        Optional<user> existingUser = userRepository.findByEmail(email);
        return existingUser.isPresent() && existingUser.get().getPassword().equals(password);
    }

    // ✅ Find user by email
    public Optional<user> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // ✅ Get all users
    public List<user> getAllUsers() {
        return userRepository.findAll();
    }
}
