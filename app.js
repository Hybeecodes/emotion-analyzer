const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send('You can analyze emotions from a text here');
})
app.get('/analyse',(req,res,next) => {
    const { message } = req.query;
    if(message){
        const analyse = require('./index');
        const result = analyse(message);
        res.send(result);
    }else{
        res.send("No message Supplied!");
    }
    
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server running @ PORT ${PORT}`);
})