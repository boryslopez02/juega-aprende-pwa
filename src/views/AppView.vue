<template>
  <div class="app-shell">
    <!-- Loader -->
    <AppLoader v-if="isLoading" @loaded="isLoading = false" />

    <template v-else>
      <!-- ══ HEADER ══ -->
      <header class="app-header">
        <div class="header-inner">
          <div class="header-brand">
            <div class="brand-icon">
              <AppIcon name="book" color="white" class-name="w-5 h-5" />
            </div>
            <div>
              <div class="brand-name">Juega y Aprende</div>
              <div class="brand-sub">Computación para todos</div>
            </div>
          </div>

          <transition name="score-pop">
            <div
              v-if="gameState === 'playing'"
              :key="score"
              class="score-badge"
            >
              <AppIcon
                name="star-filled"
                color="#fbbf24"
                class-name="w-4 h-4"
              />
              <span>{{ score }}</span>
            </div>
          </transition>
        </div>
      </header>

      <!-- ══ MAIN ══ -->
      <main class="app-main">
        <!-- MENU -->
        <transition name="page" mode="out-in">
          <div v-if="gameState === 'menu'" key="menu">
            <!-- Hero card -->
            <div class="hero-card">
              <div class="hero-glow"></div>
              <div class="hero-content">
                <div class="hero-icon-grid">
                  <div
                    v-for="cat in categories"
                    :key="cat.id"
                    class="hero-mini-icon"
                    :style="{ background: cat.colorLight }"
                  >
                    <AppIcon
                      :name="cat.icon"
                      :color="cat.color"
                      class-name="w-5 h-5"
                    />
                  </div>
                </div>
                <h2 class="hero-title">¡Elige una categoría!</h2>
                <p class="hero-sub">
                  Toca una categoría, elige tu nivel y demuestra cuánto sabes
                </p>
              </div>
            </div>

            <!-- Rueda -->
            <div class="section-card my-2">
              <div class="section-header">
                <span class="section-title">Rueda de categorías</span>
                <span class="section-hint">Toca un ícono o gira</span>
              </div>
              <CategoryWheel
                :categories="categoriesForWheel"
                @select="onWheelSelect"
              />
            </div>

            <!-- Grid de categorías -->
            <div class="cat-grid">
              <button
                v-for="cat in categories"
                :key="cat.id"
                @click="openCategory(cat)"
                class="cat-card"
                type="button"
              >
                <div
                  class="cat-icon-wrap"
                  :style="{ background: cat.colorLight }"
                >
                  <AppIcon
                    :name="cat.icon"
                    :color="cat.color"
                    class-name="w-7 h-7"
                  />
                </div>
                <div class="cat-name">{{ cat.name }}</div>
                <div class="cat-count">{{ cat.questions.length }} preg.</div>
                <div
                  class="cat-bar"
                  :style="{ background: cat.gradient }"
                ></div>
              </button>
            </div>

            <!-- Stats mini -->
            <div class="stats-row mt-2">
              <div class="stat-chip">
                <AppIcon name="target" color="#6366f1" class-name="w-5 h-5" />
                <span>3 niveles</span>
              </div>
              <div class="stat-chip">
                <AppIcon
                  name="star-filled"
                  color="#f59e0b"
                  class-name="w-5 h-5"
                />
                <span>+20 pts máx</span>
              </div>
              <div class="stat-chip">
                <AppIcon name="trophy" color="#10b981" class-name="w-5 h-5" />
                <span>¡A ganar!</span>
              </div>
            </div>
          </div>
        </transition>

        <!-- QUIZ -->
        <transition name="page" mode="out-in">
          <div v-if="gameState === 'playing'" key="quiz">
            <!-- Top controls -->
            <div class="quiz-topbar">
              <button @click="confirmCancel" class="quit-btn" type="button">
                <AppIcon name="x" color="#ef4444" class-name="w-4 h-4" />
                <span>Salir</span>
              </button>

              <div
                class="quiz-diff-badge"
                :style="{ background: currentDifficulty.colorLight }"
              >
                <AppIcon
                  :name="currentDifficulty.icon"
                  :color="currentDifficulty.color"
                  class-name="w-3.5 h-3.5"
                />
                <span :style="{ color: currentDifficulty.color }">{{
                  currentDifficulty.name
                }}</span>
              </div>

              <div class="quiz-progress-badge">
                <AppIcon name="chart" color="#6366f1" class-name="w-4 h-4" />
                <span>{{ currentQuestionIndex + 1 }}/{{ totalQuestions }}</span>
              </div>
            </div>

            <!-- Progress bar + stats -->
            <div class="progress-card">
              <div class="progress-track">
                <div
                  class="progress-fill"
                  :style="{
                    width: `${((currentQuestionIndex + (showResult ? 1 : 0)) / totalQuestions) * 100}%`,
                    background: currentDifficulty.gradient,
                  }"
                ></div>
              </div>
              <div class="progress-meta">
                <span class="meta-correct">
                  <AppIcon
                    name="check"
                    color="#10b981"
                    class-name="w-3.5 h-3.5"
                  />
                  {{ correctAnswers }} correctas
                </span>
                <span
                  class="meta-pct"
                  :style="{ color: currentDifficulty.color }"
                >
                  {{
                    Math.round(
                      ((currentQuestionIndex + (showResult ? 1 : 0)) /
                        totalQuestions) *
                        100,
                    )
                  }}%
                </span>
                <span class="meta-wrong">
                  <AppIcon name="x" color="#ef4444" class-name="w-3.5 h-3.5" />
                  {{ incorrectAnswers }} mal
                </span>
              </div>
            </div>

            <!-- Question card -->
            <div class="question-card">
              <!-- Badge pregunta -->
              <div
                class="q-badge"
                :style="{ background: selectedCategory.colorLight }"
              >
                <AppIcon
                  :name="selectedCategory.icon"
                  :color="selectedCategory.color"
                  class-name="w-3.5 h-3.5"
                />
                <span :style="{ color: selectedCategory.color }"
                  >Pregunta {{ currentQuestionIndex + 1 }}</span
                >
              </div>

              <h3 class="q-text">{{ currentQuestion?.question }}</h3>

              <!-- Opciones -->
              <div class="options-list">
                <button
                  v-for="(option, index) in currentQuestion?.options"
                  :key="index"
                  @click="selectOption(index)"
                  :disabled="showResult"
                  class="option"
                  :class="{
                    'option-correct':
                      showResult && index === currentQuestion.correct,
                    'option-wrong':
                      showResult &&
                      selectedOption === index &&
                      index !== currentQuestion.correct,
                    'option-dim':
                      showResult &&
                      selectedOption !== index &&
                      index !== currentQuestion.correct,
                  }"
                  type="button"
                >
                  <span
                    class="opt-key"
                    :class="{
                      'opt-key-correct':
                        showResult && index === currentQuestion.correct,
                      'opt-key-wrong':
                        showResult &&
                        selectedOption === index &&
                        index !== currentQuestion.correct,
                    }"
                    >{{ String.fromCharCode(65 + index) }}</span
                  >
                  <span class="opt-text">{{ option }}</span>
                  <AppIcon
                    v-if="showResult && index === currentQuestion.correct"
                    name="check"
                    color="#10b981"
                    class-name="w-5 h-5 ml-auto flex-shrink-0"
                  />
                  <AppIcon
                    v-if="
                      showResult &&
                      selectedOption === index &&
                      index !== currentQuestion.correct
                    "
                    name="x"
                    color="#ef4444"
                    class-name="w-5 h-5 ml-auto flex-shrink-0"
                  />
                </button>
              </div>

              <!-- Explicación -->
              <transition name="explain-slide">
                <div
                  v-if="showResult"
                  class="explanation"
                  :class="
                    currentQuestion.correct === selectedOption
                      ? 'explain-ok'
                      : 'explain-info'
                  "
                >
                  <AppIcon
                    :name="
                      currentQuestion.correct === selectedOption
                        ? 'check'
                        : 'lightbulb'
                    "
                    :color="
                      currentQuestion.correct === selectedOption
                        ? '#059669'
                        : '#0369a1'
                    "
                    class-name="w-5 h-5 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <div class="explain-title">
                      {{
                        currentQuestion.correct === selectedOption
                          ? "¡Correcto!"
                          : "Respuesta correcta:"
                      }}
                    </div>
                    <p class="explain-text">
                      {{ currentQuestion?.explanation }}
                    </p>
                  </div>
                </div>
              </transition>

              <!-- Siguiente -->
              <transition name="explain-slide">
                <button
                  v-if="showResult"
                  @click="nextQuestion"
                  class="next-btn"
                  :style="{ background: currentDifficulty.gradient }"
                  type="button"
                >
                  <span>{{
                    isLastQuestion ? "Ver resultados" : "Siguiente pregunta"
                  }}</span>
                  <AppIcon
                    name="arrow-right"
                    color="white"
                    class-name="w-5 h-5"
                  />
                </button>
              </transition>
            </div>
          </div>
        </transition>

        <!-- RESULTS -->
        <transition name="page" mode="out-in">
          <div v-if="gameState === 'results'" key="results">
            <!-- Trophy area -->
            <div class="results-hero">
              <div class="results-trophy-wrap">
                <div
                  class="results-trophy-bg"
                  :class="percentage >= 60 ? 'trophy-glow' : ''"
                ></div>
                <AppIcon
                  name="trophy"
                  :color="
                    percentage >= 80
                      ? '#f59e0b'
                      : percentage >= 60
                        ? '#94a3b8'
                        : '#fb923c'
                  "
                  class-name="w-20 h-20"
                />
              </div>
              <h2 class="results-title">¡Lección completada!</h2>
              <div
                class="results-diff-badge"
                :style="{ background: currentDifficulty.colorLight }"
              >
                <AppIcon
                  :name="currentDifficulty.icon"
                  :color="currentDifficulty.color"
                  class-name="w-4 h-4"
                />
                <span :style="{ color: currentDifficulty.color }"
                  >Nivel {{ currentDifficulty.name }}</span
                >
                <span class="diff-stars-mini">
                  <AppIcon
                    v-for="s in 3"
                    :key="s"
                    name="star-filled"
                    :color="
                      s <= currentDifficulty.stars ? '#f59e0b' : '#e5e7eb'
                    "
                    class-name="w-3.5 h-3.5"
                  />
                </span>
              </div>
            </div>

            <!-- Score ring card -->
            <div class="score-card">
              <div class="score-ring-wrap">
                <svg class="score-svg" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    stroke="#f3f4f6"
                    stroke-width="12"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    :stroke="
                      percentage >= 80
                        ? '#10b981'
                        : percentage >= 60
                          ? '#f59e0b'
                          : '#fb923c'
                    "
                    stroke-width="12"
                    stroke-dasharray="427"
                    :stroke-dashoffset="427 - (427 * percentage) / 100"
                    stroke-linecap="round"
                    transform="rotate(-90 80 80)"
                    style="
                      transition: stroke-dashoffset 1.2s
                        cubic-bezier(0.34, 1.2, 0.64, 1);
                    "
                  />
                </svg>
                <div class="score-ring-inner">
                  <div class="score-number">{{ score }}</div>
                  <div class="score-label">puntos</div>
                  <div class="score-pct">{{ Math.round(percentage) }}%</div>
                </div>
              </div>

              <div class="score-message">
                <template v-if="percentage >= 80">
                  <div class="msg-excellent">¡Excelente trabajo!</div>
                  <p class="msg-sub">
                    Eres un verdadero experto en {{ selectedCategory?.name }}
                  </p>
                </template>
                <template v-else-if="percentage >= 60">
                  <div class="msg-good">¡Muy bien!</div>
                  <p class="msg-sub">
                    Vas por buen camino, ¡sigue practicando!
                  </p>
                </template>
                <template v-else>
                  <div class="msg-keep">¡Sigue intentando!</div>
                  <p class="msg-sub">Repasa el tema y vuelve a intentarlo</p>
                </template>
              </div>
            </div>

            <!-- Stats grid -->
            <div class="stats-grid">
              <div class="stat-box stat-box-green">
                <AppIcon name="check" color="#10b981" class-name="w-6 h-6" />
                <div class="stat-val">{{ correctAnswers }}</div>
                <div class="stat-lbl">Correctas</div>
              </div>
              <div class="stat-box stat-box-red">
                <AppIcon name="x" color="#ef4444" class-name="w-6 h-6" />
                <div class="stat-val">{{ incorrectAnswers }}</div>
                <div class="stat-lbl">Incorrectas</div>
              </div>
            </div>

            <!-- Acciones -->
            <div class="results-actions">
              <button @click="playAgain" class="action-primary" type="button">
                <AppIcon name="refresh" color="white" class-name="w-5 h-5" />
                <span>Jugar de nuevo</span>
              </button>

              <button
                v-if="nextDifficulty && percentage >= 70"
                @click="tryHarder"
                class="action-upgrade"
                :style="{ background: nextDifficulty.gradient }"
                type="button"
              >
                <AppIcon
                  :name="nextDifficulty.icon"
                  color="white"
                  class-name="w-5 h-5"
                />
                <span>Probar nivel {{ nextDifficulty.name }}</span>
                <span class="upgrade-pts"
                  >+{{ nextDifficulty.pointsPerCorrect }} pts</span
                >
              </button>

              <button @click="goToMenu" class="action-secondary" type="button">
                <AppIcon name="home" color="#6366f1" class-name="w-5 h-5" />
                <span>Otra categoría</span>
              </button>
            </div>
          </div>
        </transition>
      </main>

      <!-- ══ FOOTER ══ -->
      <footer class="app-footer">Hecho con ❤️ para aprender · v2.0</footer>

      <!-- Modal cancelar -->
      <transition name="modal-fade">
        <div
          v-if="showCancelModal"
          class="modal-overlay"
          @click.self="showCancelModal = false"
        >
          <div class="modal-sheet">
            <div class="modal-handle"></div>
            <AppIcon
              name="x"
              color="#ef4444"
              class-name="w-10 h-10 mx-auto mb-3"
            />
            <h3 class="modal-title">¿Salir de la lección?</h3>
            <p class="modal-body">
              Perderás tu progreso actual en esta sesión.
            </p>
            <div class="modal-actions">
              <button @click="cancelGame" class="modal-quit" type="button">
                Sí, salir
              </button>
              <button
                @click="showCancelModal = false"
                class="modal-stay"
                type="button"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Selector de dificultad -->
      <transition name="modal-fade">
        <DifficultySelector
          v-if="gameState === 'selectDifficulty'"
          :category="selectedCategory"
          @select="onDifficultySelected"
          @back="gameState = 'menu'"
        />
      </transition>

      <!-- Pantalla intro -->
      <transition name="modal-fade">
        <IntroScreen
          v-if="gameState === 'intro'"
          :category="selectedCategory"
          :difficulty="currentDifficulty"
          @start="beginQuiz"
        />
      </transition>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import confetti from "canvas-confetti";
