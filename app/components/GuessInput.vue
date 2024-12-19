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
  "letters-status": [guess: string];
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
    hasFailedValidation.value = true;
    setTimeout(() => (hasFailedValidation.value = false), 500);
    return;
  }
  emit("guess-submitted", formattedGuessInProgress.value);
  emit("letters-status", formattedGuessInProgress.value);
  guessInProgress.value = null;
}

const hasFailedValidation = ref<boolean>(false);
</script>

<template>
  <GuessView v-if="!disabled" :class="{shake: hasFailedValidation}" :guess="formattedGuessInProgress"/>

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
  background-color: #3a3839;
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

.shake {
  animation: shake;
  animation-duration: 100ms;
  animation-iteration-count: 2;
}
@keyframes shake {
  0% {
    transform: translateX(-2%);
  }
  25% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(2%);
  }
  75% {
    transform: translateX(0);
  }
}
</style>
