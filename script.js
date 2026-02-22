const questionBank = {
  science: [
    { question: "What is the chemical symbol for gold?", answers: [{ text: "Go", correct: false }, { text: "Gd", correct: false }, { text: "Au", correct: true }, { text: "Ag", correct: false }] },
    { question: "What planet is known as the Red Planet?", answers: [{ text: "Venus", correct: false }, { text: "Mars", correct: true }, { text: "Jupiter", correct: false }, { text: "Saturn", correct: false }] },
    { question: "What is the hardest natural substance on Earth?", answers: [{ text: "Granite", correct: false }, { text: "Diamond", correct: true }, { text: "Iron", correct: false }, { text: "Quartz", correct: false }] },
    { question: "What gas do plants absorb from the atmosphere?", answers: [{ text: "Oxygen", correct: false }, { text: "Nitrogen", correct: false }, { text: "Carbon Dioxide", correct: true }, { text: "Hydrogen", correct: false }] },
    { question: "Which has a pH less than 7?", answers: [{ text: "Blood", correct: false }, { text: "Water", correct: false }, { text: "Lemon Juice", correct: true }, { text: "Soap", correct: false }] },
  ],
  history: [
    { question: "Who was the first President of the USA?", answers: [{ text: "Abraham Lincoln", correct: false }, { text: "George Washington", correct: true }, { text: "Thomas Jefferson", correct: false }, { text: "John Adams", correct: false }] },
    { question: "In which year did World War II end?", answers: [{ text: "1940", correct: false }, { text: "1945", correct: true }, { text: "1950", correct: false }, { text: "1955", correct: false }] },
    { question: "Which ancient civilization built the Pyramids?", answers: [{ text: "Romans", correct: false }, { text: "Greeks", correct: false }, { text: "Egyptians", correct: true }, { text: "Mayans", correct: false }] },
    { question: "Who discovered America in 1492?", answers: [{ text: "Christopher Columbus", correct: true }, { text: "Leif Erikson", correct: false }, { text: "Marco Polo", correct: false }, { text: "Ferdinand Magellan", correct: false }] },
    { question: "The Titanic sank in which ocean?", answers: [{ text: "Pacific", correct: false }, { text: "Indian", correct: false }, { text: "Atlantic", correct: true }, { text: "Arctic", correct: false }] }
  ],
  geography: [
    { question: "What is the capital of France?", answers: [{ text: "London", correct: false }, { text: "Berlin", correct: false }, { text: "Paris", correct: true }, { text: "Madrid", correct: false }] },
    { question: "Which country has the most population?", answers: [{ text: "USA", correct: false }, { text: "India", correct: true }, { text: "Russia", correct: false }, { text: "Brazil", correct: false }] },
    { question: "What is the longest river in the world?", answers: [{ text: "Amazon", correct: false }, { text: "Yangtze", correct: false }, { text: "Nile", correct: true }, { text: "Mississippi", correct: false }] },
    { question: "Mount Everest is located in which mountain range?", answers: [{ text: "Andes", correct: false }, { text: "Rockies", correct: false }, { text: "Alps", correct: false }, { text: "Himalayas", correct: true }] },
    { question: "Which continent is the Sahara Desert in?", answers: [{ text: "Asia", correct: false }, { text: "Africa", correct: true }, { text: "South America", correct: false }, { text: "Australia", correct: false }] }
  ],
  entertainment: [
    { question: "Who played Jack in Titanic?", answers: [{ text: "Brad Pitt", correct: false }, { text: "Tom Cruise", correct: false }, { text: "Leonardo DiCaprio", correct: true }, { text: "Johnny Depp", correct: false }] },
    { question: "Which movie features a giant ape?", answers: [{ text: "Godzilla", correct: false }, { text: "King Kong", correct: true }, { text: "Jurassic Park", correct: false }, { text: "Jaws", correct: false }] },
    { question: "Which animated movie features a rat who can cook?", answers: [{ text: "Ratatouille", correct: true }, { text: "Up", correct: false }, { text: "Toy Story", correct: false }, { text: "Shrek", correct: false }] },
    { question: "In MCU, what is Thor's weapon?", answers: [{ text: "Sword", correct: false }, { text: "Shield", correct: false }, { text: "Hammer", correct: true }, { text: "Bow", correct: false }] },
    { question: "Who is the protagonist of 'The Matrix'?", answers: [{ text: "Morpheus", correct: false }, { text: "Trinity", correct: false }, { text: "Agent Smith", correct: false }, { text: "Neo", correct: true }] }
  ]
};

const categoryLabels = {
  science: "🔬 Science",
  history: "🏛️ History",
  geography: "🌍 Geography",
  entertainment: "🎬 Entertainment"
};

// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const categoryCards = document.querySelectorAll(".category-card");
const resetBtn = document.getElementById("reset-btn");
const restartBtn = document.getElementById("restart-btn");

const quizCategoryDisplay = document.getElementById("quiz-category-display");
const resultCategoryDisplay = document.getElementById("result-category-display");
const timerValue = document.getElementById("timer-value");
const timerCirclePath = document.getElementById("timer-circle-path");
const progressFill = document.getElementById("progress");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const finalScoreSpan = document.getElementById("final-score");
const accuracyFill = document.getElementById("accuracy-fill");
const accuracyText = document.getElementById("accuracy-text");
const resultTitle = document.getElementById("result-title");

// Quiz State
let currentCategory = "";
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
let timerInterval;
const TIMER_DURATION = 15;
let timeLeft = TIMER_DURATION;

// Audio (Optional, you can add sounds later if you want)
// const clickSound = new Audio('click.mp3');

// Initialization
categoryCards.forEach(card => {
  card.addEventListener("click", () => {
    currentCategory = card.dataset.category;
    startQuiz();
  });
});

resetBtn.addEventListener("click", goToStart);
restartBtn.addEventListener("click", goToStart);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');

// Check for saved theme preference in localStorage
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    theme = 'light';
  } else {
    theme = 'dark';
  }
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  answersDisabled = false;

  quizQuestions = [...questionBank[currentCategory]];
  shuffleArray(quizQuestions);

  quizCategoryDisplay.textContent = categoryLabels[currentCategory];
  totalQuestionsSpan.textContent = quizQuestions.length;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  clearInterval(timerInterval);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  progressFill.style.width = `${progressPercent}%`;

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  const letters = ['A', 'B', 'C', 'D'];

  currentQuestion.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.dataset.correct = answer.correct;

    btn.innerHTML = `
      <div class="answer-letter">${letters[index]}</div>
      <div class="answer-text">${answer.text}</div>
    `;

    btn.addEventListener("click", selectAnswer);
    answersContainer.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(e) {
  if (answersDisabled) return;
  answersDisabled = true;
  clearInterval(timerInterval);

  const selectedBtn = e.currentTarget;
  const isCorrect = selectedBtn.dataset.correct === "true";

  // Apply feedback
  Array.from(answersContainer.children).forEach(btn => {
    btn.style.pointerEvents = "none";
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    } else if (btn === selectedBtn) {
      btn.classList.add("incorrect");
    }
  });

  if (isCorrect) score++;

  setTimeout(() => {
    nextQuestion();
  }, 1200);
}

function startTimer() {
  timeLeft = TIMER_DURATION;
  timerValue.textContent = timeLeft;
  timerCirclePath.style.strokeDashoffset = "0";
  timerCirclePath.setAttribute("stroke", "purple"); // Or #8b5cf6 handled in css

  timerInterval = setInterval(() => {
    timeLeft--;
    timerValue.textContent = timeLeft;

    // Circle math: total length is 100 based on stroke-dasharray
    const offset = 100 - (timeLeft / TIMER_DURATION) * 100;
    timerCirclePath.style.strokeDashoffset = offset;

    if (timeLeft <= 5) {
      timerCirclePath.setAttribute("stroke", "red");
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  answersDisabled = true;

  Array.from(answersContainer.children).forEach(btn => {
    btn.style.pointerEvents = "none";
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });

  setTimeout(() => {
    nextQuestion();
  }, 1200);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  resultCategoryDisplay.textContent = categoryLabels[currentCategory];
  finalScoreSpan.textContent = score;

  const percentage = Math.round((score / quizQuestions.length) * 100);
  accuracyFill.style.width = `${percentage}%`;
  accuracyText.textContent = `${percentage}% accuracy`;

  if (percentage === 100) {
    resultTitle.textContent = "Flawless!";
  } else if (percentage >= 80) {
    resultTitle.textContent = "Amazing!";
  } else if (percentage >= 60) {
    resultTitle.textContent = "Good Job!";
  } else if (percentage >= 40) {
    resultTitle.textContent = "Not Bad!";
  } else {
    resultTitle.textContent = "Keep Trying!";
  }
}

function goToStart() {
  clearInterval(timerInterval);
  quizScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (!quizScreen.classList.contains("active") || answersDisabled) return;

  const key = e.key.toLowerCase();
  const letters = ['a', 'b', 'c', 'd'];
  const index = letters.indexOf(key);

  if (index !== -1) {
    const btns = answersContainer.querySelectorAll(".answer-btn");
    if (btns[index]) {
      btns[index].click();
    }
  }
});