import AppLoader from "../components/AppLoader.vue";
import CategoryWheel from "../components/CategoryWheel.vue";
import DifficultySelector from "../components/DifficultySelector.vue";
import IntroScreen from "../components/IntroScreen.vue";
import AppIcon from "../components/AppIcon.vue";
import {
  categories,
  difficulties,
  getRandomQuestions,
} from "../data/questions";

const isLoading = ref(true);
const gameState = ref("menu");
const selectedCategory = ref(null);
const currentDifficulty = ref(difficulties[0]);
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
    ? (score.value /
        (totalQuestions.value * currentDifficulty.value.pointsPerCorrect)) *
      100
    : 0,
);
const nextDifficulty = computed(() => {
  const idx = difficulties.findIndex(
    (d) => d.id === currentDifficulty.value.id,
  );
  return difficulties[idx + 1] || null;
});

// Para la rueda, necesita icon como emoji o podemos darle el icon name
const categoriesForWheel = computed(() =>
  categories.map((c) => ({
    ...c,
    icon:
      {
        hardware: "💻",
        software: "🖥️",
        internet: "🌐",
        programming: "⌨️",
        security: "🔒",
      }[c.id] || "📚",
  })),
);

function openCategory(category) {
  selectedCategory.value = category;
  gameState.value = "selectDifficulty";
}
function onWheelSelect(categoryId) {
  const cat = categories.find((c) => c.id === categoryId);
  if (cat) openCategory(cat);
}
function onDifficultySelected(diff) {
  currentDifficulty.value = diff;
  gameState.value = "intro";
}
function beginQuiz() {
  questions.value = getRandomQuestions(
    selectedCategory.value.id,
    currentDifficulty.value.id,
  );
  resetGameState();
  gameState.value = "playing";
}
function resetGameState() {
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
    score.value += currentDifficulty.value.pointsPerCorrect;
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
  gameState.value = "intro";
}
function tryHarder() {
  if (nextDifficulty.value) {
    currentDifficulty.value = nextDifficulty.value;
    gameState.value = "intro";
  }
}
function goToMenu() {
  gameState.value = "menu";
  selectedCategory.value = null;
  questions.value = [];
  showCancelModal.value = false;
}
function triggerConfetti(big = false) {
  confetti({
    particleCount: big ? 140 : 55,
    spread: big ? 100 : 70,
    origin: { y: 0.6 },
    colors: ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"],
    disableForReducedMotion: true,
  });
}
onMounted(() => {
  document.documentElement.classList.add("scroll-smooth");
});
</script>

