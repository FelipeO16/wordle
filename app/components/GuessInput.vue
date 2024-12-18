<script lang="ts" setup>
import { WORD_LENGTH } from "#shared/settings";
import words from "#shared/settings/words.json";
import { computed, ref, triggerRef } from "vue";

withDefaults(defineProps<{ disabled: boolean }>(), {
  disabled: false,
});
const guessInProgress = ref<string | null>(null);
const emit = defineEmits<{
  "guess-submitted": [guess: string];
}>();
const formattedGuessInProgress = computed<string>({
  get() {
    return guessInProgress.value ?? "";
  },
  set(rawValue: string) {
    guessInProgress.value = null;
    guessInProgress.value = rawValue
      .slice(0, WORD_LENGTH)
      .toUpperCase()
      .replace(/[^A-Z]+/gi, "");
    triggerRef(formattedGuessInProgress);
  },
});

function onSubmit() {
  if (!words.includes(formattedGuessInProgress.value.toLowerCase())) {
    return;
  }
  emit("guess-submitted", formattedGuessInProgress.value);
  guessInProgress.value = null;
}
</script>

<template>
  <GuessView v-if="!disabled" :guess="formattedGuessInProgress" />

  <input
    v-model="formattedGuessInProgress"
    :maxlength="WORD_LENGTH"
    :disabled="disabled"
    autofocus
    @blur="({target}) => (target as HTMLInputElement).focus()"
    type="text"
    @keydown.enter="onSubmit"
  />
</template>

<style scoped>
input {
  position: absolute;
  opacity: 0;
}
.word {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 0.25rem;
}
.letter {
  background-color: white;
  border: 1px solid hsl(0, 0%, 70%);
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bolder;
}
li:not([data-letter=" "]) {
  animation: pop 100ms;
}
@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
}
</style>
