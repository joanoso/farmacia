package com.tmp.service.report.content.content;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class BarcodeGenerator {


    public static InputStream generate(String msg) throws IOException {
        return generate(msg, 200);
    }

    public static InputStream generate(String msg, int size) throws IOException {
        String fileType = "png";

        MultiFormatWriter writer = new MultiFormatWriter();

        BitMatrix byteMatrix = null;
        try {
            byteMatrix = writer.encode(msg, BarcodeFormat.CODE_128, size, size);
        } catch (WriterException e) {
            throw new IOException("Error generando BarCode", e);
        }
        int width = byteMatrix.getWidth();
        int height = 40;
        BufferedImage image = new BufferedImage(width, height + 15, BufferedImage.TYPE_INT_RGB);
        image.createGraphics();

        Graphics2D graphics = (Graphics2D) image.getGraphics();
        graphics.setColor(Color.WHITE);
        graphics.fillRect(0, 0, width, width);
        graphics.setColor(Color.BLACK);

        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                if (byteMatrix.get(i, j)) {
                    graphics.fillRect(i, j, 1, 1);
                }
            }
        }

        Font font = new Font("Times", Font.PLAIN, 10);
        graphics.setFont(font);
        FontMetrics fm = graphics.getFontMetrics();
        int textWidth = fm.stringWidth(msg);
        int textHeight = fm.getHeight();
        graphics.drawString(msg, Math.round(Math.floor((width - textWidth) / 2)) - 2, height + 12);

        graphics.dispose();
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            ImageIO.write(image, fileType, out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}
