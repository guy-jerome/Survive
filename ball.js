import Brain from "./brain.js"
import {scaleNumbers, distanceForm} from "./utils.js"
import Food from "./food.js"
const BallWidth = 16;
const BallHeight = 16;
const BallColor = "white";
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
      let ball = new Ball((Math.random()*app.renderer.width - BallWidth),(Math.random()*app.renderer.height - BallHeight),app)
      app.stage.addChild(ball.graphics)
      Ball.balls.push(ball)
    }
  }
  constructor(x, y, app,  brain = new Brain(), height = BallHeight, width = BallWidth,){

    this.app = app
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
    this.foodEaten = 0
    this.brain = brain
  }
  //movement
  moveForward(){
    this.graphics.x += this.direction[0] * this.speed
    this.graphics.y += this.direction[1] * this.speed
    if (this.graphics.x > this.app.renderer.width - this.width){
      this.graphics.x = this.app.renderer.width - this.width
    }else if (this.graphics.x < 0){
      this.graphics.x = 0
    }

    if(this.graphics.y > this.app.renderer.height - this.height){
      this.graphics.y = this.app.renderer.height - this.height
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
  outputNetwork(){
    let foodDistance = this.getNearestFood()
    let scaledX = scaleNumbers(this.graphics.x,this.app.renderer.width - BallWidth,0 )
    let scaledY = scaleNumbers(this.graphics.y,this.app.renderer.height- BallHeight,0)
    //Run inputs through the neural network

    let results = this.brain.network.activate([scaledX,scaledY,...foodDistance])
    return results
  }
  decide(){
    let results = this.outputNetwork()
    let maxNumber = Math.max(...results)
    //Check results and make decision
    let index = results.indexOf(maxNumber)
    if (index === 0){
      this.turnRight()
    }else if (index ===1){
      this.turnLeft()
    }
  }
  checkCollisionWithOtherBalls() {
    for (let ball of Ball.balls) {
      if (ball !== this) {

        let distance = distanceForm(this.graphics.x,this.graphics.y,ball.graphics.x,ball.graphics.y)

        // if (distance < this.width) {
        //   // Calculate the vector to move away from the colliding ball
        //   const angle = Math.atan2(dy, dx);
        //   const moveAwayX = Math.cos(angle);
        //   const moveAwayY = Math.sin(angle);

        //   // Update the direction to move away from the collision
        //   this.direction = [moveAwayX, moveAwayY];
        //   this.moveForward()
          
        // }
      }
    }
  }
  getNearestFood(){
    let min = [Food.foods[0], distanceForm(this.graphics.x, Food.foods[0].graphics.x,this.graphics.y,Food.foods[0].graphics.y)] 

    for (let food of Food.foods){   
      let distance = distanceForm(this.graphics.x,this.graphics.y,food.graphics.x,food.graphics.y)
      if (min[1]>distance){
        min = [food,distance]
      }
    }
    let scaledX = scaleNumbers(min[0].graphics.x,this.app.renderer.width - BallWidth,0 )
    let scaledY = scaleNumbers(min[0].graphics.y,this.app.renderer.height- BallHeight,0)
    let scaledDist = scaleNumbers(min[1],Math.sqrt((this.app.renderer.width - BallWidth)**2 + (this.app.renderer.height- BallHeight)**2), 0)
    return [scaledX,scaledY,scaledDist]
  }
  checkFoodCollision() {
    for (let food of Food.foods) {
      let distance = distanceForm(
        this.graphics.x,
        this.graphics.y,
        food.graphics.x,
        food.graphics.y
      );
      if (distance < this.width+16) {
        food.destroy();
        this.foodEaten++
        let positive = this.outputNetwork()
        this.brain.network.propagate(.5, positive)
        
      }
    }
  }
  checkSurvive(){
    if (this.foodEaten >0){
      this.reproduce()
    } else if(this.foodEaten < 1){
      this.destroy()
    }
    this.foodEaten = 0
  }
  destroy(){
    this.app.stage.removeChild(this.graphics)
    this.graphics.destroy();
    const index = Ball.balls.indexOf(this);
    if (index !== -1) {
      Ball.balls.splice(index, 1);
    }
  }
  reproduce(){
    let ball = new Ball((Math.random()*this.app.renderer.width - BallWidth),(Math.random()*this.app.renderer.height - BallHeight),this.app, this.brain)
    this.app.stage.addChild(ball.graphics)
    Ball.balls.push(ball)
  }

}

export default Ball