<script setup lang="ts">
import { ref, computed } from "vue";
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_LENGTH } from "#shared/settings";
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

const formattedGuessInProgress = computed({
  get: () => guessInProgress.value,
  set: (value: string) => {
    guessInProgress.value = value.slice(0, WORD_LENGTH);
  }
})

const onSubmit = () => {
  if (!words.includes(guessInProgress.value.toLowerCase())) {
    return;
  }
  guessSubmitted.value = guessInProgress.value;
}

</script>

<template>
  <div>
    <input type="text" :maxlength="WORD_LENGTH" v-model="formattedGuessInProgress" @keydown.enter="onSubmit" />
    <p v-if="guessSubmitted.length > 0 " v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE" />
    {{guessSubmitted}}
  </div>
</template>

