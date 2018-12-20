package com.tmp.domain;

import java.util.List;
import java.util.Map;

public interface CustomSucursalRepository {

    List<Sucursal> getSucursalesCustom(Map<String, Object> params);

}
