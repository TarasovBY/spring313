package com.crudboot.controller;

import com.crudboot.model.User;
import com.crudboot.repository.UserRepository;
import com.crudboot.service.UserServiceImp;
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

    @GetMapping("/")
    public String getHome(){
        return "redirect:/login";
    }

    @GetMapping(value = "/admin")
    public String getPageAdmin() {

        return "pageadmin";
    }


    @GetMapping(value = "login")
    public String loginPage() {
        return "login";
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public String userPage() {

        return "user";
    }




}
