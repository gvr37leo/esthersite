var express = require('express')
var app = express();

app.use(express.static('./'))

app.listen(8000,()=>{
    console.log('listening on 8000')
})