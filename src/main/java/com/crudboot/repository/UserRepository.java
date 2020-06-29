package com.crudboot.repository;

import com.crudboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByName(String name);
    User findUserById(Long id);
}
