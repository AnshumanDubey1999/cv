// console.log("I am on!")
const highlights = [
"Java",
"Python3",
"LinkedIn",
"Codechef",
"HackerRank",
"Codeforces",
"HackerEarth",
"Discord",
"AngularJS",
"BootStrap",
"HTML5",
"Firebase",
"Git",
"Heroku",
"Express",
"CSS3",
"JavaScript",
"Linux",
"Mint",
"MongoDB",
"PostgreSQL",
"nodeJS",
"postman",
"TypeScript",
"IntellijIDEA",
"VSCode",
"SublimeText3",
"ptPython",
"Anshuman",
"Dubey",
"Anime",
"Tatakaye",
"GitHub",
"Engineering",
"CSE",
"TMSL",
"AttackOnTitan",
"MarvelCinematicUniverse",
"Matrix",
"NeonGenysisEvangelion",
"YourName",
"Pixar",
"MobPshyco100",
"One",
"bash",
"Hamilton",
"Nier:Automata",
"FarCry3",
"Phineas&Ferb",
"StarWars",
"Avatar",
"MyNeighborTotoro",
"PrincessMononoke",
"HarryPotter",
"ASongOfIce&Fire",
"WorldWarZ",
"TheFaultInOurStars",
"ThePrestige",
"Intersteller",
"LabaDabaDubDub"
];

