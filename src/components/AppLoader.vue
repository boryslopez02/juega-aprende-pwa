<template>
  <div class="loader-root" :class="{ 'loader-exit': isFading }">
    <!-- Fondo con mesh suave -->
    <div class="loader-bg"></div>

    <!-- Orbes de fondo decorativos -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <!-- Partículas flotantes -->
    <div class="particles">
      <div
        v-for="p in particles"
        :key="p.id"
        class="particle"
        :style="{
          left: p.x + '%',
          top: p.y + '%',
          width: p.size + 'px',
          height: p.size + 'px',
          background: p.color,
          animationDelay: p.delay + 's',
          animationDuration: p.dur + 's',
        }"
      ></div>
    </div>

    <!-- Contenido central -->
    <div class="loader-content" :class="{ 'content-fade': isFading }">
      <!-- Logo animado -->
      <div class="logo-wrap">
        <!-- Anillos orbitales -->
        <div class="ring ring-outer"></div>
        <div class="ring ring-mid"></div>
        <div class="ring ring-inner"></div>

        <!-- Card central -->
        <div class="logo-card">
          <svg
            class="logo-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="3"
              width="20"
              height="14"
              rx="2"
              stroke="white"
              stroke-width="1.75"
            />
            <path
              d="M0 20h24"
              stroke="white"
              stroke-width="1.75"
              stroke-linecap="round"
            />
            <rect
              x="8"
              y="7"
              width="8"
              height="6"
              rx="1.2"
              fill="white"
              fill-opacity="0.2"
              stroke="white"
              stroke-width="1.4"
            />
            <line
              x1="10"
              y1="9.5"
              x2="14"
              y2="9.5"
              stroke="white"
              stroke-width="1.3"
              stroke-linecap="round"
            />
            <line
              x1="10"
              y1="11"
              x2="13"
              y2="11"
              stroke="white"
              stroke-width="1.1"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <!-- Iconos orbitando -->
        <div
          v-for="(ico, i) in orbitIcons"
          :key="i"
          class="orbit-icon"
          :style="{
            '--angle': ico.angle + 'deg',
            '--color': ico.color,
            '--light': ico.light,
          }"
        >
          <svg class="orbit-svg" viewBox="0 0 24 24" fill="none">
            <component :is="'g'" v-html="ico.path"></component>
          </svg>
        </div>
      </div>

      <!-- Título -->
      <div class="loader-titles">
        <h1 class="loader-title">Juega y Aprende</h1>
        <p class="loader-subtitle">Computación para todos</p>
      </div>

      <!-- Progress ring -->
      <div class="progress-wrap">
        <svg class="progress-svg" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(99,102,241,0.12)"
            stroke-width="8"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="url(#progressGrad)"
            stroke-width="8"
            stroke-dasharray="326.7"
            :stroke-dashoffset="progressOffset"
            stroke-linecap="round"
            transform="rotate(-90 60 60)"
          />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#6366f1" />
              <stop offset="100%" stop-color="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <div class="progress-inner">
          <span class="progress-pct">{{ Math.round(progressPct) }}%</span>
        </div>
      </div>

      <!-- Estado de carga -->
      <div class="loader-status">
        <transition name="status-fade" mode="out-in">
          <span :key="loadingText" class="status-text">{{ loadingText }}</span>
        </transition>
        <div class="dots">
          <span
            v-for="i in 3"
            :key="i"
            class="dot"
            :style="{ animationDelay: i * 0.18 + 's' }"
          ></span>
        </div>
      </div>

      <!-- Hint card -->
      <transition name="hint-fade" mode="out-in">
        <div :key="tipIndex" class="hint-card">
          <div class="hint-icon">
            <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4">
              <path
                d="M9 21h6M12 3a6 6 0 00-3.5 10.8L9 17h6l.5-3.2A6 6 0 0012 3z"
                stroke="#6366f1"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p class="hint-text">{{ currentTip }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import hintsData from "../data/hints.json";

const emit = defineEmits(["loaded"]);

const durationMs = 4500;
const fadeMs = 800;
const fadeStartMs = durationMs - fadeMs;
const isFading = ref(false);

const progressPct = ref(0);
const progressOffset = computed(
  () => 326.7 - (326.7 * progressPct.value) / 100,
);

const tips = Array.isArray(hintsData?.hints)
  ? hintsData.hints
  : ["¡Aprender es divertido!"];
const tipIndex = ref(0);
const currentTip = computed(
  () => tips[tipIndex.value] ?? "¡Aprender es divertido!",
);

const loadingTexts = [
  "Preparando lección",
  "Cargando preguntas",
  "Casi listo",
  "¡Todo listo!",
];
const loadingText = ref(loadingTexts[0]);

// Iconos que orbitan alrededor del logo
const orbitIcons = [
  {
    angle: 0,
    color: "#6366f1",
    light: "#eef2ff",
    path: `<circle cx="12" cy="12" r="9" stroke="#6366f1" stroke-width="1.75"/>
           <ellipse cx="12" cy="12" rx="3.8" ry="9" stroke="#6366f1" stroke-width="1.4" fill="none"/>
           <path d="M3.5 8.5h17M3.5 15.5h17" stroke="#6366f1" stroke-width="1.4" stroke-linecap="round"/>`,
  },
  {
    angle: 72,
    color: "#0ea5e9",
    light: "#e0f2fe",
    path: `<polyline points="9,6 4,12 9,18" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
           <polyline points="15,6 20,12 15,18" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
           <line x1="14.5" y1="4" x2="9.5" y2="20" stroke="#0ea5e9" stroke-width="1.7" stroke-linecap="round"/>`,
  },
  {
    angle: 144,
    color: "#10b981",
    light: "#d1fae5",
    path: `<path d="M12 2.5L4 6v5.5c0 5 3.5 9 8 10.5 4.5-1.5 8-5.5 8-10.5V6L12 2.5z" stroke="#10b981" stroke-width="1.75" fill="none" stroke-linejoin="round"/>
           <polyline points="8.5,12 11,14.5 15.5,10" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  {
    angle: 216,
    color: "#f59e0b",
    light: "#fef3c7",
    path: `<rect x="2" y="3" width="20" height="14" rx="2" stroke="#f59e0b" stroke-width="1.75" fill="none"/>
           <path d="M0 20h24" stroke="#f59e0b" stroke-width="1.75" stroke-linecap="round"/>
           <rect x="8" y="7" width="8" height="6" rx="1.2" fill="#f59e0b" fill-opacity="0.12" stroke="#f59e0b" stroke-width="1.4"/>`,
  },
  {
    angle: 288,
    color: "#ec4899",
    light: "#fce7f3",
    path: `<rect x="2" y="3" width="20" height="18" rx="3" stroke="#ec4899" stroke-width="1.75" fill="none"/>
           <path d="M2 8h20" stroke="#ec4899" stroke-width="1.75"/>
           <circle cx="5.5" cy="5.5" r="1" fill="#ec4899"/>
           <circle cx="8.5" cy="5.5" r="1" fill="#ec4899"/>
           <line x1="7" y1="14" x2="17" y2="14" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round"/>
           <line x1="7" y1="17" x2="13" y2="17" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round"/>`,
  },
];

// Partículas de fondo
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 4 + Math.random() * 8,
  color:
    ["#6366f1", "#8b5cf6", "#0ea5e9", "#10b981", "#ec4899", "#f59e0b"][i % 6] +
    "30",
  delay: Math.random() * 5,
  dur: 6 + Math.random() * 5,
}));

