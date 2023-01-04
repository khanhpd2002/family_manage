package com.example.btl.jwt;

import org.apache.logging.log4j.LogManager;
import org.slf4j.LoggerFactory;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
//import java.util.logging.Logger;
import java.util.logging.Logger;

//import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.btl.entity.Role;
import com.example.btl.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

 
@Component
public class JwtTokenUtil {
    private static final long EXPIRE_DURATION = 24 * 60 * 60 * 1000; // 24 hour
     
    private String SECRET_KEY="abcdefghijklmnOPQRSTUVWXYZ";
     
	private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(JwtTokenUtil.class);

    
    public String generateAccessToken(User user) {
        return Jwts.builder()
                .setSubject(String.format("%s,%s", user.getId(), user.getUsername()))
                .setIssuer("Manager")
                .claim("roles", user.getRoles().toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
                 
    }
    
    public boolean validateAccessToken(String token) {
		try {
			Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
			return true;
		} catch (ExpiredJwtException ex) {
			LOGGER.error("JWT expired", ex.getMessage());

		} catch (IllegalArgumentException ex) {
			LOGGER.error("Token is null, empty or only whitespace", ex.getMessage());

		} catch (MalformedJwtException ex) {
			LOGGER.error("JWT is invalid", ex);

		} catch (UnsupportedJwtException ex) {
			LOGGER.error("JWT is not supported", ex);

		} catch (SignatureException ex) {
			LOGGER.error("Signature validation failed");
//			System.out.println("5");

		}

		return false;
	}
	
	public String getSubject(String token) {
		return parseClaims(token).getSubject();
	}
	
	public Claims parseClaims(String token) {
		return Jwts.parser()
				.setSigningKey(SECRET_KEY)
				.parseClaimsJws(token)
				.getBody();
	}
}