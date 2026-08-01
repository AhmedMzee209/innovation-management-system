package ac.suza.ims.common.util;

import ac.suza.ims.common.constants.AppConstants;

import java.util.regex.Pattern;

/**
 * Utility class providing common validation helpers used across all IMS modules.
 */
public final class ValidationUtils {

    private static final Pattern PHONE_PATTERN =
            Pattern.compile(AppConstants.PHONE_REGEX);

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    private ValidationUtils() {
        // Prevent instantiation
    }

    /**
     * Returns true if the value is null or blank.
     */
    public static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    /**
     * Returns true if the given email address matches a basic email pattern.
     */
    public static boolean isValidEmail(String email) {
        if (isBlank(email)) return false;
        return EMAIL_PATTERN.matcher(email.trim()).matches();
    }

    /**
     * Returns true if the given phone number is in an acceptable format.
     * Supports international format: +255700000000
     */
    public static boolean isValidPhone(String phone) {
        if (isBlank(phone)) return false;
        return PHONE_PATTERN.matcher(phone.trim()).matches();
    }

    /**
     * Returns true if the password meets the minimum security requirements.
     * Minimum length: {@link AppConstants#MIN_PASSWORD_LENGTH} characters.
     */
    public static boolean isValidPassword(String password) {
        return !isBlank(password) && password.length() >= AppConstants.MIN_PASSWORD_LENGTH;
    }

    /**
     * Returns true if the value does not exceed the maximum length.
     */
    public static boolean isWithinMaxLength(String value, int maxLength) {
        return value == null || value.length() <= maxLength;
    }

    /**
     * Trims and normalises a string; returns null if the result is blank.
     */
    public static String normalise(String value) {
        if (isBlank(value)) return null;
        return value.trim();
    }
}
