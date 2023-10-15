package com.digiup.ecommerce.ecommerce.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digiup.ecommerce.ecommerce.Entity.Product;
import com.digiup.ecommerce.ecommerce.Entity.User;
import com.digiup.ecommerce.ecommerce.Exception.ResourceNotFoundException;
import com.digiup.ecommerce.ecommerce.Repository.UserRepository;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8081", "exp://192.168.11.102:8081" })
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userrepository;

    @GetMapping("/user")
    public List<User> getAllUsers() {
        return userrepository.findAll();
    }

    @PostMapping("/user")
    public User createEmployee(@RequestBody User user) {
        return userrepository.save(user);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userrepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResourceNotFoundException("User not found with username: " + username);
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateEmployee(@PathVariable Long id, @RequestBody User UserDetails) {
        User user = userrepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

        user.setEmail(UserDetails.getEmail());
        user.setUsername(UserDetails.getUsername());
        user.setNum(UserDetails.getNum());
        user.setPassword(UserDetails.getPassword());
        user.setIsadmin(UserDetails.getIsadmin());

        User updatedUser = userrepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id) {
        User user = userrepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

        userrepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        User user = userRepository.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Authentication successful");
            response.put("username", username);
            response.put("isadmin", user.getIsadmin());
            response.put("id", user.getId());

            return ResponseEntity.ok(response);
        } else {

            Map<String, Object> response = new HashMap<>();
            response.put("error", "Invalid username or password");
            return ResponseEntity.status(401).body(response);
        }
    }

}
