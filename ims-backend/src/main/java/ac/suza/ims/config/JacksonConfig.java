package ac.suza.ims.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.util.TimeZone;

/**
 * Jackson ObjectMapper configuration.
 * – Serialises LocalDate / LocalDateTime as ISO-8601 strings (not timestamps).
 * – Uses the East Africa Time (EAT) timezone for all date operations.
 */
@Configuration
public class JacksonConfig {

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();

        // Register Java 8+ date/time module
        mapper.registerModule(new JavaTimeModule());

        // Write dates as ISO-8601 strings, not numeric timestamps
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        // East Africa Time (UTC+3) – Dar es Salaam / Zanzibar
        mapper.setTimeZone(TimeZone.getTimeZone("Africa/Dar_es_Salaam"));

        return mapper;
    }
}
