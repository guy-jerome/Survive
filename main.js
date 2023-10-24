import Ball from "./ball.js"
import Food from "./food.js"
const ScreenWidth = 800
const ScreenHeight = 800

const app = new PIXI.Application({
  width: ScreenWidth,
  height: ScreenHeight,
  backgroundColor: "black"
})

document.body.appendChild(app.view)

Food.generateFood(50,app)
Ball.generateBalls(20,app)


let elapsedTime = 0;
let decideTime = 0
app.ticker.add((delta)=>{
  elapsedTime += delta
  decideTime += delta
  for (let ball of Ball.balls){
    ball.moveForward()
    ball.checkFoodCollision()
    ball.checkCollisionWithOtherBalls()
  }
  if (decideTime >= 10) {
    for (let ball of Ball.balls){

      ball.decide()
    } 
    decideTime = 0
  }
  if (elapsedTime >= 100){
    for (let ball of Ball.balls){
      ball.checkSurvive()
    }
    for (let food of Food.foods){
      food.destroy()
    }
    Food.generateFood(50,app)
    elapsedTime = 0
  }

})
