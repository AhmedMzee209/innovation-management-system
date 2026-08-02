package ac.suza.ims.dashboard.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.dashboard.dto.SavedFilterRequest;
import ac.suza.ims.dashboard.dto.SavedFilterResponse;
import ac.suza.ims.dashboard.entity.SavedFilter;
import ac.suza.ims.dashboard.mapper.SavedFilterMapper;
import ac.suza.ims.dashboard.repository.SavedFilterRepository;
import ac.suza.ims.dashboard.service.SavedFilterService;
import ac.suza.ims.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SavedFilterServiceImpl implements SavedFilterService {

    private final SavedFilterRepository filterRepository;
    private final UserRepository userRepository;
    private final SavedFilterMapper filterMapper;

    @Override
    @Transactional
    public SavedFilterResponse createFilter(SavedFilterRequest request) {
        User currentUser = getCurrentUser();
        log.info("Saving filter '{}' for user: {}", request.getFilterName(), currentUser.getEmail());

        SavedFilter filter = SavedFilter.builder()
                .filterName(request.getFilterName())
                .module(request.getModule())
                .filterDefinition(request.getFilterDefinition())
                .createdDate(LocalDate.now())
                .user(currentUser)
                .build();

        return filterMapper.toResponse(filterRepository.save(filter));
    }

    @Override
    @Transactional(readOnly = true)
    public List<SavedFilterResponse> getCurrentUserFilters(String module) {
        User currentUser = getCurrentUser();
        log.info("Fetching saved filters for user: {} and module: {}", currentUser.getEmail(), module);

        List<SavedFilter> filters;
        if (module != null && !module.trim().isEmpty()) {
            filters = filterRepository.findByUserIdAndModuleOrderByCreatedDateDesc(currentUser.getId(), module);
        } else {
            filters = filterRepository.findByUserIdOrderByCreatedDateDesc(currentUser.getId());
        }

        return filters.stream()
                .map(filterMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteFilter(UUID id) {
        log.info("Deleting saved filter ID: {}", id);
        SavedFilter filter = filterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Saved filter not found with id: " + id));
        filterRepository.delete(filter);
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));
    }
}
