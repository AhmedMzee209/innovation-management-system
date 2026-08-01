package ac.suza.ims.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI / Swagger UI configuration for the IMS REST API.
 * Access documentation at: http://localhost:8080/swagger-ui.html
 */
@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME_NAME = "BearerAuth";

    @Bean
    public OpenAPI imsOpenAPI() {
        return new OpenAPI()
                .info(apiInfo())
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development"),
                        new Server().url("https://api.ims.suza.ac.tz").description("Production")
                ))
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME, jwtSecurityScheme()))
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME));
    }

    private Info apiInfo() {
        return new Info()
                .title("Innovation Management System (IMS) API")
                .description("""
                        REST API for the Innovation Management System at the State University of Zanzibar (SUZA).
                        
                        This API supports the complete innovation lifecycle including idea submission,
                        evaluation, mentorship, startup incubation, funding, competitions, and reporting.
                        
                        **Authentication**: Use the /auth/login endpoint to obtain a JWT Bearer token,
                        then click 'Authorize' and enter: Bearer {your_token}
                        """)
                .version("1.0.0")
                .contact(new Contact()
                        .name("SUZA IMS Engineering Team")
                        .email("ims@suza.ac.tz")
                        .url("https://www.suza.ac.tz"))
                .license(new License()
                        .name("Private – State University of Zanzibar")
                        .url("https://www.suza.ac.tz"));
    }

    private SecurityScheme jwtSecurityScheme() {
        return new SecurityScheme()
                .name(SECURITY_SCHEME_NAME)
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .description("Enter your JWT token. Example: Bearer eyJhbGci...");
    }
}
