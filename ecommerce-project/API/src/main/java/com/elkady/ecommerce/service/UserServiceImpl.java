package com.elkady.ecommerce.service;

import com.elkady.ecommerce.Dto.LoginDto;
import com.elkady.ecommerce.Dto.RegisterDto;
import com.elkady.ecommerce.dao.UserRepository;
import com.elkady.ecommerce.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;
    private PasswordEncoder encoder;
    @Override
    public void registerUser(RegisterDto registerDto) {
        User user = new User();
        user.setUsername(registerDto.username());
        user.setPassword(encoder.encode(registerDto.password()));
        user.setEmail(registerDto.email());
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Override
    public String login(LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.username(),loginDto.password()));
            return jwtService.generateToken(loginDto.username());
        } catch (AuthenticationException ex){
            return ex.getMessage();
        }
    }
}
