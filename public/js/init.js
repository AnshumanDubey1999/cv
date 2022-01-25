export const highlights = [
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
    
export const allowedCharacters = "abcdefghijklmnopqrstuvwxyz!@#$%&(){}[]<>?/|\\+="

export let canvas0 = document.querySelector('#layer0');
canvas0.width = innerWidth;
canvas0.height = innerHeight;
export let canvas1 = document.querySelector('#layer1');
canvas1.width = innerWidth;
canvas1.height = innerHeight;
export let canvas2 = document.querySelector('#layer2');
canvas2.width = innerWidth;
canvas2.height = innerHeight;
export let randomTextLayers = [];
for (let i = 0; i < 3; i++) {
  randomTextLayers.push(document.querySelector('#randomTextLayer'+i));
  randomTextLayers[i].width = innerWidth;
  randomTextLayers[i].height = innerHeight;
}

export let pencil0 = null;
export let pencil1 = null;
export let pencil2 = null;
export let randomTextPencils = [];
for(let i = 0; i < randomTextLayers.length; i++) {
  randomTextPencils.push(null);
}

if(canvas1.getContext){
  pencil0 = canvas0.getContext('2d');
  pencil1 = canvas1.getContext('2d');
  pencil2 = canvas2.getContext('2d');
  for(let i = 0; i < randomTextLayers.length; i++) {
    randomTextPencils[i] = randomTextLayers[i].getContext('2d');
  }
}


export let red = 0;
export let green = 0;
export let blue = 0;
export let streams = [];
export let size = 20;
export let boxSize = size + 4;
export let margin = 2;
export let speedConstant = 50;
export let divConst = 1;
export let font = 'monospace';

function shuffle(array) {         // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const changeColor = () => {
  do {
    red = Math.round(Math.random()*255)
    green = Math.round(Math.random()*150)
    blue = Math.round(Math.random()*255)
  } while((red + green + blue)>400)
}

export const adjustValues = async (innerWidth, innerHeight) => {
  canvas0.width = innerWidth;
  canvas0.height = innerHeight;
  canvas1.width = innerWidth;
  canvas1.height = innerHeight;
  canvas2.width = innerWidth;
  canvas2.height = innerHeight;
  for (let i = 0; i < 3; i++) {
    randomTextLayers[i].width = innerWidth;
    randomTextLayers[i].height = innerHeight;
  }
  size = innerWidth > 900 ? 20 : 10;
  boxSize = innerWidth > 900 ? 24 : 12;
  margin = innerWidth > 900 ? 2: 1;
  divConst = innerWidth > 900 ? 1: 2;
  speedConstant = innerWidth > 900 ? 50 : 25;
  shuffle(highlights);
  changeColor()
  streams.forEach(stream => {
    window.clearInterval(stream.intervalID)
  })
  streams.length = 0;
  while(!document.fonts.check('12px Major Mono Display')){
    await new Promise(r => setTimeout(r, 200));
  }
  font = 'Major Mono Display';
  canvas0.style.background = `rgb(${red},${green},${blue})`;
  pencil2.fillStyle = `rgb(${red},${green},${blue})`;
  pencil2.fillRect(0,0,canvas2.width,canvas2.height);
}