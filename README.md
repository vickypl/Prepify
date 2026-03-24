# Prepify - RBI Grade A Smart Preparation App

A web-based interactive study system for working professionals preparing for RBI Grade A.

## Features implemented
- Dashboard with daily target vs actual, streak, completion %, focus score, and upcoming tasks.
- Subject management for Quant, Reasoning, English, GA, ESI, FM with editable topic metrics.
- Topic tracking: status, confidence, accuracy, time spent, last studied, next revision, mistakes, notes.
- Mock test tracker with score/accuracy/subject charts.
- Built-in 10 timed mock tests (MCQ format with options, countdown timer, auto-submit on timeout, and score capture).
- Weak area detection with top weak topics and subject heatmap.
- Smart planner using 60/30/10 weak-medium-strong allocation.
- Spaced revision logic (1, 3, 7, 15, 30 day intervals).
- Analytics dashboard with readiness score and expected score projection.
- AI-style recommendation panel (today plan, high ROI, ignored important topics).
- Daily study flow: session start/end with timer and mistake logging.
- Bonus: Pomodoro timer, daily checklist, streak motivation, missed day recovery suggestion.
- Dark mode, minimal Bootstrap UI, sidebar navigation.

## Tech stack
- HTML5
- CSS3
- JavaScript (Vanilla ES6)
- Bootstrap 5
- Chart.js

## Folder structure

```text
Prepify/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

## Setup instructions
1. Clone or copy this repository.
2. Open `index.html` directly in a modern browser.
3. Optional: run a local static server:
   - Python: `python3 -m http.server 8080`
   - Open: `http://localhost:8080`

No backend or package install is required.

## Sample data included
The app ships with pre-filled RBI syllabus sample topics and dummy user/mock data in `assets/js/app.js`:
- 6 subjects with topic/subtopic/difficulty/importance.
- baseline topic metrics.
- 3 dummy mock test entries.
- checklist defaults and planner config.

## Usage flow
1. Configure exam date + daily target hours on Dashboard.
2. Update topic progress in Subjects.
3. Start/End sessions to log real study time.
4. Add mocks in Mocks section.
5. Generate planner and follow revision queues.
6. Review Analytics + recommendations daily.

## Notes
- Data persistence uses browser `localStorage`.
- Clear browser storage to reset to default sample data.
- Mock test question styles are adapted from common IndiaBIX aptitude topic formats (percentages, ratio, averages, SI/CI, probability, etc.).
