<template>
  <div class="intro-root">
    <!-- Fondo con mesh gradient dinámico -->
    <div class="intro-bg" :style="bgStyle"></div>
    <div class="intro-overlay-noise"></div>

    <!-- Contenido centrado -->
    <div class="intro-scroll">
      <div class="intro-card" :class="{ 'card-exit': isExiting }">
        <!-- Chip de categoría + nivel -->
        <div class="intro-chips">
          <div
            class="chip-cat"
            :style="{ background: category.colorLight, color: category.color }"
          >
            <AppIcon
              :name="category.icon"
              :color="category.color"
              class-name="w-4 h-4"
            />
            <span>{{ category.name }}</span>
          </div>
          <div
            class="chip-diff"
            :style="{
              background: difficulty.colorLight,
              color: difficulty.color,
            }"
          >
            <AppIcon
              :name="difficulty.icon"
              :color="difficulty.color"
              class-name="w-4 h-4"
            />
            <span>{{ difficulty.label }}</span>
          </div>
        </div>

        <!-- Icono grande animado -->
        <div class="intro-icon-wrap" :style="{ background: category.gradient }">
          <AppIcon :name="category.icon" color="white" class-name="w-12 h-12" />
          <!-- Anillo pulsante -->
          <div
            class="icon-ring"
            :style="{ borderColor: category.color + '40' }"
          ></div>
        </div>

        <!-- Título -->
        <h2 class="intro-title">{{ currentIntro.title }}</h2>

        <!-- Barra de nivel -->
        <div class="level-bar" :style="{ background: difficulty.colorLight }">
          <div
            class="level-fill"
            :style="{ background: difficulty.gradient, width: levelWidth }"
          ></div>
          <div class="level-label" :style="{ color: difficulty.color }">
            <AppIcon
              :name="difficulty.icon"
              :color="difficulty.color"
              class-name="w-3.5 h-3.5"
            />
            <span>Nivel {{ difficulty.name }}</span>
            <span class="level-dot">·</span>
            <span>{{ difficulty.questionCount }} preguntas</span>
            <span class="level-dot">·</span>
            <span>+{{ difficulty.pointsPerCorrect }} pts c/u</span>
          </div>
        </div>

        <!-- Narrativa con animación escalonada -->
        <transition name="fade-up">
          <div v-if="step >= 1" class="intro-narrative">
            <p class="narrative-text">{{ currentIntro.body }}</p>
          </div>
        </transition>

        <!-- Tip del nivel -->
        <transition name="fade-up" style="transition-delay: 0.15s">
          <div v-if="step >= 2" class="intro-tip">
            <div class="tip-icon">
              <AppIcon name="lightbulb" color="#92400e" class-name="w-4 h-4" />
            </div>
            <p class="tip-text">{{ currentIntro.tip }}</p>
          </div>
        </transition>

        <!-- Dato curioso -->
        <transition name="fade-up" style="transition-delay: 0.28s">
          <div v-if="step >= 2" class="intro-fact">
            <span class="fact-emoji">🔬</span>
            <p class="fact-text">
              <strong>¿Sabías que?</strong> {{ currentIntro.fact }}
            </p>
          </div>
        </transition>

        <!-- Estrellas de dificultad -->
        <transition name="fade-up" style="transition-delay: 0.38s">
          <div v-if="step >= 2" class="stars-row">
            <div
              v-for="s in 3"
              :key="s"
              class="star-item"
              :class="{ 'star-active': s <= difficulty.stars }"
            >
              <AppIcon
                name="star-filled"
                :color="s <= difficulty.stars ? '#f59e0b' : '#e5e7eb'"
                class-name="w-6 h-6"
              />
            </div>
          </div>
        </transition>

        <!-- Botón principal -->
        <transition name="pop">
          <button
            v-if="step >= 2"
            @click="startQuiz"
            class="play-btn"
            :style="{ background: category.gradient }"
            type="button"
          >
            <span class="play-btn-text">¡A jugar!</span>
            <AppIcon name="arrow-right" color="white" class-name="w-5 h-5" />
          </button>
        </transition>

        <!-- Skip -->
        <button @click="startQuiz" class="skip-btn" type="button">
          Saltar introducción
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AppIcon from "./AppIcon.vue";

