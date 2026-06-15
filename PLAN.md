# PLAN.md — FactoryMind AI

## 1. Project Overview

**FactoryMind AI** adalah aplikasi **Smart Manufacturing Operations Dashboard** berbasis web yang mensimulasikan sistem enterprise untuk memantau kondisi mesin produksi secara realtime, menerima data sensor IoT melalui MQTT, menyimpan data ke database relasional, mendeteksi anomali, membuat laporan operasional otomatis dengan AI/LLM, dan mengelola maintenance ticket melalui integrasi sistem legacy PHP/Laravel.

Project ini dibuat sebagai portfolio full-stack AI application dengan fokus pada:

- Full-stack web development
- Enterprise dashboard
- Realtime system
- IoT simulation
- MQTT messaging
- REST API integration
- Relational database design
- AI/ML anomaly detection
- Generative AI report assistant
- Legacy PHP/Laravel integration
- Testing, documentation, and deployment

---

## 2. Main Goal

Membangun aplikasi end-to-end yang menunjukkan kemampuan dalam membuat sistem bisnis nyata, bukan hanya demo sederhana.

Target utama project:

1. Menampilkan dashboard monitoring mesin secara realtime.
2. Mengirim data sensor simulasi menggunakan MQTT.
3. Memproses dan menyimpan data sensor ke database.
4. Mengirim update realtime ke frontend menggunakan Socket.IO.
5. Mendeteksi anomali dari data mesin.
6. Menghasilkan laporan harian otomatis menggunakan LLM.
7. Menyediakan AI assistant untuk membantu analisis kondisi mesin.
8. Mengintegrasikan sistem maintenance ticket berbasis Laravel/PHP sebagai simulasi legacy system.
9. Menyediakan dokumentasi arsitektur, database, API, testing, dan deployment.

---

## 3. Target Portfolio Positioning

Project ini diposisikan untuk role:

- Full-Stack Developer
- Full-Stack AI Application Engineer
- AI Product Engineer
- Junior AI Engineer
- Software Engineer for Enterprise Applications
- Computer Vision / IoT / Manufacturing Software Developer
- Backend Developer with AI Integration

Kalimat singkat untuk menjelaskan project:

> FactoryMind AI is a smart manufacturing dashboard built with Next.js, Node.js, MySQL, MQTT, Socket.IO, Laravel, and AI integration. It monitors simulated machine sensor data in realtime, detects anomalies, generates AI-powered daily reports, and manages maintenance tickets through a legacy system integration.

---

## 4. Tech Stack

### 4.1 Frontend

- Next.js
- React.js
- TypeScript
- Tailwind CSS
- Socket.IO Client
- Recharts / Chart.js
- React Hook Form
- Zod
- TanStack Query

### 4.2 Backend API

- Node.js
- Express.js or NestJS
- TypeScript
- Socket.IO Server
- REST API
- JWT Authentication
- Zod / Joi validation
- Prisma ORM or Drizzle ORM

### 4.3 Database

Primary option:

- MySQL

Free cloud option:

- TiDB Cloud Starter, MySQL-compatible

Local development option:

- MySQL Docker container

### 4.4 MQTT / IoT Simulation

- MQTT.js
- Mosquitto local broker
- HiveMQ Cloud free broker
- MQTT simulator script using Node.js or Python

### 4.5 AI / ML

For anomaly detection:

- Python
- FastAPI
- scikit-learn
- pandas
- numpy
- Isolation Forest / Random Forest / rule-based threshold

For Generative AI:

- Gemini API free tier
- OpenAI-compatible interface optional
- Mock AI response fallback for demo mode

### 4.6 Legacy System

- Laravel API
- PHP Native alternative
- MySQL database connection
- REST endpoint for maintenance tickets

### 4.7 DevOps

- Docker
- Docker Compose
- GitHub Actions
- Vercel for frontend
- Render / Railway / Fly.io optional for backend
- Hugging Face Spaces optional for ML service
- GitHub repository

