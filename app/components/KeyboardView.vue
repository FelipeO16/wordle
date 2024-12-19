<template>
  <div class="keyboard">
    <div
      v-for="row in keyRows"
      :key="row.join('')"
      class="keyboard-row"
    >
      <button
        v-for="key in row"
        :key="key"
        :class="{
          correct: lettersStatus[key] === 'correct',
          almost: lettersStatus[key] === 'almost',
          incorrect: lettersStatus[key] === 'incorrect',
        }"
        class="keyboard-key"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{
  lettersStatus: Record<string, "correct" | "almost" | "incorrect" | null>;
}>();

const keyRows = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  "ZXCVBNM".split(""),
];
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  user-select: none;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
}

.keyboard-key {
  width: 2.5rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background-color: #f3f4f6;
  color: #1f2937;
  transition: all 0.2s;
}

.keyboard-key.correct {
  background-color: #22c55e; /* Verde */
  color: #ffffff;
  border-color: #16a34a;
}

.keyboard-key.almost {
  background-color: #facc15; /* Amarelo */
  color: #ffffff;
  border-color: #eab308;
}

.keyboard-key.incorrect {
  background-color: #9ca3af; /* Cinza */
  color: #ffffff;
  border-color: #6b7280;
}
</style>
