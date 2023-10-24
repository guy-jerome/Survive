class Brain {
  constructor() {
    this.inputLayer = new Layer(5);
    this.hiddenLayer1 = new Layer(20); // First hidden layer
    this.hiddenLayer2 = new Layer(20); // Second hidden layer
    // Add more hidden layers as needed

    this.outputLayer = new Layer(3);

    this.inputLayer.project(this.hiddenLayer1);
    this.hiddenLayer1.project(this.hiddenLayer2); // Connect the first hidden layer to the second
    this.hiddenLayer2.project(this.outputLayer); // Connect the second hidden layer to the output

    this.network = new Network({
      input: this.inputLayer,
      hidden: [this.hiddenLayer1, this.hiddenLayer2], // Add more hidden layers here
      output: this.outputLayer
    });
  }
}

export default Brain