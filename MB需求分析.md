# 1. Document Information

- Project Name：Mandobuddy (Tentative)
- Product Form：Web (PC & H5 Responsive) + Admin Backend (Web)
- Target Users：Overseas Chinese Learners (Beginner / Elementary / Intermediate)
- Current Date：2026-04-20
- Document Version：V1.0 (Requirement Analysis Draft)

------

# 2. Project Background & Value

## 2.1 Background

The global demand for overseas Chinese learning keeps growing. However, learners usually face unclear self-study paths, insufficient practice and feedback, and weak review mechanisms, resulting in low learning efficiency and high user churn. Mature mainstream products build a closed-loop learning system through graded courses, multi-type exercises, error & vocabulary review, and data dashboards.

## 2.2 Core Pain Points

- Fragmented learning content without systematic paths or phased goals
- Insufficient listening, speaking, reading and writing practice with limited feedback, especially for oral training
- Difficulty in practical application after learning, lacking high-frequency scenario training and transferable expressions
- Inefficient review: errors and new words cannot be automatically reviewed, leading to rapid forgetting
- High learning barriers for foreign users in Pinyin tones, word order, measure words and Chinese character structures

## 2.3 Value Proposition

Mandobuddy provides **graded learning paths, scenario-based content, integrated learning-practice-assessment system, and data-driven review**, helping learners clarify learning content, practice methods, weak points and improvement solutions. Meanwhile, operators can continuously optimize content and improve user retention.

------

# 3. Project Goals & Scope

## 3.1 Project Goals

1. Establish a hierarchical curriculum system for beginner, elementary and intermediate learners, forming an expandable content framework
2. Offer diversified exercises with instant feedback to reduce frustration and improve course completion rate
3. Build a closed-loop learning tracking and review system, including error notebooks, favorites and review tasks
4. Support bilingual interfaces, streamlined workflows and responsive design to enhance usability for overseas users
5. Develop a backend management system for content and question banks to support rapid content updates and optimization

## 3.2 Project Scope

### In Scope (Phase 1)

- Frontend: account system, graded courses, exercises, basic listening & oral shadowing, learning center, personal center
- Backend: user management, course management, question bank management, data statistics, system settings
- General capabilities: bilingual support (Chinese & English), resource uploading, permission control, operation logs, basic risk control

### Out of Scope (Excluded / Future Iteration)

- Native mobile applications (iOS/Android)
- AI free conversation practice & automatic oral scoring (reserved for V2)
- Live classes and one-on-one tutor scheduling system (future product line)
- Complex social functions (friends, community feeds, dynamics) (to be developed later)

------

# 4. Users & Scenarios

## 4.1 Role Definition

### Frontend Roles

- Guest: browse partial content with registration guidance
- Registered Learner: complete courses and exercises, collect content, review errors, view learning progress

### Backend Roles

- Content Editor: maintain courses, question banks and learning resources
- Operation Staff: view data statistics, adjust content recommendation and online status, process user requests
- Administrator: configure permissions, system settings, audit logs and data backup

## 4.2 User Learning Levels

- L0 Absolute Beginner: Pinyin, tones, basic Chinese characters and daily expressions
- L1 Elementary: high-frequency vocabulary, basic grammar and daily scenario dialogues
- L2 Intermediate: complex sentence structures, listening comprehension, expressive fluency and fundamental reading & writing

## 4.3 Typical Use Cases

- Fragmented Commute Learning: finish one lesson or a set of exercises within 5–10 minutes
- Travel Emergency Learning: rapid training for dining, navigation, shopping and check-in scenarios
- Systematic Long-term Learning: follow graded courses with daily progress and regular review
- Exam-oriented Learning (Optional): map knowledge points to HSK standards (enhanced in later versions)

------

# 5. Information Architecture & Module Overview

## 5.1 Frontend Navigation

- Homepage (Learning Dashboard)
- Courses (categorized by level, theme and unit)
- Exercises (course-related training & skill-based practice: listening, vocabulary, grammar)
- Listening & Speaking (scenario-based materials and shadowing practice)
- Learning Center (progress calendar, review tasks, error notebook, vocabulary favorites)
- Personal Center (account settings and learning preferences)

## 5.2 Backend Navigation

- Dashboard (core data overview)
- User Management
- Course Management (levels, units, lessons and content blocks)
- Question Bank Management (question editing, knowledge points, bulk import)
- Resource Management (audio & image files)
- Data Statistics (content effectiveness, exercise performance and knowledge point analysis)
- System Settings (permissions, languages, site configuration, backup and logs)

