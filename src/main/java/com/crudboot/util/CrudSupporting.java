package com.crudboot.util;

import com.crudboot.model.Role;
import com.crudboot.repository.RoleRepository;
import com.crudboot.repository.UserRepository;
import com.crudboot.service.RoleServiceImp;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.WebRequest;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Service
public class CrudSupporting {

    private final RoleServiceImp roleServiceImp;

    public CrudSupporting(RoleServiceImp roleServiceImp) {
        this.roleServiceImp = roleServiceImp;
    }

    public Set<Role> createRole(WebRequest webRequest) {
        Set<Role> roleList = new HashSet<>();
        for(int a = 0; a < Objects.requireNonNull(webRequest.getParameterValues("roles")).length; a++ ) {
            roleList.add(roleServiceImp.findRoleByName(Objects
                    .requireNonNull(webRequest.getParameterValues("roles"))[a]));
        }
        return roleList;
    }

    public Set<Role> createRoleForms(WebRequest webRequest) {
        Set<Role> roleList = new HashSet<>();
        if(webRequest.getParameter("roles").equals("Admin")) {
            roleList.add(roleServiceImp.findRoleByName("Admin"));
        }
        else if(webRequest.getParameter("roles").equals("User")) {
            roleList.add(roleServiceImp.findRoleByName("User"));
        }
        else {
            roleList.add(roleServiceImp.findRoleByName("User"));
            roleList.add(roleServiceImp.findRoleByName("Admin"));
        }
        return roleList;
    }

}
