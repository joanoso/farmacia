package com.tmp.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ProductoDao extends CrudRepository<Producto, Long> {

    @Query("SELECT D FROM Producto D WHERE UPPER(D.descripcion) LIKE  %:descripcion%")
    List<Producto> findByDescripcionLike(@Param("descripcion") String descripcion);

    @Query("SELECT D FROM Producto D WHERE UPPER(D.marca) LIKE  %:marca%")
    List<Producto> findByMarcaLike(@Param("marca") String marca);

    @Query("SELECT D FROM Producto D WHERE UPPER(D.monodroga) LIKE  %:monodroga%")
    List<Producto> findByMonodrogaLike(@Param("monodroga") String monodroga);

}