<script setup lang="ts">
import { ref, computed, triggerRef } from "vue";
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_LENGTH } from "#shared/settings";
import words from "#shared/settings/words.json";
defineProps({
  wordOfTheDay: {
    type: String,
    required: true,
    validator: (word: string) =>
      /^[A-Z]+$/.test(word) && words.includes(word.toLowerCase()),
  },
});

const guessInProgress = ref<string | null>("");
const guessSubmitted = ref("");

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

  guessSubmitted.value = formattedGuessInProgress.value;
};
</script>

<template>
  <div>
    <input
      type="text"
      :maxlength="WORD_LENGTH"
      v-model="formattedGuessInProgress"
      @keydown.enter="onSubmit"
    />
    <p
      v-if="guessSubmitted.length > 0"
      v-text="
        guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE
      "
    />
    {{ guessSubmitted }}
  </div>
</template>
