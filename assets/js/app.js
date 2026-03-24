const STORAGE_KEY = 'prepify_rbi_v1';
const todayISO = () => new Date().toISOString().slice(0,10);

const defaultData = {
  config: { examDate: '2026-09-15', dailyTargetHours: 3 },
  checklist: [
    { id: 1, text: 'Revise due topics', done: false },
    { id: 2, text: 'Practice 25 MCQs', done: false },
    { id: 3, text: 'Analyze mistakes', done: false },
    { id: 4, text: 'Update tracker', done: false }
  ],
  sessions: [],
  subjects: [
    { name: 'Quantitative Aptitude', topics: [
      topic('Number System', 'Divisibility, Remainders', 'Medium', 5), topic('Data Interpretation', 'Tables, Charts', 'Hard', 5), topic('Profit & Loss', 'Discount, Marked Price', 'Easy', 4)
    ]},
    { name: 'Reasoning Ability', topics: [
      topic('Seating Arrangement', 'Linear, Circular', 'Hard', 5), topic('Syllogism', 'Venn-based', 'Easy', 4), topic('Puzzles', 'Floor, Box', 'Hard', 5)
    ]},
    { name: 'English Language', topics: [
      topic('Reading Comprehension', 'Inference, Tone', 'Medium', 5), topic('Cloze Test', 'Grammar + Vocabulary', 'Medium', 4), topic('Error Spotting', 'Grammar Rules', 'Easy', 4)
    ]},
    { name: 'General Awareness', topics: [
      topic('Current Affairs', 'Banking + Economy', 'Medium', 5), topic('Static GK', 'Institutions, Capitals', 'Easy', 3), topic('Reports & Indices', 'National/International', 'Medium', 4)
    ]},
    { name: 'Economic & Social Issues (ESI)', topics: [
      topic('Growth & Development', 'GDP, HDI', 'Medium', 5), topic('Poverty Alleviation', 'Schemes, Data', 'Medium', 4), topic('Sustainable Development', 'Climate + SDG', 'Hard', 4)
    ]},
    { name: 'Finance & Management (FM)', topics: [
      topic('Financial Markets', 'Money vs Capital Market', 'Hard', 5), topic('Basel Norms', 'Basel I/II/III', 'Medium', 4), topic('Leadership Theories', 'Trait, Behavioral', 'Easy', 3)
    ]}
  ],
  mocks: [
    { date: '2026-03-01', score: 58, accuracy: 62, time: 118, sections: { Quant:55, Reasoning:64, English:66, GA:52, ESI:58, FM:54 } },
    { date: '2026-03-10', score: 64, accuracy: 68, time: 116, sections: { Quant:60, Reasoning:70, English:69, GA:59, ESI:65, FM:60 } },
    { date: '2026-03-18', score: 71, accuracy: 74, time: 112, sections: { Quant:69, Reasoning:75, English:74, GA:66, ESI:70, FM:68 } }
  ]
};

function topic(name, subtopics, difficulty, importance) {
  return {
    name, subtopics, difficulty, importance,
    status: 'Not Started', confidence: 2, accuracy: 45,
    timeSpent: 0, lastStudied: '', nextRevision: '', mistakes: 0, notes: ''
  };
}

const app = {
  data: loadData(),
  charts: {},
  activeSession: null,
  sessionInterval: null,
  pomodoroInterval: null,
  pomodoroSeconds: 1500
};

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : structuredClone(defaultData);
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(app.data));
}

function allTopics() {
  return app.data.subjects.flatMap(s => s.topics.map(t => ({...t, subject: s.name})));
}

function scoreTopic(t) {
  if ((t.accuracy < 55) || (t.confidence <= 2) || (t.mistakes >= 4)) return 'Weak';
  if ((t.accuracy >= 75) && (t.confidence >= 4) && (t.mistakes <= 2)) return 'Strong';
  return 'Medium';
}

function focusScore() {
  const completed = allTopics().filter(t => t.status === 'Completed').length;
  const completion = (completed / allTopics().length) * 100;
  const streak = getStudyStreak() * 5;
  return Math.min(100, Math.round(completion * 0.6 + streak * 0.4));
}

function getStudyStreak() {
  const set = new Set(app.data.sessions.map(s => s.date));
  let streak = 0;
  const date = new Date();
  while (true) {
    const iso = date.toISOString().slice(0,10);
    if (!set.has(iso)) break;
    streak += 1;
    date.setDate(date.getDate() - 1);
  }
  return streak;
}

