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

let canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
let pencil = null;
let red = 0;
let green = 0;
let blue = 0;
let streams = [];
if(canvas.getContext)
  pencil = canvas.getContext('2d');
let size = 20;
let boxSize = size + 4;
let speedConstant = 50;
let font = 'Major Mono Display'

class Character {
  constructor(value, x, y){
    this.value = value;
    this.x = x;
    this.y = y;
  }

  draw(opacity) {
    pencil.clearRect(this.x-(size*0.75),this.y-(size*0.75),size*1.5,size*1.5);
    pencil.font = size+"px "+font;
    pencil.textAlign = "center";
    pencil.fillStyle = `rgba(255,255,255, ${opacity})`;
    pencil.fillText(this.value, this.x, this.y)
  }
}

class Stream{
  constructor(value, x, y, speed) {
    this.value = value;
    this.speed = speed;
    this.x = x;
    let yLimit = Math.round(canvas.height/boxSize)-5
    this.y = y>yLimit?yLimit:y;
    this.characters = []
    this.intervalID = ''
  }

  setUp() {
    let height = Math.round(canvas.height/boxSize);
    for(let i = 0; i < height; i++) {
      this.characters.push(
        new Character(
          this.value.charAt(i%(this.value.length)), 
          this.x*boxSize+12, 
          i*boxSize+18)
      )
    }
    this.intervalID = window.setInterval(() => {
      for(let i = this.y; i < (this.y+this.value.length); i++){
        // console.log(height, i%height, (i%height)/(this.value.length))
        this.characters[i%height].draw((i-this.y)/(this.value.length)+0.1)
      }
      try {
        this.characters[this.y != 0 ? this.y-1 : this.characters.length-1].draw(0)
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

function iGotResized(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  size = innerWidth > 900 ? 20 : 10;
  boxSize = innerWidth > 900 ? 24 : 12;
  speedConstant = innerWidth > 900 ? 50 : 25;
  shuffle(highlights);
  do {
    red = Math.round(Math.random()*255)
    green = Math.round(Math.random()*255)
    blue = Math.round(Math.random()*255)
  } while((red + green + blue)>400)
  canvas.style.background = `rgb(${red},${green},${blue})`;
  streams.forEach(stream => {
    window.clearInterval(stream.intervalID)
  })
  streams = [];
  for(let i = 0; i < canvas.width/boxSize; i++){
    // console.log('Highlight', highlights[i%highlights.length])
    streams.push(new Stream(
      highlights[i%highlights.length],
      i, 
      Math.round((Math.random()*canvas.height)/boxSize), 
      Math.round(Math.random()*10+1)
    ))
    streams[i].setUp()
  }
}

iGotResized()