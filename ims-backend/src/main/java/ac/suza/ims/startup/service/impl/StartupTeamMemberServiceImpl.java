package ac.suza.ims.startup.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.startup.dto.StartupTeamMemberRequest;
import ac.suza.ims.startup.dto.StartupTeamMemberResponse;
import ac.suza.ims.startup.entity.Startup;
import ac.suza.ims.startup.entity.StartupTeamMember;
import ac.suza.ims.startup.mapper.StartupTeamMemberMapper;
import ac.suza.ims.startup.repository.StartupRepository;
import ac.suza.ims.startup.repository.StartupTeamMemberRepository;
import ac.suza.ims.startup.service.StartupTeamMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StartupTeamMemberServiceImpl implements StartupTeamMemberService {

    private final StartupTeamMemberRepository teamMemberRepository;
    private final StartupRepository startupRepository;
    private final UserRepository userRepository;
    private final StartupTeamMemberMapper teamMemberMapper;

    @Override
    @Transactional
    public StartupTeamMemberResponse addTeamMember(UUID startupId, StartupTeamMemberRequest request) {
        log.info("Adding team member user {} to startup {}", request.getUserId(), startupId);

        Startup startup = startupRepository.findById(startupId)
                .orElseThrow(() -> new ResourceNotFoundException("Startup not found with id: " + startupId));

        if (teamMemberRepository.existsByStartupIdAndUserId(startupId, request.getUserId())) {
            throw new DuplicateResourceException("This user is already a member of this startup.");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));

        StartupTeamMember member = teamMemberMapper.toEntity(request);
        member.setStartup(startup);
        member.setUser(user);
        if (member.getIsFounder() == null) {
            member.setIsFounder(false);
        }

        return teamMemberMapper.toResponse(teamMemberRepository.save(member));
    }

    @Override
    @Transactional(readOnly = true)
    public List<StartupTeamMemberResponse> getTeamMembers(UUID startupId) {
        log.info("Fetching team members for startup: {}", startupId);
        return teamMemberRepository.findByStartupId(startupId).stream()
                .map(teamMemberMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void removeTeamMember(UUID startupId, UUID memberId) {
        log.info("Removing member {} from startup {}", memberId, startupId);
        StartupTeamMember member = teamMemberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Team member not found with id: " + memberId));

        if (!member.getStartup().getId().equals(startupId)) {
            throw new BusinessException("Member does not belong to this startup.");
        }

        teamMemberRepository.delete(member);
    }
}
