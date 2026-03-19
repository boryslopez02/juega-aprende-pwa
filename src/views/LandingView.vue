<template>
  <div class="landing-page">
    <!-- ── NAVBAR ── -->
    <nav class="navbar">
      <div class="navbar-inner">
        <div class="nav-brand">
          <div class="nav-logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
            </svg>
          </div>
          <span class="nav-name">Juega y Aprende</span>
        </div>
        <RouterLink to="/app" class="nav-btn">
          Abrir App
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <line
              x1="4"
              y1="12"
              x2="20"
              y2="12"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
            <polyline
              points="14,6 20,12 14,18"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </RouterLink>
      </div>
    </nav>

    <!-- ══ HERO ══ -->
    <section class="hero">
      <div class="hero-badge">
        <div class="hero-badge-dot"></div>
        Disponible ahora · Gratis
      </div>

      <div class="hero-logo">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
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
        </svg>
      </div>

      <h1 class="hero-title">
        Aprende computación<br />
        <span class="hero-title-grad">jugando</span>
      </h1>
      <p class="hero-sub">
        Una app gamificada con preguntas de Hardware, Software, Internet,
        Programación y Seguridad. Tres niveles de dificultad y retroalimentación
        inmediata.
      </p>

      <div class="hero-cta">
        <RouterLink to="/app" class="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <polygon
              points="13,2 3,14 12,14 11,22 21,10 12,10"
              stroke="white"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Comenzar ahora
          <div class="btn-arrow">→</div>
        </RouterLink>
        <a href="#como-funciona" class="btn-ghost">
          Ver cómo funciona
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <polyline
              points="6,9 12,15 18,9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>

      <!-- Phone mockup -->
      <div class="mockup-wrap">
        <div class="float-badge badge-left">
          <div class="float-badge-dot" style="background: #10b981"></div>
          <span style="color: #059669">+10 pts</span>
        </div>
        <div class="float-badge badge-right">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b">
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            />
          </svg>
          <span style="color: #d97706">¡Correcto!</span>
        </div>

        <div class="phone-frame">
          <div class="phone-notch"></div>
          <div class="phone-screen">
            <div class="ph-header">
              <div class="ph-brand">
                <div class="ph-logo-mini">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="14"
                      rx="2"
                      stroke="white"
                      stroke-width="2"
                    />
                    <path
                      d="M0 20h24"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <span class="ph-brand-text">Juega y Aprende</span>
              </div>
              <div class="ph-score">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="#fbbf24">
                  <polygon
                    points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  />
                </svg>
                150
              </div>
            </div>

            <div class="ph-hero-card">
              <div class="ph-hero-icons">
                <div class="ph-ico">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="14"
                      rx="2"
                      stroke="white"
                      stroke-width="2"
                    />
                    <path
                      d="M0 20h24"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <div class="ph-ico">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="white"
                      stroke-width="2"
                    />
                    <ellipse
                      cx="12"
                      cy="12"
                      rx="3.5"
                      ry="9"
                      stroke="white"
                      stroke-width="1.5"
                      fill="none"
                    />
                  </svg>
                </div>
                <div class="ph-ico">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <polyline
                      points="9,6 4,12 9,18"
                      stroke="white"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <polyline
                      points="15,6 20,12 15,18"
                      stroke="white"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div class="ph-hero-title">¡Elige una categoría!</div>
              <div class="ph-hero-sub">Toca y demuestra cuánto sabes</div>
            </div>

            <div class="ph-grid">
              <div class="ph-card" v-for="cat in phoneCats" :key="cat.name">
                <div class="ph-card-icon" :style="{ background: cat.light }">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    v-html="cat.path"
                  ></svg>
                </div>
                <div class="ph-card-name">{{ cat.name }}</div>
                <div
                  class="ph-card-bar"
                  :style="{ background: cat.gradient }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── STATS ── -->
    <div class="stats-bar" ref="statsRef">
      <div class="stats-inner">
        <div class="stat-item" v-for="s in stats" :key="s.label">
          <span class="stat-num">{{ s.value }}</span>
          <span class="stat-lbl">{{ s.label }}</span>
        </div>
      </div>
    </div>

    <!-- ── CATEGORÍAS ── -->
    <section class="section">
      <div
        class="section-label reveal"
        :class="{ visible: vis.cats0 }"
        ref="cats0"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="2"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
        Contenido
      </div>
      <h2
        class="section-title reveal"
        :class="{ visible: vis.cats1 }"
        ref="cats1"
      >
        5 categorías para explorar
      </h2>
      <p class="section-sub reveal" :class="{ visible: vis.cats2 }" ref="cats2">
        Cada categoría cubre un área fundamental de la computación con preguntas
        diseñadas para enseñar mientras juegas.
      </p>

      <div class="cat-grid">
        <div
          v-for="(cat, i) in categories"
          :key="cat.name"
          class="cat-card reveal"
          :class="{ visible: vis['cat' + i], 'cat-full': cat.full }"
          :ref="(el) => setRef('cat' + i, el)"
        >
          <div class="cat-icon-bg" :style="{ background: cat.light }">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              v-html="cat.path"
            ></svg>
          </div>
          <div class="cat-info">
            <div class="cat-name">{{ cat.name }}</div>
            <div class="cat-desc">{{ cat.desc }}</div>
          </div>
          <div class="cat-bar" :style="{ background: cat.gradient }"></div>
        </div>
      </div>
    </section>

    <!-- ── CÓMO FUNCIONA ── -->
    <section class="section" id="como-funciona">
      <div
        class="section-label reveal"
        :class="{ visible: vis.how0 }"
        ref="how0"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <polygon
            points="13,2 3,14 12,14 11,22 21,10 12,10"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        Mecánica
      </div>
      <h2
        class="section-title reveal"
        :class="{ visible: vis.how1 }"
        ref="how1"
      >
        ¿Cómo funciona?
      </h2>
      <p class="section-sub reveal" :class="{ visible: vis.how2 }" ref="how2">
        Un flujo simple diseñado para que aprendas sin darte cuenta.
      </p>

      <div class="steps">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="step reveal"
          :class="{ visible: vis['step' + i] }"
          :ref="(el) => setRef('step' + i, el)"
        >
          <div class="step-num">{{ i + 1 }}</div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── NIVELES ── -->
    <section class="section">
      <div
        class="section-label reveal"
        :class="{ visible: vis.lev0 }"
        ref="lev0"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <line
            x1="18"
            y1="20"
            x2="18"
            y2="10"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="12"
            y1="20"
            x2="12"
            y2="4"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="6"
            y1="20"
            x2="6"
            y2="14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        Dificultad
      </div>
      <h2
        class="section-title reveal"
        :class="{ visible: vis.lev1 }"
        ref="lev1"
      >
        Aprende a tu propio ritmo
      </h2>
      <p class="section-sub reveal" :class="{ visible: vis.lev2 }" ref="lev2">
        Tres niveles de dificultad progresiva para avanzar de forma gradual.
      </p>

      <div class="levels">
        <div
          v-for="(lv, i) in levels"
          :key="i"
          class="level-card reveal"
          :class="{ visible: vis['lv' + i] }"
          :ref="(el) => setRef('lv' + i, el)"
        >
          <div class="level-icon" :style="{ background: lv.light }">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              v-html="lv.path"
            ></svg>
          </div>
          <div class="level-info">
            <div class="level-name">
              {{ lv.name }} <span class="level-tag">· {{ lv.label }}</span>
            </div>
            <div class="level-meta">
              {{ lv.questions }} preguntas · +{{ lv.pts }} puntos c/u
            </div>
          </div>
          <div class="level-stars">
            <svg
              v-for="s in 3"
              :key="s"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              :fill="s <= lv.stars ? '#f59e0b' : '#e5e7eb'"
            >
              <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FINAL CTA ── -->
    <div class="final-cta">
      <div class="cta-card reveal" :class="{ visible: vis.cta }" ref="cta">
        <div class="cta-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              stroke="white"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2 class="cta-title">¿Listo para empezar?</h2>
        <p class="cta-sub">
          Pon a prueba tus conocimientos en computación. Gratis, sin registro y
          desde cualquier dispositivo.
        </p>
        <RouterLink to="/app" class="btn-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <polygon
              points="13,2 3,14 12,14 11,22 21,10 12,10"
              stroke="#4f46e5"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Ir a la aplicación
        </RouterLink>
      </div>
    </div>

    <!-- ── FOOTER ── -->
    <footer class="footer">
      Juega y Aprende · Escuela Juan Bautista Fuenmayor · Hecho con ❤️ para
      aprender
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from "vue";
import { RouterLink } from "vue-router";

