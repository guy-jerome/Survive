class Brain{
  constructor(){
    this.inputLayer = new Layer(2);
    this.hiddenLayer = new Layer(3);
    this.outputLayer = new Layer(3);
    inputLayer.project(hiddenLayer)
    hiddenLayer.project(outputLayer)

    this.network = new Network({
      input: inputLayer,
      hidden: [hiddenLayer],
      output: outputLayer
  })
  }
}

export default Brain

