const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public/')));

app.get('/',(req,res) => {
    res.send('You can analyze emotions from a text here');
})
app.get('/analyze',(req,res,next) => {
    const { message } = req.query;
    if(message){
        const analyze = require('./index');
        const result = analyze(message);
        res.send(result);
    }else{
        res.send("No message Supplied!");
    }
    
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server running @ PORT ${PORT}`);
})