// ── Datos ──
const stats = [
  { value: "75+", label: "Preguntas" },
  { value: "5", label: "Categorías" },
  { value: "3", label: "Niveles" },
];

const phoneCats = [
  {
    name: "Hardware",
    light: "#e0e7ff",
    gradient: "linear-gradient(90deg,#6366f1,#8b5cf6)",
    path: '<rect x="2" y="3" width="20" height="14" rx="2" stroke="#6366f1" stroke-width="1.75"/><path d="M0 20h24" stroke="#6366f1" stroke-width="1.75" stroke-linecap="round"/>',
  },
  {
    name: "Software",
    light: "#e0f2fe",
    gradient: "linear-gradient(90deg,#0ea5e9,#38bdf8)",
    path: '<rect x="2" y="3" width="20" height="18" rx="3" stroke="#0ea5e9" stroke-width="1.75"/><path d="M2 8h20" stroke="#0ea5e9" stroke-width="1.75"/>',
  },
  {
    name: "Internet",
    light: "#ede9fe",
    gradient: "linear-gradient(90deg,#8b5cf6,#a78bfa)",
    path: '<circle cx="12" cy="12" r="9" stroke="#8b5cf6" stroke-width="1.75"/><ellipse cx="12" cy="12" rx="3.8" ry="9" stroke="#8b5cf6" stroke-width="1.4" fill="none"/>',
  },
  {
    name: "Programación",
    light: "#fce7f3",
    gradient: "linear-gradient(90deg,#ec4899,#f472b6)",
    path: '<polyline points="9,6 4,12 9,18" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="15,6 20,12 15,18" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
];

const categories = [
  {
    name: "Hardware",
    desc: "CPU, RAM, GPU y más",
    light: "#e0e7ff",
    gradient: "linear-gradient(90deg,#6366f1,#8b5cf6)",
    path: '<rect x="2" y="3" width="20" height="14" rx="2" stroke="#6366f1" stroke-width="1.75"/><path d="M0 20h24" stroke="#6366f1" stroke-width="1.75" stroke-linecap="round"/><rect x="8" y="7" width="8" height="6" rx="1.2" fill="#6366f1" fill-opacity="0.15" stroke="#6366f1" stroke-width="1.4"/>',
  },
  {
    name: "Software",
    desc: "Apps, SO y drivers",
    light: "#e0f2fe",
    gradient: "linear-gradient(90deg,#0ea5e9,#38bdf8)",
    path: '<rect x="2" y="3" width="20" height="18" rx="3" stroke="#0ea5e9" stroke-width="1.75"/><path d="M2 8h20" stroke="#0ea5e9" stroke-width="1.75"/><circle cx="5.5" cy="5.5" r="1" fill="#0ea5e9"/><circle cx="8.5" cy="5.5" r="1" fill="#0ea5e9"/><polyline points="7,13 5,15.5 7,18" stroke="#0ea5e9" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><polyline points="17,13 19,15.5 17,18" stroke="#0ea5e9" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    name: "Internet",
    desc: "Redes, DNS, HTTP",
    light: "#ede9fe",
    gradient: "linear-gradient(90deg,#8b5cf6,#a78bfa)",
    path: '<circle cx="12" cy="12" r="9" stroke="#8b5cf6" stroke-width="1.75"/><ellipse cx="12" cy="12" rx="3.8" ry="9" stroke="#8b5cf6" stroke-width="1.4" fill="none"/><path d="M3.5 8.5h17M3.5 15.5h17" stroke="#8b5cf6" stroke-width="1.4" stroke-linecap="round"/>',
  },
  {
    name: "Programación",
    desc: "Código, algoritmos",
    light: "#fce7f3",
    gradient: "linear-gradient(90deg,#ec4899,#f472b6)",
    path: '<polyline points="9,6 4,12 9,18" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="15,6 20,12 15,18" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="14.5" y1="4" x2="9.5" y2="20" stroke="#ec4899" stroke-width="1.7" stroke-linecap="round"/>',
  },
  {
    name: "Seguridad",
    desc: "Contraseñas, phishing, cifrado y más",
    light: "#fef3c7",
    gradient: "linear-gradient(90deg,#f59e0b,#fbbf24)",
    full: true,
    path: '<path d="M12 2.5L4 6v5.5c0 5 3.5 9 8 10.5 4.5-1.5 8-5.5 8-10.5V6L12 2.5z" stroke="#f59e0b" stroke-width="1.75" stroke-linejoin="round"/><polyline points="8.5,12 11,14.5 15.5,10" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
];

const steps = [
  {
    title: "Elige una categoría",
    desc: "Usa la rueda giratoria interactiva o toca directamente la categoría que quieres explorar.",
  },
  {
    title: "Selecciona tu nivel",
    desc: "Fácil, Normal o Experto. Cada nivel tiene más preguntas y mayor puntaje por respuesta correcta.",
  },
  {
    title: "Lee la introducción",
    desc: "Cada nivel incluye una narrativa educativa que contextualiza el tema antes de comenzar el quiz.",
  },
  {
    title: "Responde y aprende",
    desc: "Cada respuesta muestra una explicación del concepto, ya sea correcta o incorrecta.",
  },
];

const levels = [
  {
    name: "Explorador",
    label: "Fácil",
    questions: 5,
    pts: 10,
    stars: 1,
    light: "#d1fae5",
    path: '<path d="M12 22V12" stroke="#10b981" stroke-width="2" stroke-linecap="round"/><path d="M12 12C12 12 7 11 5 7C5 7 9 4 12 7" stroke="#10b981" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M12 12C12 12 17 10 19 6C19 6 15 3 12 6" stroke="#10b981" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  },
  {
    name: "Aventurero",
    label: "Normal",
    questions: 7,
    pts: 15,
    stars: 2,
    light: "#fef3c7",
    path: '<polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="#f59e0b" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    name: "Maestro",
    label: "Experto",
    questions: 10,
    pts: 20,
    stars: 3,
    light: "#fee2e2",
    path: '<path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7-.5 2-1.5 3-3 4 0-3-2-5-3-8C6 6 5 9 5 12c0 5.5 3 9 7 10z" stroke="#ef4444" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>',
  },
];

// ── Scroll reveal con IntersectionObserver ──
const vis = reactive({});
const refMap = {};

function setRef(key, el) {
  if (!el) return;
  refMap[key] = el;
}

let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const key = Object.keys(refMap).find((k) => refMap[k] === e.target);
        if (key && e.isIntersecting) {
          vis[key] = true;
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  // Registrar todos los refs directos
  const directRefs = [
    "statsRef",
    "cats0",
    "cats1",
    "cats2",
    "how0",
    "how1",
    "how2",
    "lev0",
    "lev1",
    "lev2",
    "cta",
  ];
  // Los refs de arrays se registran vía setRef

  // Observar refMap (se llena progresivamente por :ref callbacks)
  setTimeout(() => {
    Object.values(refMap).forEach((el) => {
      if (el) observer.observe(el);
    });
  }, 100);
});

onMounted(() => {
  // Esperar un tick para que Vue termine de renderizar
  nextTick(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  });
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<style scoped>
/* ── BASE ── */
.landing-page {
  font-family: "Plus Jakarta Sans", system-ui, sans-serif;
  background: #f0f4ff;
  background-image:
    radial-gradient(
      ellipse at 20% 10%,
      rgba(99, 102, 241, 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 85% 80%,
      rgba(139, 92, 246, 0.1) 0%,
      transparent 50%
    );
  min-height: 100vh;
  color: #111827;
  overflow-x: hidden;
}

/* ── REVEAL ANIMATION ── */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.55s ease,
    transform 0.55s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── NAVBAR ── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(240, 244, 255, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.navbar-inner {
  max-width: 480px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 9px;
}
.nav-logo {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);
}
.nav-name {
  font-size: 0.9rem;
  font-weight: 900;
  color: #111827;
}
.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-size: 0.8rem;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transition: transform 0.15s ease;
}
.nav-btn:hover {
  transform: scale(1.04);
}

/* ── HERO ── */
.hero {
  padding: 56px 20px 44px;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: white;
  border: 1.5px solid rgba(99, 102, 241, 0.2);
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 28px;
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.1);
  animation: fadeDown 0.6s ease both;
}
.hero-badge-dot {
  width: 7px;
  height: 7px;
  background: #10b981;
  border-radius: 999px;
  animation: dotPulse 2s ease-in-out infinite;
}
@keyframes dotPulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.3);
  }
}
.hero-logo {
  width: 88px;
  height: 88px;
  border-radius: 26px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 28px;
  box-shadow:
    0 16px 40px rgba(99, 102, 241, 0.3),
    0 0 0 8px rgba(99, 102, 241, 0.08);
  animation: logoIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
}
@keyframes logoIn {
  from {
    transform: scale(0.5) rotate(-10deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
.hero-title {
  font-size: clamp(1.9rem, 8vw, 2.5rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  animation: fadeUp 0.6s ease 0.2s both;
}
.hero-title-grad {
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.65;
  font-weight: 500;
  margin-bottom: 36px;
  max-width: 340px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeUp 0.6s ease 0.3s both;
}
.hero-cta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  animation: fadeUp 0.6s ease 0.4s both;
}
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 17px 32px;
  border-radius: 16px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-size: 1rem;
  font-weight: 800;
  text-decoration: none;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 8px 28px rgba(99, 102, 241, 0.38);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgba(99, 102, 241, 0.45);
}
.btn-arrow {
  width: 22px;
  height: 22px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: transform 0.2s ease;
}
.btn-primary:hover .btn-arrow {
  transform: translateX(3px);
}
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 16px;
  background: transparent;
  color: #6366f1;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  border: 1.5px solid rgba(99, 102, 241, 0.25);
  transition: background 0.15s;
}
.btn-ghost:hover {
  background: #eef2ff;
}

/* ── PHONE MOCKUP ── */
.mockup-wrap {
  margin: 44px auto 0;
  max-width: 240px;
  animation: mockupIn 0.8s cubic-bezier(0.34, 1.2, 0.64, 1) 0.5s both;
  position: relative;
}
@keyframes mockupIn {
  from {
    transform: translateY(40px) scale(0.92);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
.phone-frame {
  background: white;
  border-radius: 32px;
  border: 2px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.14);
  overflow: hidden;
  position: relative;
}
.phone-notch {
  width: 70px;
  height: 22px;
  background: white;
  border-radius: 0 0 14px 14px;
  border: 2px solid rgba(0, 0, 0, 0.06);
  border-top: none;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
.phone-screen {
  background: linear-gradient(145deg, #f0f4ff, #fafbff, #f5f0ff);
  padding: 36px 14px 20px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ph-header {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 14px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.06);
}
.ph-brand {
  display: flex;
  align-items: center;
  gap: 7px;
}
.ph-logo-mini {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ph-brand-text {
  font-size: 10px;
  font-weight: 800;
  color: #111827;
}
.ph-score {
  background: #111827;
  color: white;
  font-size: 9px;
  font-weight: 800;
  padding: 4px 8px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 3px;
}
.ph-hero-card {
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  border-radius: 16px;
  padding: 14px;
}
.ph-hero-icons {
  display: flex;
  gap: 5px;
  margin-bottom: 8px;
}
.ph-ico {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ph-hero-title {
  font-size: 11px;
  font-weight: 900;
  color: white;
  margin-bottom: 3px;
}
.ph-hero-sub {
  font-size: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}
.ph-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.ph-card {
  background: white;
  border-radius: 12px;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
}
.ph-card-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ph-card-name {
  font-size: 8px;
  font-weight: 800;
  color: #111827;
}
.ph-card-bar {
  width: 100%;
  height: 2px;
  border-radius: 999px;
}

.float-badge {
  position: absolute;
  background: white;
  border-radius: 12px;
  padding: 8px 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  z-index: 10;
}
.float-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
}
.badge-left {
  left: -48px;
  top: 28%;
  animation: floatL 4s ease-in-out infinite;
}
.badge-right {
  right: -48px;
  top: 54%;
  animation: floatR 4s ease-in-out infinite 1.5s;
}
@keyframes floatL {
  0%,
  100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-8px) rotate(2deg);
  }
}
@keyframes floatR {
  0%,
  100% {
    transform: translateY(0) rotate(2deg);
  }
  50% {
    transform: translateY(-8px) rotate(-2deg);
  }
}

/* ── STATS ── */
.stats-bar {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px 48px;
}
.stats-inner {
  background: white;
  border-radius: 24px;
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}
.stat-item {
  padding: 20px 12px;
  text-align: center;
  border-right: 1.5px solid rgba(0, 0, 0, 0.06);
}
.stat-item:last-child {
  border-right: none;
}
.stat-num {
  font-size: 1.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}
.stat-lbl {
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  margin-top: 2px;
}

/* ── SECTIONS ── */
.section {
  padding: 0 20px 56px;
  max-width: 480px;
  margin: 0 auto;
}
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 800;
  color: #6366f1;
  background: #eef2ff;
  padding: 5px 12px;
  border-radius: 999px;
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.section-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: #111827;
  line-height: 1.2;
  margin-bottom: 8px;
}
.section-sub {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: 28px;
}

/* ── CATEGORY CARDS ── */
.cat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.cat-card {
  background: white;
  border-radius: 20px;
  padding: 18px 14px 14px;
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}
.cat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}
.cat-card.cat-full {
  grid-column: 1 / -1;
  flex-direction: row;
  text-align: left;
  align-items: center;
}
.cat-icon-bg {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cat-info {
  flex: 1;
}
.cat-name {
  font-size: 0.85rem;
  font-weight: 800;
  color: #111827;
}
.cat-desc {
  font-size: 0.72rem;
  color: #9ca3af;
  font-weight: 500;
  margin-top: 2px;
}
.cat-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
}
.cat-full .cat-bar {
  position: absolute;
  bottom: 0;
  top: 0;
  left: auto;
  right: 0;
  width: 3px;
  height: auto;
  border-radius: 0 18px 18px 0;
}

/* ── STEPS ── */
.steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.step {
  background: white;
  border-radius: 20px;
  padding: 18px 20px;
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.18s ease;
}
.step:hover {
  transform: translateX(4px);
}
.step-num {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-size: 0.95rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.3);
}
.step-title {
  font-size: 0.92rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 3px;
}
.step-desc {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.5;
}