------

# 6. Frontend Functional Requirements

> Each module includes function points, core rules and minimum acceptance criteria (AC)

## 6.1 Account & Authentication

### 6.1.1 Registration

- Email & password registration
- Email verification (enabled by default; optional for MVP but highly recommended)
- Onboarding guide: select Chinese proficiency (L0/L1/L2) and learning goals (travel / work / hobby / exam)
- Automatically generate personalized learning paths and daily tasks for new users

**Rules**

- Password policy: minimum 8 characters, including letters and numbers (special characters optional)
- Unique email restriction with clear prompts for duplicate registration

**Acceptance Criteria**

- New users can complete registration within 2 minutes and view daily tasks on the homepage

### 6.1.2 Login & Logout

- Email & password login
- Remember login status (7/30 days)
- Log out independently; optional forced logout across all devices

### 6.1.3 Password Recovery & Modification

- Password reset via email verification code or reset link
- Password modification for logged-in users

### 6.1.4 User Profile

- Editable nickname, avatar, native language, learning goals and current level; prompt for path adjustment after level modification

------

## 6.2 Homepage Dashboard

### 6.2.1 New User View

- Product introduction, learning process and core advantages
- CTA entry: start learning (proficiency assessment → level selection → first lesson)

### 6.2.2 Returning User View

- Daily tasks: new lessons, review exercises and listening & speaking training
- Progress overview: current level, unit progress bar and consecutive learning days
- Intelligent recommendation: courses, exercises and scenario content based on learning history

**Rules**

- At least one clickable task entry to avoid empty status

------

## 6.3 Graded Course Learning

### 6.3.1 Standardized Course Structure

- Level (L0/L1/L2)

- Unit (theme, scenario or grammar-focused)

- Lesson (minimum closed-loop learning unit)

- Multiple content blocks inside each lesson:

  - Pinyin & pronunciation guidance
  - Chinese characters: structure, Pinyin, definition, radicals and stroke animation
  - Vocabulary: part of speech, definition, example sentences and audio
  - Grammar: explanations, example sentences and common error reminders
  - Texts & dialogues: sentence-by-sentence display with bilingual toggle
  - Segmented audio for single-sentence playback

  

### 6.3.2 Learning Page Capabilities

- Play / pause / loop playback; playback speed adjustment (0.75x / 1x / 1.25x)
- Bilingual text switch (default based on user language preferences)
- One-click collection for characters, words, sentences and grammar points
- Direct entry to post-lesson exercises after course completion

**Acceptance Criteria**

- Complete audio playback and course learning for any lesson; learning records are automatically saved to the learning center

------

## 6.4 Interactive Exercise System

### 6.4.1 Exercise Entries

- Lesson-specific exercises (bound to individual lessons)
- Skill-based specialized training (listening, vocabulary, grammar and characters)

### 6.4.2 Question Types

#### MVP Essential Types

- Single choice & multiple choice (vocabulary, grammar and scenario comprehension)
- Fill-in-the-blank questions (vocabulary & Pinyin completion)
- Listening judgment & audio-based selection

#### Expandable Types

- Matching exercises (character ↔ Pinyin ↔ definition)
- Sentence ordering
- Dictation (Pinyin / Chinese character input)
- Translation (English-Chinese & Chinese-English; keyword selection for semi-open answers)

### 6.4.3 Scoring & Explanation

- Instant scoring upon submission
- Display correct answers, detailed explanations and linked course knowledge points
- Automatically add incorrect answers to the error notebook; mark mastered questions manually (optional)

**Rules**

- Each question must include: stem, options (if applicable), correct answer, explanation, difficulty tag and knowledge point label
- Complete exercise records: answering duration, user responses, accuracy and related knowledge points

**Acceptance Criteria**

- Users can obtain scores and explanations after exercises; incorrect questions are synchronized to the error notebook; accuracy data is updated in the learning center

------

## 6.5 Scenario-Based Listening & Speaking

### 6.5.1 Listening Resource Library

- Scenario classification: greetings, dining, navigation, shopping, hotel check-in, etc.
- Each material includes audio, toggleable text, key vocabulary tips and supporting exercises

### 6.5.2 Recording & Shadowing (MVP: Record & Playback)

- One-click recording, local playback and audio preview
- Side-by-side comparison playback with standard pronunciation audio
- Configurable cloud upload for recorded audio (privacy-focused; local storage by default or user consent required)

