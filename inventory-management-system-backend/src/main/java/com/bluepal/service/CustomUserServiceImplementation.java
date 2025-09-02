//package com.nt.service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.nt.model.User;
//import com.nt.repository.UserRepository;
//
//@Service
//public class CustomUserServiceImplementation implements UserDetailsService{
//	
//	@Autowired
//	private UserRepository userRepository;
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		User user=userRepository.findByEmail(username);
//		
//		if(user==null) {
//			throw new UsernameNotFoundException("User Not Found with email::"+username);
//		}
//		List<GrantedAuthority> authorities = new ArrayList<>();
//		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
//		//return null;
//	}
//
//}


package com.bluepal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bluepal.model.User;
import com.bluepal.repository.UserRepository;
@Service
public class CustomUserServiceImplementation implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);

        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with email: " + username);
        }

        // ✅ Ensure role is prefixed with ROLE_
        String role = user.getRole(); // Example: "ADMIN" or "USER"
        String springRole = role.startsWith("ROLE_") ? role : "ROLE_" + role;

        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(springRole));

        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            authorities
        );
    }
}






