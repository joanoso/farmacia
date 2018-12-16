package com.tmp.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface StudentDao extends CrudRepository<Student, Long>, CustomStudentRepository {

    List<Student> findByName(String name);

}