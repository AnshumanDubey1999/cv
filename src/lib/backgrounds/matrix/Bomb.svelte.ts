import * as global from './init.svelte'

interface Character {
  updateTime: number
  updateColor: (r: number, g: number, b: number, time: number) => void
}

interface Stream {
  characters: Character[]
}

interface Global {
  streams: Stream[]
}

// Assuming global has the expected structure
const globalTyped = global as unknown as Global

export default class Bomb {
  red: number
  blue: number
  green: number
  row: number
  col: number
  startTime: number
  id: number | null
  s1: number[][]
  s2: number[][]

  constructor(r: number, g: number, b: number, x: number, y: number) {
    this.red = r
    this.blue = b
    this.green = g
    this.row = x
    this.col = y
    this.startTime = Date.now()
    this.id = null
    this.s1 = []
    this.s2 = [[x, y]]
    globalTyped.streams[x].characters[y].updateColor(r, g, b, this.startTime)
  }

  start(): void {
    this.id = window.setInterval(() => {
      this.s1 = this.s2
      this.s2 = []
      while (this.s1.length > 0) {
        let cord = this.s1.pop()
        if (!cord) continue
        let [x, y] = cord

        if (x > 0) {
          this.spreadColor(x - 1, y)
          if (y > 0) this.spreadColor(x - 1, y - 1)
          if (y < globalTyped.streams[0].characters.length - 1)
            this.spreadColor(x - 1, y + 1)
        }

        if (x < globalTyped.streams.length - 1) {
          this.spreadColor(x + 1, y)
          if (y > 0) this.spreadColor(x + 1, y - 1)
          if (y < globalTyped.streams[0].characters.length - 1)
            this.spreadColor(x + 1, y + 1)
        }

        if (y > 0) this.spreadColor(x, y - 1)
        if (y < globalTyped.streams[0].characters.length - 1)
          this.spreadColor(x, y + 1)
      }

      if (this.s2.length === 0) this.terminate()
    }, 30)
  }

  private spreadColor(x: number, y: number): void {
    let temp = globalTyped.streams[x].characters[y]
    if (temp.updateTime < this.startTime) {
      temp.updateColor(this.red, this.green, this.blue, this.startTime)
      this.s2.push([x, y])
    }
  }

  terminate(): void {
    if (this.id !== null) {
      window.clearInterval(this.id)
      this.id = null
    }
  }
}
