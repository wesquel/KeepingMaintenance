package br.com.addson.keepingmaintenance.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Permitir todas as rotas
                        .allowedOrigins(
                            "http://localhost:4200",
                            "http://129.148.40.75"
                        ) // Permitir o front-end
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos HTTP permitidos
                        .allowedHeaders("*") // Cabeçalhos permitidos
                        .allowCredentials(true); // Permitir credenciais (opcional)
            }
        };
    }
}

