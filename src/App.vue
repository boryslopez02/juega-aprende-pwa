<template>
  <div class="app-container">
    <!-- Header -->
    <header class="app-header">
      <div class="logo">
        <span class="logo-icon"></span>
        <h1>Aprende y Juega</h1>
      </div>
      <div class="score-display" v-if="gameState !== 'menu'">
        <span class="score-icon">⭐</span>
        <span class="score-value">{{ score }}</span>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Menu Screen -->
      <div
        v-if="gameState === 'menu'"
        class="menu-screen animate__animated animate__fadeIn"
      >
        <div class="welcome-card">
          <div class="mascot">🤖</div>
          <h2>¡Aprende Jugando!</h2>
          <p>Elige una categoría y demuestra cuánto sabes de computación</p>
        </div>

        <div class="categories-grid">
          <button
            v-for="category in categories"
            :key="category.id"
            class="category-card"
            :style="{ '--category-color': category.color }"
            @click="startGame(category.id)"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <span class="category-name">{{ category.name }}</span>
            <span class="category-count"
              >{{ category.questions.length }} preguntas</span
            >
          </button>
        </div>
      </div>

      <!-- Quiz Screen -->
      <div v-else-if="gameState === 'playing'" class="quiz-screen">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{
              width: `${(currentQuestionIndex / totalQuestions) * 100}%`,
            }"
          ></div>
        </div>

        <div class="question-card animate__animated animate__fadeInUp">
          <div class="question-number">
            Pregunta {{ currentQuestionIndex + 1 }} de {{ totalQuestions }}
          </div>

          <h3 class="question-text">{{ currentQuestion.question }}</h3>

          <div class="options-grid">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              class="option-button"
              :class="{
                correct: showResult && index === currentQuestion.correct,
                incorrect:
                  showResult &&
                  selectedOption === index &&
                  index !== currentQuestion.correct,
                disabled: showResult,
              }"
              @click="selectOption(index)"
              :disabled="showResult"
            >
              <span class="option-letter">{{
                String.fromCharCode(65 + index)
              }}</span>
              <span class="option-text">{{ option }}</span>
            </button>
          </div>

          <div
            v-if="showResult"
            class="explanation animate__animated animate__fadeIn"
          >
            <div class="explanation-icon">
              {{ currentQuestion.correct === selectedOption ? "✅" : "💡" }}
            </div>
            <p>{{ currentQuestion.explanation }}</p>
          </div>

          <button v-if="showResult" class="next-button" @click="nextQuestion">
            {{ isLastQuestion ? "Ver Resultados" : "Siguiente Pregunta" }} →
          </button>
        </div>
      </div>

      <!-- Results Screen -->
      <div
        v-else-if="gameState === 'results'"
        class="results-screen animate__animated animate__zoomIn"
      >
        <div class="trophy">🏆</div>
        <h2>¡Juego Terminado!</h2>

        <div class="final-score">
          <div class="score-circle">
            <span class="score-number">{{ score }}</span>
            <span class="score-max">/ {{ totalQuestions * 10 }}</span>
          </div>
        </div>

        <div class="performance-message">
          <p v-if="percentage >= 80" class="excellent">¡Excelente! 🌟</p>
          <p v-else-if="percentage >= 60" class="good">¡Muy bien! 👍</p>
          <p v-else class="keep-trying">¡Sigue practicando! 💪</p>
        </div>

        <div class="stats">
          <div class="stat-item">
            <span class="stat-label">Correctas</span>
            <span class="stat-value correct">{{ correctAnswers }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Incorrectas</span>
            <span class="stat-value incorrect">{{ incorrectAnswers }}</span>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn-primary" @click="playAgain">
            🔄 Jugar de Nuevo
          </button>
          <button class="btn-secondary" @click="goToMenu">
            📋 Cambiar Categoría
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <p>Hecho con ❤️ para aprender</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import confetti from "canvas-confetti";
import "animate.css";
import { categories, getRandomQuestions } from "./data/questions";

const gameState = ref("menu"); // menu, playing, results
const currentCategory = ref(null);
const questions = ref([]);
const currentQuestionIndex = ref(0);
const score = ref(0);
const correctAnswers = ref(0);
const incorrectAnswers = ref(0);
const selectedOption = ref(null);
const showResult = ref(false);

const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value] || {};
});

const totalQuestions = computed(() => questions.value.length);

const isLastQuestion = computed(() => {
  return currentQuestionIndex.value === questions.value.length - 1;
});

const percentage = computed(() => {
  return totalQuestions.value > 0
    ? (score.value / (totalQuestions.value * 10)) * 100
    : 0;
});

