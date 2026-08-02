package ac.suza.ims.showcase.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.showcase.dto.GalleryResponse;
import ac.suza.ims.showcase.dto.ShowcaseResponse;
import ac.suza.ims.showcase.dto.ShowcaseSummaryResponse;
import ac.suza.ims.showcase.dto.SuccessStoryResponse;
import ac.suza.ims.showcase.entity.ShowcaseVisitor;
import ac.suza.ims.showcase.service.GalleryService;
import ac.suza.ims.showcase.service.ShowcaseAnalyticsService;
import ac.suza.ims.showcase.service.ShowcaseService;
import ac.suza.ims.showcase.service.SuccessStoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
@Tag(name = "Public Showcase", description = "Publicly accessible endpoints for the Innovation Showcase")
public class ShowcasePublicController {

    private final ShowcaseService showcaseService;
    private final SuccessStoryService successStoryService;
    private final GalleryService galleryService;
    private final ShowcaseAnalyticsService analyticsService;

    @GetMapping("/showcase")
    @Operation(summary = "Get all latest published showcase items")
    public ResponseEntity<ApiResponse<List<ShowcaseSummaryResponse>>> getLatestInnovations(HttpServletRequest request) {
        trackVisitor(request, "/api/public/showcase");
        List<ShowcaseSummaryResponse> response = showcaseService.getLatestInnovations();
        return ResponseEntity.ok(ApiResponse.success("Latest innovations retrieved successfully", response));
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured innovations for homepage")
    public ResponseEntity<ApiResponse<List<ShowcaseSummaryResponse>>> getFeaturedInnovations(HttpServletRequest request) {
        trackVisitor(request, "/api/public/featured");
        List<ShowcaseSummaryResponse> response = showcaseService.getFeaturedInnovations();
        return ResponseEntity.ok(ApiResponse.success("Featured innovations retrieved successfully", response));
    }

    @GetMapping("/showcase/{slug}")
    @Operation(summary = "Get a specific showcase item by slug")
    public ResponseEntity<ApiResponse<ShowcaseResponse>> getShowcaseItem(@PathVariable String slug, HttpServletRequest request) {
        trackVisitor(request, "/api/public/showcase/" + slug);
        ShowcaseResponse response = showcaseService.getShowcaseItemBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success("Showcase item retrieved successfully", response));
    }

    @GetMapping("/search")
    @Operation(summary = "Search public showcase items")
    public ResponseEntity<ApiResponse<List<ShowcaseSummaryResponse>>> searchShowcaseItems(
            @RequestParam String query, HttpServletRequest request) {
        trackVisitor(request, "/api/public/search?query=" + query);
        List<ShowcaseSummaryResponse> response = showcaseService.searchShowcaseItems(query);
        return ResponseEntity.ok(ApiResponse.success("Search results retrieved successfully", response));
    }

    @GetMapping("/success-stories")
    @Operation(summary = "Get public success stories")
    public ResponseEntity<ApiResponse<List<SuccessStoryResponse>>> getSuccessStories(HttpServletRequest request) {
        trackVisitor(request, "/api/public/success-stories");
        List<SuccessStoryResponse> response = successStoryService.getAllSuccessStories();
        return ResponseEntity.ok(ApiResponse.success("Success stories retrieved successfully", response));
    }

    @GetMapping("/gallery")
    @Operation(summary = "Get public innovation galleries")
    public ResponseEntity<ApiResponse<List<GalleryResponse>>> getGalleries(HttpServletRequest request) {
        trackVisitor(request, "/api/public/gallery");
        List<GalleryResponse> response = galleryService.getAllGalleries();
        return ResponseEntity.ok(ApiResponse.success("Galleries retrieved successfully", response));
    }

    private void trackVisitor(HttpServletRequest request, String path) {
        ShowcaseVisitor visitor = ShowcaseVisitor.builder()
                .sessionId(request.getSession().getId())
                .visitedPage(path)
                .visitDate(LocalDateTime.now())
                .device(request.getHeader("User-Agent"))
                .build();
        analyticsService.trackVisitor(visitor);
    }
}