function todayStats() {
  const today = todayISO();
  const sessions = app.data.sessions.filter(s => s.date === today);
  const minutes = sessions.reduce((a,b) => a + b.durationMin, 0);
  const done = allTopics().filter(t => t.lastStudied === today).length;
  return { minutes, done, sessions };
}

function renderDashboard() {
  const stats = todayStats();
  const targetMin = (app.data.config.dailyTargetHours || 3) * 60;
  const taskCompletion = Math.round((app.data.checklist.filter(c => c.done).length / app.data.checklist.length) * 100);
  const cards = [
    ['Study Hours (Today)', `${(stats.minutes/60).toFixed(1)} / ${(targetMin/60).toFixed(1)} h`],
    ['Study Streak', `${getStudyStreak()} days`],
    ['Task Completion', `${taskCompletion}%`],
    ['Focus Score', `${focusScore()}`]
  ];
  document.getElementById('dashboardCards').innerHTML = cards.map(c => card(c[0], c[1])).join('');

  const upcoming = getTodayPlan().slice(0,5);
  document.getElementById('todayTasks').innerHTML = upcoming.map(t => `<li class="list-group-item">${t}</li>`).join('') || '<li class="list-group-item">No tasks planned.</li>';

  const checklistDiv = document.getElementById('dailyChecklist');
  checklistDiv.innerHTML = app.data.checklist.map((c, i) => `
    <div class="form-check">
      <input class="form-check-input checklist-item" type="checkbox" data-index="${i}" ${c.done ? 'checked' : ''}>
      <label class="form-check-label">${c.text}</label>
    </div>
  `).join('');
}

function renderSubjects() {
  const topicSelect = document.getElementById('topicSelect');
  const sessionTopic = document.getElementById('sessionTopic');
  const options = allTopics().map((t, i) => `<option value="${i}">${t.subject} - ${t.name}</option>`).join('');
  topicSelect.innerHTML = options;
  sessionTopic.innerHTML = options;

  const header = '<tr><th>Subject</th><th>Topic</th><th>Status</th><th>Difficulty</th><th>Importance</th><th>Confidence</th><th>Accuracy</th><th>Time</th><th>Mistakes</th><th>Revision</th></tr>';
  const rows = allTopics().map(t => `<tr>
      <td>${t.subject}</td><td>${t.name}<div class="small text-secondary">${t.subtopics}</div></td><td>${t.status}</td><td>${t.difficulty}</td><td>${t.importance}</td>
      <td>${t.confidence}</td><td>${t.accuracy}%</td><td>${t.timeSpent}m</td><td>${t.mistakes}</td><td>${t.nextRevision || '-'}</td>
    </tr>`).join('');
  document.getElementById('topicsTable').innerHTML = header + rows;
}

function updateTopicByIndex(idx, patch) {
  let c = -1;
  for (const s of app.data.subjects) {
    for (let i = 0; i < s.topics.length; i++) {
      c += 1;
      if (c === idx) {
        s.topics[i] = { ...s.topics[i], ...patch };
        return;
      }
    }
  }
}

function revisionStep(topic) {
  const steps = [1,3,7,15,30];
  const now = new Date();
  const last = topic.lastStudied ? new Date(topic.lastStudied) : now;
  const completedRevs = topic.notes.match(/REV-/g)?.length || 0;
  const days = steps[Math.min(completedRevs, steps.length - 1)];
  last.setDate(last.getDate() + days);
  return last.toISOString().slice(0,10);
}

function getTodayPlan() {
  const weak = allTopics().filter(t => scoreTopic(t) === 'Weak').slice(0,4).map(t => `Weak focus: ${t.subject} - ${t.name}`);
  const due = allTopics().filter(t => t.nextRevision && t.nextRevision <= todayISO()).slice(0,3).map(t => `Revision due: ${t.subject} - ${t.name}`);
  const mock = ['Take 1 sectional mock & analyze errors'];
  return [...weak, ...due, ...mock];
}

function daysToExam() {
  const today = new Date(todayISO());
  const exam = new Date(app.data.config.examDate);
  return Math.max(0, Math.ceil((exam - today) / (1000 * 60 * 60 * 24)));
}

