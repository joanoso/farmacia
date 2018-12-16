package com.tmp.domain;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

public class CustomStudentRepositoryImpl implements CustomStudentRepository {

    @PersistenceContext
    private EntityManager em;

    public Student getStudentsRaro() {

        // Create CriteriaBuilder
        CriteriaBuilder builder = em.getCriteriaBuilder();

        // Create CriteriaQuery
        CriteriaQuery<Student> query = builder.createQuery(Student.class);
        Root<Student> root = query.from(Student.class);
        query.select(root).where(
            builder.and(
                builder.equal(root.get("id"), 1)
            )
        );
        Student employee = em.createQuery(query).getSingleResult();
        return employee;


    }
}
