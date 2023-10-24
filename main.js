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


Ball.generateBalls(10,app)
Food.generateFood(5,app)
let elapsedTime = 0;
app.ticker.add((delta)=>{
  elapsedTime += delta
  for (let ball of Ball.balls){
    ball.moveForward()
  }
  if (elapsedTime >= 20) {
    for (let ball of Ball.balls){
      ball.checkCollisionWithOtherBalls(app)
      ball.decide()
    }
    elapsedTime = 0
  }

})