<style>
/* ══ RESET & BASE ══ */
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
}
body {
  overscroll-behavior-y: contain;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

/* ══ APP SHELL ══ */
.app-shell {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #f0f4ff;
  background-image:
    radial-gradient(
      ellipse at 20% 0%,
      rgba(99, 102, 241, 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 100%,
      rgba(139, 92, 246, 0.1) 0%,
      transparent 50%
    );
}

/* ══ HEADER ══ */
.app-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
}
.header-inner {
  max-width: 480px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.brand-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);
}
.brand-name {
  font-size: 0.95rem;
  font-weight: 900;
  color: #111827;
  line-height: 1;
}
.brand-sub {
  font-size: 0.7rem;
  font-weight: 600;
  color: #9ca3af;
  margin-top: 1px;
}

.score-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 14px;
  border-radius: 999px;
  background: #111827;
  color: white;
  font-size: 0.9rem;
  font-weight: 900;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* ══ MAIN ══ */
.app-main {
  flex: 1;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  padding: 20px 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* ══ HERO ══ */
.hero-card {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  border-radius: 24px;
  padding: 28px 24px;
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.3);
}
.hero-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 30% 30%,
    rgba(255, 255, 255, 0.2),
    transparent 60%
  );
}
.hero-content {
  position: relative;
  z-index: 1;
}
.hero-icon-grid {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.hero-mini-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}
.hero-title {
  font-size: 1.4rem;
  font-weight: 900;
  color: white;
  margin: 0 0 6px;
}
.hero-sub {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin: 0;
}