function generateStudyPlan() {
  const topics = allTopics();
  const weak = topics.filter(t => scoreTopic(t) === 'Weak');
  const medium = topics.filter(t => scoreTopic(t) === 'Medium');
  const strong = topics.filter(t => scoreTopic(t) === 'Strong');
  const hrs = Math.max(1, Number(app.data.config.dailyTargetHours) || 1);

  const slots = [
    ...pickTopics(weak, Math.ceil(hrs * 0.6)),
    ...pickTopics(medium, Math.ceil(hrs * 0.3)),
    ...pickTopics(strong.length ? strong : topics, Math.max(1, Math.round(hrs * 0.1)))
  ];

  document.getElementById('dailyPlan').innerHTML = slots.map((s, i) => `<li class="list-group-item">Hour ${i+1}: ${s.subject} - ${s.name} (${scoreTopic(s)})</li>`).join('');
  const subjects = app.data.subjects.map(s => s.name);
  document.getElementById('weeklyPlan').innerHTML = Array.from({length:7}).map((_, i) => `<li class="list-group-item">Day ${i+1}: ${subjects[i % subjects.length]} + revision block</li>`).join('');
  document.getElementById('planMeta').textContent = `Days left: ${daysToExam()} | Rule: 60/30/10 weak-medium-strong`;

  const due = topics.filter(t => t.nextRevision === todayISO());
  const overdue = topics.filter(t => t.nextRevision && t.nextRevision < todayISO());
  document.getElementById('dueRevision').innerHTML = listItems(due.map(t => `${t.subject} - ${t.name}`), 'No topics due today');
  document.getElementById('overdueRevision').innerHTML = listItems(overdue.map(t => `${t.subject} - ${t.name} (${t.nextRevision})`), 'No overdue topics');
}

function pickTopics(arr, count) {
  if (!arr.length) return [];
  const out = [];
  for (let i = 0; i < count; i++) out.push(arr[i % arr.length]);
  return out;
}

function renderMocks() {
  const labels = app.data.mocks.map(m => m.date);
  const scores = app.data.mocks.map(m => m.score);
  const accuracies = app.data.mocks.map(m => m.accuracy);
  const subAvg = {};
  app.data.mocks.forEach(m => Object.entries(m.sections).forEach(([k,v]) => subAvg[k] = (subAvg[k] || 0) + v));
  Object.keys(subAvg).forEach(k => subAvg[k] = Math.round(subAvg[k] / app.data.mocks.length));

  drawChart('scoreTrend', 'line', labels, [{ label: 'Score', data: scores }]);
  drawChart('accuracyTrend', 'line', labels, [{ label: 'Accuracy %', data: accuracies }]);
  drawChart('subjectPerformance', 'bar', Object.keys(subAvg), [{ label: 'Avg Subject Score', data: Object.values(subAvg) }]);
}

function drawChart(id, type, labels, datasets) {
  if (app.charts[id]) app.charts[id].destroy();
  app.charts[id] = new Chart(document.getElementById(id), {
    type,
    data: { labels, datasets: datasets.map(d => ({ ...d, borderWidth: 2 })) },
    options: { responsive: true, plugins: { legend: { labels: { color: '#ddd' }}}}
  });
}

function renderAnalytics() {
  const subjects = app.data.subjects.map(s => s.name);
  const completion = app.data.subjects.map(s => Math.round(100 * s.topics.filter(t => t.status === 'Completed').length / s.topics.length));
  const times = app.data.subjects.map(s => s.topics.reduce((a,b)=>a+b.timeSpent,0));
  drawChart('completionChart', 'bar', subjects, [{ label: 'Completion %', data: completion }]);
  drawChart('timeChart', 'doughnut', subjects, [{ label: 'Time Spent (m)', data: times }]);

  const dist = { Weak: 0, Medium: 0, Strong: 0 };
  allTopics().forEach(t => dist[scoreTopic(t)]++);
  const readiness = predictedReadiness();
  const cards = [
    ['Predicted Readiness', `${readiness}/100`],
    ['Weak vs Strong', `${dist.Weak} : ${dist.Strong}`],
    ['Days to Exam', `${daysToExam()}`],
    ['Expected Score', `${expectedScore()}`]
  ];
  document.getElementById('analyticsCards').innerHTML = cards.map(c => card(c[0], c[1])).join('');

  const weakTop = allTopics().sort((a,b)=>weaknessValue(b)-weaknessValue(a)).slice(0,10);
  document.getElementById('weakTopics').innerHTML = listItems(weakTop.map(t => `${t.subject} - ${t.name} | acc:${t.accuracy}% conf:${t.confidence}`), 'No weak topics.');

  const heat = app.data.subjects.map(s => {
    const avg = s.topics.reduce((a,t)=>a+weaknessValue(t),0)/s.topics.length;
    const cls = avg > 50 ? 'heat-weak' : avg > 30 ? 'heat-medium' : 'heat-strong';
    return `<div class="heat-cell ${cls}">${s.name}: weakness index ${Math.round(avg)}</div>`;
  }).join('');
  document.getElementById('heatmap').innerHTML = heat;

  const rec = recommendationEngine(weakTop);
  document.getElementById('aiRecommendations').innerHTML = listItems(rec, 'No recommendations');
}

