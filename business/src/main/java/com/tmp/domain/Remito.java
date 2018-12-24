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
    private long id;

    @Column(name = "estado")
    private Long estado;

    @Column(name = "tipo")
    private Long tipo;

    @Column(name = "sucursal_destino")
    private Long sucursalDestino;

    @OneToMany(
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<DetalleRemito> detallesRemito = new ArrayList<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public Long getSucursalDestino() {
        return sucursalDestino;
    }

    public void setSucursalDestino(Long sucursalDestino) {
        this.sucursalDestino = sucursalDestino;
    }
}
