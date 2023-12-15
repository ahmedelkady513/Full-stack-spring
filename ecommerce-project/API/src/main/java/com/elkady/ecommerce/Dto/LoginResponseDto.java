package com.elkady.ecommerce.Dto;

import java.util.Date;

public record LoginResponseDto(String username, String token, Date expiredAt) {
}
