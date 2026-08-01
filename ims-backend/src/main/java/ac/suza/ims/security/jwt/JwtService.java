package ac.suza.ims.security.jwt;

import ac.suza.ims.security.model.CustomUserDetails;
import ac.suza.ims.security.util.JwtUtils;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * High-level JWT service responsible for:
 * - Generating access tokens and refresh tokens
 * - Validating tokens
 * - Extracting usernames from tokens
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtUtils jwtUtils;

    @Value("${jwt.expiration-ms:86400000}")
    private long accessTokenExpirationMs;

    @Value("${jwt.refresh-expiration-ms:604800000}")
    private long refreshTokenExpirationMs;

    // ─── Token Generation ────────────────────────────────────────────────────

    /**
     * Generates a signed JWT access token for the given UserDetails.
     * Embeds the user's id and roles as custom claims.
     */
    public String generateAccessToken(UserDetails userDetails) {
        Map<String, Object> claims = buildClaims(userDetails);
        return jwtUtils.buildToken(userDetails.getUsername(), claims, accessTokenExpirationMs);
    }

    /**
     * Generates a long-lived refresh token.
     * Contains minimal claims (subject only).
     */
    public String generateRefreshToken(UserDetails userDetails) {
        return jwtUtils.buildToken(userDetails.getUsername(), new HashMap<>(), refreshTokenExpirationMs);
    }

    // ─── Extraction ──────────────────────────────────────────────────────────

    public String extractUsername(String token) {
        return jwtUtils.extractUsername(token);
    }

    // ─── Validation ──────────────────────────────────────────────────────────

    /**
     * Returns true if the token is valid for the given UserDetails:
     * - Subject matches the username
     * - Token is not expired
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            String username = extractUsername(token);
            return username.equals(userDetails.getUsername())
                    && !jwtUtils.isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("JWT validation failed: {}", e.getMessage());
            return false;
        }
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    private Map<String, Object> buildClaims(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        if (userDetails instanceof CustomUserDetails custom) {
            claims.put("id", custom.getId().toString());
            claims.put("roles", custom.getAuthorities().stream()
                    .map(a -> a.getAuthority())
                    .collect(Collectors.toList()));
        }
        return claims;
    }
}
