package com.tmp.api;

import com.tmp.domain.Sucursal;
import com.tmp.domain.SucursalDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/sucursales")
public class SucursalController {

    @Autowired
    SucursalDao sucursalDao;

    @RequestMapping(method = RequestMethod.GET, produces = {"application/json"})
    public List<Sucursal> getAllSucursales() {

        return (List<Sucursal>) sucursalDao.findAll();
    }

    @RequestMapping(value = "/filtered", method = RequestMethod.POST, produces = {"application/json"})
    public List<Sucursal> getSucursales(@RequestBody Map<String, Object> params) {
        return sucursalDao.getSucursalesCustom(params);
    }

}
