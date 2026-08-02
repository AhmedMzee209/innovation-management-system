package ac.suza.ims.funding.service;

import ac.suza.ims.funding.dto.CreateFundingProgramRequest;
import ac.suza.ims.funding.dto.FundingProgramResponse;

import java.util.List;
import java.util.UUID;

public interface FundingProgramService {

    FundingProgramResponse createFundingProgram(CreateFundingProgramRequest request);

    FundingProgramResponse getFundingProgramById(UUID id);

    List<FundingProgramResponse> getAllFundingPrograms();

    FundingProgramResponse publishFundingProgram(UUID id);

    FundingProgramResponse updateFundingProgram(UUID id, CreateFundingProgramRequest request);

    void deleteFundingProgram(UUID id);
}
