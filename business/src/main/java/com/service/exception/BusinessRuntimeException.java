package com.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class BusinessRuntimeException extends Exception {
    public BusinessRuntimeException() {
    }

    public BusinessRuntimeException(String msg ) {
        super(msg);
    }
}
