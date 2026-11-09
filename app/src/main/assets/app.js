const PLAN = {"days": [{"date": "10 November", "tasks": ["Electronics Circuits – Unit 1: concepts and key diagrams", "Signals & Systems – Unit 1: fundamentals", "M3 – Unit 1: concepts and worked examples", "Microcontrollers – Unit 1: architecture and basics"]}, {"date": "11 November", "tasks": ["Electronics Circuits – Unit 2", "Control Systems – Unit 1: basic concepts and block diagrams", "Signals & Systems – Unit 1 numericals", "Cloud Computing – Unit 1: fundamentals"]}, {"date": "12 November", "tasks": ["M3 – Unit 2: concepts and problem practice", "OOP – Unit 1: concepts and simple programs", "Electronics Circuits – Unit 2 numericals", "Cellular Network – Unit 1"]}, {"date": "13 November", "tasks": ["Signals & Systems – Unit 2", "Control Systems – Unit 2", "Microcontrollers – Unit 2", "VLSI Design – Unit 1"]}, {"date": "14 November", "tasks": ["Electronics Circuits – Unit 3", "M3 – Unit 3", "OOP – Unit 2: programs and theory", "Cloud Computing – Unit 2"]}, {"date": "15 November", "tasks": ["Signals & Systems – Unit 3", "Control Systems – Unit 3", "Cellular Network – Unit 2", "Weekly revision and a short self-test"]}, {"date": "16 November", "tasks": ["Electronics Circuits – Unit 4", "M3 – Unit 4", "Signals & Systems – Unit 4", "Microcontrollers – Unit 3"]}, {"date": "17 November", "tasks": ["Control Systems – Unit 4", "OOP – Unit 3: programs and output tracing", "VLSI Design – Unit 2", "Cloud Computing – Unit 3"]}, {"date": "18 November", "tasks": ["Electronics Circuits – Unit 5", "Signals & Systems – Unit 5 / remaining syllabus", "M3 – Unit 5 / remaining syllabus", "Cellular Network – Unit 3"]}, {"date": "19 November", "tasks": ["Control Systems – Unit 5 / remaining syllabus", "OOP – Unit 4 / remaining syllabus", "Microcontrollers – Unit 4", "Cloud Computing – Unit 4"]}, {"date": "20 November", "tasks": ["Electronics Circuits – revise Units 1–3 and solve questions", "Signals & Systems – numerical practice", "M3 – important problems and formula sheet", "VLSI Design – Unit 3"]}, {"date": "21 November", "tasks": ["Electronics Circuits – previous-year questions", "Microcontrollers – Unit 5 / remaining syllabus", "Signals & Systems – previous-year questions", "Cellular Network – Unit 4"]}, {"date": "22 November", "tasks": ["Electronics Circuits – revise Units 4–5 and weak topics", "Microcontrollers – full-syllabus revision", "M3 – formula revision and selected problems", "Cloud Computing – Unit 5 / remaining syllabus"]}, {"date": "23 November", "tasks": ["Electronics Circuits – timed paper or question-bank practice", "Microcontrollers – diagrams, programs and key theory", "Signals & Systems – difficult numericals", "Control Systems – formulae and important problems"]}, {"date": "24 November", "tasks": ["Electronics Circuits – final revision and PYQs", "Microcontrollers – final revision and PYQs", "Pack exam materials; confirm exam timing and travel", "Light recall only; sleep adequately"]}, {"date": "25 November", "tasks": ["EXAM: Microcontrollers & Applications · 10:00 AM–12:30 PM", "EXAM: Electronics Circuits · 2:00 PM–4:30 PM", "After both papers: rest, then light Signals & Systems revision", "No heavy new study today"]}, {"date": "26 November", "tasks": ["EXAM: Signals & Systems · 2:00 PM–4:30 PM", "Before exam: formulae, standard numericals and key concepts", "After exam: Cellular Network revision", "Keep the evening focused and manageable"]}, {"date": "27 November", "tasks": ["EXAM: Cellular Network · 10:00 AM–12:30 PM", "After exam: Control Systems formulae and block diagrams", "Practise key Control Systems numericals", "Take a proper break after the paper"]}, {"date": "28 November", "tasks": ["EXAM: Control Systems · 2:00 PM–4:30 PM", "Before exam: standard problem types and key theory", "After exam: rest, then light VLSI revision", "Avoid starting a large new topic"]}, {"date": "29 November", "tasks": ["VLSI Design – full revision and PYQs", "OOP – programs, output tracing and theory", "M3 – important numerical problems", "Cloud Computing – key concepts and important questions"]}, {"date": "30 November", "tasks": ["EXAM: VLSI Design · 10:00 AM–12:30 PM", "After exam: OOP revision and programming practice", "Revise common OOP concepts and syntax", "Prepare a short list of weak topics"]}, {"date": "1 December", "tasks": ["EXAM: Object-Oriented Programming · 2:00 PM–4:30 PM", "Before exam: concepts, syntax, programs and output questions", "After exam: Cloud Computing revision", "M3: revise formulae and familiar problem types"]}, {"date": "2 December", "tasks": ["EXAM: Cloud Computing · 10:00 AM–12:30 PM", "EXAM: Engineering Mathematics III (M3) · 2:00 PM–4:30 PM", "Before each paper: quick recall and familiar questions", "You've reached the end of this exam plan!"]}], "exams": [{"date": "25 Nov · Wed", "subject": "Microcontrollers & Applications", "time": "10:00 AM – 12:30 PM", "semester": "Semester V"}, {"date": "25 Nov · Wed", "subject": "Electronics Circuits", "time": "2:00 PM – 4:30 PM", "semester": "Semester III"}, {"date": "26 Nov · Thu", "subject": "Signals & Systems", "time": "2:00 PM – 4:30 PM", "semester": "Semester IV"}, {"date": "27 Nov · Fri", "subject": "Cellular Network", "time": "10:00 AM – 12:30 PM", "semester": "Semester V"}, {"date": "28 Nov · Sat", "subject": "Control Systems", "time": "2:00 PM – 4:30 PM", "semester": "Semester IV"}, {"date": "30 Nov · Mon", "subject": "VLSI Design", "time": "10:00 AM – 12:30 PM", "semester": "Semester V"}, {"date": "1 Dec · Tue", "subject": "Object-Oriented Programming", "time": "2:00 PM – 4:30 PM", "semester": "Semester IV"}, {"date": "2 Dec · Wed", "subject": "Cloud Computing (Elective I)", "time": "10:00 AM – 12:30 PM", "semester": "Semester V"}, {"date": "2 Dec · Wed", "subject": "Engineering Mathematics III (M3)", "time": "2:00 PM – 4:30 PM", "semester": "Semester III"}]};

