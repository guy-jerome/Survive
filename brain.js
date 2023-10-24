class Brain{
  constructor(){
    this.inputLayer = new Layer(2);
    this.hiddenLayer = new Layer(10);
    this.outputLayer = new Layer(3);
    this.inputLayer.project(this.hiddenLayer)
    this.hiddenLayer.project(this.outputLayer)

    this.network = new Network({
      input: this.inputLayer,
      hidden: [this.hiddenLayer],
      output: this.outputLayer
  })
  }
}

export default Brain

