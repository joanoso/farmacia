package com.tmp.domain;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;

public abstract class HibernateDaoImpl<T> {

    Logger log = LoggerFactory.getLogger(HibernateDaoImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    private Class<T> poClass;

    private String dataSourceId;

    public HibernateDaoImpl(Class<T> type) {
        this.poClass = type;
        //  this.dataSourceId = Transactional.DEFAULT;
    }


    public HibernateDaoImpl(Class<T> type, String dataSourceId) {
        this.poClass = type;
        //  this.dataSourceId = dataSourceId;
    }


//    protected List<T> findAllByQuery(PersistenceQuery query) throws PersistenceException {
//        List<T> result = (List<T>) query.executeQuery();
//        return result;
//    }

//    protected T findByQuery(PersistenceQuery query) throws PersistenceException {
//        List<T> result = (List<T>) query.executeQuery();
//        return result.isEmpty() ? null : result.get(0);
//    }

    @Transactional
    public List<T> findAll() throws PersistenceException {
        List<T> result = null;
        String queryStr = "SELECT o from o in class " + this.getPersistenceObjectClassName();
        Query query = entityManager.createQuery(queryStr);
        result = (List<T>) query.getResultList();
        return result;
    }

//    @Transactional
//    public T findById(long id) throws PersistenceException {
//        T result = null;
//
//        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
//        CriteriaQuery<T> criteria = builder.createCr
//
//
//        Criteria crit = getSession().createCriteria(F762ObligacionNegociable.class);
//
//        String queryStr = "SELECT o from o in class " + this.getPersistenceObjectClassName();
//        Query query = entityManager.createQuery(queryStr);
//
//        entityManager.getTransaction().
//
//        result = (T) query.getSingleResult();
//        return result;
//    }


    protected Class<T> getPersistenceObjectClass() {
        return poClass;
    }

    protected String getPersistenceObjectClassName() {
        return poClass.getName();
    }

//    protected PersistenceTransaction getTransaction() throws PersistenceException {
//        return this.txnContext.get(dataSourceId);
//    }

//    protected Session getSession() throws PersistenceException {
//        return ((HibernateTransactionImpl) this.getTransaction()).getSession();
//    }

    // CRUD
    @Transactional
    public T create(T o) throws PersistenceException {
        try {
            logDebug(o, "create");
            entityManager.persist(o);
            return o;
        } catch (HibernateException e) {
            throw new PersistenceException("Error al crear el objeto " + this.getPersistenceObjectClassName(), e);
        }
    }

    @Transactional
    public T delete(T o) throws PersistenceException {
        try {
            logDebug(o, "delete");
            entityManager.remove(o);
            return o;
        } catch (HibernateException e) {
            throw new PersistenceException("Error al borrar el objeto " + this.getPersistenceObjectClassName(), e);
        }
    }

    @Transactional
    public T update(T o) throws PersistenceException {
        try {
            logDebug(o, "update");
            entityManager.merge(o);
            return o;
        } catch (HibernateException e) {
            throw new PersistenceException("Error al actualizar el objeto " + this.getPersistenceObjectClassName(), e);
        }
    }

    private void logDebug(T o, String mess) {
        if (log.isDebugEnabled()) {
            try {
                log.debug("DAO." + mess + "(" + this.getPersistenceObjectClassName() + ") values(" + o + ")");
            } catch (Exception e) {
                log.debug("Error logueando la operacion " + mess);
            }
        }
    }

//    @Override
//    public void lock(T o, String lockMode) throws PersistenceException {
//        try {
//            log.debug("DAO.lock(" + this.getPersistenceObjectClassName() + ") lockMode: " + lockMode);
//            this.getSession().buildLockRequest(new LockOptions(this.getLockMode(lockMode))).lock(o);
//        } catch (HibernateException e) {
//            throw new PersistenceException("Error al lockear el objeto " + this.getPersistenceObjectClassName(), e);
//        }
//    }
//
//    protected LockMode getLockMode(String lockMode) {
//        return _lockModes.get(lockMode);
//    }

    public String getDataSourceId() {
        return dataSourceId;
    }
}