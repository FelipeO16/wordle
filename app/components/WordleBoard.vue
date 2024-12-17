<script setup lang="ts">
import { ref } from "vue";
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from "#shared/settings";
import words from "#shared/settings/words.json";
defineProps({
  wordOfTheDay:{
    type: String,
    required: true,
    validator: (word: string) => /^[A-Z]+$/.test(word) && words.includes(word.toLowerCase()),
  }
})

const guessInProgress = ref("");
const guessSubmitted = ref("");



</script>

<template>
  <div>
    <input type="text" v-model="guessInProgress" @keydown.enter="guessSubmitted = guessInProgress" />
    <p v-if="guessSubmitted.length > 0 " v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE" />
    {{guessSubmitted}}

    {{words}}
  </div>
</template>

