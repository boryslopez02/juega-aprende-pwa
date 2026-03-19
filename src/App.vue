<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: smooth;
}
body {
  overscroll-behavior-y: contain;
}
</style>
