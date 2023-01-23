<script setup lang="ts">
import { computed, type InputHTMLAttributes } from "vue";

interface Props extends InputHTMLAttributes {
  modelValue: boolean;
  label: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get(): boolean {
    return props.modelValue;
  },
  set(value: boolean) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <label :for="props.id">
    <input type="checkbox" :id="props.id" v-model="value" />
    {{ props.label }}
  </label>
</template>

<style scoped lang="scss">
@import "@/assets/sass/colors.scss";

label {
  display: flex;
  align-items: center;
  column-gap: 1rem;
  cursor: pointer;
}

input {
  width: 1rem;
  height: 1rem;
  border: 1px solid $grey500;
  border-radius: 0.25rem;

  &:hover,
  &:checked {
    border-color: $indigo500;
    border-width: 2px;
  }
}

input:checked::before {
  display: inline-block;
  font-size: 0.8rem;
  content: "\2713";
  color: $indigo500;
  font-weight: 700;
  transform: translate(1px, -4px);
}
</style>
