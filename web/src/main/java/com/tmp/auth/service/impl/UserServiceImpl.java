package com.tmp.auth.service.impl;

import com.tmp.auth.model.Usuario;
import com.tmp.auth.repository.UserRepository;
import com.tmp.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public Usuario findByUsername(String username ) throws UsernameNotFoundException {
        Usuario u = userRepository.findByUsername( username );
        return u;
    }

    public Usuario findById(Long id ) throws AccessDeniedException {
        Usuario u = userRepository.findById( id ).orElse(null);
        return u;
    }

    public List<Usuario> findAll() throws AccessDeniedException {
        List<Usuario> result = userRepository.findAll();
        return result;
    }
}