/* ══ SECTION CARD ══ */
.section-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.section-title {
  font-size: 0.9rem;
  font-weight: 800;
  color: #111827;
}
.section-hint {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  background: #f9fafb;
  padding: 4px 10px;
  border-radius: 999px;
}

/* ══ CATEGORY GRID ══ */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.cat-card {
  background: white;
  border-radius: 18px;
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  padding: 18px 14px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  cursor: pointer;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.cat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}
.cat-card:active {
  transform: scale(0.97);
}
.cat-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cat-name {
  font-size: 0.9rem;
  font-weight: 800;
  color: #111827;
}
.cat-count {
  font-size: 0.72rem;
  font-weight: 600;
  color: #9ca3af;
}
.cat-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
}

/* ══ STATS ROW ══ */
.stats-row {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}
.stat-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: white;
  border: 1.5px solid rgba(0, 0, 0, 0.07);
  border-radius: 999px;
  padding: 7px 14px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #374151;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* ══ QUIZ ══ */
.quiz-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 2px;
}
.quit-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  border-radius: 12px;
  background: #fef2f2;
  border: 1.5px solid #fecaca;
  font-size: 0.8rem;
  font-weight: 700;
  color: #ef4444;
  transition: background 0.15s;
}
.quit-btn:hover {
  background: #fee2e2;
}
.quiz-diff-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 800;
}
.quiz-progress-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  border-radius: 12px;
  background: #eef2ff;
  border: 1.5px solid #c7d2fe;
  font-size: 0.8rem;
  font-weight: 800;
  color: #6366f1;
}

