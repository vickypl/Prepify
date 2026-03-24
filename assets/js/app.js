const STORAGE_KEY = 'prepify_rbi_v1';
const RUNTIME_KEY = 'prepify_runtime_v1';
const todayISO = () => new Date().toISOString().slice(0,10);
const MOCK_TEST_LIBRARY = [
  mockTest('Mock Test 1: Percentages', 12, [
    q('A batsman scored 110 runs including 3 boundaries and 8 sixes. What percent came from running between wickets?', ['45%', '46%', '50%', '55%'], 1),
    q('A fruit seller sold 40% apples and still had 420 left. How many apples originally?', ['588', '600', '672', '700'], 3),
    q('One student scored 9 more marks than another and that score was 56% of total marks. Find both marks.', ['39 and 30', '41 and 32', '42 and 33', '43 and 34'], 2),
    q('Out of numbers from 1 to 70, what percent have unit digit 1 or 9?', ['14%', '20%', '21%', '40%'], 1)
  ]),
  mockTest('Mock Test 2: Ratio & Proportion', 12, [
    q('The ratio of two numbers is 3:4 and their sum is 84. What is the larger number?', ['36', '42', '48', '54'], 2),
    q('If A:B = 5:7 and B:C = 3:2, find A:B:C.', ['15:21:14', '10:21:14', '15:14:21', '5:7:2'], 0),
    q('Income ratio of A and B is 4:3 and expense ratio is 3:2. If each saves ₹2000, A income is:', ['₹8000', '₹12000', '₹14000', '₹16000'], 1),
    q('If x:y = 2:3 and y:z = 4:5, then x:z = ?', ['8:15', '2:5', '3:5', '5:8'], 0)
  ]),
  mockTest('Mock Test 3: Time & Work', 15, [
    q('A can do work in 12 days and B in 18 days. In how many days can both finish together?', ['6.2', '7.2', '7.5', '8'], 1),
    q('A alone can do a job in 8 days. After 3 days, B joins and together they finish remaining work in 2 days. B alone can do in:', ['10 days', '12 days', '16 days', '20 days'], 3),
    q('A, B, C can do a work in 6, 9, 18 days respectively. In how many days if they work together?', ['3 days', '4 days', '4.5 days', '5 days'], 0),
    q('If 12 workers finish a project in 15 days, how many workers are needed to finish in 9 days (same efficiency)?', ['18', '20', '22', '24'], 1)
  ]),
  mockTest('Mock Test 4: Profit & Loss', 12, [
    q('An article is sold for ₹540 at 20% profit. Cost price is:', ['₹430', '₹440', '₹450', '₹460'], 2),
    q('A shopkeeper gives 10% discount and still gains 8%. Marked price is what percent of cost price?', ['110%', '118%', '120%', '130%'], 2),
    q('A trader sells two items at ₹1000 each. On one he gains 20%, on other he loses 20%. Net result is:', ['No profit no loss', '2% gain', '4% loss', '8% loss'], 2),
    q('If selling price is 75% of marked price and marked price is 20% above cost price, then loss/profit is:', ['10% profit', '10% loss', '5% loss', 'No profit no loss'], 1)
  ]),
  mockTest('Mock Test 5: Averages', 10, [
    q('Average of five numbers is 27. If one number is removed, average becomes 25. Removed number is:', ['30', '33', '35', '37'], 2),
    q('The average age of 20 students is 18 years. A teacher aged 38 joins; new average is:', ['18.5', '18.8', '19', '19.5'], 2),
    q('Average runs in 9 innings is 42. In 10th inning player scores 78. New average is:', ['44.4', '45.6', '46.2', '47.1'], 1),
    q('Average of first 10 even numbers is:', ['9', '10', '11', '12'], 2)
  ]),
  mockTest('Mock Test 6: Simple & Compound Interest', 12, [
    q('Simple interest on ₹8000 at 7.5% p.a. for 2 years is:', ['₹1000', '₹1100', '₹1200', '₹1300'], 2),
    q('A sum becomes ₹9680 in 2 years at 10% p.a. simple interest. Principal is:', ['₹8000', '₹8200', '₹8400', '₹8800'], 0),
    q('Difference between CI and SI on ₹5000 for 2 years at 10% is:', ['₹40', '₹50', '₹60', '₹70'], 1),
    q('At what rate will ₹2000 amount to ₹2420 in 2 years at simple interest?', ['9%', '10%', '10.5%', '11%'], 2)
  ]),
  mockTest('Mock Test 7: Problems on Ages', 10, [
    q('Father is 3 times son’s age. After 10 years, father will be twice son’s age. Son’s present age is:', ['10', '12', '14', '16'], 0),
    q('Average age of A and B is 30. B is 4 years older than A. Age of A is:', ['26', '27', '28', '29'], 2),
    q('5 years ago, mother was 4 times daughter. After 5 years, mother will be 2.5 times daughter. Daughter now is:', ['10', '12', '15', '16'], 0),
    q('Present ages of P and Q are in ratio 5:7. After 8 years ratio becomes 7:9. Present age of Q is:', ['21', '28', '35', '42'], 1)
  ]),
  mockTest('Mock Test 8: Numbers & HCF/LCM', 12, [
    q('Least number divisible by 12, 15 and 20 is:', ['40', '60', '120', '180'], 2),
    q('HCF of 96 and 404 is:', ['2', '4', '6', '8'], 1),
    q('A number when divided by 7 leaves 4. What remainder when same number divided by 21?', ['4', '7', '11', '18'], 2),
    q('Difference between squares of two consecutive integers is 31. Smaller integer is:', ['14', '15', '16', '17'], 1)
  ]),
  mockTest('Mock Test 9: Probability', 12, [
    q('Tickets numbered 1 to 20 are mixed and one drawn. Probability number is multiple of 3 or 5?', ['1/2', '2/5', '8/15', '9/20'], 3),
    q('A bag has 2 red, 3 green, 2 blue balls. Two balls drawn. Probability none is blue?', ['10/21', '11/21', '2/7', '5/7'], 0),
    q('A die is thrown once. Probability of getting prime number is:', ['1/3', '1/2', '2/3', '5/6'], 1),
    q('Two coins are tossed. Probability of getting at least one head is:', ['1/4', '1/2', '3/4', '1'], 2)
  ]),
  mockTest('Mock Test 10: Mixed Aptitude', 15, [
    q('A train 120 m long crosses a pole in 6 seconds. Speed is:', ['54 km/h', '60 km/h', '66 km/h', '72 km/h'], 3),
    q('If 20% of a number is 36, number is:', ['120', '144', '160', '180'], 3),
    q('Average of 7 numbers is 35. If one number is excluded, average of remaining is 32. Excluded number is:', ['49', '50', '53', '56'], 2),
    q('A can complete a task in 10 days and B in 15 days. If they work on alternate days starting with A, task completes in:', ['12 days', '12.5 days', '13 days', '13.5 days'], 2)
  ])
];

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
  const subtopicStatuses = String(subtopics).split(',').map(s => s.trim()).filter(Boolean).map(name => ({
    name,
    status: 'Not Done'
  }));
  return {
    name, subtopics, difficulty, importance,
    status: 'Not Started', confidence: 2, accuracy: 45,
    timeSpent: 0, lastStudied: '', nextRevision: '', mistakes: 0, notes: '',
    subtopicStatuses
  };
}

