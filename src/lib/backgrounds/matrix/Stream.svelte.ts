import Character from './Character.svelte'
import * as global from './init.svelte'

export default class Stream {
  value: string
  speed: number
  x: number
  y: number
  characters: Character[]
  intervalID: number | null

  constructor(value: string, x: number, y: number, speed: number) {
    this.value = value
    this.speed = speed
    this.x = x
    let yLimit = Math.round((global.canvas1?.height | 0) / global.boxSize) - 5
    this.y = y > yLimit ? yLimit : y
    this.characters = []
    this.intervalID = null
  }

  setUp(): void {
    let height = Math.round(global.canvas1?.height / global.boxSize) + 1
    for (let i = 0; i < height; i++) {
      this.characters.push(
        new Character(
          this.value.charAt(i % this.value.length),
          this.x * global.boxSize + 12 / global.divConst,
          i * global.boxSize + 18 / global.divConst,
        ),
      )
    }

    this.intervalID = window.setInterval(() => {
      for (let i = this.y; i < this.y + this.value.length; i++) {
        this.characters[i % height].draw(
          1 - (i - this.y) / this.value.length + 0.1,
        )
      }

      try {
        this.characters[
          this.y !== 0 ? this.y - 1 : this.characters.length - 1
        ].draw(1)
      } catch (error) {
        console.error(
          'Stream Error:',
          this.y,
          this.y !== 0 ? this.y - 1 : this.characters.length - 1,
          this.characters.length,
          height,
          this.value,
          this.x,
          this.y,
        )
      }

      this.y = (this.y + 1) % height
    }, this.speed * global.speedConstant)

    for (let i = this.y; i < this.y + this.value.length; i++) {
      this.characters[i % height].draw((i - this.y) / this.value.length + 0.1)
    }
  }
}
