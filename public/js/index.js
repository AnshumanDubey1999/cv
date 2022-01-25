import * as global from './init.js';
import Stream from "./stream.js";
import Bomb from "./bomb.js";



document.body.onclick =  (event) => {
  global.changeColor()
  // console.log(event.x,event.y)
  let row = Math.floor(event.x/global.boxSize)
  let col = Math.floor(event.y/global.boxSize)
  let bomb = new Bomb(global.red,global.green,global.blue,row,col);
  bomb.start();
  // console.log(global.streams[row].characters[col])
}


const iGotResized = async () => {
  await global.adjustValues(innerWidth, innerHeight);
  // await new Promise(r => setTimeout(r, 500));
  for(let i = 0; i < global.canvas1.width/global.boxSize + 1; i++){
    // console.log('Highlight', global.highlights[i%global.highlights.length])
    global.streams.push(new Stream(
      global.highlights[i%global.highlights.length],
      i, 
      Math.round((Math.random()*global.canvas1.height)/global.boxSize), 
      Math.round(Math.random()*10+1)
    ))
    global.streams[i].setUp()
  }
  // console.log(global.canvas1.width/global.boxSize + 1, global.streams.length);

}

document.body.onresize = iGotResized;

iGotResized()