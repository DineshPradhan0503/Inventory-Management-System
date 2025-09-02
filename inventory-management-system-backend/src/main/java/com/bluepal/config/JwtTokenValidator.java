//package com.nt.config;
//
//import java.io.IOException;
//import java.util.List;
//
//import javax.crypto.SecretKey;
//
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//public class JwtTokenValidator extends OncePerRequestFilter{
//	
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//		String jwt = request.getHeader(JWTConstant.JWT_HEADER);
//
//		if (jwt != null) {
//			jwt = jwt.substring(7);
//
//			try {
//
//				SecretKey key = Keys.hmacShaKeyFor(JWTConstant.SECRET_KEY.getBytes());
//
//				Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
//
//				String email = String.valueOf(claims.get("email"));
//
//				String authorities = String.valueOf(claims.get("authorities"));
//
//				System.out.println("authorities -------- " + authorities);
//
//				List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
//				Authentication athentication = new UsernamePasswordAuthenticationToken(email, null, auths);
//
//				SecurityContextHolder.getContext().setAuthentication(athentication);
//
//			} catch (Exception e) {
//				throw new BadCredentialsException("invalid token...");
//			}
//		}
//		filterChain.doFilter(request, response);
//
//	}
//
//}
//
//
    



package com.bluepal.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = request.getHeader(JWTConstant.JWT_HEADER);

        System.out.println("🔍 JWT Header Value: " + jwt);

        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);

            try {
                SecretKey key = Keys.hmacShaKeyFor(JWTConstant.SECRET_KEY.getBytes());

                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                System.out.println("✅ Token successfully parsed.");

                String email = String.valueOf(claims.get("email"));
                System.out.println("📧 Extracted Email: " + email);

                Object rawAuthorities = claims.get("authorities");
                System.out.println("🔐 Raw Authorities from Token: " + rawAuthorities);

                List<GrantedAuthority> authorities = new ArrayList<>();

                if (rawAuthorities instanceof List<?> rolesList) {
                    for (Object role : rolesList) {
                        System.out.println("➡️ Role Found in List: " + role);
                        authorities.add(new SimpleGrantedAuthority(role.toString()));
                    }
//                	for (Object role : rolesList) {
//                	    String roleName = role.toString();
//                	    if (!roleName.startsWith("ROLE_")) {
//                	        roleName = "ROLE_" + roleName;
//                	    }
//                	    authorities.add(new SimpleGrantedAuthority(roleName));
//                	}

                } 
                
                
          

                else {
                    System.out.println("⚠️ Authorities not in expected format. Skipping role assignment.");
                }

                Authentication authentication =
                        new UsernamePasswordAuthenticationToken(email, null, authorities);

                System.out.println("✅ Authentication object created: " + authentication);

                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("🔒 SecurityContext updated with authentication.");

            } catch (Exception e) {
                System.out.println("❌ Exception while validating token: " + e.getMessage());
                throw new BadCredentialsException("Invalid token...", e);
            }
        } else {
            System.out.println("⚠️ No JWT token found or token doesn't start with 'Bearer '.");
        }

        filterChain.doFilter(request, response); 
    }
}


