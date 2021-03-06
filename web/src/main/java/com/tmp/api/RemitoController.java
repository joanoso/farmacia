package com.tmp.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tmp.auth.model.Usuario;
import com.tmp.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/remito")
public class RemitoController {

    @Autowired
    RemitoDao remitoDao;

    @Autowired
    DetalleRemitoDao detalleRemitoDao;

    @Autowired
    ProductoDao productoDao;

    @RequestMapping(method = RequestMethod.GET, produces = {"application/json"})
    public List<Remito> getAllRemitos() {
        return (List<Remito>) remitoDao.findAll();
    }

    @RequestMapping(value = "/filtered", method = RequestMethod.POST, produces = {"application/json"})
    public List<Remito> getRemitosFiltered(@RequestBody Map<String, Object> params) {
        return remitoDao.getRemitosCustom(params);
    }

    @RequestMapping(value = "/agregarRemito", method = RequestMethod.POST, produces = {"application/json"})
    public Long agregarRemito(@RequestBody Map<String, Object> params) {

        ObjectMapper mapper = new ObjectMapper();
        final Remito remito = mapper.convertValue(params.get("remito"), Remito.class);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario user = (Usuario) auth.getPrincipal();

        remito.setSucursalOrigen(user.getIdSucursal());
        remito.getDetallesRemito().clear();
        List<Map<String, Object>> productos = (List<Map<String, Object>>) params.get("productos");
        productos.stream().forEach(prod -> {
            DetalleRemito detalleRemito = new DetalleRemito();
            detalleRemito.setCantidad(Long.valueOf(prod.get("cantidad").toString()));

            Producto producto = productoDao.findById(Long.valueOf(prod.get("id").toString())).get();

            detalleRemito.setProducto(producto);
            remito.getDetallesRemito().add(detalleRemito);
        });

        Remito remitoSaved = remitoDao.save(remito);
        return remitoSaved.getId();
    }


    @RequestMapping(value = "/eliminarRemito", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseStatus(value = HttpStatus.OK)
    public void eliminarRemito(@RequestBody Map<String, Object> params) {

        Remito rm = remitoDao.findById(Long.valueOf(params.get("id").toString())).get();
        if (rm.getEstado() != 1 && rm.getEstado() != 2) {
            throw new RuntimeException("El Remito debe poseer estado Borrador o Pendiente para ser eliminado.");
        }

        remitoDao.delete(rm);
    }

}
