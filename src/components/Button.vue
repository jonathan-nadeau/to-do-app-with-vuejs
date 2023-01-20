<script setup lang="ts">
import type { ButtonHTMLAttributes } from "vue";

interface Props extends ButtonHTMLAttributes {
  label: string;
}

const props = defineProps<Props>();
const { label } = props;
</script>

<template>
  <button>{{ label }}</button>
</template>

<style scoped lang="scss">
@import "@/assets/sass/colors.scss";

button {
  background-color: $indigo500;
  color: $grey50;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  width: fit-content;
  cursor: pointer;
  transition: background-color 300ms ease-in-out;

  &:hover {
    background-color: darken($indigo500, 10%);
  }
}
</style>
