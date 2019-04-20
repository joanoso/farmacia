package com.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class TokenInvalidException extends Exception {
    public TokenInvalidException() {
    }

    public TokenInvalidException(String msg ) {
        super(msg);
    }
}
