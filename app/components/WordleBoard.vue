<script setup lang="ts">
import { DEFEAT_MESSAGE, MAX_GUESS_ATTEMPTS, VICTORY_MESSAGE } from "#shared/settings";
import { ref } from "vue";
import words from "#shared/settings/words.json";

defineProps({
  wordOfTheDay: {
    type: String,
    required: true,
    validator: (word: string) => words.includes(word.toLowerCase()),
  },
});

const guessesSubmitted = ref<string[]>([]);
</script>

<template>
  <div>
    <GuessInput @guess-submitted="(guess) => guessesSubmitted.push(guess)" />
    <p
      v-if="guessesSubmitted.length === MAX_GUESS_ATTEMPTS || guessesSubmitted.includes(wordOfTheDay)"
      v-text="
        guessesSubmitted.includes(wordOfTheDay) ? VICTORY_MESSAGE : DEFEAT_MESSAGE
      "
    />
    <pre> {{ guessesSubmitted }} </pre>
  </div>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}

end-of-game-message {
  font-size: 3rem;
  animation: end-of-game-message-animation 700ms forwards;
  white-space: nowrap;
  text-align: center;
}
@keyframes end-of-game-message-animation {
  0% {
    opacity: 0;
    transform: rotateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateY(2rem);
  }
}
</style>
