import { describe, test, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import WordleBoard from '@/components/WordleBoard.vue'
import GuessInput from '@/components/GuessInput.vue'
import GuessView from '@/components/GuessView.vue'
import { DEFEAT_MESSAGE, MAX_GUESS_ATTEMPTS, VICTORY_MESSAGE } from '../shared/settings'


describe('WordleBoard', () => {
  let wordOfTheDay: string = 'TESTE'
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(WordleBoard, {
      global: {
        components: {
          GuessInput,
          GuessView
        },
      },
      props: {
        wordOfTheDay
      },
    })
  })

  const playerTypesGuess = async (guess: string) => {
    await wrapper.find('input[type="text"]').setValue(guess)
  }

  const playerPressEnter = async () => {
    await wrapper.find('input[type="text"]').trigger("keydown.enter")
  }

  const playerTypesAndSubmitsGuess = async (guess: string) => {
    await playerTypesGuess(guess)
    await playerPressEnter()

  }

  describe('End of game messages', () => {

    test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
      await playerTypesAndSubmitsGuess(wordOfTheDay)
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

    describe.each(
      Array.from(
        {
          length: MAX_GUESS_ATTEMPTS + 1,
        },
        (_, numberOfGuesses) => ({
          numberOfGuesses,
          shoudSeeDefeatMessage: numberOfGuesses === MAX_GUESS_ATTEMPTS
        })
      )
    )('a defeat message should appear if the player makes incorrect guesses 6 times in a row', ({ numberOfGuesses, shoudSeeDefeatMessage }) => {
      test(`therefore for ${numberOfGuesses} guess(es), a defeat message should ${shoudSeeDefeatMessage ? '' : 'not'} appear`, async () => {
        for (let i = 0; i < numberOfGuesses; i++) {
          await playerTypesAndSubmitsGuess('TESTA')
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
            GuessInput,
            GuessView
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
            GuessInput,
            GuessView
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
            GuessInput,
            GuessView
          },
        },
        props: { wordOfTheDay },
        attachTo: "#app"
      })

      expect(wrapper.find("input[type=text]").attributes("autofocus")).not.toBeUndefined()

      await wrapper.find("input[type=text]").trigger("blur")
      expect(document.activeElement).toBe(wrapper.find("input[type=text]").element)
    })

    test('the input gets cleared after each submission', async () => {
      await playerTypesAndSubmitsGuess('TESTA')
      expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.value).toEqual('')
    })

    test('player guesses are limited to 5 characters', async () => {
      await playerTypesAndSubmitsGuess(wordOfTheDay + 'EXTRA')
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

    test('player guesses can only be submitted if they are real words', async () => {
      await playerTypesAndSubmitsGuess('QWERT')

      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })
    test('player guesses are not case-sensitive', async () => {
      await playerTypesAndSubmitsGuess(wordOfTheDay.toLowerCase())
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
    test('player guesses can only contain letters', async () => {
      await playerTypesGuess('H3!T2')
      expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.value).toEqual('HT')
    })

    test('non-letter characters do not render on the screen while being type', async () => {
      await playerTypesGuess('12')
      await playerTypesGuess('123')
      expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.value).toEqual('')
    })

    test('the player loses control after the max amount of guesses have been sent', async () => {
      const guesses = [
        'ABACO',
        'ABADE',
        'ABAFA',
        'ABAFE',
        'ABAFO',
        'TESTA',
      ]
      for (const guess of guesses) {
        await playerTypesAndSubmitsGuess(guess)
      }

      for (const guess of guesses) {
        expect(wrapper.find('input[type="text"]').attributes('disabled')).not.toBeUndefined()
      }

    })

    test('the player losses control after the correct guess has been given', async () => {
      await playerTypesAndSubmitsGuess(wordOfTheDay)
      expect(wrapper.find('input[type="text"]').attributes('disabled')).not.toBeUndefined()
    })
  })

  test('all previous guesses done by the player are visible in the page', async () => {
    // abaco abade abafa abafe abafo
    const guesses = [
      'ABACO',
      'ABADE',
      'ABAFA',
      'ABAFE',
      'ABAFO',
      'TESTA',
    ]
    for (const guess of guesses) {
      await playerTypesAndSubmitsGuess(guess)
    }

    for (const guess of guesses) {
      expect(wrapper.text()).toContain(guess)
    }

    // const guessElements = wrapper.findAll('.guess')
    // expect(guessElements.length).toBe(guesses.length)
    // guessElements.forEach((guessElement, index) => {
    //   expect(guessElement.text()).toContain(guesses[index])
    // })
  })

  describe(`there should always be exactly ${MAX_GUESS_ATTEMPTS} guess-views in the board`, async () => {
    test(`${MAX_GUESS_ATTEMPTS} guess-views are present at the start of the game`, async () => {
      expect(wrapper.findAllComponents(GuessView)).toHaveLength(MAX_GUESS_ATTEMPTS)
    })
    test(`${MAX_GUESS_ATTEMPTS} guess-views are present when the player wins the game`, async () => {
      await playerTypesAndSubmitsGuess(wordOfTheDay)
      expect(wrapper.findAllComponents(GuessView)).toHaveLength(MAX_GUESS_ATTEMPTS)
    })
    test(`${MAX_GUESS_ATTEMPTS} guess-views are present as the player loses the game`, async () => {
      const guesses = [
        'ABACO',
        'ABADE',
        'ABAFA',
        'ABAFE',
        'ABAFO',
        'TESTA',
      ]
      for (const guess of guesses) {
        await playerTypesAndSubmitsGuess(guess)
        expect(wrapper.findAllComponents(GuessView)).toHaveLength(MAX_GUESS_ATTEMPTS)
      }
    })
  })

  describe('Displaying hints/feedback to the player', () => {
    test('hints are not displayed until the player submit their guess', async () => {
      expect(wrapper.find('[data-letter-feedback]').exists(), "Feedback was being rendered before the player started typing their guess").toBe(false)
      await playerTypesGuess(wordOfTheDay)
      expect(wrapper.find('[data-letter-feedback]').exists(), "Feedback was rendered while the player was typing their guess").toBe(false)

      await playerPressEnter()
      expect(wrapper.find('[data-letter-feedback]').exists(), "Feedback was not rendered while the player submitted their guess").toBe(true)
    })
  })

  describe.each([
    {
      position: 0,
      expectedFeedback: "incorrect",
      reason: "H does not exist in 'DOSAR'"
    },
    {
      position: 1,
      expectedFeedback: "correct",
      reason: "O exists in both words and is in position '1' of 'DOSAR'"
    },
    {
      position: 2,
      expectedFeedback: "almost",
      reason: "R exists in 'DOSAR' but is not in position '2'"
    },
    {
      position: 3,
      expectedFeedback: "almost",
      reason: "D exists in 'DOSAR' but is not in position '3'"
    },
    {
      position: 4,
      expectedFeedback: "almost",
      reason: "A exists in 'DOSAR' but is not in position '4'"
    }
  ])("If the word of the day is 'WORLD' and the player types 'WRONG'", ({ position, expectedFeedback, reason }) => {
    const wordOfTheDay = "DOSAR"
    const playerGuess = "HORDA"

    test(`the feedback for '${playerGuess[position]}' (index: ${position}) should be '${expectedFeedback}' because '${reason}'`, async () => {
      wrapper = mount(WordleBoard, {
        global: {
          components: {
            GuessInput,
            GuessView
          },
        }, propsData: { wordOfTheDay }
      })

      await playerTypesAndSubmitsGuess(playerGuess)

      const actualFeedback = wrapper.findAll("[data-letter]").at(position)?.attributes("data-letter-feedback")

      expect(actualFeedback).toEqual(expectedFeedback)
    })
  })
})