### 6.5.3 Scripted Dialogue Simulation

- Fixed multi-round dialogue scripts
- Role selection (Role A / Role B) for targeted shadowing practice
- Completion statistics: dialogue rounds and shadowing frequency

------

## 6.6 Learning Center (Progress & Review Loop)

### 6.6.1 Learning Data Dashboard

- Learning duration (daily / weekly / total)
- Completed lessons, exercise frequency and average accuracy rate
- Consecutive learning streak and study calendar (highly recommended)

### 6.6.2 Error Notebook

- Automatic collection of incorrect questions, filtered by knowledge points, courses, question types and time
- Filtering functions and targeted re-practice entries
- Update mastery status after repeated correct answers (continuous correct marking for later iteration)

### 6.6.3 Favorites & Vocabulary Notebook

- Collectible content: characters, words, sentences, grammar points and exercises
- Batch review modes: flashcard mode & list mode

### 6.6.4 Simplified Review Plan (MVP)

- Daily tasks include targeted review: specified error questions and favorite content
- Upgradeable to SRS spaced repetition algorithm in later versions

------

## 6.7 Personal Center

- Profile editing: nickname, avatar, native language, learning goals and proficiency level
- Account security: password modification and account cancellation (optional for compliance)
- Personal content management: favorites, error records and learning history

------

# 7. Backend Management Functional Requirements

## 7.1 Login & Permission Control

- Independent backend login portal
- Role-based permission division: editor, operator and administrator
- Operation logs for course modification, question bank adjustment, user restriction and system setting changes

## 7.2 User Management

- User list: email, registration time, last active time, proficiency level, learning duration and account status
- User details: comprehensive learning records, accuracy rate, error quantity and favorite content
- Account status control: enable / disable accounts; optional password reset with audit records

## 7.3 Core Course Content Management

### 7.3.1 Course Structure Management

- Create, edit, delete, sort, online/offline control for Levels, Units and Lessons
- Customize unit & lesson covers, introductions and tags (scenarios, themes and grammar points)

### 7.3.2 Visual Content Block Editor

- Chinese character block: glyph, Pinyin, definition, radicals, stroke resources, example words & sentences, audio
- Vocabulary block: spelling, Pinyin, definition, part of speech, example sentences and audio
- Grammar block: grammar titles, detailed explanations, example sentences and common error reminders
- Dialogue block: sentence-by-sentence editing with matched audio and bilingual translations
- Segmented audio management: independent audio clips or timeline segmentation for each sentence

### 7.3.3 Resource Management

- Upload, preview, replacement and version management for audio & image files
- Resource reference detection: prompt associated lessons before file deletion

## 7.4 Question Bank Management

- Full CRUD operations for exam questions
- Configure question types, difficulty levels, knowledge point tags and associated courses
- Edit standard answers and detailed explanations
- Bulk import & export (CSV/Excel, implemented in V1.1 for operational efficiency)

## 7.5 Data Statistics & Operational Analysis

- User metrics: new registrations, active users and retention rate (D1/D7)
- Content metrics: course visits, lesson completion rate and exercise participation rate
- Knowledge point analysis: high-error knowledge point ranking and question accuracy distribution
- Optional funnel analysis: registration → first lesson → first exercise → 7-day retention

## 7.6 System Settings

- Site configuration: brand name, Logo, default language and email templates
- Permission management: role and menu authorization
- Data backup & export: core database export support
- Risk control configuration: verification codes and access frequency limits

------

# 8. Data & Rule Design

## 8.1 Core Data Objects (Conceptual Model)

- User
- Level / Unit / Lesson
- ContentBlock (characters, vocabulary, grammar, dialogues, audio clips)
- ExerciseSet (lesson & unit-bound exercise groups)
- Question
- Attempt (single answering record: user response, accuracy and duration)
- WrongItem (aggregated error records)
- Favorite (multi-type content collection)
- StudyRecord (lesson completion, learning duration and last learning position)

## 8.2 Error Notebook Generation Rules (MVP)

- Automatically generate error records for incorrect answers
- Core fields: first error time, latest error time, error frequency and recent answer status
- Mark as corrected after re-practice; mark as mastered after continuous correct answers (customizable rules)

## 8.3 Daily Task Generation Rules (Simplified MVP)

- New lessons: prioritize the next lesson in the current learning path
- Review tasks: extract high-frequency errors from the past 7 days
- Customizable daily quota: 1 new lesson + 10 exercises + 3 error reviews

