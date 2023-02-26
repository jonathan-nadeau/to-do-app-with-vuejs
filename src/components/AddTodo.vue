<script setup lang="ts">
import { Button, Checkbox, TextField } from "@/components";
import { DocumentPlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { ref, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import DatePicker from "@vuepic/vue-datepicker";
import { ToDoService } from "@/services";
import type { ITodo } from "@/typescript/interfaces/ITodo";

const handleAddTodo = () => {
  modalIsOpen.value = true;
};
const handleModalOnClose = () => {
  modalIsOpen.value = false;
};

const emit = defineEmits<{
  (e: "handleSubmit", todo: Partial<ITodo>): void;
}>();

const handleSubmit = async (event: MouseEvent) => {
  event.preventDefault();

  if (title.value) {
    errorTitleIsRequired.value = false;
    emit("handleSubmit", {
      title: title.value,
      content: description.value,
      timeLimit: timeLimit.value,
      done: done.value,
    });
    handleModalOnClose();
  }

  if (!title.value) {
    errorTitleIsRequired.value = true;
  }
};

const modalIsOpen = ref<boolean>(false);
const title = ref<string>("");
const description = ref<string>("");
const timeLimit = ref<string>("");
const done = ref<boolean>(false);
const errorTitleIsRequired = ref<boolean>(false);
</script>

<template>
  <Button
    :icon="DocumentPlusIcon"
    @click="handleAddTodo"
    label="Add an item to the list"
  ></Button>
  <div class="modal" v-if="modalIsOpen">
    <div class="content">
      <p class="content__title">
        Add an item
        <Button :icon="XMarkIcon" @click="handleModalOnClose" label=""></Button>
      </p>
      <form>
        <label for="title">
          <div class="input">
            <TextField
              v-model="title"
              id="title"
              type="text"
              placeholder="Titre"
              required
            />
          </div>
        </label>
        <div v-if="errorTitleIsRequired" class="error">Title is required</div>
        <div class="input description">
          <QuillEditor
            placeholder="Description"
            theme="snow"
            v-model:content="description"
            content-type="text"
            style="
               {
                height: 4rem;
              }
            "
          />
        </div>
        <div class="input">
          <DatePicker
            v-model="timeLimit"
            class="input"
            placeholder="Time limit"
          />
        </div>

        <Checkbox label="Done" v-model="done" class="input" />
        <Button @click="handleSubmit" label="Submit" class="button"></Button>
      </form>
      <form></form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/sass/colors.scss";

.modal {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($grey500, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  .error {
    color: $red500;
    font-size: 12px;
  }
  .content {
    width: fit-content;
    border-radius: 0.5rem;
    background-color: #fff;
    padding: 2rem;

    .input {
      width: 100%;
      margin-top: 1rem;
    }

    .description {
      height: 5rem;
      margin-bottom: 2rem;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    .button {
      margin-top: 1rem;
    }

    &__title {
      font-weight: 700;
      line-height: 19px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>
