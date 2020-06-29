package com.crudboot.controller;

import com.crudboot.model.User;
import com.crudboot.repository.UserRepository;
import com.crudboot.util.CrudSupporting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.WebRequest;

import java.util.Objects;


@Controller
@RequestMapping("/")
public class CrudController {

    private final UserRepository service;
    private final PasswordEncoder encoder;
    private final CrudSupporting crudSupporting;


    @Autowired
    public CrudController(UserRepository service, PasswordEncoder encoder, CrudSupporting crudSupporting){
        this.encoder = encoder;
        this.service = service;
        this.crudSupporting = crudSupporting;
    }

    @GetMapping("/")
    public String getHome(){
        return "redirect:/login";
    }

    @GetMapping(value = "/admin")
    public String getPageAdmin(ModelMap modelMap) {
        modelMap.addAttribute("users", service.findAll());
        User user;
        user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        modelMap.addAttribute("userSolo", user);
        return "pageadmin";
    }

    @RequestMapping(value = "/admin/adduser", method = RequestMethod.POST)
    public String getAddUser(WebRequest webRequest) {
        User user = new User();
        user.setName(webRequest.getParameter("name"));
        user.setTelephone(webRequest.getParameter("telephone"));
        user.setRole(crudSupporting.createRole(webRequest));
        user.setPassword(encoder.encode(webRequest.getParameter("password")));
        service.save(user);
        return "redirect:/admin";
    }

    @RequestMapping(value = "/admin/deleteuser", method = RequestMethod.POST)
    public String getDeleteUser(WebRequest webRequest) {
        User user = new User();
        user.setId(Integer.parseInt(Objects.requireNonNull(webRequest.getParameter("id"))));
        service.delete(user);
        return "redirect:/admin";
    }

    @RequestMapping(value = "/admin/updateuser", method = RequestMethod.POST)
    public String getUpdateUser(WebRequest webRequest) {
        User user = new User();
        user.setId(Integer.parseInt(Objects.requireNonNull(webRequest.getParameter("id"))));
        user.setName(webRequest.getParameter("name"));
        user.setTelephone(webRequest.getParameter("telephone"));
        user.setRole(crudSupporting.createRole(webRequest));
        user.setPassword(webRequest.getParameter("password"));
        service.saveAndFlush(user);
        return "redirect:/admin";
    }

    @GetMapping(value = "login")
    public String loginPage() {
        return "login";
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public String userPage(ModelMap modelMap) {
        User user;
        user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        modelMap.addAttribute("userSolo", user);
        return "user";
    }




}
