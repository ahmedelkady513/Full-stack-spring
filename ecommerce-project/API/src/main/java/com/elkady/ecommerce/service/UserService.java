package com.elkady.ecommerce.service;

import com.elkady.ecommerce.Dto.LoginDto;
import com.elkady.ecommerce.Dto.LoginResponseDto;
import com.elkady.ecommerce.Dto.RegisterDto;


public interface UserService {
    public void registerUser(RegisterDto registerDto) ;
    public LoginResponseDto login(LoginDto loginDto) ;

}