### 4.8 Testing

- Vitest / Jest
- Supertest
- React Testing Library
- Playwright optional
- Postman / Bruno / Insomnia for API testing

---

## 5. High-Level Architecture

```txt
┌────────────────────────┐
│ MQTT Sensor Simulator  │
│ Machine A, B, C        │
└───────────┬────────────┘
            │
            │ Publish sensor data
            ▼
┌────────────────────────┐
│ MQTT Broker            │
│ Mosquitto / HiveMQ     │
└───────────┬────────────┘
            │
            │ Subscribe
            ▼
┌────────────────────────┐
│ Node.js Backend API    │
│ REST + Socket.IO       │
└──────┬─────────┬───────┘
       │         │
       │         │ Emit realtime update
       │         ▼
       │  ┌─────────────────────┐
       │  │ Next.js Dashboard   │
       │  │ Realtime UI         │
       │  └─────────────────────┘
       │
       │ Store sensor logs
       ▼
┌────────────────────────┐
│ MySQL Database         │
│ machines, logs, alerts │
└───────────┬────────────┘
            │
            │ Analyze historical data
            ▼
┌────────────────────────┐
│ AI / ML Service        │
│ Anomaly Detection      │
└───────────┬────────────┘
            │
            │ Generate insights
            ▼
┌────────────────────────┐
│ LLM Assistant          │
│ Report + Q&A           │
└────────────────────────┘

┌────────────────────────┐
│ Laravel Legacy System  │
│ Maintenance Tickets    │
└───────────┬────────────┘
            │ REST API
            ▼
┌────────────────────────┐
│ Node.js Backend API    │
└────────────────────────┘
```

---

## 6. Repository Structure

```txt
factorymind-ai/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── tests/
│   │
│   ├── api/
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── sockets/
│   │   │   ├── mqtt/
│   │   │   ├── middleware/
│   │   │   └── tests/
│   │   └── package.json
│   │
│   ├── ml-service/
│   │   ├── app/
│   │   ├── models/
│   │   ├── datasets/
│   │   ├── notebooks/
│   │   └── requirements.txt
│   │
│   └── legacy-maintenance/
│       ├── app/
│       ├── routes/
│       ├── database/
│       └── tests/
│
├── packages/
│   ├── database/
│   │   ├── prisma/
│   │   └── migrations/
│   │
│   └── shared/
│       ├── types/
│       └── validators/
│
├── mqtt-simulator/
│   ├── src/
│   ├── machines.json
│   └── package.json
│
├── docs/
│   ├── architecture.md
│   ├── database-schema.md
│   ├── api-spec.md
│   ├── mqtt-topics.md
│   ├── ai-design.md
│   ├── deployment.md
│   └── demo-script.md
│
├── screenshots/
├── docker-compose.yml
├── .env.example
├── README.md
└── PLAN.md
```

---

## 7. Core Modules

## 7.1 Authentication Module

### Purpose

Mengatur akses user berdasarkan role.

### Roles

- Admin
- Operator
- Maintenance Engineer
- Manager

### Features

- Login
- Logout
- JWT authentication
- Protected routes
- Role-based access control

### Pages

- `/login`
- `/dashboard`
- `/machines`
- `/alerts`
- `/reports`
- `/maintenance`
- `/settings`

---

## 7.2 Machine Monitoring Module

### Purpose

Menampilkan kondisi mesin secara realtime.

### Features

- Machine status card
- Temperature chart
- Vibration chart
- Pressure chart
- Production counter
- Machine health score
- Last update timestamp
- Realtime status update

### Machine Status

```txt
NORMAL
WARNING
CRITICAL
DOWNTIME
MAINTENANCE
```

### Example UI Components

- MachineStatusCard
- MachineHealthChart
- SensorMetricCard
- RealtimeAlertTable
- DowntimeSummaryCard

---

## 7.3 MQTT Sensor Simulator

### Purpose

