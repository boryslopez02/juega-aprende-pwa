<template>
  <div class="diff-root">
    <div class="diff-bg"></div>

    <div class="diff-scroll">
      <div class="diff-sheet" :class="{ 'sheet-exit': isExiting }">
        <!-- Handle decorativo -->
        <div class="sheet-handle"></div>

        <!-- Header con categoría -->
        <div class="diff-header">
          <div
            class="diff-cat-badge"
            :style="{ background: category.colorLight }"
          >
            <AppIcon
              :name="category.icon"
              :color="category.color"
              class-name="w-5 h-5"
            />
            <span :style="{ color: category.color }">{{ category.name }}</span>
          </div>
          <h2 class="diff-title">Elige tu nivel</h2>
          <p class="diff-subtitle">¿Cuánto sabes sobre este tema?</p>
        </div>

        <!-- Cards de dificultad -->
        <div class="diff-list">
          <button
            v-for="diff in difficulties"
            :key="diff.id"
            @click="selectDifficulty(diff)"
            class="diff-item"
            :class="{ 'diff-item-selected': selected?.id === diff.id }"
            type="button"
          >
            <!-- Icono de nivel -->
            <div
              class="diff-item-icon"
              :style="{ background: diff.colorLight }"
            >
              <AppIcon
                :name="diff.icon"
                :color="diff.color"
                class-name="w-6 h-6"
              />
            </div>

            <!-- Info -->
            <div class="diff-item-info">
              <div class="diff-item-top">
                <span class="diff-item-name">{{ diff.name }}</span>
                <span
                  class="diff-item-label"
                  :style="{ color: diff.color, background: diff.colorLight }"
                >
                  {{ diff.label }}
                </span>
              </div>
              <p class="diff-item-desc">{{ diff.description }}</p>
              <div class="diff-item-meta">
                <span class="meta-pill">
                  <AppIcon
                    name="target"
                    :color="diff.color"
                    class-name="w-3 h-3"
                  />
                  {{ diff.questionCount }} preguntas
                </span>
                <span class="meta-pill">
                  <AppIcon
                    name="star"
                    :color="diff.color"
                    class-name="w-3 h-3"
                  />
                  +{{ diff.pointsPerCorrect }} pts
                </span>
              </div>
            </div>

            <!-- Estrellas + check -->
            <div class="diff-item-right">
              <div class="diff-stars">
                <AppIcon
                  v-for="s in 3"
                  :key="s"
                  name="star-filled"
                  :color="s <= diff.stars ? '#f59e0b' : '#e5e7eb'"
                  class-name="w-4 h-4"
                />
              </div>
              <transition name="check-pop">
                <div
                  v-if="selected?.id === diff.id"
                  class="diff-check"
                  :style="{ background: diff.color }"
                >
                  <AppIcon name="check" color="white" class-name="w-4 h-4" />
                </div>
              </transition>
            </div>

            <!-- Borde izquierdo coloreado cuando seleccionado -->
            <div
              v-if="selected?.id === diff.id"
              class="diff-selected-bar"
              :style="{ background: diff.gradient }"
            ></div>
          </button>
        </div>

        <!-- Botón confirmar -->
        <transition name="btn-slide">
          <button
            v-if="selected"
            @click="confirm"
            class="confirm-btn"
            :style="{ background: selected.gradient }"
            type="button"
          >
            <AppIcon :name="selected.icon" color="white" class-name="w-5 h-5" />
            <span>Jugar en nivel {{ selected.name }}</span>
            <AppIcon name="arrow-right" color="white" class-name="w-5 h-5" />
          </button>
        </transition>

        <!-- Volver -->
        <button @click="$emit('back')" class="back-btn" type="button">
          ← Volver al menú
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { difficulties } from "../data/questions";
import AppIcon from "./AppIcon.vue";

const props = defineProps({
  category: { type: Object, required: true },
});
const emit = defineEmits(["select", "back"]);

const selected = ref(null);
const isExiting = ref(false);

function selectDifficulty(diff) {
  selected.value = diff;
}
function confirm() {
  isExiting.value = true;
  setTimeout(() => emit("select", selected.value), 320);
}
</script>

<style scoped>
.diff-root {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: flex-end;
  animation: bgFadeIn 0.3s ease;
}
@keyframes bgFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.diff-bg {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
}

.diff-scroll {
  position: relative;
  z-index: 10;
  width: 100%;
  max-height: 94dvh;
  overflow-y: auto;
}

.diff-sheet {
  background: #ffffff;
  border-radius: 28px 28px 0 0;
  padding: 16px 20px 40px;
  max-width: 480px;
  margin: 0 auto;
  animation: sheetUp 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
}
@keyframes sheetUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
.sheet-exit {
  animation: sheetDown 0.3s ease forwards;
}
@keyframes sheetDown {
  to {
    transform: translateY(100%);
  }
}

.sheet-handle {
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: #e5e7eb;
  margin: 0 auto 20px;
}

.diff-header {
  text-align: center;
  margin-bottom: 20px;
}
.diff-cat-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 12px;
}
.diff-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: #111827;
  margin: 0 0 4px;
}
.diff-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  margin: 0;
}

.diff-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.diff-item {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 18px;
  border: 2px solid #f3f4f6;
  background: #fafafa;
  transition: all 0.18s ease;
  cursor: pointer;
  text-align: left;
}
.diff-item:hover {
  border-color: #e5e7eb;
  background: #f9fafb;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
}
.diff-item:active {
  transform: scale(0.99);
}
.diff-item-selected {
  border-color: #cbd5e1 !important;
  background: #f8faff !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.09) !important;
}

.diff-selected-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-radius: 4px 0 0 4px;
}

.diff-item-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.diff-item-info {
  flex: 1;
  min-width: 0;
}
.diff-item-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 3px;
}
.diff-item-name {
  font-size: 1rem;
  font-weight: 800;
  color: #111827;
}
.diff-item-label {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
}
.diff-item-desc {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
  margin: 0 0 8px;
}
.diff-item-meta {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: #f3f4f6;
  border-radius: 999px;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
}

.diff-item-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.diff-stars {
  display: flex;
  gap: 2px;
}
.diff-check {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.confirm-btn {
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
  margin-bottom: 10px;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}
.confirm-btn span {
  font-size: 1rem;
  font-weight: 900;
  color: white;
}
.confirm-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.2);
}
.confirm-btn:active {
  transform: scale(0.98);
}

.back-btn {
  display: block;
  width: 100%;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  font-size: 13px;
  font-weight: 600;
  padding: 8px;
  transition: color 0.2s;
}
.back-btn:hover {
  color: #6b7280;
}

/* Transitions */
.check-pop-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.check-pop-enter-from {
  opacity: 0;
  transform: scale(0.4);
}

.btn-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.4, 0.64, 1);
}
.btn-slide-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
</style>
