package com.tmp.bfwg.service;


import com.tmp.bfwg.model.Usuario;

import java.util.List;

/**
 * Created by fan.jin on 2016-10-15.
 */
public interface UserService {
    Usuario findById(Long id);
    Usuario findByUsername(String username);
    List<Usuario> findAll();
}