function weaknessValue(t) {
  return (100 - t.accuracy) * 0.45 + (5 - t.confidence) * 12 + t.mistakes * 7 + (t.importance * 3);
}

function expectedScore() {
  const base = app.data.mocks.at(-1)?.score || 50;
  const improvement = Math.round((100 - allTopics().filter(t => scoreTopic(t)==='Weak').length*3) * 0.12);
  return Math.min(100, Math.max(35, base + improvement));
}

function predictedReadiness() {
  const completion = allTopics().filter(t => t.status === 'Completed').length / allTopics().length;
  const avgAcc = allTopics().reduce((a,t)=>a+t.accuracy,0)/(allTopics().length||1);
  const consistency = Math.min(1, getStudyStreak()/14);
  return Math.round(completion*35 + (avgAcc/100)*45 + consistency*20);
}

function recommendationEngine(weakTop) {
  const ignored = allTopics().filter(t => t.importance >= 5 && t.timeSpent < 60).slice(0,3);
  const todayHours = app.data.config.dailyTargetHours;
  return [
    `What to study TODAY: ${weakTop.slice(0,3).map(t => t.name).join(', ')}`,
    `High ROI topics: ${allTopics().filter(t => t.importance >= 5).slice(0,4).map(t => t.name).join(', ')}`,
    `Ignored but important: ${ignored.map(t => t.name).join(', ') || 'None'}`,
    `If you continue like this, expected score = ${expectedScore()}`,
    `Recovery plan for missed day: add +${Math.ceil(todayHours/2)}h over next 2 days and prioritize overdue revisions.`
  ];
}

function bindEvents() {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.onclick = () => showSection(btn.dataset.section));
  document.getElementById('themeToggle').onchange = (e) => {
    document.documentElement.setAttribute('data-bs-theme', e.target.checked ? 'dark' : 'light');
  };

  document.getElementById('saveConfig').onclick = () => {
    app.data.config.examDate = document.getElementById('examDate').value || app.data.config.examDate;
    app.data.config.dailyTargetHours = Math.max(1, Number(document.getElementById('dailyTargetHours').value || app.data.config.dailyTargetHours || 1));
    saveData();
    renderAll();
  };

  document.getElementById('updateTopic').onclick = () => {
    const idx = Number(document.getElementById('topicSelect').value);
    const notes = document.getElementById('notesInput').value;
    const patch = {
      status: document.getElementById('statusInput').value,
      confidence: Number(document.getElementById('confidenceInput').value || 1),
      accuracy: Number(document.getElementById('accuracyInput').value || 0),
      timeSpent: Number(document.getElementById('timeInput').value || 0),
      mistakes: Number(document.getElementById('mistakeInput').value || 0),
      notes,
      lastStudied: todayISO()
    };
    patch.nextRevision = revisionStep(patch);
    if (patch.status === 'Completed') patch.notes = `${notes} REV-1`;
    updateTopicByIndex(idx, patch);
    saveData();
    renderAll();
  };

  document.getElementById('generatePlan').onclick = generateStudyPlan;
  document.getElementById('addMock').onclick = () => {
    let sections = { Quant:60, Reasoning:60, English:60, GA:60, ESI:60, FM:60 };
    try { sections = JSON.parse(document.getElementById('mockSections').value || '{}'); } catch {}
    app.data.mocks.push({
      date: document.getElementById('mockDate').value || todayISO(),
      score: Number(document.getElementById('mockScore').value || 0),
      accuracy: Number(document.getElementById('mockAccuracy').value || 0),
      time: Number(document.getElementById('mockTime').value || 120),
      sections
    });
    saveData();
    renderMocks();
    renderAnalytics();
  };

  document.getElementById('startSession').onclick = startSession;
  document.getElementById('endSession').onclick = endSession;

  document.getElementById('pomodoroStart').onclick = () => startPomodoro(1500);
  document.getElementById('pomodoroBreak').onclick = () => startPomodoro(300);
  document.getElementById('pomodoroReset').onclick = () => { clearInterval(app.pomodoroInterval); app.pomodoroSeconds = 1500; renderPomodoro(); };

  document.getElementById('resetChecklist').onclick = () => {
    app.data.checklist.forEach(c => c.done = false);
    saveData(); renderDashboard();
  };

  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('checklist-item')) {
      app.data.checklist[Number(e.target.dataset.index)].done = e.target.checked;
      saveData(); renderDashboard();
    }
  });
}

