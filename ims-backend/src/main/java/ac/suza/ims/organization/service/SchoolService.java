package ac.suza.ims.organization.service;

import ac.suza.ims.organization.dto.SchoolRequest;
import ac.suza.ims.organization.dto.SchoolResponse;

import java.util.List;
import java.util.UUID;

public interface SchoolService {
    List<SchoolResponse> getAllSchools();
    SchoolResponse getSchoolById(UUID id);
    SchoolResponse createSchool(SchoolRequest request);
    SchoolResponse updateSchool(UUID id, SchoolRequest request);
    void deleteSchool(UUID id);
}
