package com.tmp.api;

import com.tmp.domain.Producto;
import com.tmp.domain.ProductoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/productos")
public class ProductoController {

    @Autowired
    ProductoDao productoDao;

    @RequestMapping(method = RequestMethod.GET, produces = {"application/json"})
    public List<Producto> getAllProductos() {

        return (List<Producto>) productoDao.findAll();
    }

//    @RequestMapping(value = "/agregarRemito", method = RequestMethod.POST, produces = {"application/json"})
//    public List<Remito> agregarRemito(@RequestBody Map<String, Object> params) {
//
//
//
//        return (List<Remito>) remitoDao.findAll();
//    }

//    @RequestMapping(value = "/filtered", method = RequestMethod.POST, produces = {"application/json"})
//    public List<Remito> getRemitos(@RequestBody Map<String, Object> params) {
//      //  return remitoDao.getSucursalesCustom(params);
//    }

}
