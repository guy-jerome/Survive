function scaleNumbers(value, max, min){
  return ((value - min)/(max - min))
}


export {scaleNumbers}