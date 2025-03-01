<script lang="ts">
  import { onMount } from 'svelte'
  import * as global from './init.svelte'
  import Stream from './Stream.svelte'
  import Bomb from './Bomb.svelte'
  import { highlights } from './data.svelte'

  // Handle Click Event
  const handleClick = (event: MouseEvent) => {
    global.changeColor()
    let row = Math.floor(event.x / global.boxSize)
    let col = Math.floor(event.y / global.boxSize)
    let bomb = new Bomb(global.red, global.green, global.blue, row, col)
    bomb.start()
  }

  // Adjust Values on Resize
  const iGotResized = async () => {
    await global.adjustValues(innerWidth, innerHeight)

    global.streams.length = 0 // Clear previous streams
    for (let i = 0; i < global.canvas1.width / global.boxSize + 1; i++) {
      global.streams.push(
        new Stream(
          highlights[i % highlights.length],
          i,
          Math.round((Math.random() * global.canvas1.height) / global.boxSize),
          Math.round(Math.random() * 10 + 1),
        ),
      )
      global.streams[i].setUp()
    }
  }

  // Attach event listeners
  onMount(() => {
    const canvas0 = document.getElementById('layer0') as HTMLCanvasElement
    const canvas1 = document.getElementById('layer1') as HTMLCanvasElement
    const canvas2 = document.getElementById('layer2') as HTMLCanvasElement
    global.initialize(canvas0, canvas1, canvas2)
    document.body.addEventListener('click', handleClick)
    window.addEventListener('resize', iGotResized)
    iGotResized() // Initialize on mount

    return () => {
      document.body.removeEventListener('click', handleClick)
      window.removeEventListener('resize', iGotResized)
    }
  })
</script>

<canvas id="layer0" width="200" height="100"></canvas>
<canvas id="randomTextLayer0" width="200" height="100"></canvas>
<canvas id="randomTextLayer1" width="200" height="100"></canvas>
<canvas id="randomTextLayer2" width="200" height="100"></canvas>
<canvas id="layer1" width="200" height="100"></canvas>
<canvas id="layer2" width="200" height="100"></canvas>

<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  #layer0 {
    /* display:none; */
    z-index: -30;
  }
  #layer1 {
    z-index: -2;
    /* display:none; */
  }
  #layer2 {
    z-index: -1;
    /* display:none; */
  }

  #randomTextLayer0 {
    display: none;
    z-index: -20;
  }
  #randomTextLayer1 {
    z-index: -19;
    display: none;
  }
  #randomTextLayer2 {
    z-index: -18;
    display: none;
  }
</style>
