<script lang="ts" setup>
import {WORD_LENGTH} from "#shared/settings"

const props = defineProps<{ guess: string, answer?: string }>()
function getFeedback(letterPosition: number): null | "correct" | "incorrect" | "almost" {
  if (!props.answer) {
    return null
  }
  const letterGuessed = props.guess[letterPosition]
  const letterExpected = props.answer[letterPosition]
  if (!props.answer.includes(letterGuessed)) {
    return "incorrect"
  }
  return letterExpected === letterGuessed ? "correct" : "almost"
}
</script>

<template>
  <ul class="word">
    <li v-for="(letter, index) in guess.padEnd(WORD_LENGTH, ' ')"
        :key="`${letter}-${index}`"
        :data-letter="letter"
        :class="{'with-flips': answer}"
        :data-letter-feedback="getFeedback(index)"
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
  // border: 1px solid hsl(0, 0%, 70%);
  width: 5rem;
  height: 5rem;
  display: flex;
  --front-color: #3a3839;
  --back-color: hsl(0, 0%, 70%);
  color:white;
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

[data-letter-feedback=correct] {
  --back-color: #328a12;
}
[data-letter-feedback=almost] {
  --back-color: #d8ba0e;
}
[data-letter-feedback=incorrect] {
  --back-color: #3a3839;
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