## 8.4 Language & Content Display Rules

- UI copy: Chinese & English bilingual (auto-adapt to browser language + user manual settings)
- Course content: Chinese as the core with toggleable English definitions and explanations

------

# 9. Non-Functional Requirements (NFR)

## 9.1 Usability & Experience

- Fully responsive design for PC, tablet and mobile devices
- Flat operation logic: reach core functions within 3 clicks
- Empty state guidance for blank pages (no tasks, favorites or errors)

## 9.2 Performance

- Fast first-screen loading: CDN acceleration, image compression and lazy loading for static resources
- Stable audio playback: segmented loading and breakpoint resume (future optimization)
- Multi-user concurrent exercise submission support with interface current limiting and caching

## 9.3 Security

- Encrypted password storage (bcrypt/argon2)
- Login brute-force protection: login failure restrictions and CAPTCHA
- Frequency limiting for registration and password-reset emails
- Backend operation audit logs
- Basic security protection: XSS, CSRF and SQL injection prevention

## 9.4 Privacy & Compliance (Overseas Adaptation)

- Transparent privacy policy and cookie notifications (region-based strategies)
- Controlled recording data: no public sharing and independent deletion entry
- Reserved entry for user data export and deletion requests (future expansion)

## 9.5 Compatibility

- Mainstream browser support: Chrome, Firefox, Edge and Safari
- Special compatibility testing for mobile Safari audio playback

------

# 10. Operation & Growth Requirements

## 10.1 Content Operation Mechanism

- Flexible online/offline control and sorting for courses
- Configurable homepage recommendation slots (fixed strategy for MVP, customizable in later versions)
- Unified content tag system: scenarios, themes, grammar points and vocabulary categories

## 10.2 Incentive Mechanism (Retention Optimization)

- Learning streak recording
- Achievement badges & milestone rewards (unit completion, 7-day continuous learning)
- Learning reminders (email & in-site notifications, future iteration)

------

# 11. Core Metrics & Tracking

## 11.1 Key Indicators

- Conversion Funnel: visitor → registration → first lesson → first exercise → 7-day retention
- Content Metrics: lesson completion rate, exercise submission rate and average accuracy
- Review Metrics: error re-practice rate and correction rate
- Speaking Metrics: recording activation rate and practice completion rate (if launched)

## 11.2 Essential Tracking Events (MVP)

- Registration, login and logout behavior
- Lesson entry, course completion and audio playback frequency
- Exercise start, submission and detailed answering data (aggregated upload)
- Favorite addition/cancellation
- Error re-practice and correction behavior

------

# 12. Risks & Countermeasures

- High content production cost: build minimum closed-loop content for L0/L1 with reusable structured templates
- Complex oral scoring logic: adopt recording & comparison playback for MVP, with automatic scoring postponed
- Uncertain overseas compliance: complete privacy policy formulation and controllable recording data management
- Multimedia performance risks: global CDN deployment and segmented loading with specialized mobile Safari testing

------

# 13. Milestones & Deliverables

## 13.1 Milestone Plan

- M0: Requirement Review (V1.0)
- M1: Prototype & interaction design + information architecture confirmation
- M2: Content structure confirmation (course templates & question bank specifications)
- M3: Frontend MVP development (account, courses, exercises & learning center)
- M4: Backend MVP development (course management, question bank, user control & basic statistics)
- M5: Joint debugging & testing (mobile audio adaptation, email delivery and permission verification)
- M6: Gray-scale release and real-time data monitoring

## 13.2 Deliverable List

- PRD Document (this requirement analysis + prototype link)
- Course content template (Excel / Notion / JSON)
- Question bank import template (Excel / CSV)
- API Documentation (OpenAPI/Swagger)
- Test cases and overall acceptance checklist

------

# 14. General Acceptance Criteria

1. New users can complete registration and finish the first closed-loop learning & exercise within 2 minutes
2. All lessons support normal audio playback, bilingual text viewing and traceable learning records
3. At least 3 question types are supported with instant feedback and automatic error notebook synchronization
4. The learning center fully displays completed lessons, learning duration, accuracy rate, errors and favorite content
5. The backend realizes full lifecycle management for courses and question banks with effective online/offline control and sorting
6. Strict permission isolation: editors cannot access administrator functions, with complete audit logs for key operations
7. Adaptive display for PC and H5 devices, mainstream browser compatibility and qualified mobile audio playback
