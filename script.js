// ---------- HABIT TRACKER ----------
const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");
const progressPercent = document.getElementById("progressPercent");
const progressCircle = document.getElementById("progressCircle");
const celebration = document.getElementById("celebration");

// Load saved habits from localStorage
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Display habits
function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.textContent = habit.text;
    if (habit.completed) li.classList.add("completed");

    li.addEventListener("click", () => toggleHabit(index));
    habitList.appendChild(li);
  });
  updateProgress();
}

// Add new habit
addHabitBtn.addEventListener("click", () => {
  const text = habitInput.value.trim();
  if (text) {
    habits.push({ text, completed: false });
    habitInput.value = "";
    saveHabits();
    renderHabits();
    updateProgress();
  }
});

// Toggle complete
function toggleHabit(index) {
  habits[index].completed = !habits[index].completed;
  saveHabits();
  renderHabits();
   updateProgress();
}

// Save to localStorage
function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// ---------- PROGRESS ----------
function updateProgress() {

  // Always use latest habits list
  const saved = JSON.parse(localStorage.getItem("habits")) || habits;
  const total = saved.length;
  const completed = saved.filter(h => h.completed).length;

  if (total === 0) {
    progressPercent.textContent = "0%";
    progressCircle.style.borderTopColor = "#555";
    return;
  }

  const percent = Math.round((completed / total) * 100);
  progressPercent.textContent = percent + "%";
  progressCircle.style.borderTopColor = percent === 100 ? "#00ff88" : "#9eff7a";

  if (percent === 100) {
    showCelebration();
  }
}


function showCelebration() {
 function showCelebration() {
  celebration.classList.remove("hidden");
  celebration.style.opacity = "0";
  celebration.style.transition = "opacity 0.6s ease";
  
  // fade in
  setTimeout(() => {
    celebration.style.opacity = "1";
  }, 50);

  // fade out after 3s
  setTimeout(() => {
    celebration.style.opacity = "0";
  }, 3000);

  // hide after fade out
  setTimeout(() => {
    celebration.classList.add("hidden");
  }, 3700);
}

}

// ---------- CHARTS ----------
const exerciseCtx = document.getElementById("exerciseChart").getContext("2d");
const healthCtx = document.getElementById("healthChart").getContext("2d");

new Chart(exerciseCtx, {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Exercise (mins)",
        data: [30, 45, 50, 25, 60, 40, 35],
        backgroundColor: "#9eff7a",
      },
    ],
  },
  options: {
    scales: {
      y: { beginAtZero: true, ticks: { color: "#baff93" } },
      x: { ticks: { color: "#baff93" } },
    },
    plugins: {
      legend: { labels: { color: "#baff93" } },
    },
  },
});

new Chart(healthCtx, {
  type: "pie",
  data: {
    labels: ["Steps", "Heart Rate", "Rest", "Active Time"],
    datasets: [
      {
        label: "Health Stats",
        data: [40, 25, 20, 15],
        backgroundColor: ["#9eff7a", "#7affb8", "#00ffa1", "#44ff77"],
      },
    ],
  },
  options: {
    plugins: {
      legend: { labels: { color: "#baff93" } },
    },
  },
});

// ---------- LANGUAGE TOGGLE ----------
const languageSelect = document.getElementById("languageSelect");
languageSelect.addEventListener("change", switchLanguage);

function switchLanguage() {
  const lang = languageSelect.value;
  const elements = {
    dashboardTitle: { en: "My Health & Habit Dashboard", hi: "मेरी सेहत और आदत डैशबोर्ड" },
    welcomeText: { en: "Welcome back, Aditi 👋", hi: "वापसी पर स्वागत है, अदिति 👋" },
    quoteText: { en: "Small daily steps lead to big health wins 🌿", hi: "छोटे कदम से बड़ी सफलता मिलती है 🌿" },
    habitTitle: { en: "Your Habits", hi: "आपकी आदतें" },
    progressTitle: { en: "Progress", hi: "प्रगति" },
    barTitle: { en: "Weekly Exercise Tracker", hi: "साप्ताहिक व्यायाम ट्रैकर" },
    pieTitle: { en: "Health Stats Overview", hi: "स्वास्थ्य सांख्यिकी अवलोकन" },
  };

  for (let id in elements) {
    document.getElementById(id).textContent = elements[id][lang];
  }
}

// ---------- INITIAL CALLS ----------
renderHabits();
updateProgress();
