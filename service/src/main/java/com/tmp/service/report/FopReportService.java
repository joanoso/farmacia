package com.tmp.service.report;

import com.tmp.service.report.content.content.ContentFopAgent;
import org.apache.fop.apps.Fop;
import org.apache.fop.apps.FopFactory;
import org.xml.sax.SAXException;

import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.stream.StreamSource;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class FopReportService {
    
    FopFactory fopFactory;
    
    TransformerFactory tFactory;
    
    public FopReportService() throws SAXException, IOException {
        fopFactory = FopFactory.newInstance();
        tFactory = TransformerFactory.newInstance();
    }
    

    public void emitReport(OutputStream out, InputStream xsl, InputStream xmlDataSouce) {
        try {
            Fop fop = fopFactory.newFop(org.apache.xmlgraphics.util.MimeConstants.MIME_PDF,new ContentFopAgent(fopFactory), out);
            Source xsltSrc = new StreamSource(xsl);
            Transformer transformer = tFactory.newTransformer(xsltSrc);
            Result res = new SAXResult(fop.getDefaultHandler());
            Source src = new StreamSource(xmlDataSouce);
            transformer.transform(src, res);
            
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }
    
    public void emitReport(OutputStream out, InputStream fo) {
        try {
            Fop fop = fopFactory.newFop(org.apache.xmlgraphics.util.MimeConstants.MIME_PDF,new ContentFopAgent(fopFactory), out);
            Transformer transformer = tFactory.newTransformer();
            Source src = new StreamSource(fo);
            Result res = new SAXResult(fop.getDefaultHandler());
            transformer.transform(src, res);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }
    
    public void emitReport(OutputStream out, String fo) {
        emitReport(out, new ByteArrayInputStream(fo.getBytes()));
    }    
}
