<template>
  <div class="relative w-[320px] h-[320px] mx-auto select-none">
    <!-- Glow -->
    <div
      class="absolute inset-0 rounded-full blur-2xl opacity-50 wheel-glow"
    ></div>

    <!-- Indicador (aguja) -->
    <div
      class="absolute -top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
    >
      <div class="pointer"></div>
    </div>

    <!-- Grupo giratorio (rueda + iconos) -->
    <div
      ref="wheelRef"
      class="absolute inset-0 z-10 wheel-hit"
      :style="wheelVars"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <!-- Wheel -->
      <div
        class="absolute inset-0 rounded-full shadow-2xl border-[10px] border-white overflow-hidden"
        :style="{ background: wheelGradient }"
      >
        <div class="absolute inset-0 rounded-full wheel-shine"></div>
        <div class="absolute inset-0 rounded-full wheel-inner"></div>
      </div>

      <!-- Icons around (se mueven con la rueda pero NO rotan en su eje) -->
      <div
        v-for="(c, idx) in categories"
        :key="c.id"
        class="absolute w-16 h-16 rounded-2xl border-[6px] border-white shadow-xl flex items-center justify-center text-3xl wheel-sticker"
        :style="iconStyle(c, idx)"
        aria-hidden="true"
      >
        <span class="drop-shadow">{{ c.icon }}</span>
      </div>
    </div>

    <!-- Centro (NO rota) -->
    <div
      class="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
    >
      <div
        class="w-28 h-28 rounded-[28px] bg-white shadow-2xl border-[6px] border-yellow-300 flex flex-col items-center justify-center"
      >
        <div class="text-3xl">🎲</div>
        <div class="text-xs font-black text-gray-700">CATEGORÍAS</div>
      </div>
    </div>

    <!-- Ping cuando termina -->
    <div v-if="showPing" class="absolute inset-0 z-40 pointer-events-none">
      <div class="ping-ring"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

/**
 * Props:
 * categories: [{id, name, icon, color}]
 * autoRotate: giro suave cuando está idle
 * autoSpeed: grados/seg
 * minTurns: vueltas mínimas en tirada
 * maxExtraTurns: vueltas extra según “flick”
 */
const props = defineProps({
  categories: { type: Array, required: true },
  autoRotate: { type: Boolean, default: true },
  autoSpeed: { type: Number, default: 10 }, // deg/s
  minTurns: { type: Number, default: 3 },
  maxExtraTurns: { type: Number, default: 6 },
});

const emit = defineEmits(["select"]); // emit('select', categoryId)

const wheelRef = ref(null);
const rotation = ref(0); // grados
const dragging = ref(false);
const spinning = ref(false);
const showPing = ref(false);

let pointerId = null;
let startRotation = 0;
let startAngle = 0;

// samples para velocidad del flick
let samples = []; // {t, rot}

// RAF loop
let rafId = null;
let lastTs = 0;

// animación de spin (controlada por JS para mantener iconos “derechos”)
let spinAnim = null; // { t0, dur, from, to }

const wheelGradient = computed(() => {
  const n = props.categories.length || 1;
  const step = 360 / n;
  const stops = props.categories.map((c, i) => {
    const a = i * step;
    const b = (i + 1) * step;
    return `${c.color} ${a}deg ${b}deg`;
  });
  return `conic-gradient(${stops.join(",")})`;
});

// Variables CSS (se actualizan cada frame)
const wheelVars = computed(() => ({
  "--rot": `${rotation.value}deg`,
}));

function norm360(deg) {
  return ((deg % 360) + 360) % 360;
}

function signedDelta(a, b) {
  return ((a - b + 540) % 360) - 180;
}

function getCenter() {
  const el = wheelRef.value;
  const r = el.getBoundingClientRect();
  return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
}

// 0° arriba, sentido horario
function angleFromPoint(x, y) {
  const { cx, cy } = getCenter();
  const atan = Math.atan2(y - cy, x - cx) * (180 / Math.PI); // 0° derecha, CCW
  return norm360(450 - atan); // 0° arriba, CW
}

function getVelocityDegPerSec() {
  if (samples.length < 2) return 0;
  const a = samples[samples.length - 1];
  const b = samples[Math.max(0, samples.length - 4)];
  const dt = a.t - b.t;
  if (dt <= 0) return 0;
  return ((a.rot - b.rot) / dt) * 1000; // deg/s
}

function currentIndexFromRotation(rot) {
  const n = props.categories.length || 1;
  const step = 360 / n;

  // aguja arriba => ángulo en coordenadas de rueda = -rot
  const wheelAngleAtPointer = norm360(-rot);
  return Math.floor(wheelAngleAtPointer / step);
}

/**
 * Iconos “derechos”:
 * - Se colocan radialmente con rotate(angle) translate(radius)
 * - Luego se aplica rotate(-wheelRotation) para que NO roten en su eje
 *   (usan var(--rot) del contenedor)
 */
