package com.tmp.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.AbstractEnvironment;
import org.springframework.core.env.EnumerablePropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping(value = "/api/system")
public class SystemController {

    @Value("${app.version}")
    private String version;

    @Autowired
    Environment env;

    private String defaultDateFormatPattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";

    @RequestMapping(method = RequestMethod.GET, produces = {"application/json"})
    public Map<String, Object> get() throws UnknownHostException {

        Properties props = new Properties();
        MutablePropertySources propSrcs = ((AbstractEnvironment) env).getPropertySources();
        StreamSupport.stream(propSrcs.spliterator(), false)
            .filter(ps -> ps instanceof EnumerablePropertySource && ps.getName().contains("application.properties"))
            .map(ps -> ((EnumerablePropertySource) ps).getPropertyNames())
            .flatMap(Arrays::<String>stream)
            .forEach(propName -> props.setProperty(propName, env.getProperty(propName)));

        Map<String, Object> system = new HashMap();
        String serverTime = new SimpleDateFormat(this.defaultDateFormatPattern).format(new Date());
        InetAddress localMachine = InetAddress.getLocalHost();
        String IP = localMachine.getHostAddress();
        system.put("version", version);
        system.put("serverTime", serverTime);
        system.put("serverIP", IP);
        system.put("properties", props);
        return system;
    }

}

