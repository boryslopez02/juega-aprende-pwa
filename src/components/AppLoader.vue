<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 loader-root"
    :class="{ 'loader-dim': isFading }"
  >
    <!-- Fondo confetti -->
    <div
      class="absolute inset-0 opacity-40 pointer-events-none confetti-bg"
    ></div>

    <!-- Burbujas (pre-generadas) -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="b in bubbles"
        :key="b.id"
        class="absolute rounded-full animate-float"
        :style="{
          left: b.left,
          top: b.top,
          width: b.size,
          height: b.size,
          background: b.bg,
          animationDelay: b.delay,
          animationDuration: b.duration,
          filter: 'blur(0.2px)',
        }"
      />
    </div>

    <!-- Contenido (se desvanece, no el fondo completo) -->
    <div
      class="relative z-10 text-center px-6 loader-content"
      :class="{ 'content-fade': isFading }"
    >
      <!-- Logo -->
      <div class="relative mb-8">
        <div class="w-44 h-44 mx-auto relative">
          <div
            class="absolute inset-0 border-[10px] border-yellow-300/40 rounded-full animate-spin-slow"
          ></div>
          <div
            class="absolute inset-3 border-[10px] border-pink-300/40 rounded-full animate-spin"
            style="animation-direction: reverse"
          ></div>
          <div
            class="absolute inset-6 border-[10px] border-cyan-300/40 rounded-full animate-spin-slow"
          ></div>

          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="w-28 h-28 bg-gradient-to-br from-yellow-300 via-pink-500 to-purple-600 rounded-[28px] flex items-center justify-center shadow-2xl animate-bounce-slow ring-4 ring-white/40"
            >
              <span class="text-6xl drop-shadow">🎮</span>
            </div>
          </div>

          <!-- Estrellitas -->
          <div
            v-for="i in 6"
            :key="i"
            class="absolute w-7 h-7 animate-twinkle"
            :style="starStyle(i)"
          >
            <span class="text-2xl">⭐</span>
          </div>
        </div>
      </div>

      <h1
        class="text-5xl font-black text-white mb-2 drop-shadow-lg tracking-tight"
      >
        Juega y Aprende
      </h1>
      <p class="text-2xl font-black text-yellow-200 mb-8 drop-shadow">
        ¡Quiz! 🚀
      </p>

      <!-- Progreso circular -->
      <div class="relative w-36 h-36 mx-auto mb-6">
        <svg class="w-full h-full transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r="64"
            class="fill-none stroke-white/25"
            stroke-width="10"
          />
          <circle
            ref="progressCircle"
            cx="72"
            cy="72"
            r="64"
            class="fill-none stroke-yellow-300 transition-all duration-150"
            stroke-width="10"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
            stroke-linecap="round"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-4xl animate-pulse">🎯</span>
        </div>
      </div>

      <!-- Texto -->
      <div class="space-y-2">
        <p class="text-white/95 text-xl font-black animate-pulse">
          {{ loadingText }}
        </p>
        <div class="flex justify-center gap-2">
          <span
            v-for="i in 3"
            :key="i"
            class="w-4 h-4 bg-white rounded-full animate-bounce"
            :style="{ animationDelay: `${i * 0.15}s` }"
          />
        </div>
      </div>

      <!-- Hint -->
      <transition name="fade" mode="out-in">
        <div
          :key="tipIndex"
          class="mt-8 p-4 bg-white/20 backdrop-blur-md rounded-2xl max-w-xs mx-auto border-2 border-white/30 shadow-xl"
        >
          <p class="text-white text-sm font-semibold">💡 {{ currentTip }}</p>
        </div>
      </transition>
    </div>

    <!-- Marco decorativo -->
    <div
      class="absolute inset-4 rounded-[28px] border-4 border-white/20 pointer-events-none"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

import hintsData from "../data/hints.json";

const emit = defineEmits(["loaded"]);

const progressCircle = ref(null);
const loadingText = ref("Cargando");

// Duración total
const durationMs = 5000;

// Fade suave (solo contenido + leve “dim” del overlay)
const fadeMs = 900;
const fadeStartMs = Math.max(0, durationMs - fadeMs);
const isFading = ref(false);

// Hints desde JSON
const tips = Array.isArray(hintsData?.hints) ? hintsData.hints : [];
const tipIndex = ref(0);
const currentTip = computed(
  () => tips[tipIndex.value] ?? "💡 ¡Aprender es divertido!",
);

const loadingTexts = ["Preparando", "Cargando", "Casi listo", "Listo"];

// Hints más lentos
const hintIntervalMs = 3200;

const bubbles = ref([]);

