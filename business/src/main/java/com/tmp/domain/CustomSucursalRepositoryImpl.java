package com.tmp.domain;

import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CustomSucursalRepositoryImpl implements CustomSucursalRepository {

    @PersistenceContext
    private EntityManager em;

    public List<Sucursal> getSucursalesCustom(Map<String, Object> params) {

        // Create CriteriaBuilder
        CriteriaBuilder cb = em.getCriteriaBuilder();

        // Create CriteriaQuery
        CriteriaQuery<Sucursal> query = cb.createQuery(Sucursal.class);
        Root<Sucursal> root = query.from(Sucursal.class);

        List<Predicate> predicates = new ArrayList<Predicate>();

        if (!StringUtils.isEmpty(params.get("numero"))) {
            predicates.add(cb.equal(root.get("numero"), 5));
        }

        if (!StringUtils.isEmpty(params.get("localidad"))) {
            predicates.add(cb.like(cb.lower(root.get("localidad")), params.get("localidad").toString().toLowerCase()));
        }

        if (!StringUtils.isEmpty(params.get("nombre"))) {
            predicates.add(cb.like(cb.lower(root.get("nombre")), "%" + params.get("nombre").toString().toLowerCase() + "%"));
        }

        Predicate filter = cb.and(predicates.toArray(new Predicate[]{}));

        query.select(root).where(filter);


        List<Sucursal> employee = em.createQuery(query).getResultList();
        return employee;

    }

}
