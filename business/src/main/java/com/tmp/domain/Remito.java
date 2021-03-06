package com.tmp.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "REMITO")
public class Remito implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "estado")
    private Long estado;

    @Column(name = "tipo")
    private Long tipo;

    @Column(name = "sucursal_origen")
    private Integer sucursalOrigen;

    @Column(name = "sucursal_destino")
    private Integer sucursalDestino;

    @OneToMany(
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<DetalleRemito> detallesRemito = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEstado() {
        return estado;
    }

    public void setEstado(Long estado) {
        this.estado = estado;
    }

    public List<DetalleRemito> getDetallesRemito() {
        return detallesRemito;
    }

    public void setDetallesRemito(List<DetalleRemito> detallesRemito) {
        this.detallesRemito = detallesRemito;
    }

    public Long getTipo() {
        return tipo;
    }

    public void setTipo(Long tipo) {
        this.tipo = tipo;
    }

    public Integer getSucursalDestino() {
        return sucursalDestino;
    }

    public void setSucursalDestino(Integer sucursalDestino) {
        this.sucursalDestino = sucursalDestino;
    }

    public Integer getSucursalOrigen() {
        return sucursalOrigen;
    }

    public void setSucursalOrigen(Integer sucursalOrigen) {
        this.sucursalOrigen = sucursalOrigen;
    }
}
