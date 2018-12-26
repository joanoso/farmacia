package com.tmp.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tmp.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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

    @RequestMapping(value = "/agregarRemito", method = RequestMethod.POST, produces = {"application/json"})
    public Long agregarRemito(@RequestBody Map<String, Object> params) {

        ObjectMapper mapper = new ObjectMapper();
        final Remito remito = mapper.convertValue(params.get("remito"), Remito.class);

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

//    @RequestMapping(value = "/filtered", method = RequestMethod.POST, produces = {"application/json"})
//    public List<Remito> getRemitos(@RequestBody Map<String, Object> params) {
//      //  return remitoDao.getSucursalesCustom(params);
//    }

}
