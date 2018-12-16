package com.tmp.service.report.content.content;

import org.apache.fop.apps.FOUserAgent;
import org.apache.fop.apps.FopFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;
import java.io.InputStream;


public class ContentFopAgent extends FOUserAgent {
	
	static Logger log = LoggerFactory.getLogger(ContentFopAgent.class); 

	public ContentFopAgent(FopFactory factory) {
		super(factory);
	}

	public Source resolveURI(String uri) {
		if (ContentURIResolverHelper.isContentURI(uri)) {
			try {
				InputStream is = ContentURIResolverHelper.getContentInputStream(uri);
				if (is == null) log.error("No existe el recurso: " + uri);
				return new StreamSource(is);
			} catch (Throwable th) {
				log.error("Error buscando el recurso: " + uri);
				return null;
			}
		} else {
			return super.resolveURI(uri, getBaseURL());
		}
	}
}