const app = {
  data: loadData(),
  charts: {},
  activeSession: null,
  sessionInterval: null,
  pomodoroInterval: null,
  pomodoroSeconds: 1500,
  activeMockTest: null,
  mockTestInterval: null,
  confirmingDeleteAll: false
};

function q(text, options, answerIndex) {
  return { text, options, answerIndex };
}

function mockTest(title, durationMin, questions) {
  return { title, durationMin, questions };
}

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return normalizeData(structuredClone(defaultData));
  try {
    return normalizeData(JSON.parse(raw));
  } catch {
    return normalizeData(structuredClone(defaultData));
  }
}

function normalizeData(data) {
  if (!data || !Array.isArray(data.subjects)) return structuredClone(defaultData);
  data.subjects.forEach(subject => {
    if (!Array.isArray(subject.topics)) subject.topics = [];
    subject.topics = subject.topics.map(t => normalizeTopicFields(t));
  });
  return data;
}

function normalizeTopicFields(topicData) {
  const subtopicNames = String(topicData.subtopics || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const statuses = Array.isArray(topicData.subtopicStatuses) ? topicData.subtopicStatuses : [];
  const subtopicStatuses = subtopicNames.map((name, idx) => ({
    name,
    status: statuses[idx]?.status || 'Not Done'
  }));
  return {
    ...topicData,
    subtopics: subtopicNames.join(', '),
    subtopicStatuses
  };
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(app.data));
}

