import { highlights } from './data.svelte'
import type Stream from './Stream.svelte'

export const allowedCharacters: string =
  'abcdefghijklmnopqrstuvwxyz!@#$%&(){}[]<>?/|\\+='

// 🎨 Canvas elements
export let canvas0: HTMLCanvasElement
export let canvas1: HTMLCanvasElement
export let canvas2: HTMLCanvasElement

export const initialize = (
  c0: HTMLCanvasElement,
  c1: HTMLCanvasElement,
  c2: HTMLCanvasElement,
) => {
  canvas0 = c0
  canvas1 = c1
  canvas2 = c2

  if (canvas0) {
    canvas0.width = innerWidth
    canvas0.height = innerHeight
  }
  if (canvas1) {
    canvas1.width = innerWidth
    canvas1.height = innerHeight
  }
  if (canvas2) {
    canvas2.width = innerWidth
    canvas2.height = innerHeight
  }

  for (let i = 0; i < 3; i++) {
    const layer = document.getElementById(
      `randomTextLayer${i}`,
    ) as HTMLCanvasElement | null
    if (layer) {
      layer.width = innerWidth
      layer.height = innerHeight
    }
    randomTextLayers.push(layer)
  }

  for (let i = 0; i < randomTextLayers.length; i++) {
    randomTextPencils.push(null)
  }

  if (canvas1 && canvas1.getContext) {
    pencil0 = canvas0?.getContext('2d') ?? null
    pencil1 = canvas1.getContext('2d')
    pencil2 = canvas2?.getContext('2d') ?? null

    for (let i = 0; i < randomTextLayers.length; i++) {
      randomTextPencils[i] = randomTextLayers[i]?.getContext('2d') ?? null
    }
  }
}

// 🎨 Random text layers
export let randomTextLayers: (HTMLCanvasElement | null)[] = []

// ✏️ Drawing Contexts

export let pencil0: CanvasRenderingContext2D | null = null
export let pencil1: CanvasRenderingContext2D | null = null
export let pencil2: CanvasRenderingContext2D | null = null
export let randomTextPencils: (CanvasRenderingContext2D | null)[] = []

// 🎨 Colors & Settings
export let red: number = 0
export let green: number = 0
export let blue: number = 0
export let streams: Stream[] = []
export let size: number = 20
export let boxSize: number = size + 4
export let margin: number = 2
export let speedConstant: number = 50
export let divConst: number = 1
export let font: string = 'monospace'

// 🔀 Fisher-Yates Shuffle Algorithm
function shuffle(array: string[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

// 🎨 Change color function
export const changeColor = (): void => {
  do {
    red = Math.round(Math.random() * 255)
    green = Math.round(Math.random() * 150)
    blue = Math.round(Math.random() * 255)
  } while (red + green + blue > 400)
}

// 📏 Adjust values for screen size
export const adjustValues = async (
  innerWidth: number,
  innerHeight: number,
): Promise<void> => {
  if (canvas0) {
    canvas0.width = innerWidth
    canvas0.height = innerHeight
  }
  if (canvas1) {
    canvas1.width = innerWidth
    canvas1.height = innerHeight
  }
  if (canvas2) {
    canvas2.width = innerWidth
    canvas2.height = innerHeight
  }
  for (let i = 0; i < 3; i++) {
    if (randomTextLayers[i]) {
      randomTextLayers[i]!.width = innerWidth
      randomTextLayers[i]!.height = innerHeight
    }
  }

  size = innerWidth > 900 ? 20 : 10
  boxSize = innerWidth > 900 ? 24 : 12
  margin = innerWidth > 900 ? 2 : 1
  divConst = innerWidth > 900 ? 1 : 2
  speedConstant = innerWidth > 900 ? 50 : 25

  shuffle(highlights)
  changeColor()

  streams.forEach((stream) => {
    window.clearInterval(Number(stream.intervalID))
  })
  streams.length = 0

  let count = 5
  while (!document.fonts.check('12px MajorMonoDisplay') && count > 0) {
    await new Promise((resolve) => {
      setTimeout(resolve, 200)
    })
    count--
  }

  font = 'MajorMonoDisplay, Courier, monospace'

  if (canvas0) {
    canvas0.style.background = `rgb(${red},${green},${blue})`
  }
  if (pencil2) {
    pencil2.fillStyle = `rgb(${red},${green},${blue})`
    pencil2.fillRect(0, 0, canvas2!.width, canvas2!.height)
  }
}
