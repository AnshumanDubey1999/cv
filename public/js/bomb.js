import * as global from './init.js';

export default class Bomb{
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
      global.streams[x].characters[y].updateColor(r,g,b, this.startTime);
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
            let temp = global.streams[x-1].characters[y];
            if(temp.updateTime<this.startTime){
              temp.updateColor(this.red,this.green,this.blue,this.startTime)
              this.s2.push([x-1,y]);
            }
            if(y>0){
              let temp = global.streams[x-1].characters[y-1];
              if(temp.updateTime<this.startTime){
                temp.updateColor(this.red,this.green,this.blue,this.startTime)
                this.s2.push([x-1,y-1]);
              }
            }
            if(y<global.streams[0].characters.length-1){
              let temp = global.streams[x-1].characters[y+1];
              if(temp.updateTime<this.startTime){
                temp.updateColor(this.red,this.green,this.blue,this.startTime)
                this.s2.push([x-1,y+1]);
              }
            }
          }
          if(x<global.streams.length-1){
            let temp = global.streams[x+1].characters[y];
            if(temp.updateTime<this.startTime){
              temp.updateColor(this.red,this.green,this.blue,this.startTime)
              this.s2.push([x+1,y]);
            }
            if(y>0){
              let temp = global.streams[x+1].characters[y-1];
              if(temp.updateTime<this.startTime){
                temp.updateColor(this.red,this.green,this.blue,this.startTime)
                this.s2.push([x+1,y-1]);
              }
            }
            if(y<global.streams[0].characters.length-1){
              let temp = global.streams[x+1].characters[y+1];
              if(temp.updateTime<this.startTime){
                temp.updateColor(this.red,this.green,this.blue,this.startTime)
                this.s2.push([x+1,y+1]);
              }
            }
          }
          if(y>0){
            let temp = global.streams[x].characters[y-1];
            if(temp.updateTime<this.startTime){
              temp.updateColor(this.red,this.green,this.blue,this.startTime)
              this.s2.push([x,y-1]);
            }
          }
          if(y<global.streams[0].characters.length-1){
            let temp = global.streams[x].characters[y+1];
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