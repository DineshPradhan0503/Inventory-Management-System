//package com.nt.config;
//
//import java.util.Collection;
//import java.util.Date;
//import java.util.HashSet;
//import java.util.Set;
//
//import javax.crypto.SecretKey;
//
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//
//@Service
//public class JwtProvider {
//	
//	private SecretKey key=Keys.hmacShaKeyFor(JWTConstant.SECRET_KEY.getBytes());
//	
//	public String generateToken(Authentication auth) {
//		Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
//		String roles = populateAuthorities(authorities);
//
//		String jwt=Jwts.builder()
//				.setIssuedAt(new Date())
//				.setExpiration(new Date(new Date().getTime()+86400000))
//				.claim("email",auth.getName())
//				.claim("authorities", roles)
//				.signWith(key)
//				.compact();
//		return jwt;
//		
//	}
//	
//	public String getEmailFromJwtToken(String jwt) {
//		jwt=jwt.substring(7);
//		
//		Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
//		String email=String.valueOf(claims.get("email"));
//		
//		return email;
//	}
//	
//	public String populateAuthorities(Collection<? extends GrantedAuthority> collection) {
//		Set<String> auths=new HashSet<>();
//		
//		for(GrantedAuthority authority:collection) {
//			auths.add(authority.getAuthority());
//		}
//		return String.join(",",auths);
//	}
//}
//
//
//
//


package com.bluepal.config;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service

public class JwtProvider {

    private SecretKey key = Keys.hmacShaKeyFor(JWTConstant.SECRET_KEY.getBytes());

//    public String generateToken(Authentication auth) {
//        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
//
//        // ✅ Convert roles to List<String>
//        List<String> roles = authorities.stream()
//                .map(GrantedAuthority::getAuthority)
//                .toList();
//
//        System.out.println("✅ Generating JWT Token...");
//        System.out.println("User Email (auth.getName()): " + auth.getName());
//        System.out.println("User Roles: " + roles);
//
//        String jwt = Jwts.builder()
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiry
//                .claim("email", auth.getName())
//                .claim("authorities", roles)
//                .signWith(key)
//                .compact();
//
//        System.out.println("✅ JWT Token generated: " + jwt);
//        return jwt;
//    }
    
    public String generateToken(Authentication auth) {
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();

        // ✅ Convert roles to List<String> (actual roles from DB/UserDetails)
        List<String> roles = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        System.out.println("✅ Generating JWT Token...");
        System.out.println("User Email: " + auth.getName());
        System.out.println("User Roles: " + roles);

        String jwt = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .claim("email", auth.getName())
                .claim("authorities", roles) // ✅ Use actual roles
                .signWith(key)
                .compact();

        System.out.println("✅ JWT Token generated: " + jwt);
        return jwt;
    }



    public String getEmailFromJwtToken(String jwt) {
        System.out.println("🔍 Extracting email from JWT: " + jwt);

        jwt = jwt.substring(7); // Remove Bearer prefix
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();

        String email = String.valueOf(claims.get("email"));
        System.out.println("✅ Email extracted from token: " + email);
        return email;
    }
}
