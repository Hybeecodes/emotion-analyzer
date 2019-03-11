const brain = require('brain.js');
const trainData = require('./src/training-data');
const serializer = require('./src/serialize');
const net = new brain.NeuralNetwork();
// console.log(trainData)
const serializedTrainData = serializer.serialize(trainData);
const maxLength = serializedTrainData[0].input.length;
// console.log(maxLength);
// return


net.train(serializer.serialize(trainData),{
    errorThresh: 0.005,  // error threshold to reach
    iterations: 20000,   // maximum training iterations
    log: true,           // console.log() progress periodically
    logPeriod: 10,       // number of iterations between logging
    learningRate: 0.3
});

const fixLength = (dataArr, maxLength) => {
  if(dataArr.length < maxLength){
    const diff = maxLength - dataArr.length;
    for (let i = 0; i < diff; i++) {
      dataArr.push(0);      
    }
  }
  return dataArr;
}
    
const serialize = data => fixLength(serializer.encode(data),maxLength);
// console.log(serialize('I feel fine'));
// return;
const output = net.run(serialize('I feel bad'));
const decision = (output.happy > output.sad)? "Good Emotion": "Bad Emotion";
console.log(decision)