function loadRuntimeState() {
  const raw = localStorage.getItem(RUNTIME_KEY);
  if (!raw) return { activeSession: null };
  try {
    const parsed = JSON.parse(raw);
    return {
      activeSession: parsed?.activeSession || null
    };
  } catch {
    return { activeSession: null };
  }
}

function saveRuntimeState() {
  localStorage.setItem(RUNTIME_KEY, JSON.stringify({
    activeSession: app.activeSession
  }));
}

function clearRuntimeState() {
  app.activeSession = null;
  localStorage.removeItem(RUNTIME_KEY);
}

function resetAllData() {
  app.data = normalizeData(structuredClone(defaultData));
  clearRuntimeState();
  app.activeMockTest = null;
  clearInterval(app.sessionInterval);
  clearInterval(app.pomodoroInterval);
  clearInterval(app.mockTestInterval);
  app.pomodoroSeconds = 1500;
  localStorage.removeItem(STORAGE_KEY);
  saveData();
  renderAll();
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
  renderTopicChecklist();
}

function renderTopicChecklist() {
  const wrapper = document.getElementById('topicChecklist');
  if (!wrapper) return;
  let total = 0;
  let done = 0;
  let inProgress = 0;
  const blocks = app.data.subjects.map((subject, sIdx) => {
    const topicRows = subject.topics.map((topic, tIdx) => {
      const items = topic.subtopicStatuses.map((sub, subIdx) => {
        total += 1;
        if (sub.status === 'Done') done += 1;
        if (sub.status === 'In Progress') inProgress += 1;
        return `
          <div class="subtopic-row">
            <div class="d-flex flex-wrap gap-2 justify-content-between align-items-center">
              <div class="subtopic-title">${sub.name}</div>
              <select class="form-select form-select-sm subtopic-status-select" data-subject="${sIdx}" data-topic="${tIdx}" data-subtopic="${subIdx}" style="max-width: 170px;">
                <option ${sub.status === 'Not Done' ? 'selected' : ''}>Not Done</option>
                <option ${sub.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option ${sub.status === 'Done' ? 'selected' : ''}>Done</option>
              </select>
            </div>
          </div>
        `;
      }).join('');
      return `
        <div class="mb-3">
          <h6 class="mb-2">${topic.name}</h6>
          ${items || '<div class="small text-secondary">No subtopics listed.</div>'}
        </div>
      `;
    }).join('');

    return `
      <div class="mb-4">
        <h5>${subject.name}</h5>
        ${topicRows}
      </div>
    `;
  }).join('');

  wrapper.innerHTML = blocks || '<div class="text-secondary">No checklist data available.</div>';
  const pending = Math.max(0, total - done - inProgress);
  document.getElementById('topicChecklistSummary').textContent = `Done: ${done} | In Progress: ${inProgress} | Not Done: ${pending}`;
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
  renderMockTestLibrary();
}

function renderMockTestLibrary() {
  const select = document.getElementById('mockTestSelect');
  if (!select) return;
  const existingIndex = Number(select.value || 0);
  select.innerHTML = MOCK_TEST_LIBRARY.map((test, idx) =>
    `<option value="${idx}">${test.title} (${test.questions.length} Q | ${test.durationMin} min)</option>`
  ).join('');
  select.value = String(Math.min(existingIndex, MOCK_TEST_LIBRARY.length - 1));
  if (!app.activeMockTest) {
    document.getElementById('mockTestMeta').textContent = 'Choose a mock test and click Start Test.';
    document.getElementById('mockTestTimer').textContent = '00:00';
    document.getElementById('mockQuestionCard').classList.add('d-none');
    document.getElementById('mockTestResult').classList.add('d-none');
  }
}