Mensimulasikan data sensor mesin tanpa perlu membeli hardware IoT.

### Simulated Machines

```txt
Machine A - Conveyor Line
Machine B - CNC Machine
Machine C - Packaging Machine
```

### Sensor Fields

```json
{
  "machineId": "MCH-001",
  "temperature": 72.5,
  "vibration": 2.3,
  "pressure": 101.4,
  "productionCount": 1280,
  "status": "NORMAL",
  "timestamp": "2026-06-16T10:00:00Z"
}
```

### MQTT Topics

```txt
factory/machines/MCH-001/sensors
factory/machines/MCH-002/sensors
factory/machines/MCH-003/sensors
factory/machines/+/sensors
```

### Simulator Behavior

- Publish data every 2-5 seconds.
- Generate normal data most of the time.
- Randomly generate warning data.
- Randomly generate critical anomaly.
- Randomly simulate downtime event.

---

## 7.4 Backend API Module

### Purpose

Menjadi pusat komunikasi antara frontend, database, MQTT broker, AI service, dan legacy system.

### Responsibilities

- Subscribe to MQTT topics.
- Validate incoming sensor payload.
- Save sensor logs to database.
- Detect alert condition.
- Emit realtime updates through Socket.IO.
- Serve REST API to frontend.
- Request anomaly analysis from ML service.
- Request report generation from LLM service.
- Fetch maintenance ticket from Laravel legacy system.

### Main API Groups

```txt
/auth
/users
/machines
/sensor-logs
/alerts
/reports
/ai
/maintenance
```

---

## 7.5 Realtime Communication Module

### Purpose

Mengirim perubahan status mesin ke dashboard tanpa refresh halaman.

### Technology

- Socket.IO

### Socket Events

Server emits:

```txt
machine:update
sensor:new
alert:new
alert:resolved
report:generated
maintenance:created
```

Client emits:

```txt
dashboard:join
dashboard:leave
machine:subscribe
machine:unsubscribe
```

### Example Event Payload

```json
{
  "event": "machine:update",
  "data": {
    "machineId": "MCH-002",
    "status": "WARNING",
    "temperature": 89.4,
    "vibration": 5.7,
    "timestamp": "2026-06-16T10:00:00Z"
  }
}
```

---

## 7.6 AI Anomaly Detection Module

### Purpose

Mendeteksi kondisi mesin yang tidak normal berdasarkan sensor logs.

### MVP Approach

Gunakan pendekatan hybrid:

1. Rule-based threshold untuk deteksi cepat.
2. Moving average untuk melihat tren.
3. Isolation Forest untuk anomaly detection sederhana.

### Example Rules

```txt
IF temperature > 85 AND vibration > 5
THEN severity = CRITICAL

IF temperature > 78 OR vibration > 4
THEN severity = WARNING

IF no sensor data received for more than 60 seconds
THEN status = DOWNTIME
```

### ML Service Endpoints

```txt
POST /predict/anomaly
POST /predict/batch
GET /health
```

### Example Request

```json
{
  "machineId": "MCH-002",
  "temperature": 89.4,
  "vibration": 5.7,
  "pressure": 103.2,
  "productionCount": 900
}
```

### Example Response

```json
{
  "machineId": "MCH-002",
  "isAnomaly": true,
  "severity": "CRITICAL",
  "confidence": 0.92,
  "reason": "High temperature and vibration detected.",
  "recommendedAction": "Inspect bearing and cooling system."
}
```

---

## 7.7 Generative AI Report Module

### Purpose

Menghasilkan laporan operasional harian secara otomatis dari data sensor, alert, downtime, dan maintenance ticket.

### Features

- Generate daily report.
- Generate weekly summary.
- Generate machine-specific report.
- Summarize alerts.
- Recommend maintenance actions.
- Export report as markdown or PDF in future version.

### AI Provider

Primary:

- Gemini API free tier

Fallback:

- Mock response
- Local Ollama optional

### Demo Mode