/* ── LEVELS ── */
.levels {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.level-card {
  background: white;
  border-radius: 18px;
  padding: 16px 18px;
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
.level-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.level-info {
  flex: 1;
}
.level-name {
  font-size: 0.92rem;
  font-weight: 800;
  color: #111827;
}
.level-tag {
  font-size: 0.72rem;
  color: #9ca3af;
  font-weight: 600;
}
.level-meta {
  font-size: 0.78rem;
  color: #6b7280;
  font-weight: 500;
  margin-top: 2px;
}
.level-stars {
  display: flex;
  gap: 3px;
  flex-shrink: 0;
}

/* ── FINAL CTA ── */
.final-cta {
  padding: 0 20px 80px;
  max-width: 480px;
  margin: 0 auto;
}
.cta-card {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 60%, #ec4899 100%);
  border-radius: 28px;
  padding: 40px 28px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(99, 102, 241, 0.35);
}
.cta-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 30% 30%,
    rgba(255, 255, 255, 0.18),
    transparent 60%
  );
}
.cta-icon {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  position: relative;
  z-index: 1;
}
.cta-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 10px;
  line-height: 1.2;
  position: relative;
  z-index: 1;
}
.cta-sub {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.82);
  font-weight: 500;
  margin-bottom: 28px;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}
.btn-white {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 16px;
  background: white;
  color: #4f46e5;
  font-size: 1rem;
  font-weight: 800;
  text-decoration: none;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  transition: transform 0.18s ease;
  position: relative;
  z-index: 1;
}
.btn-white:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.22);
}

/* ── FOOTER ── */
.footer {
  text-align: center;
  padding: 24px 20px 40px;
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 600;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 360px) {
  .badge-left,
  .badge-right {
    display: none;
  }
}
</style>
