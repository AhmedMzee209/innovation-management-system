package ac.suza.ims.innovation.service.impl;

import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.innovation.dto.InnovationTeamMemberRequest;
import ac.suza.ims.innovation.dto.InnovationTeamMemberResponse;
import ac.suza.ims.innovation.entity.Innovation;
import ac.suza.ims.innovation.entity.InnovationTeamMember;
import ac.suza.ims.innovation.mapper.InnovationTeamMemberMapper;
import ac.suza.ims.innovation.repository.InnovationRepository;
import ac.suza.ims.innovation.repository.InnovationTeamMemberRepository;
import ac.suza.ims.innovation.service.InnovationTeamMemberService;
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
public class InnovationTeamMemberServiceImpl implements InnovationTeamMemberService {

    private final InnovationTeamMemberRepository teamMemberRepository;
    private final InnovationRepository innovationRepository;
    private final InnovationTeamMemberMapper teamMemberMapper;

    @Override
    @Transactional
    public InnovationTeamMemberResponse addTeamMember(UUID innovationId, InnovationTeamMemberRequest request, UUID currentUserId) {
        log.info("Adding team member to innovation: {}", innovationId);
        
        Innovation innovation = innovationRepository.findById(innovationId)
                .orElseThrow(() -> new ResourceNotFoundException("Innovation not found"));

        if (!innovation.getOwner().getId().equals(currentUserId)) {
            throw new BusinessException("Only the innovation owner can add team members");
        }

        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            if (teamMemberRepository.existsByInnovationIdAndEmail(innovationId, request.getEmail())) {
                throw new DuplicateResourceException("Team member with this email already exists in the innovation");
            }
        }

        InnovationTeamMember member = teamMemberMapper.toEntity(request);
        member.setInnovation(innovation);

        return teamMemberMapper.toResponse(teamMemberRepository.save(member));
    }

    @Override
    @Transactional(readOnly = true)
    public List<InnovationTeamMemberResponse> getTeamMembers(UUID innovationId) {
        return teamMemberRepository.findByInnovationId(innovationId).stream()
                .map(teamMemberMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void removeTeamMember(UUID innovationId, UUID memberId, UUID currentUserId) {
        log.info("Removing team member {} from innovation {}", memberId, innovationId);
        
        Innovation innovation = innovationRepository.findById(innovationId)
                .orElseThrow(() -> new ResourceNotFoundException("Innovation not found"));

        if (!innovation.getOwner().getId().equals(currentUserId)) {
            throw new BusinessException("Only the innovation owner can remove team members");
        }

        InnovationTeamMember member = teamMemberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Team member not found"));

        if (!member.getInnovation().getId().equals(innovationId)) {
            throw new BusinessException("Team member does not belong to this innovation");
        }

        teamMemberRepository.delete(member);
    }
}