Project wajib memiliki `DEMO_MODE`.

```env
DEMO_MODE=true
AI_PROVIDER=mock
```

Jika demo mode aktif:

- Tidak memanggil API berbayar.
- Response AI berasal dari template.
- Recruiter tetap bisa melihat fitur AI tanpa quota API.

### Example Prompt Input

```txt
You are an AI manufacturing operations assistant.

Analyze the following machine data:
- Machine B had 4 warning alerts today.
- Average temperature increased by 18%.
- Vibration exceeded threshold 3 times.
- Total downtime: 42 minutes.
- Open maintenance ticket: Inspect spindle bearing.

Generate a concise daily operations report with:
1. Summary
2. Main issue
3. Risk level
4. Recommended action
5. Next step
```

### Example AI Output

```txt
Daily Operations Report

Machine B showed signs of performance degradation today. The average temperature increased by 18%, while vibration exceeded the safe threshold three times. Total downtime reached 42 minutes.

Risk Level: High

Main Issue:
The combination of rising temperature and abnormal vibration indicates a possible bearing or cooling system issue.

Recommended Action:
Schedule immediate inspection of the spindle bearing and cooling system.

Next Step:
Create a high-priority maintenance ticket and monitor Machine B every 30 minutes until the issue is resolved.
```

---

## 7.8 AI Maintenance Assistant Module

### Purpose

Menyediakan chat assistant untuk membantu user memahami kondisi mesin dan rekomendasi tindakan.

### Example Questions

```txt
Why is Machine B in warning state?
Which machine has the highest downtime today?
Generate a maintenance recommendation for Machine C.
Summarize all critical alerts this week.
What should the operator check first?
```

### Assistant Data Sources

- Machine table
- Sensor logs
- Alerts
- Maintenance tickets
- Report history
- SOP documents in future version

### MVP Limitation

Untuk MVP, AI assistant hanya membaca data yang sudah diringkas oleh backend. Tidak perlu langsung membangun RAG yang kompleks.

---

## 7.9 Maintenance Ticket Module

### Purpose

Mengelola pekerjaan maintenance berdasarkan alert atau rekomendasi AI.

### Features

- Create ticket
- Update ticket status
- Assign priority
- Link ticket to machine
- Link ticket to alert
- View open and closed ticket
- Fetch ticket from Laravel legacy API

### Ticket Status

```txt
OPEN
IN_PROGRESS
RESOLVED
CLOSED
```

### Priority

```txt
LOW
MEDIUM
HIGH
CRITICAL
```

---

## 7.10 Legacy Laravel Integration Module

### Purpose

Mensimulasikan integrasi dengan sistem lama perusahaan.

### Why This Exists

Banyak perusahaan enterprise masih memiliki sistem lama berbasis PHP Native, Laravel, atau CodeIgniter. Project ini menunjukkan kemampuan untuk mengintegrasikan aplikasi modern Next.js/Node.js dengan sistem legacy.

### Laravel Features

- Maintenance ticket API
- Spare part request API optional
- Basic CRUD
- MySQL connection
- API token authentication

### Laravel API Endpoints

```txt
GET /api/tickets
POST /api/tickets
GET /api/tickets/{id}
PATCH /api/tickets/{id}
DELETE /api/tickets/{id}
```

### Node.js Integration

Node.js backend akan memanggil Laravel API, lalu meneruskan data ke frontend.

```txt
Next.js → Node.js API → Laravel API → MySQL
```

---

## 8. Database Design

## 8.1 Tables

### users

```txt
id
name
email
password_hash
role
created_at
updated_at
```

### machines

```txt
id
code
name
location
type
status
health_score
last_seen_at
created_at
updated_at
```

### sensor_logs

```txt
id
machine_id
temperature
vibration
pressure
production_count
status
created_at
```

### alerts

```txt
id
machine_id
sensor_log_id
severity
title
message
is_resolved
resolved_at
created_at
```

### maintenance_tickets

