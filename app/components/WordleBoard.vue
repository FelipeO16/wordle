<script setup lang="ts">
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from "#shared/settings";
import { ref } from "vue";
import words from "#shared/settings/words.json";

defineProps({
  wordOfTheDay: {
    type: String,
    required: true,
    validator: (word: string) =>
      /^[A-Z]+$/.test(word) && words.includes(word.toLowerCase()),
  },
});

const guessSubmitted = ref<string>("");
</script>

<template>
  <div>
    <GuessInput @guess-submitted="guess => guessSubmitted = guess" />
    <p
      v-if="guessSubmitted.length > 0"
      v-text="
        guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE
      "
    />
    {{ guessSubmitted }}
  </div>
</template>
