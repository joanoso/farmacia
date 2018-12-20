package com.tmp.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ProductoDao extends CrudRepository<Producto, Long>{


}