function startSelectedMockTest() {
  const idx = Number(document.getElementById('mockTestSelect').value || 0);
  const test = MOCK_TEST_LIBRARY[idx];
  clearInterval(app.mockTestInterval);
  app.activeMockTest = {
    testIndex: idx,
    currentQuestionIndex: 0,
    selectedAnswers: Array(test.questions.length).fill(null),
    remainingSeconds: test.durationMin * 60
  };
  document.getElementById('submitMockTest').disabled = false;
  document.getElementById('nextMockQuestion').disabled = false;
  document.getElementById('mockTestResult').classList.add('d-none');
  renderMockTestQuestion();
  renderMockTimer();
  app.mockTestInterval = setInterval(() => {
    if (!app.activeMockTest) return;
    app.activeMockTest.remainingSeconds -= 1;
    renderMockTimer();
    if (app.activeMockTest.remainingSeconds <= 0) submitActiveMockTest(true);
  }, 1000);
}

function renderMockTestQuestion() {
  if (!app.activeMockTest) return;
  const test = MOCK_TEST_LIBRARY[app.activeMockTest.testIndex];
  const question = test.questions[app.activeMockTest.currentQuestionIndex];
  const total = test.questions.length;
  const current = app.activeMockTest.currentQuestionIndex + 1;
  document.getElementById('mockQuestionCard').classList.remove('d-none');
  document.getElementById('mockQuestionText').textContent = `Q${current}/${total}. ${question.text}`;
  document.getElementById('mockQuestionOptions').innerHTML = question.options.map((opt, idx) => `
    <label class="mock-option">
      <input type="radio" name="mockOption" value="${idx}" ${app.activeMockTest.selectedAnswers[app.activeMockTest.currentQuestionIndex] === idx ? 'checked' : ''}>
      ${opt}
    </label>
  `).join('');
  document.getElementById('mockTestMeta').textContent = `${test.title} | Question ${current} of ${total}`;
  document.getElementById('nextMockQuestion').textContent = current === total ? 'Review' : 'Next';
  document.querySelectorAll('input[name="mockOption"]').forEach(el => {
    el.onchange = (e) => {
      app.activeMockTest.selectedAnswers[app.activeMockTest.currentQuestionIndex] = Number(e.target.value);
    };
  });
}

function gotoNextMockQuestion() {
  if (!app.activeMockTest) return;
  const lastIndex = MOCK_TEST_LIBRARY[app.activeMockTest.testIndex].questions.length - 1;
  app.activeMockTest.currentQuestionIndex = Math.min(lastIndex, app.activeMockTest.currentQuestionIndex + 1);
  renderMockTestQuestion();
}

function submitActiveMockTest(autoSubmitted = false) {
  if (!app.activeMockTest) return;
  const test = MOCK_TEST_LIBRARY[app.activeMockTest.testIndex];
  const correct = test.questions.reduce((sum, question, idx) =>
    sum + (app.activeMockTest.selectedAnswers[idx] === question.answerIndex ? 1 : 0), 0);
  const attempted = app.activeMockTest.selectedAnswers.filter(x => x !== null).length;
  const accuracy = Math.round((correct / test.questions.length) * 100);
  const unanswered = test.questions.length - attempted;
  const timeUsedMin = Math.ceil((test.durationMin * 60 - app.activeMockTest.remainingSeconds) / 60);

  app.data.mocks.push({
    date: todayISO(),
    score: Math.round((correct / test.questions.length) * 100),
    accuracy,
    time: Math.max(1, timeUsedMin),
    sections: { Quant: accuracy, Reasoning: accuracy, English: accuracy, GA: accuracy, ESI: accuracy, FM: accuracy }
  });
  saveData();
  clearInterval(app.mockTestInterval);

  const result = document.getElementById('mockTestResult');
  result.classList.remove('d-none');
  result.innerHTML = `
    <strong>${autoSubmitted ? 'Time up! ' : ''}Test submitted.</strong>
    Score: ${correct}/${test.questions.length} (${accuracy}%). Attempted: ${attempted}. Unanswered: ${unanswered}.
  `;
  app.activeMockTest = null;
  document.getElementById('mockQuestionCard').classList.add('d-none');
  document.getElementById('submitMockTest').disabled = true;
  document.getElementById('nextMockQuestion').disabled = true;
  renderMockTimer();
  renderMocks();
  renderAnalytics();
}

