package com.tmp.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "DETALLE_REMITO")
public class DetalleRemito implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "remito")
    private long remito;

    @Column(name = "producto")
    private Long producto;

    @Column(name = "cantidad")
    private Long cantidad;

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public long getRemito() {
        return remito;
    }

    public void setRemito(long remito) {
        this.remito = remito;
    }

    public Long getProducto() {
        return producto;
    }

    public void setProducto(Long producto) {
        this.producto = producto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

