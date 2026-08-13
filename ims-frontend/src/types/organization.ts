export type OrgStatus = 'ACTIVE' | 'INACTIVE';

export interface SchoolRequest {
  code: string;
  name: string;
  shortName?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  website?: string;
  physicalAddress?: string;
  logo?: string;
}

export interface SchoolResponse {
  id: string;
  code: string;
  name: string;
  shortName?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  website?: string;
  physicalAddress?: string;
  logo?: string;
  status: OrgStatus;
  departmentsCount?: number;
  innovationsCount?: number;
  startupsCount?: number;
}

export interface DepartmentRequest {
  code: string;
  name: string;
  description?: string;
  officeLocation?: string;
  email?: string;
  phone?: string;
  schoolId: string;
}

export interface DepartmentResponse {
  id: string;
  code: string;
  name: string;
  description?: string;
  officeLocation?: string;
  email?: string;
  phone?: string;
  status: OrgStatus;
  school?: SchoolResponse;
}

export interface InnovationHubRequest {
  code: string;
  name: string;
  description?: string;
  vision?: string;
  mission?: string;
  officeLocation?: string;
  email?: string;
  phone?: string;
  schoolId: string;
}

export interface InnovationHubResponse {
  id: string;
  code: string;
  name: string;
  description?: string;
  vision?: string;
  mission?: string;
  officeLocation?: string;
  email?: string;
  phone?: string;
  status: OrgStatus;
  school?: SchoolResponse;
}

export interface HubManagerAssignmentRequest {
  hubId: string;
  managerId: string;
  roleTitle?: string;
  startDate: string;
  endDate?: string;
}

export interface HubManagerAssignmentResponse {
  id: string;
  hub: InnovationHubResponse;
  manager: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  roleTitle: string;
  startDate: string;
  endDate?: string;
  active: boolean;
}
