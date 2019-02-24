package com.tmp.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.service.exception.BusinessRuntimeException;
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

    @RequestMapping(value = "/agregarSucursal", method = RequestMethod.POST, produces = {"application/json"})
    public Long agregarRemito(@RequestBody Map<String, Object> params) throws BusinessRuntimeException {

        ObjectMapper mapper = new ObjectMapper();
        final Sucursal sucursal = mapper.convertValue(params.get("sucursal"), Sucursal.class);

        if(sucursalDao.findByNumero(sucursal.getNumero()).size() != 0){
            throw new BusinessRuntimeException("No puede ingresar el mismo número que otra sucursal");
        }

        Sucursal sucursalSaved = sucursalDao.save(sucursal);
        return sucursalSaved.getId();
    }

    @RequestMapping(value = "/filtered", method = RequestMethod.POST, produces = {"application/json"})
    public List<Sucursal> getSucursales(@RequestBody Map<String, Object> params) throws BusinessRuntimeException {

        //throw new BusinessRuntimeException("PROBANDO");
        return sucursalDao.getSucursalesCustom(params);
    }

}
