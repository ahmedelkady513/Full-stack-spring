package com.elkady.ecommerce.controller;


import com.elkady.ecommerce.Dto.LoginDto;
import com.elkady.ecommerce.Dto.LoginResponseDto;
import com.elkady.ecommerce.Dto.RegisterDto;
import com.elkady.ecommerce.service.UserDetailsServiceImpl;
import com.elkady.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {


    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginDto loginDto) {
      return userService.login(loginDto);
    }
    @PostMapping("/register")
    public String register(@RequestBody RegisterDto registerDto) {
        userService.registerUser(registerDto);
        return "User" + registerDto.username() + "Created";
    }
}
