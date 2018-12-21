package com.tmp.api;

import com.tmp.domain.Remito;
import com.tmp.domain.RemitoDao;
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
@RequestMapping(value = "/api/remito")
public class RemitoController {

    @Autowired
    RemitoDao remitoDao;

    @RequestMapping(method = RequestMethod.GET, produces = {"application/json"})
    public List<Remito> getAllRemitos() {

        return (List<Remito>) remitoDao.findAll();
    }

    @RequestMapping(value = "/agregarRemito", method = RequestMethod.POST, produces = {"application/json"})
    public List<Remito> agregarRemito(@RequestBody Map<String, Object> params) {



        return (List<Remito>) remitoDao.findAll();
    }

//    @RequestMapping(value = "/filtered", method = RequestMethod.POST, produces = {"application/json"})
//    public List<Remito> getRemitos(@RequestBody Map<String, Object> params) {
//      //  return remitoDao.getSucursalesCustom(params);
//    }

}
