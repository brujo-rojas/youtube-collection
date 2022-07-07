<template>
  <div class="mdi-icon">
    <svg
      :style="{
        width: size,
        height: size,
      }"
      :viewBox="`0 0 24 24`"
    >
      <path fill="currentColor" :d="icon" />
    </svg>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    icon: { type: String, required: true },
    size: { type: Number, default: 36 },
  },
});
</script>