function iconStyle(c, idx) {
  const n = props.categories.length || 1;
  const angle = (360 / n) * idx - 90; // arranca arriba
  const radius = 138;

  return {
    top: "50%",
    left: "50%",
    // 👇 clave: compensar la rueda (-rot) Y el ángulo orbital (-angle)
    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(calc(-1 * var(--rot))) rotate(${-angle}deg)`,
    background: `linear-gradient(135deg, ${c.color} 0%, ${c.color}cc 100%)`,
    pointerEvents: "none",
  };
}

function easeOutQuint(t) {
  return 1 - Math.pow(1 - t, 5);
}

function spinToRandom(gestureVelDegS = 0) {
  if (!props.categories.length) return;

  spinning.value = true;

  const n = props.categories.length;
  const step = 360 / n;

  // ganador random
  const winner = Math.floor(Math.random() * n);

  // centro del segmento con un pequeño jitter
  const jitter = (Math.random() - 0.5) * step * 0.35;
  const pointerAngleInWheel = winner * step + step / 2 + jitter;

  // Queremos: -finalRot ≡ pointerAngleInWheel (mod 360)
  const targetMod = norm360(-pointerAngleInWheel);
  const currentMod = norm360(rotation.value);
  const delta = norm360(targetMod - currentMod);

  // vueltas según flick
  const absV = Math.min(Math.abs(gestureVelDegS), 2800);
  const extraTurns = Math.min(props.maxExtraTurns, Math.floor(absV / 450));
  const turns = props.minTurns + extraTurns;

  // duración según vueltas/velocidad
  const base = 2.4 + turns * 0.35;
  const speedBonus = Math.min(1.2, absV / 2500);
  const dur = Math.min(6.5, Math.max(2.4, base + speedBonus));

  const from = rotation.value;
  const to = from + turns * 360 + delta;

  spinAnim = {
    t0: performance.now(),
    dur: dur * 1000,
    from,
    to,
  };
}

function finishSpin() {
  spinning.value = false;
  spinAnim = null;

  // normaliza (sin salto visual grande)
  rotation.value = norm360(rotation.value);

  const idx = currentIndexFromRotation(rotation.value);
  const cat = props.categories[idx];

  showPing.value = true;
  setTimeout(() => (showPing.value = false), 420);

  emit("select", cat?.id);
}

/* Pointer events */
function onPointerDown(e) {
  if (spinning.value) return;

  dragging.value = true;
  pointerId = e.pointerId;
  wheelRef.value?.setPointerCapture(pointerId);

  startRotation = rotation.value;
  startAngle = angleFromPoint(e.clientX, e.clientY);

  samples = [{ t: performance.now(), rot: rotation.value }];

  e.preventDefault?.();
}

function onPointerMove(e) {
  if (!dragging.value || e.pointerId !== pointerId || spinning.value) return;

  const a = angleFromPoint(e.clientX, e.clientY);
  const d = signedDelta(a, startAngle);

  rotation.value = startRotation + d;

  const t = performance.now();
  samples.push({ t, rot: rotation.value });
  if (samples.length > 10) samples.shift();

  e.preventDefault?.();
}

function onPointerUp(e) {
  if (!dragging.value || e.pointerId !== pointerId) return;

  dragging.value = false;

  try {
    wheelRef.value?.releasePointerCapture(pointerId);
  } catch (_) {}

  pointerId = null;

  const v = getVelocityDegPerSec();
  spinToRandom(v);
}

/* RAF loop */
function loop(ts) {
  if (!lastTs) lastTs = ts;
  const dt = (ts - lastTs) / 1000;
  lastTs = ts;

  // Spin anim
  if (spinAnim && !dragging.value) {
    const t = Math.min(1, (ts - spinAnim.t0) / spinAnim.dur);
    const eased = easeOutQuint(t);
    rotation.value = spinAnim.from + (spinAnim.to - spinAnim.from) * eased;

    if (t >= 1) finishSpin();
  } else if (props.autoRotate && !dragging.value && !spinning.value) {
    // Auto rotate idle
    rotation.value += props.autoSpeed * dt;
  }

  rafId = requestAnimationFrame(loop);
}

onMounted(() => {
  rafId = requestAnimationFrame(loop);
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
/* Importante para drag en móvil */
.wheel-hit {
  touch-action: none;
  will-change: transform;
  transform: rotate(var(--rot));
}

/* Glow */
.wheel-glow {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.35),
    transparent 60%
  );
}

/* Shine */
.wheel-shine {
  background:
    radial-gradient(
      circle at 30% 25%,
      rgba(255, 255, 255, 0.45),
      transparent 45%
    ),
    radial-gradient(circle at 70% 70%, rgba(0, 0, 0, 0.12), transparent 55%);
  mix-blend-mode: soft-light;
}

/* Profundidad interna */
.wheel-inner {
  box-shadow:
    inset 0 22px 34px rgba(0, 0, 0, 0.15),
    inset 0 -18px 28px rgba(255, 255, 255, 0.18);
  opacity: 0.9;
}

/* Stickers */
.wheel-sticker {
  box-shadow:
    0 18px 35px rgba(0, 0, 0, 0.18),
    inset 0 10px 18px rgba(255, 255, 255, 0.25);
}

/* Pointer */
.pointer {
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 22px solid rgba(255, 255, 255, 0.95);
  filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.25));
  position: relative;
}
.pointer::after {
  content: "";
  position: absolute;
  left: -10px;
  top: -20px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 16px solid rgba(251, 191, 36, 0.95);
}

/* Ping ring */
.ping-ring {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 6px solid rgba(255, 255, 255, 0.35);
  animation: ping 0.42s ease-out;
}
@keyframes ping {
  0% {
    transform: scale(0.92);
    opacity: 0.85;
  }
  100% {
    transform: scale(1.06);
    opacity: 0;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .wheel-hit {
    transform: rotate(0deg);
  }
}
</style>
