<template>
  <div>
    <input type="text" />
    <p>{{ wordOfTheDay }}</p>
    <p>You won!</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  wordOfTheDay: string;
}>();
</script>
