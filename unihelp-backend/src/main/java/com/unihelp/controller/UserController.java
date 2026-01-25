package com.unihelp.controller;

import com.unihelp.dto.PasswordUpdateDto;
import com.unihelp.model.HelpRequest;
import com.unihelp.model.User;
import com.unihelp.service.UserService;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    
    @GetMapping("/me")
    public User getCurrentUser(Principal principal) {
        return userService.findByEmail(principal.getName());
    }

    
    @PutMapping("/me")
    public User updateUser(@RequestBody User updatedUser, Principal principal) {
        return userService.updateUser(principal.getName(), updatedUser);
    }

    
    @PutMapping("/me/password")
    public ResponseEntity<String> updatePassword(
            @RequestBody PasswordUpdateDto dto,
            Principal principal) {

        userService.updatePassword(
                principal.getName(),
                dto.getOldPassword(),
                dto.getNewPassword()
        );

        return ResponseEntity.ok("Mot de passe mis à jour avec succès");
    }

    
    @GetMapping("/me/requests")
    public List<HelpRequest> getMyRequests(Principal principal) {
        return userService.getUserRequests(principal.getName());
    }
}
