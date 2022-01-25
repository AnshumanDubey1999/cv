import * as global from './init.js';

export default class Character {
    constructor(value, x, y){
      this.value = value;
      this.x = x;
      this.y = y;
      this.r = global.red;
      this.b = global.blue;
      this.g = global.green;
      this.updateTime = Date.now();
      global.pencil1.font = global.size+"px "+global.font;
      global.pencil1.textAlign = "center";
      global.pencil1.fillStyle = `rgb(255,255,255)`;
      global.pencil1.fillText(this.value, this.x-global.margin, this.y-global.margin)
  
      for(let i = 0; i < global.randomTextLayers.length; i++){
        let character = global.allowedCharacters[Math.floor(Math.random()*global.allowedCharacters.length)]
        global.randomTextPencils[i].font = global.size+"px "+global.font;
        global.randomTextPencils[i].textAlign = "center";
        global.randomTextPencils[i].fillStyle = `rgb(255,255,255)`;
        global.randomTextPencils[i].fillText(character, this.x-global.margin, this.y-global.margin)
      }
    }
  
    draw(opacity) {
      global.pencil2.clearRect(
        this.x-(global.size-global.margin),
        this.y-(global.size-global.margin),
        global.size+global.margin*2,
        global.size+global.margin*2
      );
      global.pencil2.fillStyle = `rgba(${this.r},${this.g},${this.b}, ${opacity})`;
      global.pencil2.fillRect(
        this.x-(global.size-global.margin),
        this.y-(global.size-global.margin),
        global.size+global.margin*2,
        global.size+global.margin*2
      );
    }
  
    updateColor(r,g,b, time) {
      this.r = r;
      this.b = b;
      this.g = g;
      this.updateTime = time;
      global.pencil0.clearRect(
        this.x-(global.size-global.margin),
        this.y-(global.size-global.margin),
        global.size+global.margin*2,
        global.size+global.margin*2
      );
      global.pencil0.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
      global.pencil0.fillRect(
        this.x-(global.size-global.margin),
        this.y-(global.size-global.margin),
        global.size+global.margin*2,
        global.size+global.margin*2
      );
      global.pencil2.clearRect(
        this.x-(global.size-global.margin),
        this.y-(global.size-global.margin),
        global.size+global.margin*2,
        global.size+global.margin*2
      );
      global.pencil2.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
      global.pencil2.fillRect(
        this.x-(global.size-global.margin),
        this.y-(global.size-global.margin),
        global.size+global.margin*2,
        global.size+global.margin*2
      );
    }
  };