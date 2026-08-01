package ac.suza.ims.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Structured error response object returned by GlobalExceptionHandler.
 * Provides a detailed, machine-readable description of validation and runtime errors.
 */
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {

    private final int status;
    private final String error;
    private final String message;
    private final String path;

    /** Field-level validation errors: fieldName → list of messages */
    private final Map<String, List<String>> fieldErrors;

    @Builder.Default
    private final LocalDateTime timestamp = LocalDateTime.now();
}
