package com.crudboot.config.handler;

import com.crudboot.model.Role;
import com.crudboot.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                                        HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException, ServletException {


        boolean isAdmin = false;
        boolean isUser = false;

        User user = (User) authentication.getPrincipal();
        for (Role role: user.getRole()) {
            if(role.getRole().equals("Admin")) {
                isAdmin = true;
            }
            else {
                isUser = true;
            }
        }

        if(isAdmin){
            httpServletResponse.sendRedirect("/admin");
        }
        else if(isUser){
            httpServletResponse.sendRedirect("/user");
        }
        else {
            httpServletResponse.sendRedirect("/login");
        }


    }
}