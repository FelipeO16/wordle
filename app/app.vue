<script setup lang="ts">
import words from "#shared/settings/words.json";

function getWordOfTheDay(wordList: string[]): string{
  if (!Array.isArray(wordList) || wordList.length === 0) {
    throw new Error("A lista de palavras está vazia ou não é um array.");
  }

  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today - startOfYear;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const wordIndex = dayOfYear % wordList.length;

  return wordList[wordIndex]?.toUpperCase() || '';
}

const wordOfTheDay = getWordOfTheDay(words);

</script>

<template>
  <div class="bg-[#0c0c0c] h-screen">
    <div class="container mx-auto p-4">
      <header>
        <div class="text-2xl">Wordle</div>
        <div class="refs flex gap-4 text-2xl">
          <a href="https://github.com/FelipeO16/wordle">
            <Icon name="skill-icons:github-light" />
          </a>
          <a href="https://linkedin.com/in/felipe--">
            <Icon name="simple-icons:linkedin" />
          </a>
        </div>
      </header>
      <WordleBoard :wordOfTheDay />
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Itim&display=swap");

.itim-regular {
  font-family: "Itim", serif;
  font-weight: 400;
  font-style: normal;
}

header {
  @apply p-4 w-full flex justify-between text-white itim-regular;
}
</style>
