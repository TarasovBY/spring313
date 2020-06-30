package com.crudboot.service;

import com.crudboot.model.User;

import java.util.List;
import java.util.Optional;


public interface UserService {
    void save(User user);
    Optional<User> findById(Long id);
    void deleteById(Long id);
    void saveAndFlush(User user);
    List<User> findAll();
    void delete(User user);
}
