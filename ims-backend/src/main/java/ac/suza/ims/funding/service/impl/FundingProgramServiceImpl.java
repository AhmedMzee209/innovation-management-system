package ac.suza.ims.funding.service.impl;

import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.funding.dto.CreateFundingProgramRequest;
import ac.suza.ims.funding.dto.FundingProgramResponse;
import ac.suza.ims.funding.entity.FundingProgram;
import ac.suza.ims.funding.entity.FundingProgramStatus;
import ac.suza.ims.funding.mapper.FundingProgramMapper;
import ac.suza.ims.funding.repository.FundingProgramRepository;
import ac.suza.ims.funding.service.FundingProgramService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FundingProgramServiceImpl implements FundingProgramService {

    private final FundingProgramRepository programRepository;
    private final FundingProgramMapper programMapper;

    @Override
    @Transactional
    public FundingProgramResponse createFundingProgram(CreateFundingProgramRequest request) {
        log.info("Creating funding program: {}", request.getProgramName());
        FundingProgram program = programMapper.toEntity(request);
        program.setProgramCode(generateProgramCode());
        program.setStatus(FundingProgramStatus.DRAFT);

        return programMapper.toResponse(programRepository.save(program));
    }

    @Override
    @Transactional(readOnly = true)
    public FundingProgramResponse getFundingProgramById(UUID id) {
        log.info("Fetching funding program by ID: {}", id);
        FundingProgram program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funding program not found with id: " + id));
        return programMapper.toResponse(program);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FundingProgramResponse> getAllFundingPrograms() {
        log.info("Fetching all funding programs");
        return programRepository.findAll().stream()
                .map(programMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public FundingProgramResponse publishFundingProgram(UUID id) {
        log.info("Publishing funding program with ID: {}", id);
        FundingProgram program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funding program not found with id: " + id));

        program.setStatus(FundingProgramStatus.OPEN);
        return programMapper.toResponse(programRepository.save(program));
    }

    @Override
    @Transactional
    public FundingProgramResponse updateFundingProgram(UUID id, CreateFundingProgramRequest request) {
        log.info("Updating funding program with ID: {}", id);
        FundingProgram program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funding program not found with id: " + id));

        program.setProgramName(request.getProgramName());
        program.setDescription(request.getDescription());
        program.setSponsor(request.getSponsor());
        program.setFundingType(request.getFundingType());
        program.setMaximumAmount(request.getMaximumAmount());
        program.setMinimumAmount(request.getMinimumAmount());
        program.setApplicationOpenDate(request.getApplicationOpenDate());
        program.setApplicationCloseDate(request.getApplicationCloseDate());
        program.setAnnouncementDate(request.getAnnouncementDate());

        return programMapper.toResponse(programRepository.save(program));
    }

    @Override
    @Transactional
    public void deleteFundingProgram(UUID id) {
        log.info("Deleting funding program with ID: {}", id);
        FundingProgram program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funding program not found with id: " + id));
        programRepository.delete(program);
    }

    private String generateProgramCode() {
        long count = programRepository.count() + 1;
        return String.format("FND-%d-%04d", Year.now().getValue(), count);
    }
}
