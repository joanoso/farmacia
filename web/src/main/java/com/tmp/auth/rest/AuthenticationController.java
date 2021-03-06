package com.tmp.auth.rest;

import com.service.exception.TokenInvalidException;
import com.tmp.auth.model.UserTokenState;
import com.tmp.auth.model.Usuario;
import com.tmp.auth.security.TokenHelper;
import com.tmp.auth.security.auth.JwtAuthenticationRequest;
import com.tmp.auth.service.UserService;
import com.tmp.auth.service.impl.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/auth", produces = {"application/json"})
public class AuthenticationController {

    @Autowired
    TokenHelper tokenHelper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = {"application/json"})
    public ResponseEntity<?> createAuthenticationToken(
        @RequestBody JwtAuthenticationRequest authenticationRequest,
        HttpServletResponse response
    ) throws AuthenticationException, IOException {

        // Perform the security
        final Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUsername(),
                authenticationRequest.getPassword()
            )
        );

        // Inject into security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // token creation
        Usuario user = (Usuario) authentication.getPrincipal();
        String jws = tokenHelper.generateToken(user.getUsername());
        int expiresIn = tokenHelper.getExpiredIn();
        // Return the token

        return ResponseEntity.ok(new UserTokenState(jws, expiresIn, user));
    }

    @RequestMapping(value = "/meFromToken", method = RequestMethod.POST)
    public ResponseEntity<?> meFromToken(@RequestBody Map<String, String> params) throws TokenInvalidException {

        String token = params.get("token");
        String username = tokenHelper.getUsernameFromToken(token);
        if (username != null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (tokenHelper.validateToken(token, userDetails)) {
                Usuario user = userService.findByUsername(userDetails.getUsername());
                int expiresIn = tokenHelper.getExpiredIn();
                return ResponseEntity.ok(new UserTokenState(token, expiresIn, user));

            }
        }
        throw new TokenInvalidException("El token no es válido");
    }

    @RequestMapping(value = "/refreshToken", method = RequestMethod.POST)
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> params,
                                          Principal principal) throws TokenInvalidException {

        String token = params.get("token");

        String username = tokenHelper.getUsernameFromToken(token);
        if (username != null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (tokenHelper.validateToken(token, userDetails)) {
                // token creation
                String refreshedToken = tokenHelper.refreshToken(token);
                int expiresIn = tokenHelper.getExpiredIn();
                return ResponseEntity.ok(new UserTokenState(refreshedToken, expiresIn, null));
            }
        }
        throw new TokenInvalidException("El token no es válido");
    }


//    @RequestMapping(value = "/refresh", method = RequestMethod.POST)
//    public ResponseEntity<?> refreshAuthenticationToken(
//        HttpServletRequest request,
//        HttpServletResponse response,
//        Principal principal
//    ) {
//
//        String authToken = tokenHelper.getToken(request);
//
//        if (authToken != null && principal != null) {
//
//            // TODO check user password last update
//            String refreshedToken = tokenHelper.refreshToken(authToken);
//            int expiresIn = tokenHelper.getExpiredIn();
//
//            // todo Buscar User aca tmb
//            return ResponseEntity.ok(new UserTokenState(refreshedToken, expiresIn, null));
//        } else {
//            UserTokenState userTokenState = new UserTokenState();
//            return ResponseEntity.accepted().body(userTokenState);
//        }
//    }

//    @RequestMapping(value = "/change-password", method = RequestMethod.POST)
//    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<?> changePassword(@RequestBody PasswordChanger passwordChanger) {
//        userDetailsService.changePassword(passwordChanger.oldPassword, passwordChanger.newPassword);
//        Map<String, String> result = new HashMap<>();
//        result.put("result", "success");
//        return ResponseEntity.accepted().body(result);
//    }
//
//    static class PasswordChanger {
//        public String oldPassword;
//        public String newPassword;
//    }
}