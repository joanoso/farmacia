package com.tmp.service.report.content.content;

import org.apache.commons.lang.StringUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;


/**
 * Connexión que dependiendo de una parte de su url sabe donde buscar el
 * recurso. Este recurso puede estar almacenado en:
 * <ul>
 * <li>base de datos (db)</li>
 * <li>jar o classpath (class)</li>
 * <li>archivo del sistema (file)</li>
 * </ul>
 *
 * @author mlceliz
 */
public class ContentURIResolverHelper {

    private static final String FILE_LOCATION = "file";

    private static final String CLASS_LOCATION = "class";

    private static final String BARCODE = "barcode";

    private static final String QR = "qr";

    private static final String PROTOCOL = "content:";

    private static final String URL_PATTERN = PROTOCOL + "(class|file|barcode|qr):.*";

    public static boolean isContentURI(String uri) {
        return uri.matches(URL_PATTERN);
    }

    public static InputStream getContentInputStream(String uri) throws java.io.IOException {
        if (!uri.matches(URL_PATTERN)) {
            throw new RuntimeException("URL Content (" + uri + ") not supported.");
        }
        String subUri = StringUtils.substringAfter(uri, PROTOCOL);
        String location = StringUtils.substringBefore(subUri, ":");
        String name = StringUtils.substringAfter(subUri, location+":");

        InputStream result = null;
        if (CLASS_LOCATION.equals(location)) {
            result = Thread.currentThread().getContextClassLoader().getResourceAsStream(name.substring(1));
        } else if (FILE_LOCATION.equals(location)) {
            result = new FileInputStream(new File(name));
        } else if (BARCODE.equals(location)) {
            result = BarcodeGenerator.generate(name);
        } else if (QR.equals(location)) {
            result = QRGenerator.generate(name);
        }
        return result;
    }
}