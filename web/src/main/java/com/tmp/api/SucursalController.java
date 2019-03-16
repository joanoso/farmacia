package com.tmp.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.service.exception.BusinessRuntimeException;
import com.tmp.domain.Sucursal;
import com.tmp.domain.SucursalDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

        if (sucursal.getId() == null && sucursalDao.findByNumero(sucursal.getNumero()).size() != 0) {
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

    @RequestMapping(value = "/eliminarSucursal", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseStatus(value = HttpStatus.OK)
    public void eliminarSucursal(@RequestBody Map<String, Object> params) {
        Sucursal rm = sucursalDao.findById(Long.valueOf(params.get("id").toString())).get();
        sucursalDao.delete(rm);
    }


}
