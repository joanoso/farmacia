package com.tmp.auth.model;

public class UserTokenState {
    private String access_token;
    private Long expires_in;
    private Usuario user;

    public UserTokenState() {
        this.access_token = null;
        this.expires_in = null;
        this.user = null;
    }

    public UserTokenState(String access_token, long expires_in, Usuario user) {
        this.access_token = access_token;
        this.expires_in = expires_in;
        this.user = user;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public Long getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(Long expires_in) {
        this.expires_in = expires_in;
    }

    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }
}