const STORAGE_KEY = "examPlanner2026Progress";
let progress = {};
let currentDay = 0;
let deferredPrompt = null;

try { progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { progress = {}; }

const $ = (id) => document.getElementById(id);
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); updateOverall(); }
function completedCount(dayIndex) {
  const arr = progress[dayIndex] || [];
  return arr.filter(Boolean).length;
}
function updateOverall() {
  const total = PLAN.days.reduce((n,d)=>n+d.tasks.length,0);
  const done = PLAN.days.reduce((n,d,i)=>n+completedCount(i),0);
  const pct = Math.round(done/total*100);
  $("overallText").textContent = pct + "%";
  $("overallBar").style.width = pct + "%";
}
function renderDay() {
  const day = PLAN.days[currentDay];
  $("dayDate").textContent = day.date + " 2026";
  $("daySummary").textContent = currentDay < 15 ? "Preparation day · Four study blocks" : "Examination phase · Follow the paper-day targets";
  const done = completedCount(currentDay);
  $("dayProgressText").textContent = `${done}/${day.tasks.length} done`;
  $("dayProgressBar").style.width = `${done/day.tasks.length*100}%`;
  $("taskList").innerHTML = "";
  day.tasks.forEach((task, i) => {
    const label = document.createElement("label");
    label.className = "task";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = Boolean((progress[currentDay] || [])[i]);
    cb.addEventListener("change", () => {
      progress[currentDay] = progress[currentDay] || [];
      progress[currentDay][i] = cb.checked;
      save(); renderDay();
    });
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task;
    if (task.startsWith("EXAM:")) label.classList.add("exam-task");
    label.append(cb, span);
    $("taskList").append(label);
  });
  $("prevDay").disabled = currentDay === 0;
  $("nextDay").disabled = currentDay === PLAN.days.length - 1;
  updateOverall();
}
function renderExams() {
  $("examList").innerHTML = "";
  PLAN.exams.forEach(exam => {
    const card = document.createElement("article");
    card.className = "exam-card";
    const date = document.createElement("div"); date.className = "exam-date"; date.textContent = exam.date;
    const details = document.createElement("div"); details.className = "exam-details";
    const name = document.createElement("strong"); name.textContent = exam.subject;
    const time = document.createElement("p"); time.textContent = exam.time;
    const sem = document.createElement("small"); sem.textContent = exam.semester;
    details.append(name,time,sem); card.append(date,details); $("examList").append(card);
  });
}
function showTab(tab) {
  ["today","exams","subjects"].forEach(name => {
    $(name+"Panel").hidden = name !== tab;
    document.querySelector(`[data-tab="${name}"]`).classList.toggle("active", name === tab);
  });
}
document.querySelectorAll(".tab").forEach(btn => btn.addEventListener("click",()=>showTab(btn.dataset.tab)));
$("prevDay").addEventListener("click",()=>{currentDay=Math.max(0,currentDay-1);renderDay();});
$("nextDay").addEventListener("click",()=>{currentDay=Math.min(PLAN.days.length-1,currentDay+1);renderDay();});
$("resetDay").addEventListener("click",()=>{
  if(confirm("Reset checkmarks for this day?")) { delete progress[currentDay]; save(); renderDay(); }
});
$("clearAll").addEventListener("click",()=>{
  if(confirm("Clear all saved study progress on this device?")) { progress={}; save(); renderDay(); toast("Progress cleared."); }
});
function toast(msg) {
  $("toast").textContent = msg; $("toast").classList.add("show");
  setTimeout(()=>$("toast").classList.remove("show"),2200);
}
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); deferredPrompt = e; $("installBtn").hidden = false;
});
$("installBtn").addEventListener("click", async () => {
  if (!deferredPrompt) { toast("Use your browser menu and choose Add to Home screen."); return; }
  deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; $("installBtn").hidden = true;
});
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}
renderDay(); renderExams(); updateOverall();
