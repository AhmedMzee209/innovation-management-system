package ac.suza.ims.common.util;

import java.time.*;
import java.time.format.DateTimeFormatter;

/**
 * Utility class providing common date/time operations for the IMS system.
 */
public final class DateUtils {

    private static final ZoneId SYSTEM_ZONE =
            ZoneId.of("Africa/Dar_es_Salaam");

    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private static final DateTimeFormatter DATETIME_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    private DateUtils() {
        // Prevent instantiation
    }

    /** Returns the current local date/time in the system timezone. */
    public static LocalDateTime now() {
        return LocalDateTime.now(SYSTEM_ZONE);
    }

    /** Returns today's date in the system timezone. */
    public static LocalDate today() {
        return LocalDate.now(SYSTEM_ZONE);
    }

    /** Formats a LocalDateTime to the standard display string. */
    public static String formatDateTime(LocalDateTime dateTime) {
        if (dateTime == null) return null;
        return dateTime.format(DATETIME_FORMATTER);
    }

    /** Formats a LocalDate to the standard display string. */
    public static String formatDate(LocalDate date) {
        if (date == null) return null;
        return date.format(DATE_FORMATTER);
    }

    /** Parses a date string (yyyy-MM-dd) into a LocalDate. */
    public static LocalDate parseDate(String dateStr) {
        if (dateStr == null || dateStr.isBlank()) return null;
        return LocalDate.parse(dateStr, DATE_FORMATTER);
    }

    /** Returns true if the given date is in the past. */
    public static boolean isPast(LocalDate date) {
        return date != null && date.isBefore(today());
    }

    /** Returns true if the given date is in the future. */
    public static boolean isFuture(LocalDate date) {
        return date != null && date.isAfter(today());
    }

    /** Returns the number of days between two dates. */
    public static long daysBetween(LocalDate start, LocalDate end) {
        return Duration.between(start.atStartOfDay(), end.atStartOfDay()).toDays();
    }
}