const r = 64;
const circumference = 2 * Math.PI * r;
const dashOffset = ref(circumference);

let tipInterval = null;
let textInterval = null;
let rafId = null;
let startTs = 0;

let fadeTimeout = null;
let doneTimeout = null;

function starStyle(i) {
  const map = [
    { top: "0%", left: "15%" },
    { top: "10%", left: "85%" },
    { top: "85%", left: "12%" },
    { top: "92%", left: "82%" },
    { top: "45%", left: "-2%" },
    { top: "55%", left: "98%" },
  ];
  const p = map[(i - 1) % map.length];
  return { top: p.top, left: p.left, animationDelay: `${i * 0.2}s` };
}

function genBubbles() {
  const arr = [];
  for (let i = 1; i <= 28; i++) {
    const size = Math.floor(Math.random() * 60 + 18);
    const alpha = Math.random() * 0.18 + 0.08;
    arr.push({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${size}px`,
      bg: `rgba(255,255,255,${alpha})`,
      delay: `${Math.random() * 4}s`,
      duration: `${5 + Math.random() * 6}s`,
    });
  }
  bubbles.value = arr;
}

function tick(ts) {
  if (!startTs) startTs = ts;
  const elapsed = ts - startTs;

  const p = Math.min(1, elapsed / durationMs);
  dashOffset.value = circumference - circumference * p;

  if (p < 1) rafId = requestAnimationFrame(tick);
}

// hint aleatorio sin repetir consecutivo
function pickRandomTipIndex(prev) {
  if (tips.length <= 1) return 0;
  let next = prev;
  while (next === prev) next = Math.floor(Math.random() * tips.length);
  return next;
}

onMounted(() => {
  genBubbles();
  rafId = requestAnimationFrame(tick);

  // hint inicial aleatorio
  tipIndex.value = tips.length ? Math.floor(Math.random() * tips.length) : 0;

  // hints más lentos (y se detienen al iniciar fade)
  if (durationMs > hintIntervalMs) {
    tipInterval = setInterval(() => {
      tipIndex.value = pickRandomTipIndex(tipIndex.value);
    }, hintIntervalMs);
  }

  // texto de carga
  let textIndex = 0;
  textInterval = setInterval(() => {
    textIndex = (textIndex + 1) % loadingTexts.length;
    loadingText.value = loadingTexts[textIndex];
  }, 1000);

  // inicia el fade (contenido)
  fadeTimeout = setTimeout(() => {
    isFading.value = true;

    // opcional: congelar hint/texto al hacer fade (evita que cambie “en el fade”)
    if (tipInterval) {
      clearInterval(tipInterval);
      tipInterval = null;
    }
    if (textInterval) {
      clearInterval(textInterval);
      textInterval = null;
    }
  }, fadeStartMs);

  // termina
  doneTimeout = setTimeout(() => {
    emit("loaded");
  }, durationMs);
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
/* Base */
.loader-root {
  transition:
    opacity 900ms ease,
    filter 900ms ease;
}

/* En el fade, NO lo llevamos a 0 para evitar “pantalla vacía” antes de montar la app */
.loader-dim {
  opacity: 0.22;
  filter: saturate(0.98);
  pointer-events: none;
}

/* El contenido sí se desvanece suave */
.loader-content {
  transition:
    opacity 900ms ease,
    transform 900ms ease,
    filter 900ms ease;
}
.content-fade {
  opacity: 0;
  transform: translateY(10px) scale(0.985);
  filter: blur(1px);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  50% {
    transform: translateY(-34px) rotate(180deg) scale(1.05);
  }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-spin-slow {
  animation: spin 9s linear infinite;
}
.animate-bounce-slow {
  animation: bounce 2.8s ease-in-out infinite;
}

@keyframes twinkle {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
  }
  50% {
    transform: scale(1.25);
    opacity: 1;
    filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.65));
  }
}
.animate-twinkle {
  animation: twinkle 1.6s ease-in-out infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.confetti-bg {
  background-image:
    radial-gradient(
      circle at 15% 25%,
      rgba(255, 255, 255, 0.25) 0 2px,
      transparent 3px
    ),
    radial-gradient(
      circle at 70% 35%,
      rgba(255, 255, 255, 0.22) 0 2px,
      transparent 3px
    ),
    radial-gradient(
      circle at 35% 70%,
      rgba(255, 255, 255, 0.18) 0 2px,
      transparent 3px
    ),
    radial-gradient(
      circle at 85% 75%,
      rgba(255, 255, 255, 0.2) 0 2px,
      transparent 3px
    );
  background-size: 180px 180px;
}
</style>
