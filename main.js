import Ball from "./ball.js"
const ScreenWidth = 800
const ScreenHeight = 800

const app = new PIXI.Application({
  width: ScreenWidth,
  height: ScreenHeight,
  backgroundColor: "blue"
})

document.body.appendChild(app.view)


Ball.generateBalls(100,app)

let elapsedTime = 0;
app.ticker.add((delta)=>{
  elapsedTime += delta
  for (let ball of Ball.balls){
    ball.moveForward(app)
  }
  if (elapsedTime >= 20) {
    for (let ball of Ball.balls){
      ball.decide()
    }
    elapsedTime = 0
  }

})
