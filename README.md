# Innovation Management System (IMS) - Backend Documentation

![Java 21](https://img.shields.io/badge/Java-21-orange.svg)
![Spring Boot 3](https://img.shields.io/badge/Spring_Boot-3.x-green.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-blue.svg)
![Security](https://img.shields.io/badge/Spring_Security-JWT-red.svg)
![License](https://img.shields.io/badge/Institution-SUZA-blue.svg)

An enterprise-grade **Innovation Management System (IMS)** backend built for the **State University of Zanzibar (SUZA)**. The system provides a centralized platform that supports the complete innovation lifecycle—from initial idea submission, evaluation, and incubation to startup development, mentorship, funding, competition management, and reporting.

---

## 📑 Table of Contents

- [1. Executive Summary & Vision](#1-executive-summary--vision)
- [2. Technology Stack](#2-technology-stack)
- [3. Backend Architecture & Principles](#3-backend-architecture--principles)
- [4. Package Structure](#4-package-structure)
- [5. System Enumerations & Common Entities](#5-system-enumerations--common-entities)
- [6. Phased Implementation Roadmap](#6-phased-implementation-roadmap)
- [7. Standardized Module Build Order](#7-standardized-module-build-order)
- [8. Key Milestone Deliverables](#8-key-milestone-deliverables)
- [9. Configuration & Environment Setup](#9-configuration--environment-setup)
- [10. API Documentation & Swagger](#10-api-documentation--swagger)

---

## 1. Executive Summary & Vision

The **Innovation Management System (IMS)** is a multi-tier enterprise web application designed to foster, structure, and scale innovation across the academic and research ecosystem at SUZA. 

### Core Capabilities
- **Role-Based Access Control (RBAC)**: Secure access for Students, Staff, Hub Managers, Reviewers, Mentors, Investors, and University Admins.
- **Innovation Lifecycle Management**: Idea submission, status tracking, multi-criteria evaluations, and approval workflows.
- **Organization Management**: Multi-school, department, and innovation hub administration.
- **Startup Incubation**: Transforming approved innovations into registered startups with member management and progress tracking.
- **Mentorship & Coaching**: Mentor assignment, session scheduling, and feedback loops.
- **Funding & Grants**: Opportunity listing, grant applications, review, and funding awards.
- **Competitions & Hackathons**: Registration, panel judge evaluations, scoring, and leaderboard results.
- **Document & Notification Hub**: Centralized file repository with version control and real-time/in-app notifications.

---

## 2. Technology Stack

| Component | Technology / Library | Version | Description |
|---|---|---|---|
| **Language** | Java | 21 (LTS) | Core programming language |
| **Framework** | Spring Boot | 3.x / 4.x | Enterprise application framework |
| **Data Persistence** | Spring Data JPA (Hibernate) | 3.x | Code-First ORM and repository abstraction |
| **Database** | PostgreSQL | 15+ | Relational DBMS for high-concurrency storage |
| **Security** | Spring Security & JWT | - | Token-based stateless authentication & RBAC |
| **Mapping** | MapStruct | 1.5+ | High-performance type-safe DTO mapper |
| **Boilerplate Reduction**| Lombok | Latest | Automated getters, setters, builders, constructors |
| **Validation** | Bean Validation (Jakarta) | 3.x | Declarative request DTO validation |
| **API Specs & Docs** | Swagger / OpenAPI | 3.0 | Automated interactive API documentation |
| **Testing** | JUnit 5, Mockito | 5.x | Unit and integration testing framework |
| **Containerization** | Docker / Docker Compose | - | Container orchestration (production readiness) |

---

## 3. Backend Architecture & Principles

The backend is built following **Clean Architecture** and **Domain-Driven Design (DDD)** modularity. The flow of data strictly moves through isolated structural layers:

```
                          ┌────────────────────────┐
                          │     Client / Frontend  │
                          └───────────┬────────────┘
                                      │ REST API (JSON)
                                      ▼
                          ┌────────────────────────┐
                          │       Controller       │  (DTO Validation & Swagger Specs)
                          └───────────┬────────────┘
                                      │
                                      ▼
                          ┌────────────────────────┐
                          │    Service Layer       │  (Business Logic & Transactions)
                          └───────────┬────────────┘
                                      │
                                      ▼
                          ┌────────────────────────┐
                          │    Repository Layer    │  (Spring Data JPA Interfaces)
                          └───────────┬────────────┘
                                      │
                                      ▼
                          ┌────────────────────────┐
                          │   Hibernate ORM Layer  │  (JPA Entities & BaseEntity)
                          └───────────┬────────────┘
                                      │
                                      ▼
                          ┌────────────────────────┐
                          │   PostgreSQL Database  │  (Relational Persistence)
                          └────────────────────────┘
```

### Cross-Cutting Components
- **Spring Security & JWT Filter**: Intercepts requests, validates authorization headers, populates Security Context.
- **Global Exception Handler (`@RestControllerAdvice`)**: Traps exceptions and translates them into uniform JSON responses (`ApiResponse<T>`).
- **MapStruct DTO Mapping**: Prevents entity exposure on REST endpoints by handling bidirectional DTO conversions.
- **Jakarta Bean Validation**: Enforces input constraints (`@NotNull`, `@NotBlank`, `@Size`, `@Email`, etc.) at the Controller layer.

---

## 4. Package Structure

The project follows a domain-driven, modular package layout under root package `ac.suza.ims`:

```
ac.suza.ims
│
├── auth                 # Authentication & authorization endpoints & logic
├── common               # Base classes (BaseEntity, ApiResponse, Constants)
├── config               # Configuration beans (Swagger, CORS, Security, JPA)
├── security             # Security filters, UserDetailsService, JWT Utilities
├── exception            # GlobalExceptionHandler and custom runtime exceptions
├── dto                  # Transfer objects (Requests & Responses)
├── mapper               # MapStruct mapper interfaces
├── util                 # Helper and utility classes
├── enums                # System-wide enumerations
│
├── organization         # Schools, Departments, Innovation Hubs
├── innovation           # Innovations, Categories, Stages, Status History
├── review               # Reviewers, Evaluations, Criteria, Scoring
├── startup              # Startups, Members, Progress, Achievements
├── mentorship           # Mentors, Session Scheduling, Feedback
├── funding              # Funding Programs, Applications, Awards
├── competition          # Competitions, Registrations, Judges, Leaderboards
├── document             # Document Storage, Versioning, Categories
├── notification         # In-app, Email, Broadcast Notifications
└── report               # Reporting Engine, Analytics Dashboards
```

---

## 5. System Enumerations & Common Entities

### Base Entity Pattern (`BaseEntity.java`)
Every persistent JPA entity extends an abstract `BaseEntity` to guarantee auditability and uniform primary key strategies:

```java
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @CreatedBy
    @Column(name = "created_by")
    private String createdBy;

    @LastModifiedBy
    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;
}
```

### Core Business Enumerations
- **RoleType**: `ROLE_STUDENT`, `ROLE_STAFF`, `ROLE_INNOVATOR`, `ROLE_HUB_MANAGER`, `ROLE_REVIEWER`, `ROLE_MENTOR`, `ROLE_INVESTOR`, `ROLE_ADMIN`
- **InnovationStage**: `IDEA`, `PROTOTYPE`, `VALIDATION`, `MVP`, `SCALING`, `COMMERCIALIZED`
- **InnovationStatus**: `SUBMITTED`, `UNDER_REVIEW`, `NEEDS_REVISION`, `APPROVED`, `REJECTED`, `INCUBATED`
- **ReviewStatus**: `PENDING`, `IN_PROGRESS`, `COMPLETED`, `DECLINED`
- **FundingStatus**: `OPEN`, `UNDER_EVALUATION`, `AWARDED`, `CLOSED`, `REJECTED`
- **CompetitionStatus**: `DRAFT`, `UPCOMING`, `ACTIVE`, `EVALUATION`, `COMPLETED`

---

## 6. Phased Implementation Roadmap

### 🚀 Phase 0 – Project Initialization (Day 1)
- Set up Maven dependencies (`spring-boot-starter-webmvc`, `spring-boot-starter-data-jpa`, `postgresql`, `spring-boot-starter-security`, `validation`, `lombok`, `mapstruct`, `jwt`, `springdoc-openapi`).
- Configure `application.yml`, `application-dev.yml`, and `application-prod.yml`.
- Configure PostgreSQL database connections, Hibernate Code-First ddl-auto settings, CORS, and Swagger UI.
- Establish the `ac.suza.ims` domain package structure.
- Implement common utility classes (`BaseEntity`, `ApiResponse`, `GlobalExceptionHandler`, `ResourceNotFoundException`).

### 🔐 Phase 1 – Authentication & RBAC (Days 1–2)
- **Entities**: `User`, `Role`, `Permission` (User ↔ Role [M:N], Role ↔ Permission [M:N]).
- **Features**: Registration, Login, JWT Token Generation & Refresh Token Handling, Password Encryption (BCrypt), Current User Provider (`@CurrentUser`).
- **Core APIs**:
  - `POST /auth/login`
  - `POST /auth/register`
  - `POST /auth/refresh`
  - `GET /auth/me`
- **Checklist**: ✔ Login ✔ JWT Authentication Filter ✔ Role-based Method Security ✔ Swagger Annotations ✔ Postman Verification.

### 🏫 Phase 2 – Organization Module (Day 3)
- **Entities**: `School`, `Department`, `InnovationHub`.
- **APIs**:
  - `GET /api/v1/schools` | `POST /api/v1/schools` | `PUT /api/v1/schools/{id}` | `DELETE /api/v1/schools/{id}`
  - `GET /api/v1/departments` | `POST /api/v1/departments`
  - `GET /api/v1/hubs` | `POST /api/v1/hubs`

### 👤 Phase 3 – User Management Module (Day 4)
- **Features**: Profile Expansion (Bio, Photo URL, Address, Preferences), User Account Activation/Deactivation, User Directory Search.
- **APIs**:
  - `GET /api/v1/users/profile`
  - `PUT /api/v1/users/profile`
  - `PUT /api/v1/users/{id}/deactivate`
  - `GET /api/v1/users/search`

### 💡 Phase 4 – Innovation Module (Days 5–6)
- **Entities**: `Innovation`, `Category`, `Stage`, `StatusHistory`.
- **Features**: Submission workflow, stage movement, manager approvals/rejections, search and filtering by category/hub.
- **APIs**:
  - `POST /api/v1/innovations`
  - `GET /api/v1/innovations`
  - `GET /api/v1/innovations/{id}`
  - `PUT /api/v1/innovations/{id}`
  - `DELETE /api/v1/innovations/{id}`

### 🔍 Phase 5 – Review Module (Day 7)
- **Entities**: `Reviewer`, `Evaluation`, `Criteria`, `Comment`.
- **Workflow**: `Innovation` ➔ Assign Reviewer ➔ Conduct Evaluation ➔ Submit Score & Decision (Approve/Reject/Revise).
- **APIs**:
  - `POST /api/v1/reviews/assign`
  - `POST /api/v1/reviews/evaluate`
  - `GET /api/v1/reviews/innovation/{id}`

### 🏢 Phase 6 – Startup Module (Day 8)
- **Entities**: `Startup`, `StartupMember`, `Progress`, `Achievement`.
- **Workflow**: Approved `Innovation` ➔ Incubate as `Startup` ➔ Add Co-founders/Team Members ➔ Track Key Milestones & Achievements.
- **APIs**:
  - `POST /api/v1/startups`
  - `POST /api/v1/startups/{id}/members`
  - `POST /api/v1/startups/{id}/progress`

### 🤝 Phase 7 – Mentorship Module (Day 9)
- **Entities**: `Mentor`, `Assignment`, `Session`, `Feedback`.
- **APIs**:
  - `POST /api/v1/mentorship/mentors`
  - `POST /api/v1/mentorship/assignments`
  - `POST /api/v1/mentorship/sessions`

### 💰 Phase 8 – Funding Module (Day 10)
- **Entities**: `FundingProgram`, `FundingApplication`, `Award`.
- **Workflow**: Publish Funding Program ➔ Innovators Apply ➔ Selection Committee Review ➔ Grant Award Disbursement.
- **APIs**:
  - `GET /api/v1/funding/programs`
  - `POST /api/v1/funding/applications`
  - `PUT /api/v1/funding/applications/{id}/award`

### 🏆 Phase 9 – Competition Module (Day 11)
- **Entities**: `Competition`, `Registration`, `Judge`, `Result`.
- **APIs**:
  - `POST /api/v1/competitions`
  - `POST /api/v1/competitions/{id}/register`
  - `POST /api/v1/competitions/scores`

### 📄 Phase 10 – Document Module (Day 12)
- **Entities**: `Document`, `Category`, `Version`.
- **Features**: File Upload (Proposal attachments, pitch decks), Download, Category Tagging, Versioning.

### 🔔 Phase 11 – Notification Module (Day 13)
- **Features**: System In-App Alerts, Email Dispatch triggers, Broadcast Announcements across hubs.

### 📊 Phase 12 – Reporting & Dashboard Module (Day 14)
- **Features**: Aggregated metrics dashboards (Users, Innovations submitted vs approved, Funding distributed, Startups spawned).

---

## 7. Standardized Module Build Order

For **every** business domain module added to the project, follow this exact sequence to maintain code consistency:

```
 1. Entity (JPA Mappings & Annotations)
    ↓
 2. Enum (Domain Constants & Statuses)
    ↓
 3. Repository (Spring Data JPA Interface)
    ↓
 4. DTO (Request & Response Records/Classes)
    ↓
 5. Mapper (MapStruct Converter Interface)
    ↓
 6. Service Interface (Contract Definition)
    ↓
 7. Service Implementation (@Service & Transactional Logic)
    ↓
 8. Controller (@RestController & Endpoint Definitions)
    ↓
 9. Validation (Bean Validation annotations on DTOs)
    ↓
10. Exception Handling (Domain-specific error responses)
    ↓
11. Swagger Documentation (@Operation, @ApiResponse annotations)
    ↓
12. Postman / Integration Testing (API Verification)
```

---

## 8. Key Milestone Deliverables

| Milestone | Target Horizon | Expected Deliverables |
|---|---|---|
| **Week 1** | Days 1 – 7 | Project initialization, Auth & JWT Security, RBAC setup, Organization Module, Expanded User Profiles, Innovation Module, Review Module. |
| **Week 2** | Days 8 – 14 | Startup Incubation, Mentorship Engine, Funding & Grant System, Competitions, Document Management, Notification Dispatcher, Reporting Dashboards & End-to-End API Integration Testing. |

---

## 9. Configuration & Environment Setup

### Prerequisites
- **JDK**: Java 21 LTS
- **Build Tool**: Apache Maven 3.9+ (or included `./mvnw`)
- **Database**: PostgreSQL 15+ running locally or in Docker

### Database Setup
Create the PostgreSQL database instance:
```sql
CREATE DATABASE ims_db;
CREATE USER ims_user WITH PASSWORD 'ims_password';
GRANT ALL PRIVILEGES ON DATABASE ims_db TO ims_user;
```

### Application Properties Configuration (`application-dev.yml`)
```yaml
server:
  port: 8080
  servlet:
    context-path: /

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ims_db
    username: ims_user
    password: ims_password
    driver-class-name: org.postgresql.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.PostgreSQLDialect

jwt:
  secret: 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
  expiration-ms: 86400000 # 24 hours
  refresh-expiration-ms: 604800000 # 7 days
```

### Building & Running the Application

1. **Clone & Navigate to Backend**:
   ```bash
   cd ims-backend
   ```

2. **Build with Maven**:
   ```bash
   ./mvnw clean compile
   ```

3. **Run Dev Server**:
   ```bash
   ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
   ```

---

## 10. API Documentation & Swagger

When the Spring Boot application is running, open your browser and access interactive API documentation:

- **Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **OpenAPI Specs (JSON)**: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

---
*Maintained by the State University of Zanzibar (SUZA) Innovation Management System Engineering Team.*
