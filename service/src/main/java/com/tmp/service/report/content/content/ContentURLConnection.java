package com.tmp.service.report.content.content;

import org.apache.commons.lang.StringUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;

/**
 * Connexión que dependiendo de una parte de su url sabe donde buscar el recurso. Este recurso puede estar almacenado en:
 * <ul>
 * <li>base de datos (db)</li>
 * <li>jar o classpath (class)</li>
 * <li>archivo del sistema (file)</li>
 * </ul>
 *
 * @author mlceliz
 */
class ContentURLConnection extends java.net.URLConnection {

    private static final String FILE_LOCATION = "file";

    private static final String CLASS_LOCATION = "class";

    private static final String BARCODE = "barcode";

    private static final String QR = "qr";

    private static final String URL_PATTERN = "content:(class|file|barcode|qr):.*";

    /**
     * Cadena de conexion.
     */
    URL contentURL;

    /**
     * Tipo de almacenamiento.
     */
    String location;

    /**
     * Nombre del recurso o path al mismo
     */
    String name;

    /**
     * Content type del recurso, si este no puede ser inferido se devuelve la extension del nombre.
     */
    String contentType;

    ContentURLConnection(URL url) {
        super(url);
        if (!url.toString().matches(URL_PATTERN)) {
            throw new RuntimeException("URL Content (" + url + ") not supported.");
        }
        contentURL = url;
        location = StringUtils.substringBefore(url.getPath(), ":");
        name = StringUtils.substringAfterLast(url.getPath(), ":");
        contentType = StringUtils.substringAfterLast(url.getPath(), ".");
        if (BARCODE.equals(location) || QR.equals(location)) {
            contentType = "png";
        }
    }

    @Override
    public String getContentType() {
        return contentType;
    }

    @Override
    public void connect() throws java.io.IOException {
        if (connected) {
            return;
        }
    }

    @Override
    public InputStream getInputStream() throws java.io.IOException {
        InputStream result = null;
        if (CLASS_LOCATION.equals(location)) {
            URL namePath = getClassResource(name);
            result = new FileInputStream(new File(namePath.getPath()));
        } else if (FILE_LOCATION.equals(location)) {
            result = new FileInputStream(new File(name));
        } else if (BARCODE.equals(location)) {
            result = BarcodeGenerator.generate(name);
        } else if (QR.equals(location)) {
            result = QRGenerator.generate(name);
        }
        return result;
    }

    public URL getClassResource(String name) {
        if (name.startsWith("/")) {
            name = name.substring(1);
        }
        URL result = Thread.currentThread().getContextClassLoader().getResource(name);
        return result;
    }
}
