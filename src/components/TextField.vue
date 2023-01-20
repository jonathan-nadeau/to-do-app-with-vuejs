<script setup lang="ts">
import { computed, type InputHTMLAttributes } from "vue";

interface Props extends InputHTMLAttributes {
  modelValue: string;
  error?: string;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <input v-model="value" />
</template>

<style scoped lang="scss">
@import "@/assets/sass/colors.scss";

input {
  border: 1px solid $grey500;
  border-radius: 0.25rem;
  padding: 1rem;

  &::placeholder {
    color: $grey300;
  }
}
</style>