const props = defineProps({
  category: { type: Object, required: true },
  difficulty: { type: Object, required: true },
});
const emit = defineEmits(["start"]);

const step = ref(0);
const isExiting = ref(false);

const currentIntro = computed(() => props.category.intros[props.difficulty.id]);

const bgStyle = computed(() => ({
  background: `linear-gradient(145deg, ${props.category.color}18 0%, #f8faff 40%, ${props.difficulty.color}12 100%)`,
}));

const levelWidth = computed(() => {
  const map = { easy: "33%", medium: "66%", hard: "100%" };
  return map[props.difficulty.id] || "33%";
});

function startQuiz() {
  isExiting.value = true;
  setTimeout(() => emit("start"), 380);
}

onMounted(() => {
  setTimeout(() => {
    step.value = 1;
  }, 180);
  setTimeout(() => {
    step.value = 2;
  }, 820);
});
</script>

<style scoped>
.intro-root {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: stretch;
  animation: introIn 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes introIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.intro-bg {
  position: absolute;
  inset: 0;
}
.intro-overlay-noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
}

.intro-scroll {
  position: relative;
  z-index: 10;
  width: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  padding: 24px 16px 40px;
}

.intro-card {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 28px;
  border: 1.5px solid rgba(0, 0, 0, 0.07);
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 28px 24px 24px;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: cardUp 0.45s cubic-bezier(0.34, 1.4, 0.64, 1);
}
@keyframes cardUp {
  from {
    transform: translateY(32px) scale(0.96);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
.card-exit {
  animation: cardDown 0.35s ease forwards;
}
@keyframes cardDown {
  to {
    transform: translateY(20px) scale(0.97);
    opacity: 0;
  }
}

.intro-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.chip-cat,
.chip-diff {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.intro-icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
  position: relative;
  margin: 0 auto;
}
.icon-ring {
  position: absolute;
  inset: -10px;
  border-radius: 34px;
  border: 3px solid;
  animation: ringPulse 2.2s ease-in-out infinite;
}
@keyframes ringPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.06);
    opacity: 0.3;
  }
}

.intro-title {
  font-size: 1.35rem;
  font-weight: 900;
  color: #111827;
  line-height: 1.2;
  text-align: center;
  margin: 0;
}

.level-bar {
  border-radius: 999px;
  height: 6px;
  overflow: hidden;
  position: relative;
}
.level-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 1s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.level-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  margin-top: 6px;
}
.level-dot {
  opacity: 0.4;
}

.intro-narrative {
  background: #f8faff;
  border: 1.5px solid #e8edf8;
  border-radius: 16px;
  padding: 16px;
}
.narrative-text {
  font-size: 0.875rem;
  line-height: 1.65;
  color: #374151;
  font-weight: 500;
  margin: 0;
}

.intro-tip {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: #fffbeb;
  border: 1.5px solid #fde68a;
  border-radius: 16px;
  padding: 12px 14px;
}
.tip-icon {
  width: 28px;
  height: 28px;
  background: #fef3c7;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.tip-text {
  font-size: 0.82rem;
  color: #92400e;
  font-weight: 600;
  line-height: 1.5;
  margin: 0;
  padding-top: 2px;
}

.intro-fact {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: #f0fdf4;
  border: 1.5px solid #bbf7d0;
  border-radius: 16px;
  padding: 12px 14px;
}
.fact-emoji {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}
.fact-text {
  font-size: 0.82rem;
  color: #166534;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
}

.stars-row {
  display: flex;
  justify-content: center;
  gap: 8px;
}
.star-item {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.star-active {
  transform: scale(1.15);
}

.play-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}
.play-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.2);
}
.play-btn:active {
  transform: scale(0.98);
}
.play-btn-text {
  font-size: 1.1rem;
  font-weight: 900;
  color: white;
}

.skip-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  padding: 4px;
  transition: color 0.2s;
}
.skip-btn:hover {
  color: #6b7280;
}

/* Transitions */
.fade-up-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.pop-enter-active {
  transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.75);
}
</style>
