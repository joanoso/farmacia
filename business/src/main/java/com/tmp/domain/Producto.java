package com.tmp.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "PRODUCTO")
public class Producto implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "marca")
    private String marca;

    @Column(name = "monodroga")
    private String monodroga;

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

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getMonodroga() {
        return monodroga;
    }

    public void setMonodroga(String monodroga) {
        this.monodroga = monodroga;
    }
}
