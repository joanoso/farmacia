package com.tmp.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "TIPO_REMITO")
public class TipoRemito implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "descripcion")
    private String descripcion;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

}
