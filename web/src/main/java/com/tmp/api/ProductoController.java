package com.tmp.api;

import com.tmp.domain.Producto;
import com.tmp.domain.ProductoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
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

    @RequestMapping(value = "/{campo}/{valor}", method = RequestMethod.GET, produces = {"application/json"})
    public List<Producto> getProductosFiltered(@PathVariable String campo,
                                               @PathVariable String valor) {

        switch (campo) {
            case "descripcion":
                return productoDao.findByDescripcionLike(valor.toUpperCase());

            case "marca":
                return productoDao.findByMarcaLike(valor.toUpperCase());

            case "monodroga":
                return productoDao.findByMonodrogaLike(valor.toUpperCase());

            default:
                return (List<Producto>) productoDao.findAll();

        }

    }

}
