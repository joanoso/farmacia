package com.tmp.service.report.content.content;

import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLStreamHandler;


public class Handler extends URLStreamHandler {
    @Override
    public URLConnection openConnection(URL url) throws IOException {
        return new ContentURLConnection(url);
    }
}