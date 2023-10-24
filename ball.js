import Brain from "./brain.js"


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
  static balls = []
  static generateBalls(nums, app){
    for (let i = 0; i < nums; i++){
      let ball = new Ball((Math.random()*app.renderer.width - BallWidth),(Math.random()*app.renderer.height - BallHeight))
      app.stage.addChild(ball.graphics)
      Ball.balls.push(ball)
    }
  }
  constructor(x, y, height = BallHeight, width = BallWidth){
    this.speed = Speed
    this.direction = Dir.right
    this.height = height;
    this.width = width;
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(BallColor)
    this.graphics.drawEllipse(0,0,this.width,this.height)
    this.graphics.endFill();
    this.graphics.x = x
    this.graphics.y = y

    this.brain = new Brain()
  }
  //movement
  moveForward(app){
    this.graphics.x += this.direction[0] * this.speed
    this.graphics.y += this.direction[1] * this.speed
    if (this.graphics.x > app.renderer.width - this.width){
      this.graphics.x = app.renderer.width - this.width
    }else if (this.graphics.x < 0){
      this.graphics.x = 0
    }

    if(this.graphics.y > app.renderer.height - this.height){
      this.graphics.y = app.renderer.height - this.height
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
  decide(){
    let results = this.brain.network.activate([this.graphics.x,this.graphics.y])
    let maxNumber = Math.max(...results)
    let index = results.indexOf(maxNumber)
    if (index === 1){
      this.turnRight()
    }else{
      this.turnLeft()
    }
  }
}

export default Ball