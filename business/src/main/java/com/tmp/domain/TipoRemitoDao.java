package com.tmp.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface TipoRemitoDao extends CrudRepository<TipoRemito, Long> {


}