package com.example.btl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.example.btl.entity.User;
import org.springframework.stereotype.Repository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    public User findUserByUsernameAndPassword(String username, String password);

    public User findUserByUsername(String username);

    public User findUserByEmail(String email);
}
