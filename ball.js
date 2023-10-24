const BallWidth = 32;
const BallHeight = 32;
const BallColor = "green";
const Dir = {
  right: [1,0],
  left: [-1,0],
  up: [0,-1],
  down: [0,1]
};
const Speed = 5;

//Creates a simple ball
class Ball{
  constructor(x, y, height = BallHeight, width = BallWidth){
    this.speed = Speed
    this.direction = Dir.right
    this.height = height;
    this.width = width;
    this.x = x
    this.y = y
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(BallColor)
    this.graphics.drawEllipse(x,y,this.width,this.height)
    this.graphics.endFill();
  }
  //movement
  moveForward(app){
    this.graphics.x += this.direction[0] * this.speed
    this.graphics.y += this.direction[1] * this.speed
    if (this.graphics.x > app.renderer.width - this.width*2){
      this.graphics.x = app.renderer.width - this.width*2
    }else if (this.graphics.x < 0){
      this.graphics.x = 0
    }

    if(this.graphics.y > app.renderer.height - this.height*2){
      this.graphics.y = app.renderer.height - this.height*2
    }else if (this.graphics.y < 0){
      this.graphics.y = 0
    }

  }
  turnRight(){
    if (this.direction === Dir.right){
      this.direction = Dir.down
    }else if(this.direction === Dir.down){
      this.direction = Dir.left
    }else if(this.direction === Dir.left){
      this.direction = Dir.up
    }else{
      this.direction = Dir.right
    }
  }
  turnLeft(){
    if (this.direction === Dir.right){
      this.direction = Dir.up
    }else if(this.direction === Dir.down){
      this.direction = Dir.right
    }else if(this.direction === Dir.left){
      this.direction = Dir.down
    }else{
      this.direction = Dir.left
    }
  }
}

export default Ball