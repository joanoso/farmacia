package com.tmp.auth.config;

import com.tmp.auth.security.TokenHelper;
import com.tmp.auth.security.auth.RestAuthenticationEntryPoint;
import com.tmp.auth.security.auth.TokenAuthenticationFilter;
import com.tmp.auth.service.impl.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebSecurity
@ComponentScan(value = "com.tmp")
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
//
    @Autowired
    @Lazy
    private CustomUserDetailsService jwtUserDetailsService;

    @Autowired
    @Lazy
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
//
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserDetailsService)
            .passwordEncoder(passwordEncoder());
    }

    @Autowired
    TokenHelper tokenHelper;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        .headers().frameOptions().disable().and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint).and()
            .authorizeRequests()
            .antMatchers("/console/**").permitAll()
            .antMatchers("/auth/login").permitAll()
            .antMatchers("/api/params/**").permitAll()
            .antMatchers("/auth/**").permitAll()
            .antMatchers("/index.html").permitAll()
            .antMatchers("/api/system").permitAll()
            .antMatchers("/api/productos").permitAll()
            .antMatchers("/api/productos/**").permitAll()
            //.antMatchers("/api/sucursales/filtered").access("hasRole('ROLE_ADMIN')")
            .antMatchers("/api/sucursales/filtered").permitAll()
            .antMatchers("/api/sucursales/eliminarSucursal").permitAll()
            .antMatchers("/api/sucursales/**").permitAll()
            .anyRequest().authenticated().and()
            .addFilterBefore(new TokenAuthenticationFilter(tokenHelper, jwtUserDetailsService), BasicAuthenticationFilter.class);

        http.csrf().disable();
    }


    // During development, webpack server runs on localhost:8080
    // Make the browser happy by returning CORS headers in this case
    @Bean
    @Profile("dev")
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**").allowedOrigins("http://localhost:8080");
                registry.addMapping("/auth/**").allowedOrigins("http://localhost:8080",
                    "http://localhost:8090", "http://localhost:9000");
            }
        };
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        // TokenAuthenticationFilter will ignore the below paths
        web.ignoring().antMatchers(
            HttpMethod.POST,
            "/auth/login"
        );
        web.ignoring().antMatchers(
            HttpMethod.GET,
            "/",
            "/index.html",
            "index.html",
            "/webjars/**",
            "/*.html",
            "/favicon.ico",
            "/**/*.html",
            "/**/*.css",
            "/**/*.js",
            "/**/*.jpg",
            "/**/*.jpeg",
            "/**/*.ico",
            "/**/*.gif"
        );

    }
}


