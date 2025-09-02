package com.bluepal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class ApplicationConfiguration {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(auth -> auth

						.requestMatchers("/api/user/profile","/api/user/all","/products/all")
						.hasAnyRole("USER", "ADMIN")
						.requestMatchers("/products/add","/products/update/{id}","/products/delete/{id}","/sales/all","/reports/*").hasRole("ADMIN")
						.requestMatchers( "/api/products/my-products","/sales/record").hasRole("USER")
								
						

						.anyRequest().permitAll())
				.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
				.httpBasic(Customizer.withDefaults()).formLogin(Customizer.withDefaults()).build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		return request -> {
			var config = new org.springframework.web.cors.CorsConfiguration();
			config.addAllowedOrigin("*");
			config.addAllowedMethod("*");
			config.addAllowedHeader("*");
			config.setAllowCredentials(true);
			return config;
		};
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
