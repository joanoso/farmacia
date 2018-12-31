package com.tmp.domain;

import java.util.List;
import java.util.Map;

public interface CustomRemitoRepository {

    List<Remito> getRemitosCustom(Map<String, Object> params);

}
