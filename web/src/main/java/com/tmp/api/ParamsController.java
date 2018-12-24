package com.tmp.api;

import com.tmp.domain.EstadoRemito;
import com.tmp.domain.EstadoRemitoDao;
import com.tmp.domain.TipoRemito;
import com.tmp.domain.TipoRemitoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/params")
public class ParamsController {

    @Autowired
    EstadoRemitoDao estadoRemitoDao;

    @Autowired
    TipoRemitoDao tipoRemitoDao;

    @RequestMapping(value = "/estadosRemito", method = RequestMethod.GET, produces = {"application/json"})
    public List<EstadoRemito> getEstadosRemito() {
        return (List<EstadoRemito>) estadoRemitoDao.findAll();
    }

    @RequestMapping(value = "/tiposRemito", method = RequestMethod.GET, produces = {"application/json"})
    public List<TipoRemito> getTiposRemito() {
        return (List<TipoRemito>) tipoRemitoDao.findAll();
    }

}
