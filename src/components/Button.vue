<script setup lang="ts">
import type {
  ButtonHTMLAttributes,
  FunctionalComponent,
  HTMLAttributes,
  VNodeProps,
} from "vue";

interface Props extends ButtonHTMLAttributes {
  label: string;
  color?: "red";
  icon?: FunctionalComponent<HTMLAttributes & VNodeProps, {}>;
}

const props = defineProps<Props>();
const { label, icon } = props;
</script>

<template>
  <button :class="`button ${color}`">
    <Component :is="icon" class="icon" />
    {{ label }}
  </button>
</template>

<style scoped lang="scss">
@import "@/assets/sass/colors.scss";

.button {
  background-color: $indigo500;
  color: $grey50;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  width: fit-content;
  cursor: pointer;
  transition: background-color 300ms ease-in-out;
  display: flex;
  column-gap: 0.5rem;

  &:hover {
    background-color: darken($indigo500, 10%);
  }

  .icon {
    width: 1rem;
  }
}

.red {
  @extend .button;
  background-color: $red500;
}
</style>
