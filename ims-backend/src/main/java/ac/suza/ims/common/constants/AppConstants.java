package ac.suza.ims.common.constants;

/**
 * System-wide application constants for the Innovation Management System.
 * Use these constants throughout the codebase to avoid magic strings/numbers.
 */
public final class AppConstants {

    private AppConstants() {
        // Prevent instantiation
    }

    // ─── API Versioning ───────────────────────────────────────────────────────
    public static final String API_BASE_PATH   = "/api/v1";
    public static final String AUTH_BASE_PATH  = "/auth";

    // ─── Pagination Defaults ─────────────────────────────────────────────────
    public static final int    DEFAULT_PAGE_NUMBER  = 0;
    public static final int    DEFAULT_PAGE_SIZE     = 20;
    public static final int    MAX_PAGE_SIZE         = 100;
    public static final String DEFAULT_SORT_BY       = "createdAt";
    public static final String DEFAULT_SORT_DIR      = "desc";

    // ─── JWT Token ───────────────────────────────────────────────────────────
    public static final String TOKEN_PREFIX          = "Bearer ";
    public static final String AUTHORIZATION_HEADER  = "Authorization";
    public static final String REFRESH_TOKEN_HEADER  = "X-Refresh-Token";

    // ─── Date / Time ─────────────────────────────────────────────────────────
    public static final String DEFAULT_TIMEZONE      = "Africa/Dar_es_Salaam";
    public static final String DEFAULT_DATE_FORMAT   = "yyyy-MM-dd";
    public static final String DEFAULT_DATETIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

    // ─── File Upload ─────────────────────────────────────────────────────────
    public static final long   MAX_FILE_SIZE_BYTES   = 20 * 1024 * 1024L; // 20 MB
    public static final String UPLOAD_DIR            = "uploads/";

    // ─── Roles ───────────────────────────────────────────────────────────────
    public static final String ROLE_ADMIN            = "ROLE_ADMIN";
    public static final String ROLE_HUB_MANAGER      = "ROLE_HUB_MANAGER";
    public static final String ROLE_INNOVATOR        = "ROLE_INNOVATOR";
    public static final String ROLE_REVIEWER         = "ROLE_REVIEWER";
    public static final String ROLE_MENTOR           = "ROLE_MENTOR";
    public static final String ROLE_STUDENT          = "ROLE_STUDENT";
    public static final String ROLE_STAFF            = "ROLE_STAFF";

    // ─── Validation ──────────────────────────────────────────────────────────
    public static final int    MIN_PASSWORD_LENGTH   = 8;
    public static final int    MAX_NAME_LENGTH       = 100;
    public static final int    MAX_DESCRIPTION_LENGTH = 2000;
    public static final String PHONE_REGEX           = "^\\+?[0-9]{10,15}$";

    // ─── Messages ────────────────────────────────────────────────────────────
    public static final String MSG_NOT_FOUND         = "Resource not found";
    public static final String MSG_DUPLICATE         = "Resource already exists";
    public static final String MSG_UNAUTHORIZED      = "Unauthorized access";
    public static final String MSG_FORBIDDEN         = "Access forbidden";
    public static final String MSG_VALIDATION_FAILED = "Validation failed";
}