function shuffle(array) {         // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let canvas0 = document.querySelector('#layer0');
let canvas1 = document.querySelector('#layer1');
let canvas2 = document.querySelector('#layer2');
canvas0.width = innerWidth;
canvas0.height = innerHeight;
canvas1.width = innerWidth;
canvas1.height = innerHeight;
canvas2.width = innerWidth;
canvas2.height = innerHeight;
let pencil0 = null;
let pencil1 = null;
let pencil2 = null;
let red = 0;
let green = 0;
let blue = 0;
let streams = [];
if(canvas1.getContext)
  pencil0 = canvas0.getContext('2d');
  pencil1 = canvas1.getContext('2d');
  pencil2 = canvas2.getContext('2d');
let size = 20;
let boxSize = size + 4;
let margin = 2;
let speedConstant = 50;
let divConst = 1;
let font = 'Major Mono Display'

class Character {
  constructor(value, x, y){
    this.value = value;
    this.x = x;
    this.y = y;
    this.r = red;
    this.b = blue;
    this.g = green;
    this.updateTime = Date.now();
    pencil1.font = size+"px "+font;
    pencil1.textAlign = "center";
    pencil1.fillStyle = `rgb(255,255,255)`;
    pencil1.fillText(this.value, this.x-margin, this.y-margin)
  }

  draw(opacity) {
    pencil2.clearRect(this.x-(size-margin),this.y-(size-margin),size+margin*2,size+margin*2);
    pencil2.fillStyle = `rgba(${this.r},${this.g},${this.b}, ${opacity})`;
    pencil2.fillRect(this.x-(size-margin),this.y-(size-margin),size+margin*2,size+margin*2);
  }

  updateColor(r,g,b, time) {
    this.r = r;
    this.b = b;
    this.g = g;
    this.updateTime = time;
    pencil0.clearRect(this.x-(size-margin),this.y-(size-margin),size+margin*2,size+margin*2);
    pencil0.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
    pencil0.fillRect(this.x-(size-margin),this.y-(size-margin),size+margin*2,size+margin*2);
    pencil2.clearRect(this.x-(size-margin),this.y-(size-margin),size+margin*2,size+margin*2);
    pencil2.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
    pencil2.fillRect(this.x-(size-margin),this.y-(size-margin),size+margin*2,size+margin*2);
  }
}

class Stream{
  constructor(value, x, y, speed) {
    this.value = value;
    this.speed = speed;
    this.x = x;
    let yLimit = Math.round(canvas1.height/boxSize)-5
    this.y = y>yLimit?yLimit:y;
    this.characters = []
    this.intervalID = ''
  }

  setUp() {
    let height = Math.round(canvas1.height/boxSize)+1;
    for(let i = 0; i < height; i++) {
      this.characters.push(
        new Character(
          this.value.charAt(i%(this.value.length)), 
          this.x*boxSize+12/divConst, 
          i*boxSize+18/divConst)
      )
    }
    this.intervalID = window.setInterval(() => {
      for(let i = this.y; i < (this.y+this.value.length); i++){
        // console.log(height, i%height, (i%height)/(this.value.length))
        this.characters[i%height].draw(1-(i-this.y)/(this.value.length)+0.1)
      }
      try {
        this.characters[this.y != 0 ? this.y-1 : this.characters.length-1].draw(1)
      } catch (error) {
        console.log(this.y, this.y != 0 ? this.y-1 : this.characters.length-1, this.characters.length, height, this.value, this.x, this.y)
      }
      this.y = (this.y+1)%height;
    }, this.speed*speedConstant)
    for(let i = this.y; i < (this.y+this.value.length); i++){
      // console.log(height, i%height, (i%height)/(this.value.length))
      this.characters[i%height].draw((i-this.y)/(this.value.length)+0.1)
    }
  }


}

class Bomb{
  constructor(r,g,b,x,y){
    this.red = r;
    this.blue = b;
    this.green = g;
    this.row = x;
    this.col = y;
    this.startTime = Date.now();
    this.id = null;
    this.s1 = [];
    this.s2 = [[x,y]];
    streams[x].characters[y].updateColor(r,g,b, this.startTime);
  }

  start(){
    this.id = window.setInterval(() => {
      this.s1 = this.s2;
      this.s2 = [];
      while(this.s1.length>0){
        let cord = this.s1.pop();
        let x = cord[0];
        let y = cord[1];
        if(x>0){
          let temp = streams[x-1].characters[y];
          if(temp.updateTime<this.startTime){
            temp.updateColor(this.red,this.green,this.blue,this.startTime)
            this.s2.push([x-1,y]);
          }
          if(y>0){
            let temp = streams[x-1].characters[y-1];
            if(temp.updateTime<this.startTime){
              temp.updateColor(this.red,this.green,this.blue,this.startTime)
              this.s2.push([x-1,y-1]);
            }
          }
          if(y<streams[0].characters.length-1){
            let temp = streams[x-1].characters[y+1];
            if(temp.updateTime<this.startTime){
              temp.updateColor(this.red,this.green,this.blue,this.startTime)
              this.s2.push([x-1,y+1]);
            }
          }
        }
        if(x<streams.length-1){
          let temp = streams[x+1].characters[y];
          if(temp.updateTime<this.startTime){
            temp.updateColor(this.red,this.green,this.blue,this.startTime)
            this.s2.push([x+1,y]);
          }
          if(y>0){
            let temp = streams[x+1].characters[y-1];
            if(temp.updateTime<this.startTime){
              temp.updateColor(this.red,this.green,this.blue,this.startTime)
              this.s2.push([x+1,y-1]);
            }
          }
          if(y<streams[0].characters.length-1){
            let temp = streams[x+1].characters[y+1];
            if(temp.updateTime<this.startTime){
              temp.updateColor(this.red,this.green,this.blue,this.startTime)
              this.s2.push([x+1,y+1]);
            }
          }
        }
        if(y>0){
          let temp = streams[x].characters[y-1];
          if(temp.updateTime<this.startTime){
            temp.updateColor(this.red,this.green,this.blue,this.startTime)
            this.s2.push([x,y-1]);
          }
        }
        if(y<streams[0].characters.length-1){
          let temp = streams[x].characters[y+1];
          if(temp.updateTime<this.startTime){
            temp.updateColor(this.red,this.green,this.blue,this.startTime)
            this.s2.push([x,y+1]);
          }
        }
      }
      if(this.s2.length==0)
        this.terminate();
      // console.log('Alive!!!')
    }, 30)
  }

  terminate(){
    window.clearInterval(this.id)
  }
}

function clicked(event){
  changeColor()
  // console.log(event.x,event.y)
  let row = Math.floor(event.x/boxSize)
  let col = Math.floor(event.y/boxSize)
  let bomb = new Bomb(red,green,blue,row,col);
  bomb.start();
  // console.log(streams[row].characters[col])
}

function changeColor(){
  do {
    red = Math.round(Math.random()*255)
    green = Math.round(Math.random()*150)
    blue = Math.round(Math.random()*255)
  } while((red + green + blue)>400)
}

function iGotResized(){
  canvas0.width = innerWidth;
  canvas0.height = innerHeight;
  canvas1.width = innerWidth;
  canvas1.height = innerHeight;
  canvas2.width = innerWidth;
  canvas2.height = innerHeight;
  size = innerWidth > 900 ? 20 : 10;
  boxSize = innerWidth > 900 ? 24 : 12;
  margin = innerWidth > 900 ? 2: 1;
  divConst = innerWidth > 900 ? 1: 2;
  speedConstant = innerWidth > 900 ? 50 : 25;
  shuffle(highlights);
  changeColor()
  canvas0.style.background = `rgb(${red},${green},${blue})`;
  pencil2.fillStyle = `rgb(${red},${green},${blue})`;
  pencil2.fillRect(0,0,canvas2.width,canvas2.height);
  streams.forEach(stream => {
    window.clearInterval(stream.intervalID)
  })
  streams = [];
  for(let i = 0; i < canvas1.width/boxSize + 1; i++){
    // console.log('Highlight', highlights[i%highlights.length])
    streams.push(new Stream(
      highlights[i%highlights.length],
      i, 
      Math.round((Math.random()*canvas1.height)/boxSize), 
      Math.round(Math.random()*10+1)
    ))
    streams[i].setUp()
  }
}

iGotResized()