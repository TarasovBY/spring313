package com.crudboot.controller;

import com.crudboot.model.User;
import com.crudboot.repository.UserRepository;
import com.crudboot.service.UserServiceImp;
import com.crudboot.util.CrudSupporting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    private final UserServiceImp service;
    private final PasswordEncoder encoder;
    private final CrudSupporting crudSupporting;

    @Autowired
    public RestController(UserServiceImp service, PasswordEncoder encoder, CrudSupporting crudSupporting) {
        this.service = service;
        this.encoder = encoder;
        this.crudSupporting = crudSupporting;
    }

    @GetMapping(value = "/rest/user/{id}")
    public User readUser(@PathVariable(name = "id") Long id) {
        Optional<User> user = service.findById(id);
        return user.get();
    }

    @PostMapping(value = "/rest/user/add")
    private void addUser(WebRequest webRequest){
        User user = new User();
        user.setName(webRequest.getParameter("name"));
        user.setTelephone(webRequest.getParameter("telephone"));
        user.setRole(crudSupporting.createRoleForms(webRequest));
        user.setPassword(encoder.encode(webRequest.getParameter("password")));
        service.save(user);
    }

    @GetMapping(value = "/rest/user/all")
    public List<User> getAllUser(){
        return service.findAll();
    }

    @DeleteMapping(value = "/rest/user/delete/{id}")
    public void deleteUser(@PathVariable(name = "id") long id) {
        service.deleteById(id);
    }

    @PutMapping(value = "/rest/user/edit/")
    public void updateUser(WebRequest webRequest) {
        User user = new User();
        user.setId(Integer.parseInt(Objects.requireNonNull(webRequest.getParameter("id"))));
        user.setName(webRequest.getParameter("name"));
        user.setTelephone(webRequest.getParameter("telephone"));
        user.setRole(crudSupporting.createRoleForms(webRequest));
        user.setPassword(encoder.encode(webRequest.getParameter("password")));
        service.saveAndFlush(user);
    }
}