.progress-card {
  background: white;
  border-radius: 16px;
  padding: 14px 16px;
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.progress-track {
  height: 8px;
  background: #f3f4f6;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 10px;
}
.progress-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.meta-correct,
.meta-wrong {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 700;
}
.meta-correct {
  color: #10b981;
}
.meta-wrong {
  color: #ef4444;
}
.meta-pct {
  font-size: 0.8rem;
  font-weight: 900;
}

.question-card {
  background: white;
  border-radius: 20px;
  padding: 22px 18px;
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.q-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
  width: fit-content;
}
.q-text {
  font-size: 1.1rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.4;
  margin: 0;
}

/* Opciones */
.options-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border-radius: 14px;
  border: 2px solid #f3f4f6;
  background: #fafafa;
  transition: all 0.14s ease;
  cursor: pointer;
}
.option:hover:not(:disabled) {
  border-color: #c7d2fe;
  background: #eef2ff;
  transform: translateX(2px);
}
.option:active:not(:disabled) {
  transform: scale(0.99);
}
.option-correct {
  background: #f0fdf4 !important;
  border-color: #86efac !important;
}
.option-wrong {
  background: #fef2f2 !important;
  border-color: #fca5a5 !important;
}
.option-dim {
  opacity: 0.5;
}

.opt-key {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: #e5e7eb;
  color: #6b7280;
  font-size: 0.8rem;
  font-weight: 900;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.opt-key-correct {
  background: #bbf7d0;
  color: #059669;
}
.opt-key-wrong {
  background: #fecaca;
  color: #dc2626;
}
.opt-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
  text-align: left;
  flex: 1;
}

