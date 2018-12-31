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

public class CustomRemitoRepositoryImpl implements CustomRemitoRepository {

    @PersistenceContext
    private EntityManager em;

    public List<Remito> getRemitosCustom(Map<String, Object> params) {

        // Create CriteriaBuilder
        CriteriaBuilder cb = em.getCriteriaBuilder();

        // Create CriteriaQuery
        CriteriaQuery<Remito> query = cb.createQuery(Remito.class);
        Root<Remito> root = query.from(Remito.class);

        List<Predicate> predicates = new ArrayList<Predicate>();

        if (!StringUtils.isEmpty(params.get("fecha"))) {
            predicates.add(cb.equal(root.get("fecha"), params.get("fecha")));
        }

        if (!StringUtils.isEmpty(params.get("tipo"))) {
            predicates.add(cb.equal(root.get("tipo"), params.get("tipo")));
        }

        if (!StringUtils.isEmpty(params.get("estado"))) {
            predicates.add(cb.equal(root.get("estado"), params.get("estado")));
        }

        if (!StringUtils.isEmpty(params.get("sucursalDestino"))) {
            predicates.add(cb.equal(root.get("sucursalDestino"), params.get("sucursalDestino")));
        }

        Predicate filter = cb.and(predicates.toArray(new Predicate[]{}));

        query.select(root).where(filter);


        List<Remito> remitos = em.createQuery(query).getResultList();
        return remitos;

    }

}
