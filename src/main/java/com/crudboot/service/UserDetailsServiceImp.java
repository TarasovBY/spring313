package com.crudboot.service;

import com.crudboot.model.User;
import com.crudboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserDetailsServiceImp implements UserDetailsService {

    private final UserRepository service;

    @Autowired
    public UserDetailsServiceImp(UserRepository service) {
        this.service = service;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        User user = service.findUserByName(name);
        if(user == null) {
            throw new UsernameNotFoundException(name);
        }
        return user;
    }
}
