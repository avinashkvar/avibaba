const express = require('express');
const cors = require('cors');
const connect = require('./db/connect');
const userRoute = require('./routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
     res.send('hello avibaba')
})

app.use('/',userRoute)

connect()
	.then(() => app.listen(3001, () => console.log('listening on port 3001')))
	.catch((err) => console.log(err));

module.exports = app;