let rafId = null;
let startTs = 0;
let tipInterval = null;
let textInterval = null;
let fadeTimeout = null;
let doneTimeout = null;

function tick(ts) {
  if (!startTs) startTs = ts;
  const elapsed = ts - startTs;
  progressPct.value = Math.min(100, (elapsed / durationMs) * 100);
  if (elapsed < durationMs) rafId = requestAnimationFrame(tick);
}

function pickNext(prev) {
  if (tips.length <= 1) return 0;
  let n = prev;
  while (n === prev) n = Math.floor(Math.random() * tips.length);
  return n;
}

onMounted(() => {
  tipIndex.value = Math.floor(Math.random() * tips.length);
  rafId = requestAnimationFrame(tick);

  tipInterval = setInterval(() => {
    tipIndex.value = pickNext(tipIndex.value);
  }, 3000);

  let ti = 0;
  textInterval = setInterval(() => {
    ti = (ti + 1) % loadingTexts.length;
    loadingText.value = loadingTexts[ti];
  }, 1000);

  fadeTimeout = setTimeout(() => {
    isFading.value = true;
    clearInterval(tipInterval);
    clearInterval(textInterval);
    tipInterval = null;
    textInterval = null;
  }, fadeStartMs);

  doneTimeout = setTimeout(() => emit("loaded"), durationMs);
});