function renderMockTimer() {
  const timerEl = document.getElementById('mockTestTimer');
  if (!app.activeMockTest) {
    timerEl.textContent = '00:00';
    return;
  }
  const sec = Math.max(0, app.activeMockTest.remainingSeconds);
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  timerEl.textContent = `${m}:${s}`;
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
  document.getElementById('startMockTest').onclick = startSelectedMockTest;
  document.getElementById('nextMockQuestion').onclick = gotoNextMockQuestion;
  document.getElementById('submitMockTest').onclick = () => submitActiveMockTest(false);

  document.getElementById('startSession').onclick = startSession;
  document.getElementById('endSession').onclick = endSession;

  document.getElementById('pomodoroStart').onclick = () => startPomodoro(1500);
  document.getElementById('pomodoroBreak').onclick = () => startPomodoro(300);
  document.getElementById('pomodoroReset').onclick = () => { clearInterval(app.pomodoroInterval); app.pomodoroSeconds = 1500; renderPomodoro(); };

  document.getElementById('resetChecklist').onclick = () => {
    app.data.checklist.forEach(c => c.done = false);
    saveData(); renderDashboard();
  };

  document.getElementById('deleteEverything').onclick = () => {
    app.confirmingDeleteAll = !app.confirmingDeleteAll;
    document.getElementById('deleteEverythingConfirmWrap').classList.toggle('d-none', !app.confirmingDeleteAll);
  };

  document.getElementById('confirmDeleteEverything').onclick = () => {
    resetAllData();
    app.confirmingDeleteAll = false;
    document.getElementById('deleteEverythingConfirmWrap').classList.add('d-none');
  };

  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('checklist-item')) {
      app.data.checklist[Number(e.target.dataset.index)].done = e.target.checked;
      saveData(); renderDashboard();
    }
    if (e.target.classList.contains('subtopic-status-select')) {
      const sIdx = Number(e.target.dataset.subject);
      const tIdx = Number(e.target.dataset.topic);
      const subIdx = Number(e.target.dataset.subtopic);
      const topic = app.data.subjects[sIdx]?.topics[tIdx];
      if (!topic || !topic.subtopicStatuses?.[subIdx]) return;
      topic.subtopicStatuses[subIdx].status = e.target.value;
      const statuses = topic.subtopicStatuses.map(s => s.status);
      topic.status = statuses.every(s => s === 'Done') ? 'Completed' : statuses.some(s => s === 'In Progress' || s === 'Done') ? 'In Progress' : 'Not Started';
      saveData();
      renderSubjects();
      renderDashboard();
      renderAnalytics();
    }
  });
}

function startSession() {
  if (app.activeSession) return;
  const idx = Number(document.getElementById('sessionTopic').value);
  const t = allTopics()[idx];
  app.activeSession = { topic: t.name, subject: t.subject, start: Date.now(), idx };
  saveRuntimeState();
  startSessionTicker();
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

  clearRuntimeState();
  document.getElementById('sessionTimer').textContent = '00:00:00';
  document.getElementById('sessionSummary').textContent = `Session complete. Duration ${durationMin}m, mistakes ${mistakes}.`;
  saveData(); renderAll();
}

function startSessionTicker() {
  clearInterval(app.sessionInterval);
  app.sessionInterval = setInterval(() => {
    if (!app.activeSession) return;
    const sec = Math.floor((Date.now() - app.activeSession.start)/1000);
    document.getElementById('sessionTimer').textContent = toHms(Math.max(0, sec));
  }, 1000);
  const sec = Math.floor((Date.now() - app.activeSession.start)/1000);
  document.getElementById('sessionTimer').textContent = toHms(Math.max(0, sec));
}

function restoreRuntimeSession() {
  const runtime = loadRuntimeState();
  const activeSession = runtime.activeSession;
  if (!activeSession || !Number.isFinite(activeSession.idx)) return;
  const topic = allTopics()[activeSession.idx];
  if (!topic) {
    clearRuntimeState();
    return;
  }
  app.activeSession = activeSession;
  document.getElementById('sessionSummary').textContent = `Studying ${topic.subject} - ${topic.name}`;
  startSessionTicker();
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
restoreRuntimeSession();
