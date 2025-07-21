package com.utej.googlekeepclone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.utej.googlekeepclone.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
}
