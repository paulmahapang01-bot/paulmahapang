# Evergreen EPCM — Project Management File

**Application:** Evergreen EPCM (Engineering, Procurement, Construction & Management)
**Document Owner:** Paul Mahapang
**Last Updated:** 2026-09-06
**Status:** Living document — update as the project progresses

---

## Contents

- [ ] [Project Scope Statement](#1-project-scope-statement)
- [ ] [Project Risk Register](#2-project-risk-register)
- [ ] [Requirements Register](#3-requirements-register)
- [ ] [Activity List](#4-activity-list)
- [ ] [Completed Activities](#5-completed-activities)

---

## 1. Project Scope Statement

### 1.1 Project Purpose
Evergreen EPCM is a platform intended to support Engineering, Procurement, Construction, and Management (EPCM) workflows — giving project stakeholders a single application to plan, track, and report on project delivery from initiation through close-out.

### 1.2 Objectives
- Provide a centralized system for managing EPCM project data (scope, schedule, cost, risk, and quality).
- Improve visibility into project status for stakeholders and decision-makers.
- Standardize project documentation and reporting across engagements.
- Reduce manual tracking overhead through structured, reusable templates (scope, risk, requirements, activities).

### 1.3 In Scope
- Project initiation documentation (charter, scope statement).
- Risk identification, assessment, and tracking (risk register).
- Requirements gathering and traceability (requirements register).
- Work breakdown and activity tracking (activity list, completed activities log).
- Ongoing project status reporting.

### 1.4 Out of Scope
- Financial/accounting system integration (unless explicitly added in a future phase).
- Third-party procurement platform integrations (to be evaluated separately).
- Detailed engineering design deliverables (handled by discipline-specific tools, not this PM file).

### 1.5 Key Deliverables
| Deliverable | Description |
|---|---|
| Project Scope Statement | Defines boundaries, objectives, and exclusions of the project. |
| Project Risk Register | Log of identified risks, their impact, likelihood, and mitigation plans. |
| Requirements Register | Traceable list of functional and non-functional requirements. |
| Activity List | Planned tasks/work items required to deliver the project. |
| Completed Activities Log | Historical record of finished work items. |

### 1.6 Assumptions
- Stakeholders will provide timely feedback on requirements and scope changes.
- Resources (people, tools) will be available as planned.

### 1.7 Constraints
- Delivery timelines are dependent on stakeholder availability.
- Budget and resourcing are to be confirmed per phase.

### 1.8 Stakeholders
| Name/Role | Interest |
|---|---|
| Project Owner | Overall accountability for delivery |
| Project Team | Execution of activities |
| End Users | Consumers of the EPCM application |

---

## 2. Project Risk Register

| ID | Risk Description | Category | Likelihood | Impact | Risk Rating | Mitigation Strategy | Owner | Status |
|----|-------------------|----------|------------|--------|--------------|----------------------|-------|--------|
| R-001 | Scope creep due to evolving stakeholder requirements | Scope | Medium | High | High | Formal change control process; baseline scope sign-off | Project Owner | Open |
| R-002 | Delay in requirements gathering from stakeholders | Schedule | Medium | Medium | Medium | Set clear deadlines; escalate blockers early | Project Team | Open |
| R-003 | Resource availability constraints (people/tools) | Resource | Low | High | Medium | Cross-train team members; identify backup resources | Project Owner | Open |
| R-004 | Incomplete or ambiguous requirements leading to rework | Quality | Medium | Medium | Medium | Maintain requirements traceability; peer review of requirements | Project Team | Open |
| R-005 | Lack of version control/documentation discipline | Process | Low | Medium | Low | Maintain this PM file under source control with regular updates | Project Owner | Open |

**Legend:**
- **Likelihood / Impact:** Low, Medium, High
- **Risk Rating:** Combination of Likelihood × Impact (Low, Medium, High, Critical)
- **Status:** Open, Monitoring, Mitigated, Closed

> Add new risks as rows to this table as they are identified. Do not delete closed risks — update their Status instead, to preserve project history.

---

## 3. Requirements Register

| ID | Requirement Description | Type | Priority | Source | Status |
|----|--------------------------|------|----------|--------|--------|
| REQ-001 | The application shall maintain a project scope statement defining objectives, boundaries, and exclusions. | Functional | High | Project Owner | Open |
| REQ-002 | The application shall maintain a risk register capturing risk description, likelihood, impact, mitigation, and owner. | Functional | High | Project Owner | Open |
| REQ-003 | The application shall maintain a requirements register with traceability from requirement to status. | Functional | High | Project Owner | Open |
| REQ-004 | The application shall maintain an activity list of planned work items with owners and due dates. | Functional | High | Project Owner | Open |
| REQ-005 | The application shall maintain a log of completed activities for historical tracking. | Functional | High | Project Owner | Open |
| REQ-006 | The project management file shall be maintained in Markdown format for portability and version control. | Non-Functional | Medium | Project Owner | Closed |

**Legend:**
- **Type:** Functional, Non-Functional
- **Priority:** Low, Medium, High
- **Status:** Open, In Progress, Closed, Deferred

---

## 4. Activity List

| ID | Activity | Owner | Priority | Due Date | Status |
|----|----------|-------|----------|----------|--------|
| A-001 | Define project charter for Evergreen EPCM | Project Owner | High | TBD | Not Started |
| A-002 | Conduct stakeholder identification and analysis | Project Team | High | TBD | Not Started |
| A-003 | Elaborate detailed functional requirements | Project Team | High | TBD | Not Started |
| A-004 | Develop project schedule / work breakdown structure | Project Team | Medium | TBD | Not Started |
| A-005 | Set up version control and documentation standards | Project Owner | Medium | TBD | Not Started |
| A-006 | Review and validate risk register with stakeholders | Project Owner | Medium | TBD | Not Started |

> Update Status to `In Progress`, `Blocked`, or `Completed` as work proceeds. When an activity is completed, move it to the [Completed Activities](#5-completed-activities) section below with its completion date.

---

## 5. Completed Activities

| ID | Activity | Owner | Completion Date | Notes |
|----|----------|-------|------------------|-------|
| A-000 | Created initial project management file (scope, risk register, requirements register, activity list, completed activities log) | Claude (on behalf of Project Owner) | 2026-09-06 | Initial baseline document established. |

> This log is append-only — once an activity is recorded here, do not remove it. It serves as the historical audit trail for the project.

---

*This document should be reviewed and updated regularly as the Evergreen EPCM project progresses.*
