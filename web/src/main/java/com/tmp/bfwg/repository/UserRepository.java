package com.tmp.bfwg.repository;

import com.tmp.bfwg.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String username);
}

