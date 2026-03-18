<template>
  <div class="wheel-root">
    <div class="wheel-glow"></div>

    <!-- Aguja -->
    <div class="needle-wrap">
      <div class="needle"></div>
    </div>

    <!-- Rueda SVG (rota) -->
    <div
      ref="wheelRef"
      class="wheel-rotator"
      :style="{ transform: `rotate(${rotation}deg)` }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <svg class="wheel-svg" viewBox="0 0 320 320">
        <circle cx="160" cy="160" r="148" fill="white" />
        <circle
          cx="160"
          cy="160"
          r="148"
          fill="none"
          stroke="#f3f4f6"
          stroke-width="2"
        />
        <path
          v-for="(seg, i) in segments"
          :key="i"
          :d="seg.path"
          :fill="seg.color"
          fill-opacity="0.1"
          :stroke="seg.color"
          stroke-width="1"
          stroke-opacity="0.2"
        />
        <line
          v-for="(sep, i) in separators"
          :key="'s' + i"
          :x1="sep.x1"
          :y1="sep.y1"
          :x2="sep.x2"
          :y2="sep.y2"
          stroke="#e5e7eb"
          stroke-width="1.5"
        />
        <circle
          cx="160"
          cy="160"
          r="147"
          fill="none"
          stroke="white"
          stroke-width="3"
        />
      </svg>
    </div>

    <!-- Iconos — capa fija, posicionada con JS -->
    <div class="icons-layer">
      <div
        v-for="(cat, idx) in categories"
        :key="cat.id"
        class="icon-anchor"
        :style="iconAnchorStyle(idx)"
      >
        <button
          class="icon-btn"
          :class="{ 'is-spinning': spinning }"
          @click="onIconClick(cat)"
          type="button"
        >
          <!-- Fondo de color igual que las tarjetas -->
          <div class="icon-bg" :style="{ background: cat.colorLight }">
            <!-- SVG inline directo por id de categoría -->
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- hardware -->
              <g v-if="cat.id === 'hardware'">
                <rect
                  x="2"
                  y="3"
                  width="20"
                  height="14"
                  rx="2"
                  :stroke="cat.color"
                  stroke-width="1.75"
                />
                <path
                  d="M0 20h24"
                  :stroke="cat.color"
                  stroke-width="1.75"
                  stroke-linecap="round"
                />
                <rect
                  x="8"
                  y="7"
                  width="8"
                  height="6"
                  rx="1.2"
                  :fill="cat.color"
                  fill-opacity="0.15"
                  :stroke="cat.color"
                  stroke-width="1.4"
                />
                <line
                  x1="10"
                  y1="9.5"
                  x2="14"
                  y2="9.5"
                  :stroke="cat.color"
                  stroke-width="1.3"
                  stroke-linecap="round"
                />
              </g>
              <!-- software -->
              <g v-else-if="cat.id === 'software'">
                <rect
                  x="2"
                  y="3"
                  width="20"
                  height="18"
                  rx="3"
                  :stroke="cat.color"
                  stroke-width="1.75"
                />
                <path d="M2 8h20" :stroke="cat.color" stroke-width="1.75" />
                <circle cx="5.5" cy="5.5" r="1" :fill="cat.color" />
                <circle cx="8.5" cy="5.5" r="1" :fill="cat.color" />
                <polyline
                  points="7,13 5,15.5 7,18"
                  :stroke="cat.color"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <polyline
                  points="17,13 19,15.5 17,18"
                  :stroke="cat.color"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <!-- internet -->
              <g v-else-if="cat.id === 'internet'">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  :stroke="cat.color"
                  stroke-width="1.75"
                />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="3.8"
                  ry="9"
                  :stroke="cat.color"
                  stroke-width="1.4"
                  fill="none"
                />
                <path
                  d="M3.5 8.5h17M3.5 15.5h17"
                  :stroke="cat.color"
                  stroke-width="1.4"
                  stroke-linecap="round"
                />
              </g>
              <!-- programming -->
              <g v-else-if="cat.id === 'programming'">
                <polyline
                  points="9,6 4,12 9,18"
                  :stroke="cat.color"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <polyline
                  points="15,6 20,12 15,18"
                  :stroke="cat.color"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <line
                  x1="14.5"
                  y1="4"
                  x2="9.5"
                  y2="20"
                  :stroke="cat.color"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </g>
              <!-- security -->
              <g v-else-if="cat.id === 'security'">
                <path
                  d="M12 2.5L4 6v5.5c0 5 3.5 9 8 10.5 4.5-1.5 8-5.5 8-10.5V6L12 2.5z"
                  :stroke="cat.color"
                  stroke-width="1.75"
                  stroke-linejoin="round"
                />
                <polyline
                  points="8.5,12 11,14.5 15.5,10"
                  :stroke="cat.color"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </div>
          <span class="icon-name" :style="{ color: cat.color }">{{
            cat.name
          }}</span>
        </button>
      </div>
    </div>

    <!-- Centro fijo -->
    <div class="center-layer">
      <button
        class="center-card"
        :class="{ 'center-spin': spinning }"
        @click="onCenterClick"
        type="button"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <polygon
            points="13,2 3,14 12,14 11,22 21,10 12,10"
            stroke="#6366f1"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="center-label">{{ spinning ? "···" : "Girar" }}</span>
      </button>
    </div>

    <div v-if="showPing" class="ping-ring"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  categories: { type: Array, required: true },
  autoRotate: { type: Boolean, default: true },
  autoSpeed: { type: Number, default: 8 },
  minTurns: { type: Number, default: 3 },
  maxExtraTurns: { type: Number, default: 5 },
});
const emit = defineEmits(["select"]);