function startGame(categoryId) {
  currentCategory.value = categoryId;
  questions.value = getRandomQuestions(categoryId, 5);
  currentQuestionIndex.value = 0;
  score.value = 0;
  correctAnswers.value = 0;
  incorrectAnswers.value = 0;
  selectedOption.value = null;
  showResult.value = false;
  gameState.value = "playing";
}

function selectOption(index) {
  if (showResult.value) return;

  selectedOption.value = index;
  showResult.value = true;

  if (index === currentQuestion.value.correct) {
    score.value += 10;
    correctAnswers.value++;
    triggerConfetti(false);
  } else {
    incorrectAnswers.value++;
  }
}

function nextQuestion() {
  if (isLastQuestion.value) {
    gameState.value = "results";
    if (percentage.value >= 60) {
      triggerConfetti(true);
    }
  } else {
    currentQuestionIndex.value++;
    selectedOption.value = null;
    showResult.value = false;
  }
}

function playAgain() {
  startGame(currentCategory.value);
}

function goToMenu() {
  gameState.value = "menu";
  currentCategory.value = null;
  questions.value = [];
}

function triggerConfetti(big = false) {
  const duration = big ? 3000 : 1000;
  const particleCount = big ? 150 : 50;

  confetti({
    particleCount,
    spread: big ? 100 : 70,
    origin: { y: 0.6 },
    colors: ["#4CAF50", "#FFD93D", "#FF6B6B", "#4ECDC4"],
    disableForReducedMotion: true,
  });
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #4caf50;
  --secondary: #ffd93d;
  --accent: #ff6b6b;
  --text: #2c3e50;
  --background: #f0f4f8;
  --card: #ffffff;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: var(--text);
}

.app-container {
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--background);
}

/* Header */
.app-header {
  background: linear-gradient(135deg, var(--primary) 0%, #45a049 100%);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 2rem;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.score-display {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

/* Menu Screen */
.welcome-card {
  background: var(--card);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.mascot {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.welcome-card h2 {
  color: var(--primary);
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.welcome-card p {
  color: #666;
  font-size: 1rem;
}

/* Categories Grid */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.category-card {
  background: var(--card);
  border: 3px solid var(--category-color);
  border-radius: 15px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.category-icon {
  font-size: 2.5rem;
}

.category-name {
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--text);
}

.category-count {
  font-size: 0.85rem;
  color: #888;
}

/* Quiz Screen */
.progress-bar {
  height: 8px;
  background: #ddd;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transition: width 0.3s ease;
}

.question-card {
  background: var(--card);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.question-number {
  color: var(--primary);
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.question-text {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: var(--text);
  line-height: 1.4;
}

.options-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-button {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  text-align: left;
}

.option-button:hover:not(.disabled) {
  background: #e9ecef;
  transform: translateX(5px);
}

.option-button.correct {
  background: #d4edda;
  border-color: #28a745;
  color: #155724;
}

.option-button.incorrect {
  background: #f8d7da;
  border-color: #dc3545;
  color: #721c24;
}

.option-button.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.option-letter {
  background: var(--primary);
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.option-button.correct .option-letter {
  background: #28a745;
}

.option-button.incorrect .option-letter {
  background: #dc3545;
}

.explanation {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #e7f3ff;
  border-radius: 12px;
  border-left: 4px solid #4ecdc4;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.explanation-icon {
  font-size: 1.5rem;
}

.explanation p {
  color: #004085;
  line-height: 1.5;
}

.next-button {
  margin-top: 1.5rem;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.next-button:hover {
  transform: scale(1.02);
}

/* Results Screen */
.results-screen {
  text-align: center;
  padding: 2rem;
}

.trophy {
  font-size: 6rem;
  margin-bottom: 1rem;
  animation: trophyBounce 1s ease;
}

@keyframes trophyBounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.results-screen h2 {
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 2rem;
}

.final-score {
  margin-bottom: 2rem;
}

.score-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.score-number {
  font-size: 3rem;
  font-weight: bold;
  color: white;
}

.score-max {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.performance-message {
  margin-bottom: 2rem;
  font-size: 1.3rem;
}

.performance-message p {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.excellent {
  color: #ffd93d;
}
.good {
  color: #4caf50;
}
.keep-trying {
  color: #ff6b6b;
}

.stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
}

.stat-value.correct {
  color: #28a745;
}
.stat-value.incorrect {
  color: #dc3545;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), #45a049);
  color: white;
}

.btn-secondary {
  background: white;
  color: var(--text);
  border: 2px solid var(--primary);
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: scale(1.05);
}

/* Footer */
.app-footer {
  background: var(--card);
  padding: 1rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 480px) {
  .logo h1 {
    font-size: 1.2rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .question-text {
    font-size: 1.1rem;
  }

  .stats {
    gap: 1rem;
  }
}
</style>
