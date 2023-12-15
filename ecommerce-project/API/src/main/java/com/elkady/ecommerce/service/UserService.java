package com.elkady.ecommerce.service;

import com.elkady.ecommerce.Dto.LoginDto;
import com.elkady.ecommerce.Dto.LoginResponseDto;
import com.elkady.ecommerce.Dto.RegisterDto;
import com.elkady.ecommerce.entity.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {
    public void registerUser(RegisterDto registerDto) ;
    public LoginResponseDto login(LoginDto loginDto) ;

}
