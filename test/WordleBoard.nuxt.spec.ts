import { describe, test, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import WordleBoard from '../app/components/WordleBoard.vue'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '../shared/settings'


describe('WordleBoard', () => {
  let wordOfTheDay: string = 'TESTS'
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(WordleBoard, {
      props: {
        wordOfTheDay
      }
    })
  })

  const playerSubmitGuess = async (guess: string) => {
    const input = wrapper.find('input[type="text"]')
    input.setValue(guess)
    await input.trigger("keydown.enter")
  }

  test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
    await playerSubmitGuess(wordOfTheDay)

    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test('a defeat message appears when the user makes a guess that does not match the word of the day', async () => {
    await playerSubmitGuess('WRONG')

    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })

  test('no end-of-game message appears if the user has not yet made a guess', async () => {
    const wrapper = mount(WordleBoard, {
      props: {
        wordOfTheDay
      }
    })
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  })

  test('If a word of the day provided does not have exactly 5 characters, an error message is displayed', async () => {
    vi.spyOn(console, 'warn')

    const wrapper = mount(WordleBoard, {
      props: {
        wordOfTheDay: 'TOO_LONG'
      }
    })
    
    expect(console.warn).toHaveBeenCalled()
  }
  )
})