const CX = 160,
  CY = 160,
  R = 144,
  ICON_R = 106;

const wheelRef = ref(null);
const rotation = ref(0);
const dragging = ref(false);
const spinning = ref(false);
const showPing = ref(false);

let pointerId = null,
  startRotation = 0,
  startAngle = 0;
let samples = [],
  spinAnim = null,
  rafId = null,
  lastTs = 0;

const segments = computed(() => {
  const n = props.categories.length;
  if (!n) return [];
  const step = (2 * Math.PI) / n;
  return props.categories.map((cat, i) => {
    const a1 = i * step - Math.PI / 2;
    const a2 = (i + 1) * step - Math.PI / 2;
    const x1 = CX + R * Math.cos(a1),
      y1 = CY + R * Math.sin(a1);
    const x2 = CX + R * Math.cos(a2),
      y2 = CY + R * Math.sin(a2);
    return {
      color: cat.color,
      path: `M${CX} ${CY}L${x1.toFixed(1)} ${y1.toFixed(1)}A${R} ${R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}Z`,
    };
  });
});

const separators = computed(() => {
  const n = props.categories.length;
  if (!n) return [];
  const step = (2 * Math.PI) / n;
  return Array.from({ length: n }, (_, i) => {
    const a = i * step - Math.PI / 2;
    return {
      x1: CX,
      y1: CY,
      x2: (CX + R * Math.cos(a)).toFixed(1),
      y2: (CY + R * Math.sin(a)).toFixed(1),
    };
  });
});

function iconAnchorStyle(idx) {
  const n = props.categories.length;
  if (!n) return {};
  const segDeg = (360 / n) * idx - 90;
  const screenRad = ((segDeg + rotation.value) * Math.PI) / 180;
  const px = CX + ICON_R * Math.cos(screenRad);
  const py = CY + ICON_R * Math.sin(screenRad);
  return {
    left: ((px / 320) * 100).toFixed(2) + "%",
    top: ((py / 320) * 100).toFixed(2) + "%",
  };
}

const norm360 = (d) => ((d % 360) + 360) % 360;
const signedDelta = (a, b) => ((a - b + 540) % 360) - 180;

function getCenter() {
  const r = wheelRef.value.getBoundingClientRect();
  return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
}
function angleFromPoint(x, y) {
  const { cx, cy } = getCenter();
  return norm360(450 - Math.atan2(y - cy, x - cx) * (180 / Math.PI));
}
function getVelocity() {
  if (samples.length < 2) return 0;
  const a = samples[samples.length - 1],
    b = samples[Math.max(0, samples.length - 4)];
  const dt = a.t - b.t;
  return dt <= 0 ? 0 : ((a.rot - b.rot) / dt) * 1000;
}
function currentCatIndex() {
  return Math.floor(norm360(-rotation.value) / (360 / props.categories.length));
}
const easeOut = (t) => 1 - Math.pow(1 - t, 5);

