package com.elkady.ecommerce.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;
import java.util.function.Function;

public interface JwtService {
     String extractUsername(String token) ;
     <T> T extractClaim(String token, Function<Claims, T> claimsResolver) ;
     String generateToken(String username);
     boolean isTokenValid(String token, UserDetails userDetails);
    }
