import Ball from "./ball.js"
import Brain from "./brain.js"
const ScreenWidth = 800
const ScreenHeight = 800

const app = new PIXI.Application({
  width: ScreenWidth,
  height: ScreenHeight,
  backgroundColor: "blue"
})

document.body.appendChild(app.view)


const ball = new Ball(40,40)
app.stage.addChild(ball.graphics)

let elapsedTime = 0;
app.ticker.add((delta)=>{
  elapsedTime += delta
  ball.moveForward(app)
  // if (elapsedTime >= 20) {
  //   if (Math.floor(Math.random() * 2) === 1){
  //     ball.turnLeft()
  //   }else{
  //     ball.turnRight()
  //   }

  //   elapsedTime = 0
  // }

})
