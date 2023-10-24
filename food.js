const FoodWidth = 8
const FoodHeight = 8
const FoodColor = "red"

class Food{
  static foods = []
  static generateFood(nums,app){
    for (let i = 0; i < nums; i++){
      let food = new Food((Math.random()*app.renderer.width - FoodWidth),(Math.random()*app.renderer.height - FoodHeight),app)
      app.stage.addChild(food.graphics)
      Food.foods.push(food)
    }
  }
  constructor(x,y, app, height = FoodHeight, width = FoodWidth){
    this.app = app
    this.width = width
    this.height = height
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(FoodColor)
    this.graphics.drawRect(0,0,this.width, this.height)
    this.graphics.endFill()
    this.graphics.x = x
    this.graphics.y = y
  }
}

export default Food