function startSession() {
  if (app.activeSession) return;
  const idx = Number(document.getElementById('sessionTopic').value);
  const t = allTopics()[idx];
  app.activeSession = { topic: t.name, subject: t.subject, start: Date.now(), idx };
  app.sessionInterval = setInterval(() => {
    const sec = Math.floor((Date.now() - app.activeSession.start)/1000);
    document.getElementById('sessionTimer').textContent = toHms(sec);
  }, 1000);
  document.getElementById('sessionSummary').textContent = `Studying ${t.subject} - ${t.name}`;
}

function endSession() {
  if (!app.activeSession) return;
  clearInterval(app.sessionInterval);
  const durSec = Math.floor((Date.now() - app.activeSession.start)/1000);
  const durationMin = Math.max(1, Math.round(durSec/60));
  const mistakes = Number(document.getElementById('sessionMistakes').value || 0);
  app.data.sessions.push({ date: todayISO(), ...app.activeSession, durationMin, mistakes });

  const t = allTopics()[app.activeSession.idx];
  updateTopicByIndex(app.activeSession.idx, {
    timeSpent: t.timeSpent + durationMin,
    mistakes: t.mistakes + mistakes,
    status: 'In Progress',
    lastStudied: todayISO(),
    nextRevision: revisionStep(t)
  });

  app.activeSession = null;
  document.getElementById('sessionTimer').textContent = '00:00:00';
  document.getElementById('sessionSummary').textContent = `Session complete. Duration ${durationMin}m, mistakes ${mistakes}.`;
  saveData(); renderAll();
}

function startPomodoro(seconds) {
  clearInterval(app.pomodoroInterval);
  app.pomodoroSeconds = seconds;
  app.pomodoroInterval = setInterval(() => {
    app.pomodoroSeconds -= 1;
    renderPomodoro();
    if (app.pomodoroSeconds <= 0) clearInterval(app.pomodoroInterval);
  }, 1000);
  renderPomodoro();
}

function renderPomodoro() {
  const m = String(Math.floor(app.pomodoroSeconds / 60)).padStart(2, '0');
  const s = String(app.pomodoroSeconds % 60).padStart(2, '0');
  document.getElementById('pomodoroTimer').textContent = `${m}:${s}`;
}

function renderAll() {
  document.getElementById('examDate').value = app.data.config.examDate;
  document.getElementById('dailyTargetHours').value = app.data.config.dailyTargetHours;
  renderDashboard();
  renderSubjects();
  renderMocks();
  renderAnalytics();
  generateStudyPlan();
  renderPomodoro();
}

function showSection(id) {
  document.querySelectorAll('.app-section').forEach(s => s.classList.add('d-none'));
  document.getElementById(id).classList.remove('d-none');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-section="${id}"]`).classList.add('active');
  if (id === 'planner') generateStudyPlan();
  if (id === 'analytics') renderAnalytics();
  if (id === 'mocks') renderMocks();
}

function card(title, value) {
  return `<div class="col-md-3"><div class="card"><div class="card-body"><div class="small text-secondary">${title}</div><div class="metric-value">${value}</div></div></div></div>`;
}

function listItems(items, empty) {
  return items.length ? items.map(x => `<li class="list-group-item">${x}</li>`).join('') : `<li class="list-group-item">${empty}</li>`;
}

function toHms(sec) {
  const h = String(Math.floor(sec/3600)).padStart(2,'0');
  const m = String(Math.floor((sec%3600)/60)).padStart(2,'0');
  const s = String(sec%60).padStart(2,'0');
  return `${h}:${m}:${s}`;
}

bindEvents();
renderAll();
