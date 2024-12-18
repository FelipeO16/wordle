<script lang="ts" setup>
import {WORD_LENGTH} from "#shared/settings"
import words from "#shared/settings/words.json"
import {computed, ref, triggerRef} from "vue"

withDefaults(defineProps<{ guess: string, shouldFlip?: boolean }>(), {shouldFlip: false})
</script>

<template>
  <ul class="word">
    <li v-for="(letter, index) in guess.padEnd(WORD_LENGTH, ' ')"
        :key="`${letter}-${index}`"
        :data-letter="letter"
        :class="{'with-flips': shouldFlip}"
        class="letter"
        v-text="letter"/>
  </ul>
</template>

<style scoped lang="scss">
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
  --front-color: hsl(0, 0%, 99%);
  --back-color: hsl(0, 0%, 70%);
  background-color: var(--front-color);
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

$maxWordSize: 5;
@for $i from 1 through $maxWordSize {
  .with-flips:nth-of-type(#{$i}) {
    animation: flip-card 300ms forwards;
    animation-delay: #{250*$i}ms;
  }
}
@keyframes flip-card {
  0% {
    transform: rotateY(0);
    background-color: var(--front-color);
  }
  49% {
    background-color: var(--front-color);
  }
  50% {
    transform: rotateY(-90deg);
    background-color: var(--back-color);
  }
  100% {
    transform: rotateY(0);
    background-color: var(--back-color);
  }
}
</style>