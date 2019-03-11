const fixLengths = (data) => {
    let maxLengthInput = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].input.length > maxLengthInput) {
        maxLengthInput = data[i].input.length;
      }
    }
  
    for (let i = 0; i < data.length; i++) {
      while (data[i].input.length < maxLengthInput) {
        data[i].input.push(0);
      }
    }
    // return console.log(data);
    // console.log('data',data);
    return data;
}

const encode = d => {
    const encoded = [];
    d.split('').map(c =>  {
        encoded.push(c.charCodeAt(0)/255);
    })
    return encoded;
}

const encodeData = data => {

    return data.map( d => {
  
      return {
          input:  encode(d.input),
          output: d.output
        }
    })
  }

const serialize = data => fixLengths(encodeData(data));

module.exports = {
    serialize:  serialize,
    encode:     encode,
}