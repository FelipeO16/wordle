<template>
  <div>
    <input
      type="text"
      :maxlength="WORD_LENGTH"
      v-model="formattedGuessInProgress"
      @keydown.enter="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, triggerRef } from "vue";
import { WORD_LENGTH } from "#shared/settings";
import words from "#shared/settings/words.json";

const guessInProgress = ref<string | null>("");

const emit = defineEmits<{
  "guess-submitted": [guess: string]
}>();

const formattedGuessInProgress = computed<string>({
  get: () => guessInProgress.value ?? "",
  set: (value: string) => {
    guessInProgress.value = null
    guessInProgress.value = value
    .slice(0, WORD_LENGTH)
    .toUpperCase()
    .replace(/[^A-Z]+/gi, "");
    triggerRef(formattedGuessInProgress);
  },
});

const onSubmit = () => {
  if (!words.includes(formattedGuessInProgress.value.toLowerCase())) {
    return;
  }

  emit("guess-submitted", formattedGuessInProgress.value)
};
</script>