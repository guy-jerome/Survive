function scaleNumbers(value, max, min){
  return ((value - min)/(max - min))
}

function distanceForm(x1,y1,x2,y2){
  return Math.sqrt((x1-x2)**2 + (y1-y2)**2)
}


export {scaleNumbers, distanceForm}