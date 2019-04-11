package com.tmp.auth.repository;

import com.tmp.auth.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String username);
}

