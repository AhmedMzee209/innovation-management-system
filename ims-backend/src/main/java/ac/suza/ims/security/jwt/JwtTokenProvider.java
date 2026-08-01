package ac.suza.ims.security.jwt;

import ac.suza.ims.security.util.JwtUtils;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

/**
 * Optional token provider facade exposing a clean API for
 * token creation and validation (delegates to {@link JwtService} and {@link JwtUtils}).
 *
 * Use this class when you need a single bean for both token operations and
 * token extraction in the same component (e.g., auth controller helpers).
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final JwtService jwtService;
    private final JwtUtils jwtUtils;

    /**
     * Creates an access token for the authenticated principal.
     */
    public String createAccessToken(UserDetails userDetails) {
        return jwtService.generateAccessToken(userDetails);
    }

    /**
     * Creates a long-lived refresh token for the authenticated principal.
     */
    public String createRefreshToken(UserDetails userDetails) {
        return jwtService.generateRefreshToken(userDetails);
    }

    /**
     * Validates a raw JWT token string.
     * Returns true if the token is structurally valid and not expired.
     */
    public boolean validateToken(String token) {
        try {
            jwtUtils.extractAllClaims(token);
            return !jwtUtils.isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Token validation failed: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Extracts the username (email) from a raw JWT string.
     */
    public String getUsernameFromToken(String token) {
        return jwtUtils.extractUsername(token);
    }
}