.explanation {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  border-radius: 14px;
  padding: 14px;
}
.explain-ok {
  background: #f0fdf4;
  border: 1.5px solid #bbf7d0;
}
.explain-info {
  background: #f0f9ff;
  border: 1.5px solid #bae6fd;
}
.explain-title {
  font-size: 0.82rem;
  font-weight: 900;
  color: #111827;
  margin-bottom: 3px;
}
.explain-text {
  font-size: 0.82rem;
  color: #374151;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
}

.next-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.14);
  transition: transform 0.15s ease;
}
.next-btn span {
  font-size: 0.95rem;
  font-weight: 900;
  color: white;
}
.next-btn:hover {
  transform: translateY(-2px);
}
.next-btn:active {
  transform: scale(0.98);
}

/* ══ RESULTS ══ */
.results-hero {
  text-align: center;
  margin-bottom: 4px;
}
.results-trophy-wrap {
  position: relative;
  display: inline-block;
  margin-bottom: 14px;
}
.results-trophy-bg {
  position: absolute;
  inset: -16px;
  border-radius: 999px;
  background: #fef9c3;
  opacity: 0;
}
.trophy-glow {
  opacity: 1;
  animation: glow-pulse 2s ease-in-out infinite;
}
@keyframes glow-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.4;
  }
}
.results-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: #111827;
  margin: 0 0 10px;
}
.results-diff-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 800;
}
.diff-stars-mini {
  display: flex;
  gap: 2px;
  margin-left: 2px;
}