onUnmounted(() => {
  if (tipInterval) clearInterval(tipInterval);
  if (textInterval) clearInterval(textInterval);
  if (rafId) cancelAnimationFrame(rafId);
  if (fadeTimeout) clearTimeout(fadeTimeout);
  if (doneTimeout) clearTimeout(doneTimeout);
});
</script>

<style scoped>
/* ── BASE ── */
.loader-root {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 800ms ease;
}
.loader-exit {
  opacity: 0;
  pointer-events: none;
}

/* ── FONDO ── */
.loader-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%);
}
.loader-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      ellipse at 15% 15%,
      rgba(99, 102, 241, 0.14) 0%,
      transparent 45%
    ),
    radial-gradient(
      ellipse at 85% 85%,
      rgba(139, 92, 246, 0.12) 0%,
      transparent 45%
    ),
    radial-gradient(
      ellipse at 80% 10%,
      rgba(14, 165, 233, 0.1) 0%,
      transparent 40%
    );
}

/* ── ORBES ── */
.orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(60px);
  pointer-events: none;
}
.orb-1 {
  width: 300px;
  height: 300px;
  top: -80px;
  left: -80px;
  background: rgba(99, 102, 241, 0.14);
  animation: orbFloat 8s ease-in-out infinite;
}
.orb-2 {
  width: 250px;
  height: 250px;
  bottom: -60px;
  right: -60px;
  background: rgba(139, 92, 246, 0.12);
  animation: orbFloat 10s ease-in-out infinite reverse;
}
.orb-3 {
  width: 200px;
  height: 200px;
  top: 40%;
  left: 60%;
  background: rgba(14, 165, 233, 0.1);
  animation: orbFloat 7s ease-in-out infinite 2s;
}
@keyframes orbFloat {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, -20px);
  }
}

/* ── PARTÍCULAS ── */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.particle {
  position: absolute;
  border-radius: 999px;
  animation: particleFloat var(--dur, 8s) ease-in-out infinite;
}
@keyframes particleFloat {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-24px) scale(1.2);
    opacity: 1;
  }
}

/* ── CONTENIDO ── */
.loader-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px 24px;
  transition:
    opacity 800ms ease,
    transform 800ms ease;
}
.content-fade {
  opacity: 0;
  transform: translateY(10px);
}

