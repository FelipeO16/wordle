<script setup lang="ts">
import {
  DEFEAT_MESSAGE,
  MAX_GUESS_ATTEMPTS,
  VICTORY_MESSAGE,
} from "#shared/settings";
import { ref, computed, reactive } from "vue";
import words from "#shared/settings/words.json";

const props = defineProps({
  wordOfTheDay: {
    type: String,
    required: true,
    validator: (word: string) => words.includes(word.toLowerCase()),
  },
});

const guessesSubmitted = ref<string[]>([]);

const lettersStatus = reactive<Record<string, "correct" | "almost" | "incorrect" | null>>({});

function updateLettersUsed(guess: string, ) {
  guess.split("").forEach((letter, index) => {
    if (props.wordOfTheDay[index] === letter) {
      lettersStatus[letter] = "correct";
    } else if (props.wordOfTheDay.includes(letter)) {
      lettersStatus[letter] = "almost";
    } else {
      lettersStatus[letter] = "incorrect";
    }
  });
}

const isGameOver = computed(
  () =>
    guessesSubmitted.value.length === MAX_GUESS_ATTEMPTS ||
    guessesSubmitted.value.includes(props.wordOfTheDay)
);

const countOfEmptyGuesses = computed(() => {
  const guessesRemaining = MAX_GUESS_ATTEMPTS - guessesSubmitted.value.length
  return isGameOver.value ? guessesRemaining : guessesRemaining - 1
})
</script>

<template>
  <main>
    <p v-if="isGameOver">
      <div class="text-xl text-white mb-4" v-if="guessesSubmitted.includes(wordOfTheDay)">
        {{ VICTORY_MESSAGE }}
      </div>
      <div class="text-xl text-white mb-4" v-else>
        {{ DEFEAT_MESSAGE }}
      </div>
    </p>
    <ul>
      <li v-for="guess, index in guessesSubmitted">
        <guess-view :answer="wordOfTheDay" :guess="guess"/>
      </li>
      <li>
        <GuessInput :disabled="isGameOver" @guess-submitted="guess => guessesSubmitted.push(guess)" @letters-status="guess =>  updateLettersUsed(guess)"/> 
      </li>
      <li v-for="i in countOfEmptyGuesses" :key="`remaining-guess-${i}`">
        <GuessView
         guess=""/>
      </li>
    </ul>
    
    <div class="m-4">
      <KeyboardView :letters-status="lettersStatus" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}

li {
  margin-bottom: 0.25rem;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  list-style: none;
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