function spinToRandom(velDegS = 0) {
  if (!props.categories.length) return;
  spinning.value = true;
  const n = props.categories.length;
  const step = 360 / n;
  const winner = Math.floor(Math.random() * n);
  const jitter = (Math.random() - 0.5) * step * 0.4;
  const targetAngle = winner * step + step / 2 + jitter;
  const delta = norm360(norm360(-targetAngle) - norm360(rotation.value));
  const absV = Math.min(Math.abs(velDegS), 2500);
  const turns =
    props.minTurns + Math.min(props.maxExtraTurns, Math.floor(absV / 400));
  const dur = Math.min(6, Math.max(2.2, 2.2 + turns * 0.35));
  spinAnim = {
    t0: performance.now(),
    dur: dur * 1000,
    from: rotation.value,
    to: rotation.value + turns * 360 + delta,
  };
}
function finishSpin() {
  spinning.value = false;
  spinAnim = null;
  rotation.value = norm360(rotation.value);
  const cat = props.categories[currentCatIndex()];
  showPing.value = true;
  setTimeout(() => {
    showPing.value = false;
  }, 450);
  emit("select", cat?.id);
}

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
  rotation.value =
    startRotation +
    signedDelta(angleFromPoint(e.clientX, e.clientY), startAngle);
  samples.push({ t: performance.now(), rot: rotation.value });
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
  spinToRandom(getVelocity());
}
function onIconClick(cat) {
  if (spinning.value || dragging.value) return;
  emit("select", cat.id);
}
function onCenterClick() {
  if (!spinning.value) spinToRandom(600);
}

function loop(ts) {
  if (!lastTs) lastTs = ts;
  const dt = (ts - lastTs) / 1000;
  lastTs = ts;
  if (spinAnim && !dragging.value) {
    const t = Math.min(1, (ts - spinAnim.t0) / spinAnim.dur);
    rotation.value = spinAnim.from + (spinAnim.to - spinAnim.from) * easeOut(t);
    if (t >= 1) finishSpin();
  } else if (props.autoRotate && !dragging.value && !spinning.value) {
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
.wheel-root {
  position: relative;
  width: 320px;
  height: 320px;
  margin: 0 auto;
  touch-action: none;
  user-select: none;
}

.wheel-glow {
  position: absolute;
  inset: -20px;
  border-radius: 999px;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.07) 0%,
    transparent 70%
  );
  pointer-events: none;
}

/* Aguja */
.needle-wrap {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  pointer-events: none;
}
.needle {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 18px solid #6366f1;
  filter: drop-shadow(0 3px 6px rgba(99, 102, 241, 0.35));
  position: relative;
}
.needle::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 999px;
  border: 2px solid #6366f1;
  top: -22px;
  left: -4px;
}

/* Rueda */
.wheel-rotator {
  position: absolute;
  inset: 0;
  will-change: transform;
  cursor: grab;
}
.wheel-rotator:active {
  cursor: grabbing;
}
.wheel-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Capa de iconos — NO rota */
.icons-layer {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
}
.icon-anchor {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: auto;
}

/* Botón — misma estructura que las tarjetas de categoría */
.icon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 62px;
  padding: 8px 4px 6px;
  background: white;
  border: 1.5px solid rgba(0, 0, 0, 0.07);
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.2s ease;
}
.icon-btn:not(.is-spinning):hover {
  transform: scale(1.13);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.15);
}
.icon-btn:not(.is-spinning):active {
  transform: scale(0.94);
}
.icon-btn.is-spinning {
  cursor: default;
  opacity: 0.7;
}

/* Fondo del icono — idéntico al de las tarjetas */
.icon-bg {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-name {
  font-size: 8px;
  font-weight: 800;
  line-height: 1;
  text-align: center;
  max-width: 56px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Centro */
.center-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  pointer-events: none;
}
.center-card {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: white;
  border: 2px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  pointer-events: auto;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.center-card:hover {
  transform: scale(1.07);
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.28);
}
.center-spin {
  animation: cPulse 0.7s ease-in-out infinite alternate;
}
@keyframes cPulse {
  from {
    transform: scale(0.97);
  }
  to {
    transform: scale(1.03);
    box-shadow: 0 12px 28px rgba(99, 102, 241, 0.32);
  }
}
.center-label {
  font-size: 10px;
  font-weight: 900;
  color: #6366f1;
}

/* Ping */
.ping-ring {
  position: absolute;
  inset: -4px;
  border-radius: 999px;
  border: 3px solid rgba(99, 102, 241, 0.35);
  animation: pingOut 0.5s ease-out forwards;
  pointer-events: none;
  z-index: 5;
}
@keyframes pingOut {
  0% {
    transform: scale(0.9);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.06);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wheel-rotator {
    transform: rotate(0deg) !important;
  }
}
</style>
