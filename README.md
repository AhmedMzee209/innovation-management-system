# Innovation Management System (IMS) — SUZA

![Java](https://img.shields.io/badge/Java-17-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.x-green.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4.svg)
![License](https://img.shields.io/badge/Institution-SUZA-blue.svg)
![Status](https://img.shields.io/badge/Backend-Complete-brightgreen.svg)
![Status](https://img.shields.io/badge/Frontend-In_Progress-yellow.svg)

An enterprise-grade **Innovation Management System (IMS)** built for the **State University of Zanzibar (SUZA)**. The system provides a centralized platform that supports the complete innovation lifecycle — from idea submission, evaluation, and incubation to startup development, mentorship, funding, competition management, and institutional reporting.

---

## 📑 Table of Contents

- [1. Executive Summary & Vision](#1-executive-summary--vision)
- [2. Repository Structure](#2-repository-structure)
- [3. Backend — Technology Stack](#3-backend--technology-stack)
- [4. Backend — Architecture & Package Structure](#4-backend--architecture--package-structure)
- [5. Backend — Implemented Modules](#5-backend--implemented-modules)
- [6. Backend — Configuration & Running](#6-backend--configuration--running)
- [7. Frontend — Technology Stack](#7-frontend--technology-stack)
- [8. Frontend — Folder Structure](#8-frontend--folder-structure)
- [9. Frontend — Implementation Roadmap](#9-frontend--implementation-roadmap)
- [10. Development Order](#10-development-order)
- [11. API Documentation](#11-api-documentation)

---

## 1. Executive Summary & Vision

The **IMS** is a multi-tier enterprise web application designed to foster, structure, and scale innovation across the academic and research ecosystem at SUZA.

### Core Capabilities
- **Role-Based Access Control (RBAC)** — Students, Staff, Hub Managers, Reviewers, Mentors, Investors, Admins
- **Innovation Lifecycle Management** — Idea submission, status tracking, multi-criteria evaluations, approval workflows
- **Organization Management** — Multi-school, department, and innovation hub administration
- **Startup Incubation** — Transforming approved innovations into registered startups with team and progress tracking
- **Mentorship & Coaching** — Mentor assignment, session scheduling, and feedback loops
- **Funding & Grants** — Opportunity listing, grant applications, review, and funding awards
- **Competitions & Hackathons** — Registration, judge evaluations, scoring, and leaderboard results
- **Document & Notification Hub** — Centralized file repository with version control and in-app notifications
- **Dashboard & Analytics** — Role-based dashboards with KPIs, charts, and trend tracking
- **Public Showcase** — Public-facing portal for discovering innovations and success stories

---

## 2. Repository Structure

```
innovation_system/
├── ims-backend/          # Spring Boot 4.x REST API (✅ COMPLETE)
├── ims-frontend/         # React 19 + Vite frontend (🚧 IN PROGRESS)
├── docs/                 # Architecture diagrams & documentation
└── README.md             # This file
```

---

## 3. Backend — Technology Stack

| Component | Technology | Version | Notes |
|---|---|---|---|
| **Language** | Java | 17 | Core language |
| **Framework** | Spring Boot | 4.x | Enterprise framework |
| **Persistence** | Spring Data JPA (Hibernate) | 3.x | Code-First ORM |
| **Database** | PostgreSQL | 15+ | Relational DBMS |
| **Security** | Spring Security + JWT (JJWT) | 0.12.6 | Stateless auth + RBAC |
| **Mapping** | MapStruct | 1.5.5 | Type-safe DTO mapper |
| **Boilerplate** | Lombok | Latest | Reduced boilerplate |
| **Validation** | Jakarta Bean Validation | 3.x | Request DTO validation |
| **API Docs** | SpringDoc OpenAPI (Swagger) | 2.6.0 | Interactive API docs |
| **Testing** | JUnit 5, Mockito, Spring Security Test | 5.x | Unit & integration tests |

---

## 4. Backend — Architecture & Package Structure

### Layered Architecture

```
Client / Frontend
      │ REST API (JSON)
      ▼
  Controller        ← DTO Validation & Swagger Specs
      │
      ▼
  Service Layer     ← Business Logic & Transactions
      │
      ▼
  Repository Layer  ← Spring Data JPA Interfaces
      │
      ▼
  Hibernate ORM     ← JPA Entities & BaseEntity
      │
      ▼
  PostgreSQL DB     ← Relational Persistence
```

### Package Structure (`ac.suza.ims`)

```
ac.suza.ims
├── auth             # Authentication & authorization
├── common           # BaseEntity, ApiResponse, Constants
├── config           # Swagger, CORS, Security, JPA config
├── security         # JWT filter, UserDetailsService, JWT util
├── exception        # GlobalExceptionHandler, custom exceptions
├── enums            # System-wide enumerations
├── util             # Helper & utility classes
├── organization     # Schools, Departments, Innovation Hubs
├── innovation       # Innovations, Categories, Stages, Status History
├── review           # Reviewers, Evaluations, Criteria, Scoring
├── startup          # Startups, Members, Progress, Achievements
├── mentorship       # Mentors, Sessions, Feedback
├── funding          # Funding Programs, Applications, Awards
├── competition      # Competitions, Registrations, Judges, Leaderboards
├── opportunity      # Opportunities & Applications
├── document         # Document Storage, Versioning
├── notification     # In-app, Email, Broadcast Notifications
├── dashboard        # Dashboard Widgets & Analytics Snapshots
├── showcase         # Public Innovation Showcase
└── report           # Reporting Engine
```

### Base Entity Pattern

Every JPA entity extends `BaseEntity` which provides:
- UUID primary key (`@GeneratedValue(strategy = UUID)`)
- Audit fields: `createdAt`, `updatedAt`, `createdBy`, `updatedBy`
- Soft delete flag: `isDeleted`

### Core Business Enumerations

| Enum | Values |
|---|---|
| **RoleType** | `ROLE_STUDENT`, `ROLE_STAFF`, `ROLE_INNOVATOR`, `ROLE_HUB_MANAGER`, `ROLE_REVIEWER`, `ROLE_MENTOR`, `ROLE_INVESTOR`, `ROLE_ADMIN` |
| **InnovationStage** | `IDEA`, `PROTOTYPE`, `VALIDATION`, `MVP`, `SCALING`, `COMMERCIALIZED` |
| **InnovationStatus** | `SUBMITTED`, `UNDER_REVIEW`, `NEEDS_REVISION`, `APPROVED`, `REJECTED`, `INCUBATED` |
| **ReviewStatus** | `PENDING`, `IN_PROGRESS`, `COMPLETED`, `DECLINED` |
| **FundingStatus** | `OPEN`, `UNDER_EVALUATION`, `AWARDED`, `CLOSED`, `REJECTED` |
| **CompetitionStatus** | `DRAFT`, `UPCOMING`, `ACTIVE`, `EVALUATION`, `COMPLETED` |

---

## 5. Backend — Implemented Modules

All 20 backend modules are **✅ COMPLETE**:

| # | Module | Key Entities | Status |
|---|---|---|---|
| 0 | **Foundation** | BaseEntity, ApiResponse, GlobalExceptionHandler | ✅ |
| 1 | **Auth & RBAC** | User, Role, Permission + JWT | ✅ |
| 2 | **Organization** | School, Department, InnovationHub | ✅ |
| 3 | **User Management** | User Profile, Activation | ✅ |
| 4 | **Innovation** | Innovation, Category, Stage, StatusHistory | ✅ |
| 5 | **Review** | Reviewer, Evaluation, Criteria, Comment | ✅ |
| 6 | **Startup** | Startup, StartupMember, Progress, Achievement | ✅ |
| 7 | **Mentorship** | Mentor, Assignment, Session, Feedback | ✅ |
| 8 | **Funding** | FundingProgram, FundingApplication, Award | ✅ |
| 9 | **Competition** | Competition, Registration, Judge, Result | ✅ |
| 10 | **Opportunity** | Opportunity, OpportunityApplication | ✅ |
| 11 | **Document** | Document, DocumentVersion, DocumentCategory | ✅ |
| 12 | **Notification** | Notification, Announcement, Broadcast | ✅ |
| 13 | **Dashboard** | DashboardWidget, AnalyticsSnapshot | ✅ |
| 14 | **Showcase** | ShowcaseItem, ShowcaseCategory | ✅ |
| 15 | **Report** | Reporting Engine, Aggregated Metrics | ✅ |

### Standardized Module Build Order

For every module, the strict build sequence is:

```
1. Entity → 2. Enum → 3. Repository → 4. DTO → 5. Mapper
      → 6. Service Interface → 7. Service Impl → 8. Controller
      → 9. Validation → 10. Exception Handling → 11. Swagger → 12. Testing
```

---

## 6. Backend — Configuration & Running

### Prerequisites

- Java 17 LTS
- Apache Maven 3.9+ (or use `./mvnw`)
- PostgreSQL 15+ (local or Docker)

### Database Setup

```sql
CREATE DATABASE ims_db;
CREATE USER ims_user WITH PASSWORD 'ims_password';
GRANT ALL PRIVILEGES ON DATABASE ims_db TO ims_user;
```

### `application-dev.yml`

```yaml
server:
  port: 8080

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
  expiration-ms: 86400000       # 24 hours
  refresh-expiration-ms: 604800000  # 7 days
```

### Running the Backend

```bash
# Navigate to backend
cd ims-backend

# Build
./mvnw clean compile

# Run with dev profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

---

## 7. Frontend — Technology Stack

| Library | Version | Purpose |
|---|---|---|
| **React** | 19 | Core UI framework |
| **Vite** | 6.x | Build tool & dev server |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **React Router DOM** | 6.x | Client-side routing |
| **TanStack Query** | 5.x | Server state & data fetching |
| **Axios** | 1.x | HTTP client |
| **React Hook Form** | 7.x | Performant form management |
| **Zod** | 3.x | Schema validation |
| **Redux Toolkit** | 2.x | Auth & global state |
| **TanStack Table** | 8.x | Headless data tables |
| **Recharts** | 2.x | Composable chart library |
| **Lucide React** | Latest | Icon library |
| **Framer Motion** | 11.x | Animations & transitions |
| **Sonner** | 1.x | Toast notifications |

---

## 8. Frontend — Folder Structure

```
src/
├── app/              # App entry, providers, root setup
├── assets/           # Static assets (images, fonts, icons)
├── components/
│   ├── common/       # Reusable generic components
│   ├── forms/        # Form components & inputs
│   ├── tables/       # Table components
│   ├── charts/       # Chart wrappers
│   ├── cards/        # Card components
│   ├── modal/        # Modal dialogs
│   ├── ui/           # Base UI primitives
│   ├── layout/       # Layout building blocks
│   └── feedback/     # Loading, errors, empty states
├── hooks/            # Custom React hooks
├── layouts/          # Page layout shells (Dashboard, Public, Auth)
├── pages/            # Route-level page components
├── routes/           # Route definitions & protected routes
├── services/         # Axios API service modules
├── store/            # Redux Toolkit slices & store
├── types/            # TypeScript interfaces & types
├── utils/            # Helper functions & utilities
├── constants/        # App-wide constants & enums
├── contexts/         # React context providers
└── styles/           # Global CSS & Tailwind customizations
```

---

## 9. Frontend — Implementation Roadmap

### Phase 0 — Frontend Foundation
> **Objective**: Prepare a scalable, production-ready React application shell.

**Tasks**
- [ ] Create React + Vite + TypeScript project
- [ ] Configure Tailwind CSS with custom design tokens
- [ ] Configure React Router DOM with route structure
- [ ] Configure Axios with base URL & interceptors
- [ ] Configure Redux Toolkit (auth & global state slices)
- [ ] Configure TanStack Query (QueryClient & Provider)
- [ ] Configure React Hook Form & Zod resolver
- [ ] Configure Theme Provider (light / dark mode)
- [ ] Configure application Layout shells
- [ ] Configure Protected Routes with role guards
- [ ] Configure Sonner toast notifications
- [ ] Configure Global Loading & Error Boundary

**Deliverables**: App Layout (Sidebar, Top Nav, Footer), Route Structure, Theme System

---

### Phase 1 — Landing Website
> **Objective**: Create the public-facing marketing website.

**Pages**: Home, About IMS, Innovation Ecosystem, Schools, Innovation Hubs, Success Stories, Public Showcase, Events, Contact, FAQ, Login

**Components**: Hero Section, Statistics, Feature Cards, Innovation Cards, Partner Logos, Testimonials, Footer, Navbar

---

### Phase 2 — Authentication
> **Pages**: Login, Forgot Password, Reset Password, Verify Email, Unauthorized, Forbidden

**Components**: Login Form, Password Strength Indicator, Remember Me, Social Login Placeholder

---

### Phase 3 — Dashboard Framework
> **Objective**: Shared dashboard layout used by all role-based dashboards.

**Layout**: Sidebar, Top Navigation, Breadcrumb, Notifications, User Menu, Theme Switch, Search Bar, Profile Dropdown

**Components**: KPI Cards, Charts, Recent Activities, Quick Actions

---

### Phase 4 — User & RBAC Management
> **Pages**: Users List, Create User, Edit User, User Profile, Roles, Permissions

**Components**: User Table, Role Matrix, Permission Matrix, Profile Card

---

### Phase 5 — Organization Management
> **Pages**: Schools, Departments, Innovation Hubs, Innovation Managers

**Components**: School Card, Hub Card, Tree View, Statistics

---

### Phase 6 — Innovation Management
> **Pages**: Innovation List, Submit Innovation, Innovation Details, My Innovations, Categories

**Components**: Innovation Card, Innovation Timeline, Status Badge, Upload Documents, Filters

---

### Phase 7 — Review & Evaluation
> **Pages**: Reviews, Assigned Reviews, Evaluation Form, Evaluation History

**Components**: Score Card, Evaluation Matrix, Comments Panel, Decision Dialog

---

### Phase 8 — Startup Management
> **Pages**: Startup List, Startup Details, Team Members, Milestones, Achievements, Progress

**Components**: Startup Card, Timeline, Team Table, Progress Chart

---

### Phase 9 — Mentorship
> **Pages**: Mentors, Sessions, Feedback, Action Plans

**Components**: Calendar, Session Card, Mentor Profile, Feedback Timeline

---

### Phase 10 — Funding
> **Pages**: Funding Programs, Apply for Funding, Funding Applications, Disbursements

**Components**: Funding Card, Budget Chart, Milestone Tracker

---

### Phase 11 — Competition
> **Pages**: Competitions, Register for Competition, Judges, Results

**Components**: Competition Card, Ranking Table, Score Matrix, Prize Cards

---

### Phase 12 — Opportunity
> **Pages**: Opportunities, Apply for Opportunity, My Applications

**Components**: Opportunity Cards, Filters, Application Timeline

---

### Phase 13 — Document Management
> **Pages**: Documents, Upload, Preview, Version History

**Components**: File Explorer, Preview Panel, Version Timeline

---

### Phase 14 — Notification & Messaging
> **Pages**: Notifications, Messages, Conversations, Announcements

**Components**: Chat Window, Notification Bell, Conversation List

---

### Phase 15 — Dashboards & Analytics
> **Role-based dashboards**: Super Admin, Director, Central Manager, School Manager, Mentor, Reviewer, Student

**Charts**: Line, Bar, Pie, Area  
**KPI Cards**: Users, Innovations, Startups, Funding, Competitions

---

### Phase 16 — Public Showcase
> **Pages**: Showcase, Success Stories, Startup Profiles, Innovation Profiles, Gallery

**Components**: Showcase Cards, Gallery, Search, Categories

---

### Phase 17 — System Administration
> **Pages**: Settings, Audit Logs, Activity Logs, Preferences, System Health

**Components**: Settings Form, Toggle Cards, Audit Table, Health Dashboard

---

### Phase 18 — Frontend Integration & Production
**Tasks**
- [ ] Connect all APIs to backend endpoints
- [ ] Complete authentication flow with JWT refresh
- [ ] Implement route protection per role
- [ ] Global error handling & retry logic
- [ ] Loading states & skeleton loaders
- [ ] Pagination, sorting, filtering, search
- [ ] Responsive design (mobile → desktop)
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Performance optimization (Lighthouse ≥ 90)
- [ ] Lazy loading & code splitting
- [ ] Cross-browser testing
- [ ] Final UI polish & QA

---

## 10. Development Order

```
Phase 0  → Foundation & Setup
      ↓
Phase 1  → Landing Website
      ↓
Phase 2  → Authentication
      ↓
Phase 3  → Dashboard Layout
      ↓
Phase 4  → Users & RBAC
      ↓
Phase 5  → Organization
      ↓
Phase 6  → Innovation
      ↓
Phase 7  → Review & Evaluation
      ↓
Phase 8  → Startup Management
      ↓
Phase 9  → Mentorship
      ↓
Phase 10 → Funding
      ↓
Phase 11 → Competition
      ↓
Phase 12 → Opportunity
      ↓
Phase 13 → Document Management
      ↓
Phase 14 → Notification & Messaging
      ↓
Phase 15 → Dashboards & Analytics
      ↓
Phase 16 → Public Showcase
      ↓
Phase 17 → System Administration
      ↓
Phase 18 → API Integration & Production
```

---

## 11. API Documentation

When the backend is running:

| Resource | URL |
|---|---|
| **Swagger UI** | http://localhost:8080/swagger-ui.html |
| **OpenAPI JSON** | http://localhost:8080/v3/api-docs |

### Key API Endpoints

| Module | Method | Endpoint |
|---|---|---|
| Auth | `POST` | `/auth/login` |
| Auth | `POST` | `/auth/register` |
| Auth | `POST` | `/auth/refresh` |
| Auth | `GET` | `/auth/me` |
| Organizations | `GET/POST` | `/api/v1/schools` |
| Organizations | `GET/POST` | `/api/v1/departments` |
| Organizations | `GET/POST` | `/api/v1/hubs` |
| Users | `GET/PUT` | `/api/v1/users/profile` |
| Innovations | `GET/POST` | `/api/v1/innovations` |
| Reviews | `POST` | `/api/v1/reviews/assign` |
| Reviews | `POST` | `/api/v1/reviews/evaluate` |
| Startups | `GET/POST` | `/api/v1/startups` |
| Mentorship | `GET/POST` | `/api/v1/mentorship/sessions` |
| Funding | `GET/POST` | `/api/v1/funding/programs` |
| Competitions | `GET/POST` | `/api/v1/competitions` |
| Documents | `GET/POST` | `/api/v1/documents` |
| Notifications | `GET` | `/api/v1/notifications` |
| Dashboard | `GET` | `/api/v1/dashboard/widgets` |
| Showcase | `GET` | `/api/v1/showcase` |

---

*Maintained by the State University of Zanzibar (SUZA) — Innovation Management System Engineering Team.*
