import { describe, test, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import WordleBoard from '../app/components/WordleBoard.vue'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '../shared/settings'


describe('WordleBoard', () => {
  let wordOfTheDay: string = 'TESTE'
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

  describe('End of game messages', () => {
    test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
      await playerSubmitGuess(wordOfTheDay)
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
  
    test('a defeat message appears when the user makes a guess that does not match the word of the day', async () => {
      await playerSubmitGuess('WRONG')
      expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
    })
  
    test('no end-of-game message appears if the user has not yet made a guess', async () => {
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })
  })

  describe('Rules for defining the word of the day', () => {
    test('If a word of the day provided does not have exactly 5 characters, an error message is displayed', async () => {
      console.warn = vi.fn()
  
      const wrapper = mount(WordleBoard, {
        props: {
          wordOfTheDay: 'TOO_LONG'
        }
      })
      
      expect(console.warn).toHaveBeenCalled()
    }
    )
  
    test('If the word of the day is not all in upper case, a warning is emitted', () => {
      console.warn = vi.fn()
  
      mount(WordleBoard, {
        props: {
          wordOfTheDay: 'lower'
        }
      })
      
      expect(console.warn).toHaveBeenCalled()
    })
  
    test('If the word of the day is not a real Portuguese word, a warning is emitted', () => {
      console.warn = vi.fn()
  
      mount(WordleBoard, {
        props: {
          wordOfTheDay: 'RISAO'
        }
      })
  
      expect(console.warn).toHaveBeenCalled()
    })
  
    test('no warning is emitted if the word of the day is a real uppercase Portuguese word with 5 characters', async () => {
      console.warn = vi.fn()
        
        mount(WordleBoard, {
          props: {
            wordOfTheDay: 'TESTE'
          }
        })
    
        expect(console.warn).not.toHaveBeenCalled();
    })
  })
  describe('player input', () => {
    test.todo('player guesses are limited to 5 characters')
    test.todo('player guesses can only be submitted if they are real words')
    test.todo('player guesses are not case-sensitive')
    test.todo('player guesses can only contain letters')
  })

})