/* ── LOGO ── */
.logo-wrap {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  position: absolute;
  border-radius: 999px;
  border-style: solid;
  border-color: transparent;
}
.ring-outer {
  inset: 0;
  border-width: 2px;
  border-top-color: rgba(99, 102, 241, 0.3);
  border-right-color: rgba(99, 102, 241, 0.15);
  animation: spin 8s linear infinite;
}
.ring-mid {
  inset: 14px;
  border-width: 2px;
  border-top-color: rgba(139, 92, 246, 0.35);
  border-left-color: rgba(139, 92, 246, 0.2);
  animation: spin 5s linear infinite reverse;
}
.ring-inner {
  inset: 28px;
  border-width: 1.5px;
  border-bottom-color: rgba(14, 165, 233, 0.3);
  border-right-color: rgba(14, 165, 233, 0.15);
  animation: spin 3.5s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.logo-card {
  width: 76px;
  height: 76px;
  border-radius: 22px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 16px 40px rgba(99, 102, 241, 0.35),
    0 0 0 6px rgba(99, 102, 241, 0.1);
  animation: cardPulse 3s ease-in-out infinite;
  z-index: 2;
}
@keyframes cardPulse {
  0%,
  100% {
    box-shadow:
      0 16px 40px rgba(99, 102, 241, 0.35),
      0 0 0 6px rgba(99, 102, 241, 0.1);
  }
  50% {
    box-shadow:
      0 20px 50px rgba(99, 102, 241, 0.45),
      0 0 0 10px rgba(99, 102, 241, 0.08);
  }
}
.logo-icon {
  width: 38px;
  height: 38px;
}

/* Iconos orbitales */
.orbit-icon {
  position: absolute;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: var(--light);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  /* Posición orbital: radio = 80px desde el centro */
  transform: rotate(var(--angle)) translateX(80px)
    rotate(calc(-1 * var(--angle)));
  animation: orbitSpin 12s linear infinite;
}
.orbit-svg {
  width: 18px;
  height: 18px;
}
@keyframes orbitSpin {
  from {
    --angle: var(--angle);
  }
}
/* Cada uno tiene su propio delay para que se distribuyan */
.orbit-icon:nth-child(1) {
  animation-delay: 0s;
}
.orbit-icon:nth-child(2) {
  animation-delay: -2.4s;
}
.orbit-icon:nth-child(3) {
  animation-delay: -4.8s;
}
.orbit-icon:nth-child(4) {
  animation-delay: -7.2s;
}
.orbit-icon:nth-child(5) {
  animation-delay: -9.6s;
}

/* ── TÍTULOS ── */
.loader-titles {
  text-align: center;
}
.loader-title {
  font-size: 1.75rem;
  font-weight: 900;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 4px;
  line-height: 1.1;
}
.loader-subtitle {
  font-size: 0.875rem;
  font-weight: 600;
  color: #9ca3af;
  margin: 0;
}

/* ── PROGRESS ── */
.progress-wrap {
  position: relative;
  width: 96px;
  height: 96px;
}
.progress-svg {
  width: 100%;
  height: 100%;
}
.progress-inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.progress-pct {
  font-size: 1.1rem;
  font-weight: 900;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── STATUS ── */
.loader-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.status-text {
  font-size: 0.875rem;
  font-weight: 700;
  color: #6b7280;
  display: block;
}
.dots {
  display: flex;
  gap: 6px;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #6366f1;
  animation: dotBounce 0.8s ease-in-out infinite;
}
@keyframes dotBounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

/* ── HINT ── */
.hint-card {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: white;
  border: 1.5px solid rgba(99, 102, 241, 0.15);
  border-radius: 16px;
  padding: 14px 16px;
  max-width: 300px;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.1);
}
.hint-icon {
  width: 28px;
  height: 28px;
  background: #eef2ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.hint-text {
  font-size: 0.78rem;
  color: #4b5563;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
  padding-top: 4px;
}

/* ── TRANSITIONS ── */
.status-fade-enter-active,
.status-fade-leave-active {
  transition: opacity 0.3s ease;
}
.status-fade-enter-from,
.status-fade-leave-to {
  opacity: 0;
}

.hint-fade-enter-active,
.hint-fade-leave-active {
  transition: all 0.4s ease;
}
.hint-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.hint-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