.score-card {
  background: white;
  border-radius: 24px;
  padding: 28px;
  text-align: center;
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.score-ring-wrap {
  position: relative;
  width: 160px;
  height: 160px;
}
.score-svg {
  width: 100%;
  height: 100%;
}
.score-ring-inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.score-number {
  font-size: 2.2rem;
  font-weight: 900;
  color: #111827;
  line-height: 1;
}
.score-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
}
.score-pct {
  font-size: 0.85rem;
  font-weight: 800;
  color: #6b7280;
  margin-top: 2px;
}

.msg-excellent {
  font-size: 1.2rem;
  font-weight: 900;
  color: #f59e0b;
}
.msg-good {
  font-size: 1.2rem;
  font-weight: 900;
  color: #10b981;
}
.msg-keep {
  font-size: 1.2rem;
  font-weight: 900;
  color: #fb923c;
}
.msg-sub {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
  margin: 4px 0 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.stat-box {
  background: white;
  border-radius: 18px;
  padding: 18px;
  text-align: center;
  border: 1.5px solid;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.stat-box-green {
  border-color: #bbf7d0;
}
.stat-box-red {
  border-color: #fecaca;
}
.stat-val {
  font-size: 1.8rem;
  font-weight: 900;
  color: #111827;
  line-height: 1;
}
.stat-lbl {
  font-size: 0.78rem;
  font-weight: 700;
  color: #9ca3af;
}

.results-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.action-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px;
  border-radius: 16px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
  transition: transform 0.15s ease;
}
.action-primary span {
  font-size: 0.95rem;
  font-weight: 900;
  color: white;
}
.action-primary:hover {
  transform: translateY(-2px);
}

.action-upgrade {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s ease;
}
.action-upgrade span:first-of-type {
  font-size: 0.9rem;
  font-weight: 900;
  color: white;
}
.upgrade-pts {
  font-size: 0.72rem;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  padding: 2px 8px;
  border-radius: 999px;
}
.action-upgrade:hover {
  transform: translateY(-2px);
}

.action-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-radius: 16px;
  background: white;
  border: 2px solid #c7d2fe;
  cursor: pointer;
  width: 100%;
  transition:
    transform 0.15s ease,
    background 0.15s;
}
.action-secondary span {
  font-size: 0.9rem;
  font-weight: 800;
  color: #6366f1;
}
.action-secondary:hover {
  background: #eef2ff;
  transform: translateY(-1px);
}

/* ══ FOOTER ══ */
.app-footer {
  text-align: center;
  padding: 16px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #9ca3af;
}

/* ══ MODAL ══ */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.modal-sheet {
  background: white;
  border-radius: 28px 28px 0 0;
  padding: 16px 24px 40px;
  width: 100%;
  max-width: 480px;
  text-align: center;
  animation: sheetUp 0.35s cubic-bezier(0.34, 1.2, 0.64, 1);
}
@keyframes sheetUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
.modal-handle {
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: #e5e7eb;
  margin: 0 auto 20px;
}
.modal-title {
  font-size: 1.1rem;
  font-weight: 900;
  color: #111827;
  margin: 0 0 8px;
}
.modal-body {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
  margin: 0 0 20px;
}
.modal-actions {
  display: flex;
  gap: 10px;
}
.modal-quit {
  flex: 1;
  padding: 13px;
  border-radius: 14px;
  background: #fef2f2;
  border: 1.5px solid #fecaca;
  color: #ef4444;
  font-size: 0.9rem;
  font-weight: 900;
  cursor: pointer;
  transition: background 0.15s;
}
.modal-quit:hover {
  background: #fee2e2;
}
.modal-stay {
  flex: 1;
  padding: 13px;
  border-radius: 14px;
  background: #f9fafb;
  border: 1.5px solid #e5e7eb;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 900;
  cursor: pointer;
  transition: background 0.15s;
}
.modal-stay:hover {
  background: #f3f4f6;
}

/* ══ TRANSITIONS ══ */
.page-enter-active,
.page-leave-active {
  transition: all 0.38s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(14px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.explain-slide-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.explain-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.score-pop-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.score-pop-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
</style>
