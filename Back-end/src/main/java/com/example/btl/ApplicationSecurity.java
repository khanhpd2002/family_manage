package com.example.btl;

import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.example.btl.repository.UserRepository;
import  com.example.btl.jwt.JwtTokenFilter;
 
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;

//@Configuration
// @Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
	prePostEnabled = true, securedEnabled = true, jsr250Enabled = true
)
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {
	
	@Autowired private UserRepository userRepo;	
	@Autowired private JwtTokenFilter jwtTokenFilter;
	
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(username -> userRepo
            .findUserByUsername(username)
            .orElseThrow(
                () -> new UsernameNotFoundException(
                    "User " + username + " not found"
                )
            ));
    }
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests()
                .antMatchers("/user/**").permitAll()
                // .antMatchers("/family-register/**").hasRole("user")
                .anyRequest().authenticated();

        http.exceptionHandling()
                .authenticationEntryPoint(
                        (request, response, ex) -> {
                            response.sendError(
                                    HttpServletResponse.SC_UNAUTHORIZED,
                                    ex.getMessage()
                            );
                        }
                );

        http.addFilterBefore(
            jwtTokenFilter, 
            UsernamePasswordAuthenticationFilter.class
        );
//		SecurityFilterChain result = http.build();
        // return http.build();
    }	
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
	// @Bean
	// public AuthenticationManager authenticationManager(
	// 		AuthenticationConfiguration authConfig) throws Exception {
	// 	return authConfig.getAuthenticationManager();
	// }
    @Override 
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    // @Bean
    // GrantedAuthorityDefaults grantedAuthorityDefaults() {
    //     return new GrantedAuthorityDefaults(""); // Remove the ROLE_ prefix
    // }

	// @Autowired
    // private CustomAuthenticationProvider authProvider;
	// @Bean
    // AuthenticationManager authManager(HttpSecurity http) throws Exception {
    //     AuthenticationManagerBuilder authenticationManagerBuilder = 
    //         http.getSharedObject(AuthenticationManagerBuilder.class);
    //     authenticationManagerBuilder.authenticationProvider(authProvider);
    //     return authenticationManagerBuilder.build();
    // }
}