package com.tmp.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "REMITO")
public class Remito implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "estado_id")
    private Long estadoId;

    @Column(name = "sucursal_destino_id")
    private Long sucursalDestinoId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Long getEstadoId() {
        return estadoId;
    }

    public void setEstadoId(Long estadoId) {
        this.estadoId = estadoId;
    }

    public Long getSucursalDestinoId() {
        return sucursalDestinoId;
    }

    public void setSucursalDestinoId(Long sucursalDestinoId) {
        this.sucursalDestinoId = sucursalDestinoId;
    }
}
