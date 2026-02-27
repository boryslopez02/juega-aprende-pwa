<template>
  <div class="min-h-screen flex flex-col app-bg">
    <!-- Loader -->
    <AppLoader v-if="isLoading" @loaded="isLoading = false" />

    <template v-else>
      <!-- Header -->
      <header class="sticky top-0 z-40">
        <div class="header-bar">
          <div
            class="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <div class="logo-badge">
                <span class="text-2xl">🎮</span>
              </div>
              <div>
                <h1 class="text-2xl font-black text-white drop-shadow">
                  Juega y Aprende
                </h1>
                <p class="text-xs text-white/90 font-bold">¡Aprende Jugando!</p>
              </div>
            </div>

            <transition name="pop">
              <div v-if="gameState !== 'menu'" :key="score" class="score-pill">
                <span class="text-2xl">⭐</span>
                <span class="font-black text-white text-xl">{{ score }}</span>
              </div>
            </transition>
          </div>
        </div>
      </header>

      <!-- Main -->
      <main class="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <!-- MENU -->
        <transition name="page" mode="out-in">
          <div v-if="gameState === 'menu'" key="menu" class="space-y-6">
            <!-- Welcome -->
            <div class="card-sticker text-center p-7">
              <div class="text-7xl mb-2 animate-wiggle">🤖✨</div>
              <h2 class="text-3xl font-black text-gray-800 mb-2">
                ¡Elige tu Categoría!
              </h2>
              <p class="text-gray-600 font-semibold">
                Toca una categoría y demuestra cuánto sabes
              </p>
            </div>

            <!-- Wheel (Preguntados vibe) -->
            <div class="card-sticker p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="font-black text-gray-800 flex items-center gap-2">
                  <span class="text-xl">🎡</span>
                  <span>Rueda de Categorías</span>
                </div>
                <div class="text-xs font-bold text-gray-500">Toca un ícono</div>
              </div>

              <CategoryWheel :categories="categories" @select="startGame" />
            </div>

            <!-- Grid (extra, súper usable para niños) -->
            <div class="grid grid-cols-2 gap-4">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="startGame(category.id)"
                class="category-card"
                :style="{
                  background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}cc 100%)`,
                }"
                type="button"
              >
                <div class="category-shine"></div>
                <div class="relative z-10">
                  <div class="text-6xl mb-2 drop-shadow category-icon">
                    {{ category.icon }}
                  </div>
                  <div class="text-white font-black text-lg">
                    {{ category.name }}
                  </div>
                  <div
                    class="mt-2 inline-flex items-center gap-2 bg-white/90 rounded-full px-3 py-1"
                  >
                    <span class="text-sm font-black text-gray-800">{{
                      category.questions.length
                    }}</span>
                    <span class="text-xs text-gray-600 font-bold"
                      >preguntas</span
                    >
                  </div>
                </div>
              </button>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-3">
              <div class="mini-sticker border-green-400">
                <div class="text-3xl">🎯</div>
                <div class="text-xs font-black text-gray-700">5 Preguntas</div>
              </div>
              <div class="mini-sticker border-yellow-400">
                <div class="text-3xl">⭐</div>
                <div class="text-xs font-black text-gray-700">+10 Puntos</div>
              </div>
              <div class="mini-sticker border-pink-400">
                <div class="text-3xl">🏆</div>
                <div class="text-xs font-black text-gray-700">¡Gana!</div>
              </div>
            </div>
          </div>
        </transition>

        <!-- QUIZ -->
        <transition name="page" mode="out-in">
          <div v-if="gameState === 'playing'" key="quiz" class="space-y-6">
            <!-- Top Bar -->
            <div
              class="card-sticker p-4 flex items-center justify-between border-cyan-400"
            >
              <button @click="confirmCancel" class="btn-danger" type="button">
                <span class="text-xl">❌</span>
                <span class="hidden sm:inline">Cancelar</span>
              </button>

              <div class="pill-info">
                <span class="text-2xl">📊</span>
                <span class="font-black text-white">
                  {{ currentQuestionIndex + 1 }}/{{ totalQuestions }}
                </span>
              </div>
            </div>

            <!-- Progress -->
            <div class="card-sticker p-4 border-purple-400">
              <div
                class="flex justify-between text-sm font-black text-gray-700 mb-2"
              >
                <span class="flex items-center gap-1">📈 Progreso</span>
                <span class="text-purple-600">
                  {{
                    Math.round(
                      ((currentQuestionIndex + (showResult ? 1 : 0)) /
                        totalQuestions) *
                        100,
                    )
                  }}%
                </span>
              </div>

              <div
                class="h-4 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300"
              >
                <div
                  class="h-full progress-bar"
                  :style="{
                    width: `${((currentQuestionIndex + (showResult ? 1 : 0)) / totalQuestions) * 100}%`,
                  }"
                ></div>
              </div>
            </div>

            <!-- Question -->
            <div class="card-sticker p-6 border-yellow-400">
              <div class="badge-question">
                <span class="badge-num">{{ currentQuestionIndex + 1 }}</span>
                <span>Pregunta</span>
              </div>

              <h3
                class="text-2xl font-black text-gray-800 mb-6 leading-relaxed"
              >
                {{ currentQuestion?.question }}
              </h3>

              <!-- Options -->
              <div class="space-y-3">
                <button
                  v-for="(option, index) in currentQuestion?.options"
                  :key="index"
                  @click="selectOption(index)"
                  :disabled="showResult"
                  class="option-btn"
                  :class="{
                    'option-correct':
                      showResult && index === currentQuestion.correct,
                    'option-wrong':
                      showResult &&
                      selectedOption === index &&
                      index !== currentQuestion.correct,
                  }"
                  type="button"
                >
                  <div class="flex items-center gap-4">
                    <span class="opt-letter">
                      {{ String.fromCharCode(65 + index) }}
                    </span>
                    <span class="font-black text-gray-800 text-lg flex-1">{{
                      option
                    }}</span>

                    <span
                      v-if="showResult && index === currentQuestion.correct"
                      class="text-3xl animate-bounce"
                      >✅</span
                    >
                    <span
                      v-if="
                        showResult &&
                        selectedOption === index &&
                        index !== currentQuestion.correct
                      "
                      class="text-3xl"
                      >❌</span
                    >
                  </div>
                </button>
              </div>

              <!-- Explanation -->
              <transition name="slide">
                <div
                  v-if="showResult"
                  class="mt-6 p-5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border-l-8 border-cyan-400 shadow-lg"
                >
                  <div class="flex gap-3">
                    <span class="text-3xl flex-shrink-0">
                      {{
                        currentQuestion.correct === selectedOption ? "🎉" : "💡"
                      }}
                    </span>
                    <div>
                      <h4 class="font-black text-gray-800 mb-1">
                        {{
                          currentQuestion.correct === selectedOption
                            ? "¡Correcto!"
                            : "Respuesta:"
                        }}
                      </h4>
                      <p class="text-gray-700 leading-relaxed font-semibold">
                        {{ currentQuestion?.explanation }}
                      </p>
                    </div>
                  </div>
                </div>
              </transition>

              <!-- Next -->
              <transition name="slide">
                <button
                  v-if="showResult"
                  @click="nextQuestion"
                  class="btn-next"
                  type="button"
                >
                  <span>
                    {{
                      isLastQuestion
                        ? "🏆 Ver Resultados"
                        : "➡️ Siguiente Pregunta"
                    }}
                  </span>
                </button>
              </transition>
            </div>
          </div>
        </transition>

        <!-- RESULTS -->
        <transition name="page" mode="out-in">
          <div
            v-if="gameState === 'results'"
            key="results"
            class="text-center space-y-6"
          >
            <div class="relative">
              <div class="text-9xl mb-4 animate-bounce-slow drop-shadow-2xl">
                🏆
              </div>
              <div
                v-if="percentage >= 60"
                class="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  class="w-44 h-44 bg-yellow-300/40 rounded-full animate-ping"
                ></div>
              </div>
            </div>

            <h2 class="text-4xl font-black text-white drop-shadow-lg">
              ¡Juego Terminado!
            </h2>

            <div class="card-sticker p-8 border-yellow-400">
              <div class="relative w-48 h-48 mx-auto mb-6">
                <svg class="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="85"
                    class="fill-none stroke-gray-200"
                    stroke-width="16"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="85"
                    class="fill-none transition-all duration-1000 ease-out"
                    stroke-width="16"
                    stroke-dasharray="534"
                    :stroke-dashoffset="534 - (534 * percentage) / 100"
                    stroke-linecap="round"
                    :class="
                      percentage >= 80
                        ? 'stroke-green-500'
                        : percentage >= 60
                          ? 'stroke-yellow-500'
                          : 'stroke-orange-500'
                    "
                  />
                </svg>

                <div
                  class="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <span class="text-5xl font-black text-gray-800">{{
                    score
                  }}</span>
                  <span class="text-gray-500 font-black">puntos</span>
                </div>
              </div>

              <div class="mt-4">
                <p
                  v-if="percentage >= 80"
                  class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse"
                >
                  🌟 ¡Excelente! 🌟
                </p>
                <p
                  v-else-if="percentage >= 60"
                  class="text-3xl font-black text-green-500"
                >
                  👍 ¡Muy bien!
                </p>
                <p v-else class="text-3xl font-black text-orange-500">
                  💪 ¡Sigue practicando!
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="mini-sticker border-green-400 p-5">
                <div class="text-4xl font-black text-green-500 mb-1">
                  {{ correctAnswers }}
                </div>
                <div class="text-sm font-black text-gray-700">✅ Correctas</div>
              </div>
              <div class="mini-sticker border-red-400 p-5">
                <div class="text-4xl font-black text-red-500 mb-1">
                  {{ incorrectAnswers }}
                </div>
                <div class="text-sm font-black text-gray-700">
                  ❌ Incorrectas
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <button @click="playAgain" class="btn-primary" type="button">
                <span class="text-2xl">🔄</span>
                <span>Jugar de Nuevo</span>
              </button>
              <button @click="goToMenu" class="btn-secondary" type="button">
                <span class="text-2xl">📋</span>
                <span>Otra Categoría</span>
              </button>
            </div>
          </div>
        </transition>
      </main>

      <footer class="py-4 text-center text-white/80 text-sm font-semibold">
        <p>Hecho con ❤️ para aprender • v1.0</p>
      </footer>

      <!-- Cancel Modal -->
      <transition name="fade">
        <div
          v-if="showCancelModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <div
            class="card-sticker p-8 max-w-sm w-full border-red-400 animate-bounce-in"
          >
            <div class="text-center">
              <div class="text-6xl mb-4">🛑</div>
              <h3 class="text-2xl font-black text-gray-800 mb-3">
                ¿Cancelar lección?
              </h3>
              <p class="text-gray-600 mb-6 font-semibold">
                Perderás tu progreso actual
              </p>
              <div class="flex gap-3">
                <button
                  @click="cancelGame"
                  class="btn-danger flex-1 justify-center"
                  type="button"
                >
                  Sí, cancelar
                </button>
                <button
                  @click="showCancelModal = false"
                  class="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-black hover:bg-gray-300 transition-all"
                  type="button"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import confetti from "canvas-confetti";
import AppLoader from "./components/AppLoader.vue";
import CategoryWheel from "./components/CategoryWheel.vue";
import { categories, getRandomQuestions } from "./data/questions";

const isLoading = ref(true);
const gameState = ref("menu");
const currentCategory = ref(null);
const questions = ref([]);
const currentQuestionIndex = ref(0);
const score = ref(0);
const correctAnswers = ref(0);
const incorrectAnswers = ref(0);
const selectedOption = ref(null);
const showResult = ref(false);
const showCancelModal = ref(false);

const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value] || {},
);
const totalQuestions = computed(() => questions.value.length);
const isLastQuestion = computed(
  () => currentQuestionIndex.value === questions.value.length - 1,
);
const percentage = computed(() =>
  totalQuestions.value > 0
    ? (score.value / (totalQuestions.value * 10)) * 100
    : 0,
);

function startGame(categoryId) {
  currentCategory.value = categoryId;
  questions.value = getRandomQuestions(categoryId, 5);
  resetGame();
  gameState.value = "playing";
}

function resetGame() {
  currentQuestionIndex.value = 0;
  score.value = 0;
  correctAnswers.value = 0;
  incorrectAnswers.value = 0;
  selectedOption.value = null;
  showResult.value = false;
  showCancelModal.value = false;
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
    if (percentage.value >= 60) triggerConfetti(true);
  } else {
    currentQuestionIndex.value++;
    selectedOption.value = null;
    showResult.value = false;
  }
}

function confirmCancel() {
  showCancelModal.value = true;
}

function cancelGame() {
  showCancelModal.value = false;
  goToMenu();
}

function playAgain() {
  startGame(currentCategory.value);
}

function goToMenu() {
  gameState.value = "menu";
  currentCategory.value = null;
  questions.value = [];
  showCancelModal.value = false;
}

function triggerConfetti(big = false) {
  confetti({
    particleCount: big ? 160 : 60,
    spread: big ? 110 : 75,
    origin: { y: 0.6 },
    colors: ["#FFD93D", "#4CAF50", "#FF6B6B", "#4ECDC4", "#95E1D3", "#A78BFA"],
    disableForReducedMotion: true,
  });
}

onMounted(() => {
  document.documentElement.classList.add("scroll-smooth");
});
</script>

<style>
/* Fondo tipo confetti */
.app-bg {
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 45%, #fb7185 100%);
  position: relative;
  overflow-x: hidden;
}
.app-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.3;
  background-image:
    radial-gradient(
      circle at 10% 20%,
      rgba(255, 255, 255, 0.35) 0 2px,
      transparent 3px
    ),
    radial-gradient(
      circle at 30% 80%,
      rgba(255, 255, 255, 0.25) 0 2px,
      transparent 3px
    ),
    radial-gradient(
      circle at 70% 25%,
      rgba(255, 255, 255, 0.3) 0 2px,
      transparent 3px
    ),
    radial-gradient(
      circle at 85% 75%,
      rgba(255, 255, 255, 0.22) 0 2px,
      transparent 3px
    );
  background-size: 180px 180px;
}

/* Header */
.header-bar {
  background: linear-gradient(
    90deg,
    rgba(250, 204, 21, 0.95),
    rgba(236, 72, 153, 0.95),
    rgba(168, 85, 247, 0.95)
  );
  border-bottom: 5px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(10px);
}
.logo-badge {
  width: 48px;
  height: 48px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  border: 4px solid rgba(255, 255, 255, 0.8);
  background: linear-gradient(135deg, #fbbf24, #ec4899, #a855f7);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.18);
  transition: transform 0.25s ease;
}
.logo-badge:hover {
  transform: rotate(10deg) scale(1.04);
}
.score-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  background: linear-gradient(90deg, #fbbf24, #fb923c);
  border: 3px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 16px 26px rgba(0, 0, 0, 0.18);
}

/* Cards estilo sticker */
.card-sticker {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 28px;
  border: 5px solid rgba(255, 255, 255, 0.9);
  box-shadow:
    0 22px 45px rgba(0, 0, 0, 0.18),
    inset 0 10px 18px rgba(255, 255, 255, 0.25);
}
.mini-sticker {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  border: 4px solid;
  text-align: center;
  padding: 14px 10px;
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.15);
}

/* Category grid */
.category-card {
  position: relative;
  border-radius: 28px;
  padding: 22px;
  border: 6px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.18);
  transform: translateZ(0);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
  overflow: hidden;
}
.category-card:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 28px 45px rgba(0, 0, 0, 0.22);
}
.category-shine {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 25% 20%,
    rgba(255, 255, 255, 0.35),
    transparent 55%
  );
  opacity: 0.9;
}
.category-icon {
  transform: rotate(-2deg);
}

/* Quiz pieces */
.badge-question {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 999px;
  background: linear-gradient(90deg, #a855f7, #ec4899);
  color: white;
  font-weight: 900;
  margin-bottom: 18px;
  box-shadow: 0 14px 24px rgba(0, 0, 0, 0.15);
}
.badge-num {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: white;
  color: #7c3aed;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 900;
}
.progress-bar {
  border-radius: 999px;
  background: linear-gradient(90deg, #4ade80, #facc15, #fb7185);
  transition: width 0.7s ease;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
}
.option-btn {
  width: 100%;
  text-align: left;
  padding: 18px;
  border-radius: 22px;
  border: 4px solid #e5e7eb;
  background: linear-gradient(90deg, #f9fafb, #f3f4f6);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    border-color 0.12s ease;
}
.option-btn:hover {
  transform: scale(1.01);
  border-color: #22d3ee;
  box-shadow: 0 18px 28px rgba(0, 0, 0, 0.14);
}
.option-btn:active {
  transform: scale(0.99);
}
.opt-letter {
  width: 48px;
  height: 48px;
  border-radius: 18px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border: 4px solid rgba(255, 255, 255, 0.85);
  color: white;
  font-weight: 900;
  display: grid;
  place-items: center;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.16);
  font-size: 18px;
}
.option-correct {
  background: linear-gradient(90deg, #dcfce7, #a7f3d0) !important;
  border-color: #22c55e !important;
}
.option-wrong {
  background: linear-gradient(90deg, #ffe4e6, #fecdd3) !important;
  border-color: #ef4444 !important;
}

/* Buttons */
.btn-danger {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 16px;
  font-weight: 900;
  color: white;
  border: 4px solid rgba(255, 255, 255, 0.8);
  background: linear-gradient(90deg, #fb7185, #ef4444);
  box-shadow: 0 16px 26px rgba(0, 0, 0, 0.18);
  transition: transform 0.12s ease;
}
.btn-danger:hover {
  transform: scale(1.03);
}
.btn-next {
  margin-top: 18px;
  width: 100%;
  padding: 16px;
  border-radius: 22px;
  font-weight: 900;
  font-size: 20px;
  color: white;
  background: linear-gradient(90deg, #4ade80, #facc15, #fb7185);
  border: 5px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 20px 34px rgba(0, 0, 0, 0.18);
  transition: transform 0.12s ease;
}
.btn-next:hover {
  transform: scale(1.01);
}
.btn-primary {
  width: 100%;
  padding: 16px;
  border-radius: 22px;
  font-weight: 900;
  font-size: 20px;
  color: white;
  background: linear-gradient(90deg, #22c55e, #10b981);
  border: 5px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 20px 34px rgba(0, 0, 0, 0.18);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.12s ease;
}
.btn-primary:hover {
  transform: scale(1.01);
}
.btn-secondary {
  width: 100%;
  padding: 16px;
  border-radius: 22px;
  font-weight: 900;
  font-size: 20px;
  color: #7c3aed;
  background: rgba(255, 255, 255, 0.92);
  border: 5px solid rgba(167, 139, 250, 0.9);
  box-shadow: 0 20px 34px rgba(0, 0, 0, 0.16);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.12s ease;
}
.btn-secondary:hover {
  transform: scale(1.01);
}
.pill-info {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 16px;
  background: linear-gradient(90deg, #22d3ee, #3b82f6);
  border: 4px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 16px 26px rgba(0, 0, 0, 0.16);
}

/* Transiciones */
.page-enter-active,
.page-leave-active {
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(18px) scale(0.98);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  60% {
    transform: scale(1.06);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-bounce-in {
  animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
@keyframes wiggle {
  0%,
  100% {
    transform: rotate(-2deg) scale(1);
  }
  50% {
    transform: rotate(2deg) scale(1.04);
  }
}
.animate-wiggle {
  animation: wiggle 1.8s ease-in-out infinite;
}

/* Pop score */
.pop-enter-active {
  transition: all 0.2s ease;
}
.pop-enter-from {
  transform: scale(0.6);
  opacity: 0;
}

html {
  scroll-behavior: smooth;
}
body {
  overscroll-behavior-y: contain;
}
</style>