```txt
id
machine_id
alert_id
title
description
priority
status
assigned_to
source
created_at
updated_at
```

### ai_reports

```txt
id
report_type
title
summary
content
start_date
end_date
generated_by
created_at
```

### ai_chat_messages

```txt
id
user_id
role
message
metadata
created_at
```

---

## 8.2 Relationships

```txt
users 1---N ai_chat_messages

machines 1---N sensor_logs
machines 1---N alerts
machines 1---N maintenance_tickets

sensor_logs 1---N alerts

alerts 1---N maintenance_tickets
```

---

## 8.3 Query Optimization Plan

Indexes:

```txt
machines.code
machines.status
sensor_logs.machine_id
sensor_logs.created_at
alerts.machine_id
alerts.severity
alerts.is_resolved
maintenance_tickets.machine_id
maintenance_tickets.status
ai_reports.created_at
```

Common queries:

```sql
SELECT *
FROM sensor_logs
WHERE machine_id = ?
ORDER BY created_at DESC
LIMIT 100;
```

```sql
SELECT severity, COUNT(*)
FROM alerts
WHERE created_at BETWEEN ? AND ?
GROUP BY severity;
```

```sql
SELECT *
FROM maintenance_tickets
WHERE status IN ('OPEN', 'IN_PROGRESS')
ORDER BY created_at DESC;
```

---

## 9. API Design

## 9.1 Auth API

```txt
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

## 9.2 Machine API

```txt
GET    /api/machines
GET    /api/machines/:id
POST   /api/machines
PATCH  /api/machines/:id
DELETE /api/machines/:id
GET    /api/machines/:id/sensor-logs
GET    /api/machines/:id/alerts
```

## 9.3 Sensor API

```txt
GET  /api/sensor-logs
GET  /api/sensor-logs/latest
GET  /api/sensor-logs/summary
POST /api/sensor-logs
```

## 9.4 Alert API

```txt
GET   /api/alerts
GET   /api/alerts/:id
PATCH /api/alerts/:id/resolve
```

## 9.5 Report API

```txt
GET  /api/reports
GET  /api/reports/:id
POST /api/reports/generate-daily
POST /api/reports/generate-weekly
```

## 9.6 AI API

```txt
POST /api/ai/analyze-machine
POST /api/ai/generate-report
POST /api/ai/chat
```

## 9.7 Maintenance API

```txt
GET   /api/maintenance/tickets
POST  /api/maintenance/tickets
GET   /api/maintenance/tickets/:id
PATCH /api/maintenance/tickets/:id
```

---

## 10. Frontend Pages

## 10.1 Login Page

Path:

```txt
/login
```

Features:

- Login form
- Basic validation
- Error message
- Redirect to dashboard after login

---

## 10.2 Dashboard Page

Path:

```txt
/dashboard
```

Features:

- Total machines
- Running machines
- Warning machines
- Critical machines
- Downtime machines
- Realtime machine status
- Latest alerts
- Production summary
- AI insight card

---

## 10.3 Machines Page

Path:

```txt
/machines
```

Features:

- Machine list
- Search and filter
- Status badge
- Health score
- Last update

---

## 10.4 Machine Detail Page

Path:

```txt
/machines/[id]
```

Features:

- Machine profile
- Sensor chart
- Latest sensor logs
- Alerts
- Maintenance tickets
- AI analysis button

---

## 10.5 Alerts Page

Path:

```txt
/alerts
```

Features:

- Alert table
- Severity filter
- Resolve alert
- Create maintenance ticket from alert

---

## 10.6 Reports Page

Path:

```txt
/reports
```

Features:

- Generated report list
- Generate daily report button
- Generate weekly report button
- Report detail view
- Copy report as markdown

---

## 10.7 AI Assistant Page

Path:

```txt
/assistant
```

Features:

- Chat interface
- Suggested questions
- Machine context selector
- AI-generated recommendation

---

## 10.8 Maintenance Page

Path:

```txt
/maintenance
```

Features:

- Ticket list
- Ticket status
- Priority badge
- Create ticket
- Update ticket
- Legacy source indicator

---

## 11. End-to-End Data Flow

## 11.1 Sensor Data Flow

```txt
1. MQTT simulator generates machine sensor data.
2. Simulator publishes payload to topic factory/machines/{machineId}/sensors.
3. MQTT broker receives payload.
4. Node.js backend subscribes to factory/machines/+/sensors.
5. Backend validates payload.
6. Backend saves data to sensor_logs table.
7. Backend updates machine status.
8. Backend checks rule-based anomaly threshold.
9. Backend creates alert if needed.
10. Backend emits machine:update and alert:new via Socket.IO.
11. Next.js dashboard receives event.
12. UI updates chart, status card, and alert table in realtime.
```

---

## 11.2 AI Report Flow

```txt
1. User clicks Generate Daily Report.
2. Frontend calls POST /api/reports/generate-daily.
3. Backend queries sensor_logs, alerts, machines, and maintenance_tickets.
4. Backend summarizes data.
5. Backend sends summarized context to LLM provider or mock AI service.
6. LLM generates report.
7. Backend saves report to ai_reports table.
8. Backend returns generated report to frontend.
9. Frontend displays report.
```

---

## 11.3 AI Assistant Flow

```txt
1. User asks question in AI Assistant page.
2. Frontend sends message to POST /api/ai/chat.
3. Backend identifies context needed.
4. Backend fetches relevant machine data from database.
5. Backend builds structured prompt.
6. Backend calls LLM provider or mock response.
7. Backend stores chat message.
8. Backend returns answer.
9. Frontend displays assistant response.
```

---

## 11.4 Maintenance Ticket Flow

```txt
1. Alert is created from anomaly.
2. User clicks Create Maintenance Ticket.
3. Frontend sends request to Node.js API.
4. Node.js API forwards request to Laravel legacy API.
5. Laravel saves ticket.
6. Node.js API retrieves created ticket.
7. Node.js API emits maintenance:created via Socket.IO.
8. Frontend updates maintenance ticket table.
```

---

## 12. Environment Variables

```env
# General
NODE_ENV=development
DEMO_MODE=true

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000

