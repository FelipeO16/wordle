import { describe, test, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import WordleBoard from '@/components/WordleBoard.vue'
import GuessInput from '@/components/GuessInput.vue'
import { DEFEAT_MESSAGE, MAX_GUESS_ATTEMPTS, VICTORY_MESSAGE } from '../shared/settings'


describe('WordleBoard', () => {
  let wordOfTheDay: string = 'TESTE'
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(WordleBoard, {
      global: {
        components: {
          GuessInput
        },
      },
      props: {
        wordOfTheDay
      },
    })
  })

  const playerSubmitGuess = async (guess: string) => {
    const input = wrapper.find('input[type="text"]')
    input.setValue(guess)
    await input.trigger("keydown.enter")
  }

  describe('End of game messages', () => {

    test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
      await playerSubmitGuess(wordOfTheDay)
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

    describe.each([
      { numberOfGuesses: 0, shoudSeeDefeatMessage: false},
      { numberOfGuesses: 1, shoudSeeDefeatMessage: false},
      { numberOfGuesses: 2, shoudSeeDefeatMessage: false},
      { numberOfGuesses: 3, shoudSeeDefeatMessage: false},
      { numberOfGuesses: 4, shoudSeeDefeatMessage: false},
      { numberOfGuesses: 5, shoudSeeDefeatMessage: false},
      { numberOfGuesses: MAX_GUESS_ATTEMPTS, shoudSeeDefeatMessage: true},
    ])('a defeat message should appear if the player makes incorrect guesses 6 times in a row', ({ numberOfGuesses, shoudSeeDefeatMessage }) => {
      test(`therefore for ${numberOfGuesses} guess(es), a defeat message should ${shoudSeeDefeatMessage ? '' : 'not'} appear`, async () => {
        for (let i = 0; i < numberOfGuesses; i++) {
          await playerSubmitGuess('TESTA')
        }
        if (shoudSeeDefeatMessage) {
          expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
        } else {
          expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
        }
      })
    })

    test('no end-of-game message appears if the user has not yet made a guess', async () => {
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })
  })

  describe('Rules for defining the word of the day', () => {
    beforeEach(() => {
      console.warn = vi.fn()
    })

    test.each(
      [
        { wordOfTheDay: 'TOO_LONG', reason: 'word-of-the-day must have 5 characters' },
        { wordOfTheDay: 'lower', reason: 'word-of-the-day must be all in uppercase' },
        { wordOfTheDay: 'URBAN', reason: 'word-of-the-day must be a valid Portuguese word' },
      ]
    )('Since $reason: $wordOfTheDay is invalid, therefore a warning must be emitted ', async ({ wordOfTheDay }) => {
      const wrapper = mount(WordleBoard, {
        global: {
          components: {
            GuessInput
          },
        },
        props: {
          wordOfTheDay
        }
      })

      expect(console.warn).toHaveBeenCalled()
    }
    )
    test('no warning is emitted if the word of the day is a real uppercase Portuguese word with 5 characters', async () => {
      mount(WordleBoard, {
        global: {
          components: {
            GuessInput
          },
        },
        props: {
          wordOfTheDay: 'TESTE'
        }
      })

      expect(console.warn).not.toHaveBeenCalled();
    })
  })
  describe('player input', () => {
    test("remains in focus the entire time", async () => {
      document.body.innerHTML = `<div id="app"></div>`
      wrapper = mount(WordleBoard, {
        global: {
          components: {
            GuessInput
          },
        },
        props: { wordOfTheDay },
        attachTo: "#app"
      })

      expect(wrapper.find("input[type=text]").attributes("autofocus")).not.toBeUndefined()

      await wrapper.find("input[type=text]").trigger("blur")
      expect(document.activeElement).toBe(wrapper.find("input[type=text]").element)
    })
    test('player guesses are limited to 5 characters', async () => {
      await playerSubmitGuess(wordOfTheDay + 'EXTRA')
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

    test('player guesses can only be submitted if they are real words', async () => {
      await playerSubmitGuess('QWERT')

      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })
    test('player guesses are not case-sensitive', async () => {
      await playerSubmitGuess(wordOfTheDay.toLowerCase())
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
    test('player guesses can only contain letters', async () => {
      await playerSubmitGuess('H3!T2')
      expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.value).toEqual('HT')
    })

    test('non-letter characters do not render on the screen while being type', async () => {
      await playerSubmitGuess('12')
      await playerSubmitGuess('123')
      expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.value).toEqual('')
    })
  })

})
