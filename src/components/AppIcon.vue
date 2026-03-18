<template>
  <svg
    :class="className"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- hardware: laptop with chip -->
    <template v-if="name === 'hardware'">
      <rect
        x="2"
        y="3"
        width="20"
        height="14"
        rx="2"
        :stroke="color"
        stroke-width="1.75"
        fill="none"
      />
      <path
        d="M0 20h24"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
      />
      <rect
        x="8"
        y="7"
        width="8"
        height="6"
        rx="1.2"
        :fill="color"
        fill-opacity="0.12"
        :stroke="color"
        stroke-width="1.4"
      />
      <line
        x1="10"
        y1="9.5"
        x2="14"
        y2="9.5"
        :stroke="color"
        stroke-width="1.3"
        stroke-linecap="round"
      />
      <line
        x1="10"
        y1="11"
        x2="13"
        y2="11"
        :stroke="color"
        stroke-width="1.1"
        stroke-linecap="round"
      />
    </template>

    <!-- software: window with code -->
    <template v-else-if="name === 'software'">
      <rect
        x="2"
        y="3"
        width="20"
        height="18"
        rx="3"
        :stroke="color"
        stroke-width="1.75"
        fill="none"
      />
      <path d="M2 8h20" :stroke="color" stroke-width="1.75" />
      <circle cx="5.5" cy="5.5" r="1" :fill="color" />
      <circle cx="8.5" cy="5.5" r="1" :fill="color" />
      <circle cx="11.5" cy="5.5" r="1" :fill="color" />
      <polyline
        points="7,13 5,15.5 7,18"
        :stroke="color"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <polyline
        points="17,13 19,15.5 17,18"
        :stroke="color"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <line
        x1="13"
        y1="12"
        x2="11"
        y2="19"
        :stroke="color"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </template>

    <!-- internet: globe with lines -->
    <template v-else-if="name === 'internet'">
      <circle
        cx="12"
        cy="12"
        r="9"
        :stroke="color"
        stroke-width="1.75"
        fill="none"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="3.8"
        ry="9"
        :stroke="color"
        stroke-width="1.4"
        fill="none"
      />
      <path
        d="M3.5 8.5h17"
        :stroke="color"
        stroke-width="1.4"
        stroke-linecap="round"
      />
      <path
        d="M3.5 15.5h17"
        :stroke="color"
        stroke-width="1.4"
        stroke-linecap="round"
      />
    </template>

    <!-- programming: code brackets -->
    <template v-else-if="name === 'programming'">
      <polyline
        points="9,6 4,12 9,18"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <polyline
        points="15,6 20,12 15,18"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <line
        x1="14.5"
        y1="4"
        x2="9.5"
        y2="20"
        :stroke="color"
        stroke-width="1.7"
        stroke-linecap="round"
      />
    </template>

    <!-- security: shield with check -->
    <template v-else-if="name === 'security'">
      <path
        d="M12 2.5L4 6v5.5c0 5 3.5 9 8 10.5 4.5-1.5 8-5.5 8-10.5V6L12 2.5z"
        :stroke="color"
        stroke-width="1.75"
        fill="none"
        stroke-linejoin="round"
      />
      <polyline
        points="8.5,12 11,14.5 15.5,10"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </template>

    <!-- sprout: easy level -->
    <template v-else-if="name === 'sprout'">
      <path
        d="M12 22V12"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M12 12C12 12 7 11 5 7C5 7 9 4 12 7"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        d="M12 12C12 12 17 10 19 6C19 6 15 3 12 6"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </template>

    <!-- zap: medium level -->
    <template v-else-if="name === 'zap'">
      <polygon
        points="13,2 3,14 12,14 11,22 21,10 12,10"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </template>

    <!-- flame: hard level -->
    <template v-else-if="name === 'flame'">
      <path
        d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7-0.5 2-1.5 3-3 4 0-3-2-5-3-8C6 6 5 9 5 12c0 5.5 3 9 7 10z"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </template>

    <!-- star: score/points -->
    <template v-else-if="name === 'star'">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </template>

    <!-- star filled -->
    <template v-else-if="name === 'star-filled'">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        :fill="color"
        stroke="none"
      />
    </template>

    <!-- trophy -->
    <template v-else-if="name === 'trophy'">
      <path
        d="M6 9H3V4h3"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        d="M18 9h3V4h-3"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        d="M6 4h12v7a6 6 0 01-12 0V4z"
        :stroke="color"
        stroke-width="1.75"
        fill="none"
      />
      <path
        d="M12 17v4"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
      />
      <path
        d="M8 21h8"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
      />
    </template>

    <!-- check circle -->
    <template v-else-if="name === 'check'">
      <circle
        cx="12"
        cy="12"
        r="9"
        :stroke="color"
        stroke-width="1.75"
        fill="none"
      />
      <polyline
        points="8,12 11,15 16,9"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </template>

    <!-- x circle -->
    <template v-else-if="name === 'x'">
      <circle
        cx="12"
        cy="12"
        r="9"
        :stroke="color"
        stroke-width="1.75"
        fill="none"
      />
      <line
        x1="9"
        y1="9"
        x2="15"
        y2="15"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
      />
      <line
        x1="15"
        y1="9"
        x2="9"
        y2="15"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
      />
    </template>

    <!-- arrow right -->
    <template v-else-if="name === 'arrow-right'">
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
      />
      <polyline
        points="14,6 20,12 14,18"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </template>

    <!-- lightbulb: hint/tip -->
    <template v-else-if="name === 'lightbulb'">
      <path
        d="M9 21h6M12 3a6 6 0 00-3.5 10.8L9 17h6l0.5-3.2A6 6 0 0012 3z"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </template>

    <!-- book: learning -->
    <template v-else-if="name === 'book'">
      <path
        d="M4 19.5A2.5 2.5 0 016.5 17H20"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
        fill="none"
      />
      <path
        d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
        :stroke="color"
        stroke-width="1.75"
        fill="none"
      />
    </template>

    <!-- chart bar: progress -->
    <template v-else-if="name === 'chart'">
      <line
        x1="18"
        y1="20"
        x2="18"
        y2="10"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
      />
      <line
        x1="12"
        y1="20"
        x2="12"
        y2="4"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
      />
      <line
        x1="6"
        y1="20"
        x2="6"
        y2="14"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
      />
    </template>

    <!-- home -->
    <template v-else-if="name === 'home'">
      <path
        d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
        :stroke="color"
        stroke-width="1.75"
        fill="none"
        stroke-linejoin="round"
      />
      <polyline
        points="9,21 9,12 15,12 15,21"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </template>

    <!-- refresh -->
    <template v-else-if="name === 'refresh'">
      <polyline
        points="1,4 1,10 7,10"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        d="M3.51 15a9 9 0 102.13-9.36L1 10"
        :stroke="color"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </template>

    <!-- target: questions count -->
    <template v-else-if="name === 'target'">
      <circle
        cx="12"
        cy="12"
        r="9"
        :stroke="color"
        stroke-width="1.75"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="5"
        :stroke="color"
        stroke-width="1.5"
        fill="none"
      />
      <circle cx="12" cy="12" r="1.5" :fill="color" />
    </template>
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  color: { type: String, default: "currentColor" },
  className: { type: String, default: "w-6 h-6" },
});
</script>
