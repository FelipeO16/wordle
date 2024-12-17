<script setup lang="ts">
import { ref } from "vue";
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from "../../shared/settings";
defineProps({
  wordOfTheDay:{
    type: String,
    default: '',
    required: true,
    validator: (value: string) => value.length === 5,
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
  </div>
</template>

