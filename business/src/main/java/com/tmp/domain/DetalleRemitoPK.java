package com.tmp.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class DetalleRemitoPK implements Serializable {

    @Column(name = "remito")
    private long remito;

    @Column(name = "producto")
    private Long producto;


    public DetalleRemitoPK() {

    }

    public DetalleRemitoPK(long remito, Long producto) {
        this.remito = remito;
        this.producto = producto;
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
}