# Backend
API_PORT=4000
JWT_SECRET=change-this-secret

# Database
DATABASE_URL=mysql://user:password@localhost:3306/factorymind

# MQTT
MQTT_BROKER_URL=mqtt://localhost:1883
MQTT_USERNAME=
MQTT_PASSWORD=

# AI
AI_PROVIDER=mock
GEMINI_API_KEY=
OPENAI_API_KEY=

# ML Service
ML_SERVICE_URL=http://localhost:8000

# Legacy Laravel
LEGACY_API_URL=http://localhost:5000/api
LEGACY_API_TOKEN=change-this-token
```

---

## 13. Demo Mode Strategy

Demo mode is required to keep this project free and reliable.

### When DEMO_MODE=true

- AI response uses mock templates.
- MQTT simulator still runs.
- Database still works.
- Realtime dashboard still works.
- No paid API call is required.

### When DEMO_MODE=false

- AI response uses selected provider.
- Gemini/OpenAI key is required.
- Backend should handle quota errors gracefully.

### Benefits

- Portfolio demo remains stable.
- Recruiter can test the project without API keys.
- Project still demonstrates AI integration pattern.

---

## 14. Testing Plan

## 14.1 Unit Tests

Frontend:

- Button rendering
- Machine status component
- Alert badge component
- Form validation

Backend:

- Payload validation
- Alert rule logic
- Report summary builder
- Auth middleware
- API service functions

ML Service:

- Prediction endpoint
- Rule-based anomaly logic
- Input validation

Laravel:

- Ticket CRUD
- API token middleware

---

## 14.2 Integration Tests

- MQTT payload → backend validation
- Backend → database insert
- Backend → Socket.IO emit
- Backend → ML service
- Backend → Laravel API
- Backend → AI provider mock

---

## 14.3 E2E Tests

Using Playwright optional.

Scenarios:

1. User logs in.
2. User opens dashboard.
3. Dashboard receives realtime machine data.
4. User opens machine detail.
5. User generates AI report.
6. User creates maintenance ticket from alert.
7. User resolves alert.

---

## 15. Deployment Plan

## 15.1 Local Development

Use Docker Compose for:

- MySQL
- Mosquitto MQTT broker
- Backend API
- ML service
- Laravel legacy app optional

Frontend can run locally with:

```bash
pnpm dev
```

---

## 15.2 Free Deployment Option

Frontend:

- Vercel Hobby

Backend:

- Render free alternative if available
- Railway trial/free option if available
- Fly.io free allowance if available
- Local demo video if free backend is unavailable

Database:

- TiDB Cloud Starter
- PlanetScale alternative if free tier is available
- Local MySQL for demo video

MQTT:

- HiveMQ Cloud free
- Mosquitto local for demo video

ML Service:

- Hugging Face Spaces CPU
- Local demo fallback

AI:

- Gemini API free tier
- Mock AI response fallback

---

## 16. Documentation Plan

Required documentation:

```txt
README.md
PLAN.md
docs/architecture.md
docs/database-schema.md
docs/api-spec.md
docs/mqtt-topics.md
docs/ai-design.md
docs/deployment.md
docs/demo-script.md
```

### README.md Content

Must include:

- Project description
- Business problem
- Tech stack
- Features
- Architecture diagram
- Screenshots
- How to run locally
- Environment variables
- Demo credentials
- API overview
- Testing instructions
- Deployment notes
- Future improvements

---

## 17. Git Workflow

Branch naming:

```txt
main
develop
feature/dashboard-ui
feature/backend-api
feature/mqtt-simulator
feature/socket-realtime
feature/ai-report
feature/legacy-laravel
feature/testing
fix/alert-rule
docs/readme
```

Commit style:

```txt
feat: add realtime machine dashboard
feat: implement mqtt sensor simulator
feat: integrate socket.io updates
feat: add ai daily report generator
feat: add laravel maintenance ticket api
fix: handle invalid mqtt payload
docs: add architecture documentation
test: add alert rule unit tests
```

---

## 18. Milestone Plan

## Milestone 1 — Project Setup

Goals:

- Setup monorepo
- Setup Next.js app
- Setup Node.js API
- Setup MySQL Docker
- Setup base documentation

Deliverables:

- Running frontend
- Running backend
- Database connected
- README initial draft

---

## Milestone 2 — Dashboard UI

Goals:

- Build main dashboard layout
- Build machine status cards
- Build charts
- Build alert table
- Build sidebar navigation

Deliverables:

- Static dashboard UI
- Dummy machine data
- Responsive layout

---

## Milestone 3 — Backend and Database

Goals:

- Create database schema
- Create REST APIs
- Connect frontend to backend
- Add machine and sensor endpoints

Deliverables:

- Working API
- MySQL tables
- Frontend reads backend data

---

## Milestone 4 — MQTT and Realtime

Goals:

- Build MQTT simulator
- Subscribe backend to MQTT broker
- Save sensor logs
- Emit realtime update via Socket.IO

Deliverables:

- Realtime dashboard
- Live sensor chart
- Live machine status

---

## Milestone 5 — Alert and Anomaly Detection

Goals:

- Add rule-based anomaly detection
- Create alert automatically
- Add alert severity
- Add alert resolve feature

Deliverables:

- Alerts created from sensor condition
- Alert page
- Realtime alert notification

---

## Milestone 6 — AI Report Generator

Goals:

- Build report summary query
- Add mock AI provider
- Add Gemini provider optional
- Save generated reports

Deliverables:

- Generate daily report
- Report page
- AI fallback mode

---

## Milestone 7 — AI Assistant

Goals:

- Build chat UI
- Add backend chat endpoint
- Create context builder from database
- Add suggested questions

Deliverables:

- Working manufacturing assistant
- Machine-specific Q&A
- Stored chat history optional

---

## Milestone 8 — Legacy Laravel Integration

Goals:

- Setup Laravel mini app
- Create ticket CRUD API
- Connect Node.js API to Laravel API
- Display tickets in Next.js

Deliverables:

- Legacy maintenance module
- Integrated ticket management
- Create ticket from alert

---

## Milestone 9 — Testing and Quality

Goals:

- Add unit tests
- Add API tests
- Add basic frontend tests
- Add linting and formatting

Deliverables:

- Passing tests
- GitHub Actions workflow
- Cleaner codebase

---

## Milestone 10 — Deployment and Portfolio Polish

Goals:

- Deploy frontend
- Prepare backend deployment or demo video
- Add screenshots
- Add demo credentials
- Improve README
- Record demo video

Deliverables:

- Portfolio-ready repository
- Live demo or recorded demo
- Final documentation

---

## 19. MVP Feature Priority

## Must Have

- Next.js dashboard
- Node.js REST API
- MySQL schema
- MQTT simulator
- Socket.IO realtime updates
- Machine status and sensor logs
- Alert generation
- AI daily report with mock mode
- README and architecture documentation

## Should Have

- Gemini API integration
- AI assistant
- Maintenance ticket module
- Docker Compose
- Unit tests
- Demo video

## Nice to Have

- Laravel legacy integration
- GraphQL API
- PDF report export
- SOP document RAG
- Role-based access control
- Advanced ML model
- CI/CD pipeline

---

## 20. Success Criteria

Project dianggap portfolio-ready jika memenuhi kriteria berikut:

1. Bisa dijalankan secara lokal dengan dokumentasi yang jelas.
2. Dashboard menampilkan data mesin secara realtime.
3. MQTT simulator berhasil mengirim data.
4. Backend berhasil menyimpan sensor logs ke database.
5. Alert otomatis muncul saat data abnormal.
6. AI report bisa di-generate tanpa API berbayar melalui demo mode.
7. Struktur database jelas dan terdokumentasi.
8. Ada minimal beberapa unit test.
9. README menjelaskan business problem, architecture, features, and setup.
10. Ada screenshot atau demo video.
11. Project bisa dijelaskan dalam 2-3 menit saat interview.

---

## 21. Interview Talking Points

Use these points when explaining the project:

1. This project simulates a real manufacturing operations system.
2. MQTT is used to simulate IoT machine sensor communication.
3. Socket.IO is used to deliver realtime updates to the dashboard.
4. MySQL is used to store machine, sensor, alert, report, and ticket data.
5. AI anomaly detection helps identify abnormal machine behavior.
6. LLM integration generates daily operation reports.
7. Demo mode keeps the project free and reliable.
8. Laravel legacy module simulates integration with existing enterprise systems.
9. The system is designed with modular architecture.
10. The project demonstrates full-stack engineering, AI integration, realtime system, and enterprise problem-solving.

---

## 22. Future Improvements

Potential future enhancements:

- Add SOP document upload and RAG-based assistant.
- Add predictive maintenance model using historical data.
- Add user activity logs.
- Add PDF export for reports.
- Add email notification for critical alerts.
- Add role-based dashboard for manager and operator.
- Add advanced data visualization.
- Add Kubernetes deployment example.
- Add Prometheus and Grafana monitoring.
- Add Microsoft SQL Server support.
- Add CodeIgniter legacy integration alternative.

---

## 23. Final Project Summary

FactoryMind AI is an end-to-end full-stack AI portfolio project designed to simulate a real enterprise manufacturing system. It combines Next.js, Node.js, MySQL, MQTT, Socket.IO, Laravel, and AI/ML features into one practical business application.

The project is intentionally designed to be free to build as a student, while still demonstrating high-impact engineering skills required by modern full-stack and AI-related job roles.
